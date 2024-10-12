from flask import Blueprint, request, g

from web_for_msu_back.functions import auth_required, roles_required, get_services

teacher = Blueprint('teacher', __name__)


@teacher.route('/teacher/add', methods=['POST'])
def add_teacher():
    services = get_services()
    teacher_service = services["teacher_service"]
    response, code = teacher_service.add_teacher(request)
    return response, code


@teacher.route('/teacher/my_courses', methods=['GET'])
@auth_required
@roles_required('teacher')
def my_courses():
    services = get_services()
    course_service = services["course_service"]
    response, code = course_service.get_teacher_courses(g.current_user.id)
    return response, code


@teacher.route('/teacher/marks/<int:course_id>', methods=['GET'])
@auth_required
@roles_required('teacher')
def get_journal(course_id):
    services = get_services()
    mark_service = services["mark_service"]
    response, code = mark_service.get_journal(course_id, g.current_user.id)
    return response, code


@teacher.route('/teacher/marks/<int:course_id>', methods=['PATCH'])
@auth_required
@roles_required('teacher')
def update_journal(course_id):
    services = get_services()
    mark_service = services["mark_service"]
    response, code = mark_service.update_journal(course_id, g.current_user.id, request.json)
    return response, code
