import itertools
from operator import attrgetter

from flask import flash, redirect, url_for
from sqlalchemy import asc

from WEB_FOR_MSU import db
from WEB_FOR_MSU.models import Mark, Course, Schedule, Formula
from WEB_FOR_MSU.services import CourseService, PupilService


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
    def create_form(marks_form, course_id):
        course = Course.query.get(course_id)
        if not course:
            flash('Такого курса не существует', 'error')
            return redirect(url_for('.my_courses'))
        formulas = course.formulas
        choices = [
                      (formula.name, formula.name) for formula in formulas
                  ] + [('Отсутствие', 'Отсутствие')]
        lessons = CourseService.get_lessons(course_id)
        if not lessons:
            flash('Уроков пока нет', 'error')
            return redirect(url_for('.my_courses'))
        for lesson in lessons:
            marks_form.mark_types.append_entry()
            marks_form.dates.append_entry()
            formula_name = lesson.formulas.name if lesson.formulas else 'Отсутствие'
            marks_form.mark_types[-1].data = formula_name
            marks_form.mark_types[-1].choices = choices
            marks_form.dates[-1].data = lesson.date
        mark_sum = [0] * len(lessons)
        mark_count = [0] * len(lessons)
        visit_count = [0] * len(lessons)
        for pupil in CourseService.get_pupils(course_id):
            marks_form.pupils.append_entry()
            pupil_marks_form = marks_form.pupils[-1].form
            pupil_marks_form.id.data = pupil.id
            pupil_marks_form.name.data = PupilService.get_full_name(pupil)
            pupil_course_marks = []
            for i in range(len(lessons)):
                lesson = lessons[i]
                mark = MarkService.get_pupil_mark_by_lesson(pupil.id, lesson.id)
                pupil_course_marks.append(mark)
                pupil_marks_form.marks.append_entry()
                pupil_marks_form.marks[-1].data = mark
                if mark.isdigit():
                    mark_sum[i] += int(mark)
                    mark_count[i] += 1
                if mark.upper() != "Н":
                    visit_count[i] += 1
            pupil_marks_form.result.data = MarkService.calculate_result(pupil_course_marks, marks_form.mark_types.data,
                                                                        formulas)
        for i in range(len(lessons)):
            marks_form.visits.append_entry()
            marks_form.visits[-1].data = str(visit_count[i])
            marks_form.average.append_entry()
            marks_form.average[-1].data = float(mark_sum[i]) / float(mark_count[i]) if mark_count[i] != 0 else 0

    @staticmethod
    def save_from_form(course_id, marks_form):
        lessons = Schedule.query.filter_by(course_id=course_id).order_by(Schedule.date).all()
        formula_vals = Formula.query.filter_by(course_id=course_id).all()
        formulas = {formula.name: formula for formula in formula_vals}
        new_marks = []
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
                prev_mark = marks_grouped.get(marks_form.pupils[i].form.id.data, {}).get(lesson.id)
                if prev_mark:
                    if mark:
                        prev_mark.mark = mark
                    else:
                        db.session.delete(prev_mark)
                elif mark:
                    new_marks.append(Mark(lesson.id, marks_form.pupils[i].form.id.data, mark, None))
        db.session.bulk_save_objects(new_marks)
        db.session.commit()
