from flask import Blueprint, request, g
from flask import render_template, redirect, url_for

from web_for_msu_back.functions import auth_required, roles_required
from web_for_msu_back.output_models import *
from web_for_msu_back.services import *

pupil = Blueprint('pupil', __name__)


@pupil.route('/pupil/add', methods=['POST'])
def add_pupil():
    response, code = PupilService.add_pupil(request)
    return response, code

@pupil.route('/pupil/my_courses', methods=['GET'])
@auth_required
@roles_required('pupil')
def my_courses():
    if g.current_user.is_teacher():
        return redirect(url_for('teacher.my_courses'))
    courses = CourseService.get_pupil_courses(g.current_user.id)



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
