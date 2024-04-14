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

pupil = Blueprint('pupil', __name__)


@pupil.route('/pupil/my_courses', methods=['GET', 'POST'])
@auth_required()
@roles_required('pupil')
def my_courses():
    if current_user.is_teacher():
        return redirect(url_for('teacher.my_courses'))
    user = UserInfo.get_user_info()
    courses = CourseService.get_pupil_courses(current_user.id)
    return render_template('pupil/my_courses.html',
                           title='My courses',
                           authenticated=current_user.is_authenticated,
                           user=user,
                           courses=courses, )


@pupil.route('/pupil/marks/<int:course_id>', methods=['GET', 'POST'])
@auth_required()
def marks(course_id):
    if current_user.is_teacher():
        return redirect(url_for('teacher.marks', course_id=course_id))
    user = UserInfo.get_user_info()
    pupil_id = PupilService.get_pupil_id(current_user.id)
    pupil_marks = MarkService.get_pupil_marks_model(course_id, pupil_id)
    return render_template('pupil/marks.html',
                           title='Marks',
                           authenticated=current_user.is_authenticated,
                           user=user,
                           pupil_marks=pupil_marks, )
