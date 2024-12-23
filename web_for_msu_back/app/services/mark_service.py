from __future__ import annotations  # Поддержка строковых аннотаций

import itertools
from operator import attrgetter
from typing import TYPE_CHECKING

import flask
from marshmallow import ValidationError
from sqlalchemy import asc

from web_for_msu_back.app.dto.marks import MarksDTO
from web_for_msu_back.app.dto.pupil_marks import PupilMarksDTO
from web_for_msu_back.app.models import Mark, Course, Schedule, Formula, PupilCourse, Pupil

if TYPE_CHECKING:
    # Импортируем сервисы только для целей аннотации типов
    from web_for_msu_back.app.services import CourseService, PupilService


class MarkService:
    def __init__(self, db, course_service: CourseService, pupil_service: PupilService):
        self.db = db
        self.course_service = course_service
        self.pupil_service = pupil_service

    def get_pupils_marks(self, course_id: int, lessons: list[Schedule], pupils: list[Pupil]) -> dict[str, list[str]]:
        marks = Mark.query.filter(Mark.course_id == course_id).order_by(Mark.pupil_id, asc(Mark.schedule_id)).all()
        marks_grouped = {}
        for key, group in itertools.groupby(marks, key=attrgetter('pupil_id')):
            marks_grouped[key] = list(group)
        for pupil in pupils:
            if pupil.id not in marks_grouped:
                marks_grouped[pupil.id] = []
        for key, group in marks_grouped.items():
            marks_grouped[key] = self.extend_pupil_marks(group, lessons)
        return marks_grouped

    def calculate_result(self, pupil_marks: list[str], mark_types: list[str], formulas: list[Formula]) -> float:
        result = 0
        types = {}
        for mark_type in mark_types:
            if mark_type not in types:
                types[mark_type] = 1
            else:
                types[mark_type] += 1
        for i in range(len(pupil_marks)):
            if mark_types[i] == 'Присутствие':
                continue
            if pupil_marks[i].isdigit():
                if mark_types[i] == 'Баллы':
                    result += float(pupil_marks[i])
                else:
                    formula = next(filter(lambda x: x.name == mark_types[i], formulas))
                    result += float(pupil_marks[i]) * formula.coefficient / types[mark_types[i]]
        return result

    def get_journal(self, course_id: int, current_user_id: int) -> (dict, int):
        course = Course.query.get(course_id)
        if not course:
            return {'error': 'Такого курса не существует'}, 404

        if current_user_id not in [assoc.teacher.user_id for assoc in course.teachers]:
            return {'error': 'У вас нет доступа к этому курсу'}, 403

        formulas = course.formulas
        choices = [formula.name for formula in formulas] + ['Присутствие']
        lessons = self.course_service.get_lessons(course_id)
        if not lessons:
            return {'error': 'Уроков пока нет'}, 404

        # Fetch all pupils and their marks at once
        pupils = self.course_service.get_pupils(course_id)
        pupil_marks = self.get_pupils_marks(course_id, lessons, pupils)
        mark_type_choices = choices
        mark_types = []
        dates = []
        for lesson in lessons:
            formula_name = lesson.formulas.name if lesson.formulas else 'Присутствие'
            mark_types.append(formula_name)
            dates.append(lesson.date.strftime('%d.%m.%Y'))

        mark_sum = [0] * len(lessons)
        mark_count = [0] * len(lessons)
        visit_count = [0] * len(lessons)
        teacher_pupil_marks = []
        for pupil in pupils:
            pupil_course_marks = pupil_marks.get(pupil.id, [])

            for i, mark in enumerate(pupil_course_marks):
                if mark.isdigit():
                    mark_sum[i] += int(mark)
                    mark_count[i] += 1
                if mark.upper() not in ["H", "Н"]:
                    visit_count[i] += 1
            teacher_pupil_marks.append({
                'id': pupil.id,
                'name': self.pupil_service.get_full_name(pupil),
                'marks': pupil_course_marks,
                'result': round(self.calculate_result(pupil_course_marks, mark_types, formulas), 2)
            })

        visits = []
        averages = []
        for i in range(len(lessons)):
            visits.append(str(visit_count[i]))
            averages.append(float(mark_sum[i]) / float(mark_count[i]) if mark_count[i] != 0 else 0)
        marks_data = {
            'dates': dates,
            'mark_types': mark_types,
            'mark_type_choices': mark_type_choices,
            'pupils': teacher_pupil_marks,
            'visits': visits,
            'averages': averages
        }
        try:
            marks_dto = MarksDTO().load(marks_data)
        except ValidationError as e:
            return e.messages, 400
        return marks_dto, 200

    def update_journal(self, course_id: int, current_user_id: int, request: flask.Request) -> (dict, int):
        course = Course.query.get(course_id)
        if not course:
            return {'error': 'Такого курса не существует'}, 404

        if current_user_id not in [assoc.teacher.user_id for assoc in course.teachers]:
            return {'error': 'У вас нет доступа к этому курсу'}, 403

        try:
            marks_dto = MarksDTO().load(request.json)
        except ValidationError as e:
            return e.messages, 400
        lessons = Schedule.query.filter_by(course_id=course_id).order_by(Schedule.date).all()
        formula_vals = Formula.query.filter_by(course_id=course_id).all()
        formulas = {formula.name: formula for formula in formula_vals}

        visit_count = [0] * len(lessons)
        mark_sum = [0] * len(lessons)
        mark_count = [0] * len(lessons)
        new_marks = []

        for i in range(len(marks_dto["dates"])):
            if marks_dto["mark_types"][i] != 'Присутствие':
                lesson = lessons[i]
                lesson.formulas = formulas[marks_dto["mark_types"][i]]

        marks = Mark.query.filter(Mark.course_id == course_id).order_by(Mark.pupil_id, asc(Mark.schedule_id)).all()
        marks_grouped = {}
        for key, group in itertools.groupby(marks, key=attrgetter('pupil_id')):
            marks_grouped[key] = {mark.schedule_id: mark for mark in group}

        for i in range(len(marks_dto["pupils"])):
            for j in range(len(marks_dto["dates"])):
                mark = marks_dto["pupils"][i]["marks"][j]
                lesson = lessons[j]
                prev_mark = marks_grouped.get(marks_dto["pupils"][i]["id"], {}).get(lesson.id)

                if mark.upper() not in ["H", "Н"]:
                    visit_count[j] += 1
                    if mark.isdigit():
                        mark_sum[j] += int(mark)
                        mark_count[j] += 1

                if prev_mark:
                    if mark:
                        prev_mark.mark = mark
                    else:
                        self.db.session.delete(prev_mark)
                elif mark:
                    new_marks.append(Mark(lesson.id, marks_dto["pupils"][i]["id"], mark, None, course_id))
            marks_dto["pupils"][i]["result"] = round(
                self.calculate_result(marks_dto["pupils"][i]["marks"], marks_dto["mark_types"], formula_vals), 2)

            pupil_marks = marks_dto["pupils"][i]["marks"]
            mark_types = marks_dto["mark_types"]
            current_mark = self.calculate_result(pupil_marks, mark_types, formula_vals)
            pupil_course = PupilCourse.query.filter_by(pupil_id=marks_dto["pupils"][i]["id"],
                                                       course_id=course_id).first()
            if pupil_course:
                pupil_course.current_mark = round(current_mark, 2)

        visits = []
        averages = []
        for i in range(len(lessons)):
            visits.append(str(visit_count[i]))
            averages.append(float(mark_sum[i]) / float(mark_count[i]) if mark_count[i] != 0 else 0)

        marks_dto["visits"] = visits
        marks_dto["averages"] = averages

        self.db.session.bulk_save_objects(new_marks)
        self.db.session.commit()
        return marks_dto, 200

    def get_pupil_marks(self, course_id: int, pupil_id: int) -> list[Mark]:
        marks = (Mark.query.filter(Mark.course_id == course_id, Mark.pupil_id == pupil_id)
                 .order_by(Mark.schedule_id).all())
        return marks

    def extend_pupil_marks(self, marks: list[Mark], lessons: list[Schedule]) -> list[str]:
        pupil_marks = marks
        pupil_marks_res = []
        for lesson in lessons:
            flag = False
            for mark in pupil_marks:
                if mark.schedule_id == lesson.id:
                    pupil_marks_res.append(mark.mark)
                    flag = True
                    break
            if not flag:
                pupil_marks_res.append('')
        return pupil_marks_res

    def get_pupil_marks_model(self, course_id: int, pupil_id: int) -> (PupilMarksDTO, int):
        course = Course.query.get(course_id)
        if not course:
            return {'error': 'Такого курса не существует'}, 404
        pupil_course = PupilCourse.query.filter_by(PupilCourse.course_id == course_id, PupilCourse.pupil_id == pupil_id)
        if not pupil_course:
            return {'error': 'Ученик не записан на этот курс'}, 404
        course_name = course.name
        formulas = course.formulas
        marks = self.get_pupil_marks(course_id, pupil_id)
        lessons = [mark.schedule for mark in marks]
        dates = [lesson.date.strftime('%d.%m.%Y') for lesson in lessons]
        mark_types = [lesson.formulas.name if lesson.formulas else 'Присутствие' for lesson in lessons]
        marks = [mark.mark for mark in marks]
        skips = sum([mark.upper() in ["H", "Н"] for mark in marks])
        result = self.calculate_result(marks, mark_types, formulas)
        data = {
            'course_name': course_name,
            'dates': dates,
            'mark_types': mark_types,
            'marks': marks,
            'skips': skips,
            'result': result
        }
        try:
            pupil_marks_dto = PupilMarksDTO().load(data)
        except ValidationError as e:
            return e.messages, 400
        return pupil_marks_dto, 200
