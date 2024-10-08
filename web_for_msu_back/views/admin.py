import flask
from flask import Blueprint
from flask_security import auth_required, roles_required

from web_for_msu_back.services import *

# from app.utils import send_mail

admin = Blueprint('admin', __name__)


@admin.route('/admin/add_from_file', methods=['GET'])
@auth_required
@roles_required('admin')
def add_course():
    response, code = CourseService.load_from_file(flask.request)
    return response, code


@admin.route('/admin/create_course', methods=['POST'])
@auth_required
@roles_required('admin')
def add_course():
    response, code = CourseService.create_course(flask.request)
    return response, code
