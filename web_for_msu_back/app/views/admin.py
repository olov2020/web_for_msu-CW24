import flask
from flask import jsonify
from flask_classful import FlaskView, method

from web_for_msu_back.app.functions import get_services, auth_required, roles_required, output_json


class AdminView(FlaskView):
    representations = {'application/json': output_json}

    @method("GET")
    @auth_required
    @roles_required('admin')
    def add_from_file(self):
        services = get_services()
        course_service = services["course_service"]
        response, code = course_service.load_from_file(flask.request)
        return jsonify(response), code

    @method("POST")
    @auth_required
    @roles_required('admin')
    def create_course(self):
        services = get_services()
        course_service = services["course_service"]
        response, code = course_service.create_course(flask.request)
        return response, code
