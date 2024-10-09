from flask import Blueprint, request, g

from web_for_msu_back.functions import auth_required, roles_required
from web_for_msu_back.models import *
from web_for_msu_back.output_models import *
from web_for_msu_back.services import *

teacher = Blueprint('teacher', __name__)


@teacher.route('/teacher/add', methods=['POST'])
def add_teacher():
    response, code = TeacherService.add_teacher(request)
    return response, code


@teacher.route('/teacher/my_courses', methods=['GET'])
@auth_required
@roles_required('teacher')
def my_courses():
    response, code = CourseService.get_teacher_courses(g.current_user.id)
    return response, code


@teacher.route('/teacher/marks/<int:course_id>', methods=['GET'])
@auth_required
@roles_required('teacher')
def get_journal(course_id):
    response, code = MarkService.get_journal(course_id, g.current_user.id)
    return response, code

@teacher.route('/teacher/marks/<int:course_id>', methods=['PATCH'])
@auth_required
@roles_required('teacher')
def update_journal(course_id):
    response, code = MarkService.update_journal(course_id, g.current_user.id, request.json)
    return response, code
