from __future__ import annotations  # Поддержка строковых аннотаций

from typing import TYPE_CHECKING

from flask import request, g, jsonify
from flask_classful import FlaskView, method
from flask_jwt_extended import get_jwt_identity

from web_for_msu_back.app.functions import auth_required, roles_required, get_services, output_json

if TYPE_CHECKING:
    # Импортируем сервисы только для целей аннотации типов
    from web_for_msu_back.app.services import MarkService, CourseService, TeacherService, PupilService


class TeacherView(FlaskView):
    representations = {'application/json': output_json}

    @method("POST")
    def add_teacher(self):
        services = get_services()
        teacher_service: TeacherService = services["teacher_service"]
        response, code = teacher_service.add_teacher(request)
        return response, code

    @method("GET")
    @auth_required
    @roles_required('teacher')
    def my_courses(self):
        services = get_services()
        course_service: CourseService = services["course_service"]
        response, code = course_service.get_teacher_courses(g.current_user.id)
        return response, code

    @method("GET")
    @auth_required
    @roles_required('teacher')
    def get_journal(self, course_id: int):
        services = get_services()
        mark_service: MarkService = services["mark_service"]
        response, code = mark_service.get_journal(course_id, g.current_user.id,
                                                  "admin" in get_jwt_identity()["roles"], "first")
        return response, code

    @method("GET")
    @auth_required
    @roles_required('teacher')
    def get_journal2(self, course_id: int):
        services = get_services()
        mark_service: MarkService = services["mark_service"]
        response, code = mark_service.get_journal(course_id, g.current_user.id,
                                                  "admin" in get_jwt_identity()["roles"], "second")
        return response, code

    @method("PUT")
    @auth_required
    @roles_required('teacher')
    def update_journal(self, course_id: int):
        services = get_services()
        mark_service: MarkService = services["mark_service"]
        response, code = mark_service.update_journal(course_id, g.current_user.id, request,
                                                     "admin" in get_jwt_identity()["roles"], "first")
        return response, code

    @method("PUT")
    @auth_required
    @roles_required('teacher')
    def update_journal2(self, course_id: int):
        services = get_services()
        mark_service: MarkService = services["mark_service"]
        response, code = mark_service.update_journal(course_id, g.current_user.id, request,
                                                     "admin" in get_jwt_identity()["roles"], "second")
        return response, code

    @method("PUT")
    @auth_required
    @roles_required("teacher")
    def approve_pupils(self, course_id: int, pupil_id: int):
        services = get_services()
        course_service: CourseService = services["course_service"]
        response, code = course_service.approve_pupil_course(course_id, pupil_id)
        return jsonify(response), code

    @method("DELETE")
    @auth_required
    @roles_required("teacher")
    def delete_pupils(self, course_id: int, pupil_id: int):
        services = get_services()
        course_service: CourseService = services["course_service"]
        response, code = course_service.delete_pupil_course(course_id, pupil_id)
        return jsonify(response), code

    @method("GET")
    @auth_required
    @roles_required("teacher")
    def pupils_list(self, course_id: int):
        services = get_services()
        course_service: CourseService = services["course_service"]
        response, code = course_service.get_pupils_list(course_id)
        return jsonify(response), code

    @method("GET")
    @auth_required
    @roles_required('teacher')
    def get_account_data(self):
        services = get_services()
        teacher_service: TeacherService = services["teacher_service"]
        response, code = teacher_service.get_data_to_change(g.current_user.id)
        return jsonify(response), code

    @method("PUT")
    @auth_required
    @roles_required('teacher')
    def change_account_data(self):
        services = get_services()
        teacher_service: TeacherService = services["teacher_service"]
        response, code = teacher_service.change_account(g.current_user.id, request)
        return jsonify(response), code

    @method("GET")
    @auth_required
    @roles_required("teacher")
    def get_pupil_on_course(self):
        services = get_services()
        pupil_service: PupilService = services["pupil_service"]
        response, code = pupil_service.get_active_pupils()
        return jsonify(response), code

