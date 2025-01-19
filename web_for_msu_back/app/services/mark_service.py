from __future__ import annotations  # Поддержка строковых аннотаций

import itertools
from datetime import datetime
from operator import attrgetter
from typing import TYPE_CHECKING

import flask
import pytz
from marshmallow import ValidationError
from sqlalchemy import asc

from web_for_msu_back.app.functions import arithmetic_round
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

    def get_pupils_marks(self, course_id: int, lessons: list[Schedule], pupils: list[Pupil], formulas: list[Formula]) \
            -> dict[int, list[list[Mark]]]:
        course_marks = Mark.query.filter(Mark.course_id == course_id).order_by(Mark.pupil_id,
                                                                               asc(Mark.schedule_id)).all()
        lessons_ids_set = set(lesson.id for lesson in lessons)
        formulas = formulas
        formulas_ids = [formula.id for formula in formulas]

        marks_grouped = dict()
        for key, marks in itertools.groupby(course_marks, key=attrgetter('pupil_id')):

            pupil_marks = dict()
            for mark in marks:
                if mark.schedule_id in lessons_ids_set:
                    pupil_marks[mark.schedule_id] = pupil_marks.get(mark.schedule_id, [])
                    pupil_marks[mark.schedule_id].append(mark)
            marks_grouped[key] = pupil_marks

        for pupil in pupils:
            pupil_marks = marks_grouped.get(pupil.id, dict())
            pupil_marks = self.extend_pupil_marks(pupil.id, course_id, pupil_marks, lessons, formulas_ids)
            marks_grouped[pupil.id] = self.make_pupil_marks_list(pupil.id, course_id, pupil_marks,
                                                                 formulas_ids)
        return marks_grouped

    def make_pupil_marks_list(self, pupil_id: int, course_id: int, pupil_marks: dict[int, list[Mark]],
                              formulas_ids: list[int]):
        pupil_marks_list = []
        dates = sorted(list(pupil_marks.keys()))
        for date in dates:
            pupil_marks[date].sort(key=lambda mark: formulas_ids.index(mark.formula_id))
            i = j = 0
            marks_list = []
            while i < len(formulas_ids) and j < len(formulas_ids):
                if j < len(pupil_marks[date]) and formulas_ids[i] == pupil_marks[date][j].formula_id:
                    marks_list.append(pupil_marks[date][j])
                    i += 1
                    j += 1
                elif j >= len(pupil_marks[date]) or formulas_ids[i] < pupil_marks[date][j].formula_id:
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
                if not mark.mark:
                    continue
                types[mark.formula_id] = types.get(mark.formula_id, 0) + 1
                sums[mark.formula_id] = sums.get(mark.formula_id, 0) + float(mark.mark)
        for formula_id in types.keys():
            formula = Formula.query.get(formula_id)
            if formula.mark_type == "Баллы":
                result += sums[formula_id]
            else:
                result += sums[formula_id] * formula.coefficient / types[formula_id]
        return result

    def get_journal(self, course_id: int, current_user_id: int, is_admin: bool, part: str) -> (dict, int):
        course = Course.query.get(course_id)
        if not course:
            return {'error': 'Такого курса не существует'}, 404

        if not (is_admin or current_user_id in [assoc.teacher.user_id for assoc in course.teachers]):
            return {'error': 'У вас нет доступа к этому курсу'}, 403

        lessons, part = self.get_lessons_by_part(course, course_id, part)

        if not lessons:
            return {'error': 'Уроков пока нет'}, 404

        return self.get_journal_part(course, course_id, lessons, part)

    def get_journal_part(self, course: Course, course_id: int, lessons: list[Schedule], part: str) -> (dict, int):
        formulas = course.formulas
        choices = [formula.name for formula in formulas]

        # Fetch all pupils and their marks at once
        pupils = self.course_service.get_pupils(course_id)
        pupil_marks = self.get_pupils_marks(course_id, lessons, pupils, formulas)
        mark_type_choices = choices
        mark_types = []
        dates = []
        for lesson in lessons:
            dates.append(lesson.date.strftime('%d.%m.%Y'))

        teacher_pupil_marks = []
        for pupil in pupils:
            pupil_course_marks = pupil_marks.get(pupil.id, [])
            pupil_course = PupilCourse.query.filter_by(pupil_id=pupil.id, course_id=course_id).first()
            teacher_pupil_marks.append({
                'id': pupil.id,
                'name': self.pupil_service.get_full_name(pupil),
                'marks': [[mark.mark for mark in lesson] for lesson in pupil_course_marks],
                'result': arithmetic_round(self.calculate_result(pupil_course_marks), 2),
                'teacher_result': pupil_course.term1_mark if part == "first" else pupil_course.term2_mark
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
            marks_dto = MarksDTO().dump(marks_data)
        except ValidationError as e:
            return e.messages, 400
        return marks_dto, 200

    def get_term_by_requested_journal_part(self, course: Course, part: str) -> str:
        year = datetime.now(tz=pytz.timezone('Europe/Moscow')).year
        date = datetime.now(tz=pytz.timezone('Europe/Moscow'))
        start_of_year = datetime(year, 1, 1, tzinfo=pytz.timezone("Europe/Moscow"))
        term1_start = datetime(year, 9, 1, tzinfo=pytz.timezone("Europe/Moscow"))
        term1_end = datetime(year, 1, 25, tzinfo=pytz.timezone("Europe/Moscow"))
        term2_start = datetime(year, 1, 10, tzinfo=pytz.timezone("Europe/Moscow"))
        term2_end = datetime(year, 5, 20, tzinfo=pytz.timezone("Europe/Moscow"))
        # part here - the number of the called api
        if part == "first":
            if (year == course.year and date >= term1_start
                    or ((year - 1) == course.year
                        and start_of_year <= date <= term1_end)):
                part = "first"
            elif (year - 1) == course.year and term1_end < date <= term2_end:
                part = "second"
            else:
                return ""
        elif part == "second":
            if (year - 1) == course.year and term2_start <= date <= term1_end:
                part = "second"
            else:
                return ""
        return part

    def get_lessons_by_part(self, course, course_id, part):
        part = self.get_term_by_requested_journal_part(course, part)
        # part here - the number of the term
        match part:
            case "first":
                lessons = self.course_service.get_lessons_first_part(course_id)
            case "second":
                lessons = self.course_service.get_lessons_second_part(course_id)
            case _:
                lessons = []
        return lessons, part

    def update_journal(self, course_id: int, current_user_id: int, request: flask.Request, is_admin: bool,
                       part: str) -> (dict, int):
        course = Course.query.get(course_id)
        if not course:
            return {'error': 'Такого курса не существует'}, 404

        if not (is_admin or current_user_id in [assoc.teacher.user_id for assoc in course.teachers]):
            return {'error': 'У вас нет доступа к этому курсу'}, 403

        lessons, part = self.get_lessons_by_part(course, course_id, part)

        if not lessons:
            return {'error': 'Уроков пока нет'}, 404

        return self.update_journal_part(course_id, course, request, lessons)

    def update_journal_part(self, course_id: int, course: Course, request: flask.Request, lessons: list[Schedule]) -> (
            dict, int):
        lessons_dict = {lesson.date.isoformat(): lesson for lesson in lessons}
        formulas = course.formulas
        data = request.json
        for key in data:
            if "visits" in key:
                date = key.split()[-1]
                try:
                    date = '-'.join(date.split('.')[::-1])
                except Exception:
                    continue
                visits = data[key]
                if date not in lessons_dict:
                    continue
                lessons_dict[date].visits = visits
            else:
                pupil_id, date, name = key.split(maxsplit=2)
                if not pupil_id.isdigit():
                    continue
                pupil_id = int(pupil_id)
                mark = data[key]
                try:
                    date = '-'.join(date.split('.')[::-1])
                except Exception:
                    continue
                if date not in lessons_dict:
                    continue
                formula_id = 0
                for formula in formulas:
                    if formula.name == name:
                        formula_id = formula.id
                        break
                if formula_id == 0:
                    continue
                mark_objects = lessons_dict[date].marks
                flag = True
                for mark_object in mark_objects:
                    if mark_object.pupil_id == pupil_id and mark_object.formula_id == formula_id:
                        mark_object.mark = mark
                        flag = False
                        break
                if flag:
                    lessons_dict[date].marks.append(
                        Mark(lessons_dict[date].id, pupil_id, mark, "", course_id, formula_id))
        self.db.session.commit()
        return {"msg": "Оценки сохранены"}, 200

    def get_pupil_marks(self, course_id: int, pupil_id: int, lessons: list[Schedule]) \
            -> (list[list[Mark]], list[str]):
        marks = (Mark.query.filter(Mark.course_id == course_id, Mark.pupil_id == pupil_id, Mark.mark != "")
                 .order_by(Mark.schedule_id).all())
        formulas = Formula.query.filter(Formula.course_id == course_id).order_by(Formula.id).all()
        formulas_ids = [formula.id for formula in formulas]
        pupil_marks = {}
        marked_lessons = set()
        lessons_id = set([lesson.id for lesson in lessons])
        for mark in marks:
            if mark.schedule_id not in lessons_id:
                continue
            pupil_marks[mark.schedule_id] = pupil_marks.get(mark.schedule_id, [])
            pupil_marks[mark.schedule_id].append(mark)
            marked_lessons.add(mark.schedule_id)
        sorted_marked_dates = []
        for lesson in lessons:
            if lesson.id in marked_lessons:
                sorted_marked_dates.append(lesson.date.strftime("%d.%m.%Y"))
        return self.make_pupil_marks_list(pupil_id, course_id, pupil_marks, formulas_ids), sorted_marked_dates

    def extend_pupil_marks(self, pupil_id: int, course_id: int, pupil_marks: dict[int, list[Mark]],
                           lessons: list[Schedule],
                           formulas_ids: list[int]) -> dict[int, list[Mark]]:
        for lesson in lessons:
            if lesson.id not in pupil_marks:
                pupil_marks[lesson.id] = [Mark(lesson.id, pupil_id, "", "", course_id, formulas_ids[i]) for i in
                                          range(len(formulas_ids))]
        return pupil_marks

    def get_pupil_marks_model(self, course_id: int, pupil_id: int, part: str) -> (PupilMarksDTO, int):
        course = Course.query.get(course_id)
        if not course:
            return {'error': 'Такого курса не существует'}, 404
        pupil_course = PupilCourse.query.filter(PupilCourse.course_id == course_id,
                                                PupilCourse.pupil_id == pupil_id).first()
        if not pupil_course:
            return {'error': 'Ученик не записан на этот курс'}, 404
        lessons, part = self.get_lessons_by_part(course, course_id, part)
        if not lessons:
            return {'error': 'Уроков пока нет'}, 404
        formulas = course.formulas
        marks, dates = self.get_pupil_marks(course_id, pupil_id, lessons)
        mark_type_choices = [formula.name for formula in sorted(formulas, key=lambda x: x.id)]
        result = arithmetic_round(self.calculate_result(marks), 2)
        marks = [[mark.mark for mark in lesson_mark] for lesson_mark in marks]
        data = {
            'dates': dates,
            'mark_type_choices': mark_type_choices,
            'marks': marks,
            'result': result,
            'teacher_result': pupil_course.term1_mark if part == "first" else pupil_course.term2_mark
        }
        try:
            pupil_marks_dto = PupilMarksDTO().load(data)
        except ValidationError as e:
            return e.messages, 400
        return pupil_marks_dto, 200

    def finish_term(self, term):
        if term not in ["first", "second"]:
            print("Ошибка запроса во время завершения семестра")
            return {"error": "Ошибка запроса во время завершения семестра"}, 404
        print("Семестр завершен")
        if term == "first":
            finished = False
        elif term == "second":
            finished = True
        else:
            return
        pupil_courses = PupilCourse.query.filter(~PupilCourse.finished).all()
        for pupil_course in pupil_courses:
            if finished:
                mark1 = pupil_course.term1_mark
                mark2 = pupil_course.term2_mark
                if mark1.isdigit() and mark2.isdigit():
                    mark1, mark2 = int(mark1), int(mark2)
                    result = arithmetic_round((mark1 + mark2) / 2)
                elif "Незачет" in [mark1, mark2]:
                    result = "Незачет"
                elif mark1 == "Зачет" and mark2 == "Зачет":
                    result = "Зачет"
                else:
                    result = ""
                pupil_course.current_mark = result
            pupil_course.finished = finished
        self.db.session.commit()
        return {"msg": "Семестр завершен"}, 200

    def update_results(self, course_id: int, current_user_id: int, request: flask.Request, part: str) -> (dict, int):
        course = Course.query.get(course_id)
        if not course:
            return {'error': 'Такого курса не существует'}, 404

        if not (current_user_id in [assoc.teacher.user_id for assoc in course.teachers]):
            return {'error': 'У вас нет доступа к этому курсу'}, 403

        part = self.get_term_by_requested_journal_part(course, part)

        return self.set_term_mark(course_id, request, part)

    def set_term_mark(self, course_id: int, request: flask.Request, part: str) -> (dict, int):
        data = request.json
        for key in data:
            try:
                pupil_id = int(key.split()[-1])
            except Exception:
                continue
            mark = data[key]
            pupil_course = PupilCourse.query.filter_by(course_id=course_id, pupil_id=pupil_id).first()
            match part:
                case "first":
                    pupil_course.term1_mark = mark
                case "second":
                    pupil_course.term2_mark = mark
                case _:
                    pass
        self.db.session.commit()
        return {"msg": "Оценки успешно сохранены"}, 200
