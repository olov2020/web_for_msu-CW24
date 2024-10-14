import flask
from flask import Blueprint, jsonify

from web_for_msu_back.functions import get_services, auth_required, roles_required

# from app.utils import send_mail

admin = Blueprint('admin', __name__)


@admin.route('/add_from_file', methods=['GET'], endpoint='admin_add_from_file')
@auth_required
@roles_required('admin')
def add_from_file():
    services = get_services()
    course_service = services["course_service"]
    response, code = course_service.load_from_file(flask.request)
    return jsonify(response), code


@admin.route('/create_course', methods=['POST'], endpoint='admin_create_course')
@auth_required
@roles_required('admin')
def create_course():
    services = get_services()
    course_service = services["course_service"]
    response, code = course_service.create_course(flask.request)
    return response, code
