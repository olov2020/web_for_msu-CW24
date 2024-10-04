from flask import Blueprint, request, g

from web_for_msu_back.functions import auth_required, roles_required
from web_for_msu_back.models import *
from web_for_msu_back.output_models import *
from web_for_msu_back.services import *

teacher = Blueprint('teacher', __name__)


@teacher.route('/teacher/add', methods=['POST'])
def add_teacher():
    response, code = TeacherService.add_teacher(request)
    return response, code


@teacher.route('/teacher/my_courses', methods=['GET'])
@auth_required
@roles_required('teacher')
def my_courses():
    response, code = CourseService.get_teacher_courses(g.current_user.id)
    return response, code


@teacher.route('/teacher/marks/<int:course_id>', methods=['GET', 'POST'])
@auth_required()
@roles_required('teacher')
def marks(course_id):
    marks_form = MarksForm()
    if marks_form.submit.data:
        MarkService.save_from_form(course_id, marks_form)
        flash('Оценки успешно сохранены', 'success')
        return redirect(url_for('.marks', course_id=course_id))
    user = UserInfo.get_user_info()
    MarkService.create_form(marks_form, course_id, current_user.id)
    return render_template('teacher/marks.html',
                           title='Marks',
                           authenticated=current_user.is_authenticated,
                           user=user,
                           form=marks_form,
                           course_name=Course.query.get(course_id).name)
