from datetime import datetime, timedelta

from flask import request, render_template, current_app, redirect, url_for, flash
from flask_login import login_required, login_user, current_user, logout_user
from flask_security import auth_required, roles_required

# from WEB_FOR_MSU.models.user import User
from WEB_FOR_MSU.models import *
from WEB_FOR_MSU.services import *
from WEB_FOR_MSU.forms import *
from WEB_FOR_MSU.functions import get_next_monday
# from app.utils import send_mail

from flask import Blueprint

admin = Blueprint('admin', __name__)


@admin.route('/admin/add_course', methods=['GET', 'POST'])
@auth_required()
@roles_required('admin')
def add_course():
    file_form = CourseFileForm()
    course_form = CourseForm()
    teachers = Teacher.query.all()
    teacher_course_forms = []
    for teacher in teachers:
        teacher_course_form = TeacherCourseForm()
        teacher_course_form.id.data = teacher.id
        teacher_course_form.name.label = TeacherService.get_full_name(teacher)
        teacher_course_forms.append(teacher_course_form)

    if file_form.load_submit.data and file_form.validate():
        try:
            CourseService.load_from_file(file_form.file.data, course_form, teacher_course_forms)

        except Exception as e:
            flash('Неправильный формат файла')
            return redirect(url_for('admin.add_course'))
    if course_form.submit.data and course_form.validate():
        d = request.form
        print(request.form)
        flag = all(form.validate() for form in teacher_course_forms) and all(form.validate() for form in course_form.schedules)
        if flag:
            CourseService.load_from_forms(course_form, teacher_course_forms)
    return render_template('admin/add_course.html',
                           title='Добавление курса',
                           form_file=file_form,
                           form_course=course_form,
                           teachers=teacher_course_forms)
