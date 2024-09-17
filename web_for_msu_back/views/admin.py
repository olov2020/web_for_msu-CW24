from flask import Blueprint
from flask import render_template, redirect, url_for, flash
from flask_security import auth_required, roles_required

from web_for_msu_back.output_models import *
from web_for_msu_back.services import *

# from app.utils import send_mail

admin = Blueprint('admin', __name__)


@admin.route('/admin/add_course', methods=['GET', 'POST'])
@auth_required()
@roles_required('admin')
def add_course():
    file_form = CourseFileForm()
    course_form = CourseForm()
    if file_form.load_submit.data and file_form.validate():
        try:
            CourseService.load_from_file(file_form.file.data, course_form)

        except Exception as e:
            flash('Неправильный формат файла', 'error')
            return redirect(url_for('admin.add_course'))
    if course_form.submit.data and course_form.validate():
        CourseService.load_from_form(course_form)
        flash('Курс добавлен', 'success')

    user = UserInfo.get_user_info()
    return render_template('admin/add_course.html',
                           title='Add course',
                           form_file=file_form,
                           user=user,
                           form_course=course_form)
