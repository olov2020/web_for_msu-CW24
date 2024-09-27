from flask import Blueprint, request, g, jsonify

from web_for_msu_back.functions import auth_required, roles_required
from web_for_msu_back.services import *

pupil = Blueprint('pupil', __name__)


@pupil.route('/pupil/add', methods=['POST'])
def add_pupil():
    response, code = PupilService.add_pupil(request)
    return jsonify(response), code


@pupil.route('/pupil/my_courses', methods=['GET'])
@auth_required
@roles_required('pupil')
def my_courses():
    response, code = CourseService.get_pupil_courses(g.current_user.id)
    return jsonify(response), code


@pupil.route('/pupil/marks/<int:course_id>', methods=['GET'])
@auth_required
def marks(course_id):
    pupil_id = PupilService.get_pupil_id(g.current_user.id)
    response, code = MarkService.get_pupil_marks_model(course_id, pupil_id)
    return jsonify(response), code

