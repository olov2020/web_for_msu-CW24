from __future__ import annotations  # Поддержка строковых аннотаций

from typing import TYPE_CHECKING

import flask
from flask import jsonify
from flask_classful import FlaskView, method

from web_for_msu_back.app.functions import get_services, auth_required, roles_required, output_json

if TYPE_CHECKING:
    # Импортируем сервисы только для целей аннотации типов
    from web_for_msu_back.app.services import CourseService, PupilService


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
