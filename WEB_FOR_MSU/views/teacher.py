from datetime import datetime, timedelta

from flask import request, render_template, current_app, redirect, url_for, flash
from flask_login import login_required, login_user, current_user, logout_user
from flask_security import auth_required, roles_required

# from WEB_FOR_MSU.models.user import User
from WEB_FOR_MSU.models import *
from WEB_FOR_MSU.output_models.courses import Courses
from WEB_FOR_MSU.services import *
from WEB_FOR_MSU.forms import *
from WEB_FOR_MSU.output_models import *
from WEB_FOR_MSU.functions import get_next_monday
# from app.utils import send_mail

from flask import Blueprint

teacher = Blueprint('teacher', __name__)


@teacher.route('/teacher/my_courses', methods=['GET', 'POST'])
@auth_required()
@roles_required('teacher')
def my_courses():
    user = UserInfo.get_user_info()
    assocs = TeacherService.get_teacher_courses(current_user.id)
    courses = [Courses(assoc.course.id, assoc.course.name) for assoc in assocs]
    return render_template('teacher/my_courses.html',
                           title='My courses',
                           authenticated=current_user.is_authenticated,
                           user=user,
                           courses=courses, )


@teacher.route('/marks/<int:course_id>', methods=['GET', 'POST'])
@auth_required()
@roles_required('teacher')
def marks(course_id):
    marks_form = MarksForm()
    if marks_form.submit.data:
        MarkService.save_from_form(course_id, marks_form)
        flash('Оценки успешно сохранены', 'success')
        return redirect(url_for('.marks', course_id=course_id))
    user = UserInfo.get_user_info()
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
        marks_form.visits[-1].data = visit_count[i]
        marks_form.average.append_entry()
        marks_form.average[-1].data = float(mark_sum[i]) / float(mark_count[i]) if mark_count[i] != 0 else 0
    return render_template('teacher/marks.html',
                           title='Marks',
                           authenticated=current_user.is_authenticated,
                           user=user,
                           form=marks_form, )
