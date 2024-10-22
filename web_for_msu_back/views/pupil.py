from __future__ import annotations  # Поддержка строковых аннотаций

from typing import TYPE_CHECKING

from flask import request, g, jsonify
from flask_classful import FlaskView, method

from web_for_msu_back.functions import auth_required, roles_required, get_services, output_json

if TYPE_CHECKING:
    # Импортируем сервисы только для целей аннотации типов
    from web_for_msu_back.services import PupilService


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
        course_service = services["course_service"]
        response, code = course_service.get_pupil_courses(g.current_user.id)
        return jsonify(response), code

    @method("GET")
    @auth_required
    def marks(self, course_id: int):
        services = get_services()
        mark_service = services["mark_service"]
        pupil_service = services["pupil_service"]
        pupil_id = pupil_service.get_pupil_id(g.current_user.id)
        response, code = mark_service.get_pupil_marks_model(course_id, pupil_id)
        return jsonify(response), code