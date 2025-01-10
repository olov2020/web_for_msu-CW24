from __future__ import annotations  # Поддержка строковых аннотаций

from crypt import methods
from typing import TYPE_CHECKING

import flask
from flask import jsonify
from flask_classful import FlaskView, method, route

from web_for_msu_back.app.functions import get_services, auth_required, roles_required, output_json

if TYPE_CHECKING:
    # Импортируем сервисы только для целей аннотации типов
    from web_for_msu_back.app.services import CourseService, PupilService, UserService


class AdminView(FlaskView):
    representations = {'application/json': output_json}

    @method("GET")
    @auth_required
    @roles_required('admin')
    def add_from_file(self):
        services = get_services()
        course_service: CourseService = services["course_service"]
        response, code = course_service.load_from_file(flask.request)
        return jsonify(response), code

    @method("POST")
    @auth_required
    @roles_required('coursemaker', 'admin')
    def create_course(self):
        services = get_services()
        course_service: CourseService = services["course_service"]
        response, code = course_service.create_course(flask.request)
        return response, code

    @method("PUT")
    @auth_required
    @roles_required('coursemaker', 'admin')
    def update_course(self, course_id: int):
        services = get_services()
        course_service: CourseService = services["course_service"]
        response, code = course_service.update_course(course_id, flask.request)
        return response, code

    @method("PATCH")
    @auth_required
    @roles_required('admin')
    def increase_grade(self):
        services = get_services()
        pupil_service: PupilService = services["pupil_service"]
        response, code = pupil_service.increase_grade()
        return response, code

    @method("POST")
    @auth_required
    @roles_required('admin')
    def open_courses_registration(self):
        services = get_services()
        course_service: CourseService = services["course_service"]
        response, code = course_service.open_courses_registration()
        return response, code

    @method("POST")
    @auth_required
    @roles_required('admin')
    def close_courses_registration(self):
        services = get_services()
        course_service: CourseService = services["course_service"]
        response, code = course_service.close_courses_registration()
        return response, code

    @method("POST")
    @auth_required
    @roles_required('admin')
    def open_registration(self):
        services = get_services()
        user_service: UserService = services["user_service"]
        response, code = user_service.open_registration()
        return response, code

    @method("POST")
    @auth_required
    @roles_required('admin')
    # TODO replace with scheduled call
    def close_registration(self):
        services = get_services()
        user_service: UserService = services["user_service"]
        response, code = user_service.close_registration()
        return response, code

    @route("/list/<role>/", methods=["GET"])
    @auth_required
    @roles_required('admin')
    def pupil_admin_list(self, role: str):
        services = get_services()
        user_service: UserService = services["user_service"]
        match role:
            case "pupils":
                users, code = user_service.get_pupil_admin_list()
            case "teachers":
                users, code = user_service.get_teacher_admin_list()
            case _:
                return {"error": "Нет такого списка"}, 404
        return jsonify(users), code

    @route("/role/add/<role>/<user_id>/", methods=["POST"])
    @auth_required
    @roles_required('admin')
    def add_role(self, role: str, user_id: int):
        services = get_services()
        user_service: UserService = services["user_service"]
        roles, _ = user_service.get_all_roles()
        roles = ["course", "news", "marks", "auditory", "tests_online", "tests_offline", "knr", "vsh", "lsh"]
        if role not in roles:
            return {"error": "Нет такой роли"}, 404
        if role in ["course", "news", "marks", "auditory"]:
            role += "maker"
        response, code = user_service.add_role(user_id, role)
        return response, code

    @route("/role/delete/<role>/<user_id>/", methods=["DELETE"])
    @auth_required
    @roles_required('admin')
    def delete_role(self, role: str, user_id: int):
        roles = ["course", "news", "marks", "auditory", "tests_online", "tests_offline", "knr", "vsh", "lsh"]
        if role not in roles:
            return {"error": "Нет такой роли"}, 404
        services = get_services()
        user_service: UserService = services["user_service"]
        if role in ["course", "news", "marks", "auditory"]:
            role += "maker"
        response, code = user_service.delete_role(user_id, role)
        return response, code

    @route('/add/<role>/<user_id>/', methods=["POST"])
    @auth_required
    @roles_required('admin')
    def authorize_user(self, role: str, user_id: int):
        roles = ["pupil", "teacher"]
        if role not in roles:
            return {"error": "Нет такой роли"}, 404
        services = get_services()
        user_service: UserService = services["user_service"]
        response, code = user_service.authorize_user(user_id)
        return jsonify(response), code

    @route('/delete/<role>/<user_id>/', methods=["DELETE"])
    @auth_required
    @roles_required('admin')
    def delete_user(self, role: str, user_id: int):
        roles = ["pupil", "teacher"]
        if role not in roles:
            return {"error": "Нет такой роли"}, 404
        services = get_services()
        user_service: UserService = services["user_service"]
        response, code = user_service.delete_user(user_id, role)
        return jsonify(response), code

    @route('/retire/pupil/<pupil_id>/', methods=["POST"])
    @auth_required
    @roles_required('admin')
    def retire_pupil(self, pupil_id: int):
        services = get_services()
        pupil_service: PupilService = services["pupil_service"]
        response, code = pupil_service.retire(pupil_id)
        return jsonify(response), code

    @route('/recover/pupil/<pupil_id>/', methods=["POST"])
    @auth_required
    @roles_required('admin')
    def recover_pupil(self, pupil_id: int):
        services = get_services()
        pupil_service: PupilService = services["pupil_service"]
        response, code = pupil_service.recover(pupil_id)
        return jsonify(response), code

    @method("PUT")
    @auth_required
    @roles_required("admin", "auditorymaker")
    def auditoriums(self):
        services = get_services()
        course_service: CourseService = services["course_service"]
        response, code = course_service.change_auditoriums(flask.request)
        return jsonify(response), code

    @route("auditoriums/get/", methods=["GET"])
    @auth_required
    @roles_required("admin", "auditorymaker")
    def get_auditoriums(self):
        services = get_services()
        course_service: CourseService = services["course_service"]
        response, code = course_service.get_auditoriums()
        return jsonify(response), code

    @route("courses-ids", methods=["GET"])
    @auth_required
    @roles_required("admin", "marksmaker")
    def get_courses_ids(self):
        services = get_services()
        course_service: CourseService = services["course_service"]
        response, code = course_service.get_courses_ids()
        return jsonify(response), code
