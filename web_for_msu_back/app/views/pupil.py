from __future__ import annotations  # Поддержка строковых аннотаций

from typing import TYPE_CHECKING

from flask import request, g, jsonify
from flask_classful import FlaskView, method

from web_for_msu_back.app.functions import auth_required, roles_required, get_services, output_json, roles_prohibited

if TYPE_CHECKING:
    # Импортируем сервисы только для целей аннотации типов
    from web_for_msu_back.app.services import PupilService, MarkService, CourseService


class PupilView(FlaskView):
    representations = {'application/json': output_json}

    @method("POST")
    def add_pupil(self):
        services = get_services()
        pupil_service: PupilService = services["pupil_service"]
        response, code = pupil_service.add_pupil(request)
        return jsonify(response), code

    @method("GET")
    @auth_required
    @roles_required('pupil')
    def my_courses(self):
        services = get_services()
        course_service: CourseService = services["course_service"]
        response, code = course_service.get_pupil_courses(g.current_user.id)
        return jsonify(response), code

    @method("GET")
    @auth_required
    @roles_required('pupil')
    def marks(self, course_id: int):
        services = get_services()
        mark_service: MarkService = services["mark_service"]
        pupil_service: PupilService = services["pupil_service"]
        pupil_id = pupil_service.get_pupil_id(g.current_user.id)
        response, code = mark_service.get_pupil_marks_model(course_id, pupil_id, "first")
        return jsonify(response), code

    @method("GET")
    @auth_required
    @roles_required('pupil')
    def marks2(self, course_id: int):
        services = get_services()
        mark_service: MarkService = services["mark_service"]
        pupil_service: PupilService = services["pupil_service"]
        pupil_id = pupil_service.get_pupil_id(g.current_user.id)
        response, code = mark_service.get_pupil_marks_model(course_id, pupil_id, "second")
        return jsonify(response), code

    @method("GET")
    @auth_required
    @roles_required("pupil")
    @roles_prohibited("retired")
    def available_courses(self):
        services = get_services()
        course_service: CourseService = services["course_service"]
        pupil_service: PupilService = services["pupil_service"]
        pupil_id = pupil_service.get_pupil_id(g.current_user.id)
        result, code = course_service.get_all_current_courses(pupil_id)
        return jsonify(result), code

    @method("POST")
    @auth_required
    @roles_required('pupil')
    @roles_prohibited("retired")
    def select_courses(self):
        services = get_services()
        pupil_service: PupilService = services["pupil_service"]
        course_service: CourseService = services["course_service"]
        pupil_id = pupil_service.get_pupil_id(g.current_user.id)
        response, code = course_service.add_pupil_to_courses(pupil_id, request)
        return jsonify(response), code

    @method("GET")
    @auth_required
    @roles_required('pupil')
    def get_account_data(self):
        services = get_services()
        pupil_service: PupilService = services["pupil_service"]
        response, code = pupil_service.get_data_to_change(g.current_user.id)
        return jsonify(response), code

    @method("PUT")
    @auth_required
    @roles_required('pupil')
    def change_account_data(self):
        services = get_services()
        pupil_service: PupilService = services["pupil_service"]
        response, code = pupil_service.change_account(g.current_user.id, request)
        return jsonify(response), code
