from __future__ import annotations  # Поддержка строковых аннотаций

import itertools
from datetime import datetime
from operator import attrgetter
from typing import TYPE_CHECKING

import flask
import pytz
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

    def get_pupils_marks(self, course_id: int, lessons: list[Schedule], pupils: list[Pupil]) \
            -> dict[int, list[list[str]]]:
        course_marks = Mark.query.filter(Mark.course_id == course_id).order_by(Mark.pupil_id,
                                                                               asc(Mark.schedule_id)).all()
        lessons_ids = [lesson.id for lesson in lessons]
        lessons_ids_set = set(lesson.id for lesson in lessons)
        formulas = Formula.query.filter(Formula.course_id == course_id).order_by(Formula.id).all()
        formulas_ids = [formula.id for formula in formulas]
        marks_grouped = dict()
        for key, marks in itertools.groupby(course_marks, key=attrgetter('pupil_id')):

            pupil_marks = dict()
            for mark in marks:
                if mark.schedule_id in lessons_ids_set:
                    pupil_marks[mark.schedule_id] = pupil_marks.get(mark.schedule_id, []).append(mark)
            marks_grouped[key] = pupil_marks

            # marks_grouped[key] = [mark for mark in marks if mark.schedule_id in lessons_ids]
        for pupil in pupils:
            pupil_marks = marks_grouped.get(pupil.id, dict())
            pupil_marks = self.extend_pupil_marks(pupil.id, course_id, pupil_marks, lessons, formulas_ids)
            marks_grouped[pupil.id] = self.make_pupil_marks_list(pupil.id, course_id, pupil_marks, lessons_ids,
                                                                 formulas_ids)
        return marks_grouped

    def make_pupil_marks_list(self, pupil_id: int, course_id: int, pupil_marks: dict[int, list[Mark]],
                              lessons_ids: list[int], formulas_ids: list[int]):
        pupil_marks_list = []
        dates = sorted(list(pupil_marks.keys()), key=lambda mark: lessons_ids.index(mark.schedule_id))
        for date in dates:
            pupil_marks[date].sort(key=lambda mark: formulas_ids.index(mark.formula_id))
            i = j = 0
            marks_list = []
            while i < len(formulas_ids) and j < len(formulas_ids):
                if formulas_ids[i] == pupil_marks[date][j].formula_id:
                    marks_list.append(pupil_marks[date][j])
                    i += 1
                    j += 1
                elif formulas_ids[i] < pupil_marks_list[date][j].formula_id:
                    marks_list.append(Mark(date, pupil_id, "", "", course_id, formulas_ids[i]))
                    i += 1
            pupil_marks_list.append(marks_list)
        return pupil_marks_list

    def calculate_result(self, pupil_marks: list[list[Mark]]) -> float:
        result = 0
        types = dict()
        sums = dict()
        for lesson_marks in pupil_marks:
            for mark in lesson_marks:
                types[mark.formula_id] = types.get(mark.formula_id, 0) + 1
                sums[mark.formula_id] = sums.get(mark.formula_id, 0) + float(mark.mark)
        for formula_id in types.keys():
            formula = Formula.query.get(formula_id)
            if formula.mark_type == "Баллы":
                result += sums[formula_id]
            else:
                result += sums[formula_id] * formula.coefficient / types[formula_id]
        return result

    def get_current_journal(self, course_id: int, current_user_id: int, is_admin: bool, part: str) -> (dict, int):
        course = Course.query.get(course_id)
        if not course:
            return {'error': 'Такого курса не существует'}, 404

        if not (is_admin or current_user_id in [assoc.teacher.user_id for assoc in course.teachers]):
            return {'error': 'У вас нет доступа к этому курсу'}, 403

        lessons = self.get_lessons_by_part(course, course_id, part)

        return self.get_journal_part(course, course_id, lessons)

    def get_journal_part(self, course: Course, course_id: int, lessons: list[Schedule]) -> (dict, int):
        if not lessons:
            return {'error': 'Уроков пока нет'}, 404
        formulas = course.formulas
        choices = [formula.name for formula in formulas]

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

        teacher_pupil_marks = []
        for pupil in pupils:
            pupil_course_marks = pupil_marks.get(pupil.id, [])
            teacher_pupil_marks.append({
                'id': pupil.id,
                'name': self.pupil_service.get_full_name(pupil),
                'marks': pupil_course_marks,
                'result': round(self.calculate_result(pupil_course_marks), 2)
            })

        visits = [lesson.visits for lesson in lessons]
        marks_data = {
            'dates': dates,
            'mark_types': mark_types,
            'mark_type_choices': mark_type_choices,
            'pupils': teacher_pupil_marks,
            'visits': visits,
        }
        try:
            marks_dto = MarksDTO().load(marks_data)
        except ValidationError as e:
            return e.messages, 400
        return marks_dto, 200

    def get_lessons_by_part(self, course, course_id, part):
        if part == "current":
            year = datetime.now(tz=pytz.timezone('Europe/Moscow')).year
            if year == course.year:
                part = "first"
            else:
                part = "second"

        match part:
            case "first":
                lessons = self.course_service.get_lessons_first_part(course_id)
            case "second":
                lessons = self.course_service.get_lessons_second_part(course_id)
            case _:
                lessons = self.course_service.get_lessons(course_id)
        return lessons

    def update_current_journal(self, course_id: int, current_user_id: int, request: flask.Request, is_admin: bool,
                               part: str) -> (dict, int):
        course = Course.query.get(course_id)
        if not course:
            return {'error': 'Такого курса не существует'}, 404

        if not (is_admin or current_user_id in [assoc.teacher.user_id for assoc in course.teachers]):
            return {'error': 'У вас нет доступа к этому курсу'}, 403

        lessons = self.get_lessons_by_part(course, course_id, part)

        return self.update_journal_part(course_id, request, lessons)

    def update_journal_part(self, course_id: int, request: flask.Request, lessons) -> (dict, int):

        try:
            marks_dto = MarksDTO().load(request.json)
        except ValidationError as e:
            return e.messages, 400
        lessons_ids = set(lesson.id for lesson in lessons)
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
            marks_grouped[key] = {mark.schedule_id: mark for mark in group if mark.schedule_id in lessons_ids}

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

    def get_pupil_marks(self, course_id: int, pupil_id: int, lessons: list[Schedule]) -> list[list[Mark]]:
        marks = (Mark.query.filter(Mark.course_id == course_id, Mark.pupil_id == pupil_id)
                 .order_by(Mark.schedule_id).all())
        formulas = Formula.query.filter(Formula.course_id == course_id).order_by(Formula.id).all()
        formulas_ids = [formula.id for formula in formulas]
        lessons_ids = [lesson.id for lesson in lessons]
        pupil_marks = {}
        for mark in marks:
            pupil_marks[mark.schedule_id] = pupil_marks.get(mark.schedule_id, []).append(mark)
        return self.make_pupil_marks_list(pupil_id, course_id, pupil_marks, lessons_ids, formulas_ids)

    def extend_pupil_marks(self, pupil_id: int, course_id: int, pupil_marks: dict[int, list[Mark]],
                           lessons: list[Schedule],
                           formulas_ids: list[int]) -> dict[int, list[Mark]]:
        for lesson in lessons:
            if lesson.id not in pupil_marks:
                pupil_marks[lesson.id] = [Mark(lesson.id, pupil_id, "", "", course_id, formulas_ids[i]) for i in
                                          range(len(formulas_ids))]
        return pupil_marks

    def get_pupil_marks_model(self, course_id: int, pupil_id: int) -> (PupilMarksDTO, int):
        course = Course.query.get(course_id)
        if not course:
            return {'error': 'Такого курса не существует'}, 404
        pupil_course = PupilCourse.query.filter(PupilCourse.course_id == course_id,
                                                PupilCourse.pupil_id == pupil_id).first()
        if not pupil_course:
            return {'error': 'Ученик не записан на этот курс'}, 404
        formulas = course.formulas
        lessons = self.get_lessons_by_part(course, course_id, "current")
        marks = self.get_pupil_marks(course_id, pupil_id, lessons)
        lessons = [lesson_marks[0].schedule for lesson_marks in marks]
        dates = [lesson.date.strftime('%d.%m.%Y') for lesson in lessons]
        mark_type_choices = [formula.name for formula in sorted(formulas, key=lambda x: x.id)]
        result = self.calculate_result(marks)
        marks = [[mark.mark for mark in lesson_mark] for lesson_mark in marks]
        data = {
            'dates': dates,
            'mark_type_choices': mark_type_choices,
            'marks': marks,
            'result': result,
        }
        try:
            pupil_marks_dto = PupilMarksDTO().load(data)
        except ValidationError as e:
            return e.messages, 400
        return pupil_marks_dto, 200
