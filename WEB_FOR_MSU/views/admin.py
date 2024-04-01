from datetime import datetime, timedelta

from flask import request, render_template, current_app, redirect, url_for, flash
from flask_login import login_required, login_user, current_user, logout_user
from flask_security import auth_required, roles_required

# from WEB_FOR_MSU.models.user import User
from WEB_FOR_MSU.models import *
from WEB_FOR_MSU.services import *
from WEB_FOR_MSU.forms import *
from WEB_FOR_MSU.output_models import *
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
    if file_form.load_submit.data and file_form.validate():
        try:
            CourseService.load_from_file(file_form.file.data, course_form)

        except Exception as e:
            flash('Неправильный формат файла', 'error')
            return redirect(url_for('admin.add_course'))
    if course_form.submit.data and course_form.validate():
        CourseService.load_from_forms(course_form)
        flash('Курс добавлен', 'success')

    user = UserInfo.get_user_info()
    return render_template('admin/add_course.html',
                           title='Добавление курса',
                           form_file=file_form,
                           user=user,
                           form_course=course_form)
