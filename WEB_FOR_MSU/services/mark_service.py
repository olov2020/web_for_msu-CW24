import itertools
from operator import attrgetter

from sqlalchemy import asc

from WEB_FOR_MSU import db
from WEB_FOR_MSU.models import Mark, Course, Schedule, Formula


class MarkService:
    @staticmethod
    def get_pupil_mark_by_lesson(pupil_id, lesson_id):
        assoc = Mark.query.filter_by(schedule_id=lesson_id, pupil_id=pupil_id).first()
        return assoc.mark if assoc else ""

    @staticmethod
    def calculate_result(pupil_marks, mark_types, formulas):
        result = 0
        types = {}
        for mark_type in mark_types:
            if mark_type not in types:
                types[mark_type] = 1
            else:
                types[mark_type] += 1
        for i in range(len(pupil_marks)):
            if mark_types[i] == 'Отсутствие':
                continue
            if pupil_marks[i].isdigit():
                formula = list(filter(lambda x: x.name == mark_types[i], formulas))[0]
                result += float(pupil_marks[i]) * formula.coefficient / types[mark_types[i]]
        return result

    @staticmethod
    def save_from_form(course_id, marks_form):
        lessons = Schedule.query.filter_by(course_id=course_id).order_by(Schedule.date).all()
        formula_vals = Formula.query.filter_by(course_id=course_id).all()
        formulas = {formula.name: formula for formula in formula_vals}
        for i in range(len(marks_form.dates)):
            if marks_form.mark_types[i].data != 'Отсутствие':
                lesson = lessons[i]
                lesson.formulas = formulas[marks_form.mark_types[i].data]
        marks = Mark.query.order_by(Mark.pupil_id, asc(Mark.schedule_id)).all()
        marks_grouped = {}
        for key, group in itertools.groupby(marks, key=attrgetter('pupil_id')):
            marks_grouped[str(key)] = {mark.schedule_id: mark for mark in group}
        for i in range(len(marks_form.pupils)):
            for j in range(len(marks_form.dates)):
                mark = marks_form.pupils[i].form.marks[j].data
                lesson = lessons[j]
                prev_mark = marks_grouped[marks_form.pupils[i].form.id.data][lesson.id] if (
                        marks_form.pupils[i].form.id.data in marks_grouped and lesson.id in
                        marks_grouped[marks_form.pupils[i].form.id.data]) else None
                if prev_mark:
                    if mark:
                        prev_mark.mark = mark
                    else:
                        db.session.delete(prev_mark)
                elif mark:
                    new_mark = Mark(lesson.id, marks_form.pupils[i].form.id.data, mark, None)
                    db.session.add(new_mark)
        db.session.commit()
