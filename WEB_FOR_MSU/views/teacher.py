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

teacher = Blueprint('teacher', __name__)


@teacher.route('/teacher/my_courses', methods=['GET', 'POST'])
@auth_required()
@roles_required('teacher')
def my_courses():
    user = UserInfo.get_user_info()
    courses = CourseService.get_teacher_courses(current_user.id)
    return render_template('teacher/my_courses.html',
                           title='My courses',
                           authenticated=current_user.is_authenticated,
                           user=user,
                           courses=courses, )


@teacher.route('/teacher/marks/<int:course_id>', methods=['GET', 'POST'])
@auth_required()
@roles_required('teacher')
def marks(course_id):
    marks_form = MarksForm()
    if marks_form.submit.data:
        MarkService.save_from_form(course_id, marks_form)
        flash('Оценки успешно сохранены', 'success')
        return redirect(url_for('.marks', course_id=course_id))
    user = UserInfo.get_user_info()
    MarkService.create_form(marks_form, course_id, current_user.id)
    return render_template('teacher/marks.html',
                           title='Marks',
                           authenticated=current_user.is_authenticated,
                           user=user,
                           form=marks_form, )
