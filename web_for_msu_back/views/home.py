from __future__ import annotations  # Поддержка строковых аннотаций

from datetime import datetime
from typing import TYPE_CHECKING

from flask import Blueprint, jsonify, g
from flask import request
from flask_jwt_extended import create_access_token
from marshmallow import ValidationError

from web_for_msu_back.dto.login import LoginDTO
from web_for_msu_back.functions import get_next_monday, auth_required, get_services

# from app.utils import send_mail

if TYPE_CHECKING:
    # Импортируем сервисы только для целей аннотации типов
    from web_for_msu_back.services import UserService

main = Blueprint('home', __name__)


@main.route('/user_info', methods=['GET'])
@auth_required
def get_user_info():
    services = get_services()
    user_service = services["user_service"]
    response, code = user_service.get_user_info(g.current_user.id)
    return response, code


@main.route('/login', methods=['POST'])
def login():
    services = get_services()
    user_service: UserService = services["user_service"]

    data = request.get_json()

    schema = LoginDTO()
    try:
        validated_data = schema.load(data)
    except ValidationError as err:
        return jsonify({"errors": err.messages}), 400

    email = validated_data.get('email')
    password = validated_data.get('password')

    # Проверка пользователя и его пароля
    user = user_service.get_user_by_email(email)
    if user and user.check_password(password):
        # Создание JWT токена с ролями пользователя
        access_token = create_access_token(
            identity={'id': user.id,
                      'name': user.get_name(),
                      'surname': user.get_surname(),
                      'email': email,
                      'image': user.image,
                      'roles': user.get_roles()})
        return jsonify(access_token=access_token)

    return jsonify({"error": "Неверные данные"}), 401


# @main.route('/account', methods=['GET', 'POST'])
# @auth_required()
# def account():
# TODO: разделить логику редактирования профиля для ученика и учителя
# logout_form = LogoutForm()
# account_form = AccountForm()
# if logout_form.submit.data and logout_form.is_submitted():
#     logout_user()
#     return redirect(url_for('.home'))
# if account_form.submit_save.data and account_form.validate():
#     if not current_user.check_password(account_form.password.data):
#         flash('Неверный пароль', 'error')
#         return redirect(url_for('.account'))
#     else:
#         if account_form.email.data:
#             if account_form.email.data != current_user.email and User.query.filter_by(
#                     email=account_form.email.data).first() is not None:
#                 flash('Пользователь с такой почтой уже существует', 'error')
#                 return redirect(url_for('.account'))
#             if current_user.set_email(account_form.email.data):
#                 flash('Почта успешно изменена', 'success')
#         if account_form.image.data:
#             ImageService.change_user_image(account_form.image.data)
#             flash('Фото успешно изменено', 'success')
#         if account_form.new_password.data:
#             if current_user.set_password(account_form.new_password.data):
#                 flash('Пароль успешно изменен', 'success')
#         if account_form.name.data:
#             if current_user.set_name(account_form.name.data):
#                 flash('Имя успешно изменено', 'success')
#         if account_form.surname.data:
#             if current_user.set_surname(account_form.surname.data):
#                 flash('Фамилия успешно изменена', 'success')
#         if account_form.patronymic.data:
#             if current_user.set_patronymic(account_form.patronymic.data):
#                 flash('Отчество успешно изменено', 'success')
#         if account_form.school.data:
#             if current_user.set_school(account_form.school.data):
#                 flash('Школа успешно изменена', 'success')
#         if account_form.phone.data:
#             if current_user.set_phone(account_form.phone.data):
#                 flash('Телефон успешно изменен', 'success')
#
# user = UserInfo.get_user_info()
# return render_template('home/account.html',
#                        title='Account',
#                        user=user,
#                        form_logout=logout_form,
#                        form_account=account_form)


@main.route('/schedule', methods=['GET', 'POST'])
@auth_required
def schedule():
    services = get_services()
    course_service = services["course_service"]
    date_start = datetime.now().date()
    lessons_in_week, code1 = course_service.get_lessons_in_week(date_start, g.current_user.id)
    lessons_in_two_weeks, code2 = course_service.get_lessons_in_week(get_next_monday(date_start), g.current_user.id)
    if code1 != 200 or code2 != 200:
        return (lessons_in_week, code1) if code1 != 200 else (lessons_in_two_weeks, code2)
    return {'lessons_in_week': lessons_in_week, 'lessons_in_two_weeks': lessons_in_two_weeks}, 200


@main.route('/all_courses')
def all_courses():
    services = get_services()
    course_service = services["course_service"]
    courses = course_service.get_all_courses()
    return jsonify(courses), 200
