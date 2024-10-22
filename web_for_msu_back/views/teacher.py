from flask import request, g
from flask_classful import FlaskView, method

from web_for_msu_back.functions import auth_required, roles_required, get_services, output_json


class TeacherView(FlaskView):
    representations = {'application/json': output_json}

    @method("POST")
    def add_teacher(self):
        services = get_services()
        teacher_service = services["teacher_service"]
        response, code = teacher_service.add_teacher(request)
        return response, code

    @method("GET")
    @auth_required
    @roles_required('teacher')
    def my_courses(self):
        services = get_services()
        course_service = services["course_service"]
        response, code = course_service.get_teacher_courses(g.current_user.id)
        return response, code

    @method("GET")
    @auth_required
    @roles_required('teacher')
    def get_journal(self, course_id: int):
        services = get_services()
        mark_service = services["mark_service"]
        response, code = mark_service.get_journal(course_id, g.current_user.id)
        return response, code

    @method("PUT")
    @auth_required
    @roles_required('teacher')
    def update_journal(self, course_id: int):
        services = get_services()
        mark_service = services["mark_service"]
        response, code = mark_service.update_journal(course_id, g.current_user.id, request)
        return response, code
