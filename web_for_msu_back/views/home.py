from datetime import datetime

from flask import Blueprint, jsonify, g
from flask import request, url_for, flash
from flask_jwt_extended import create_access_token
from marshmallow import ValidationError

from web_for_msu_back.dto.login import LoginDTO
from web_for_msu_back.functions import get_next_monday, auth_required
from web_for_msu_back.models import *
from web_for_msu_back.output_models import *
from web_for_msu_back.services import *

# from app.utils import send_mail

main = Blueprint('home', __name__)


@main.route('/user_info', methods=['GET'])
@auth_required
def get_user_info():
    response, code = UserService.get_user_info(g.current_user.id)
    return response, code


@main.route('/login', methods=['POST'])
def login():
    data = request.get_json()

    schema = LoginDTO()
    try:
        validated_data = schema.load(data)
    except ValidationError as err:
        return jsonify({"errors": err.messages}), 400

    email = validated_data.get('email')
    password = validated_data.get('password')

    # Проверка пользователя и его пароля
    user = UserService.get_user_by_email(email)
    if user and user['password'] == password:
        # Создание JWT токена с ролями пользователя
        access_token = create_access_token(
            identity={'id': user.id, 'name': user.name, 'surname': user.surname, 'email': email, 'image': user.image,
                      'roles': user['roles']})
        return jsonify(access_token=access_token)

    return jsonify({"msg": "Неверные данные"}), 401


@main.route('/account', methods=['GET', 'POST'])
@auth_required()
def account():
    # TODO: разделить логику редактирования профиля для ученика и учителя
    logout_form = LogoutForm()
    account_form = AccountForm()
    if logout_form.submit.data and logout_form.is_submitted():
        logout_user()
        return redirect(url_for('.home'))
    if account_form.submit_save.data and account_form.validate():
        if not current_user.check_password(account_form.password.data):
            flash('Неверный пароль', 'error')
            return redirect(url_for('.account'))
        else:
            if account_form.email.data:
                if account_form.email.data != current_user.email and User.query.filter_by(
                        email=account_form.email.data).first() is not None:
                    flash('Пользователь с такой почтой уже существует', 'error')
                    return redirect(url_for('.account'))
                if current_user.set_email(account_form.email.data):
                    flash('Почта успешно изменена', 'success')
            if account_form.image.data:
                ImageService.change_user_image(account_form.image.data)
                flash('Фото успешно изменено', 'success')
            if account_form.new_password.data:
                if current_user.set_password(account_form.new_password.data):
                    flash('Пароль успешно изменен', 'success')
            if account_form.name.data:
                if current_user.set_name(account_form.name.data):
                    flash('Имя успешно изменено', 'success')
            if account_form.surname.data:
                if current_user.set_surname(account_form.surname.data):
                    flash('Фамилия успешно изменена', 'success')
            if account_form.patronymic.data:
                if current_user.set_patronymic(account_form.patronymic.data):
                    flash('Отчество успешно изменено', 'success')
            if account_form.school.data:
                if current_user.set_school(account_form.school.data):
                    flash('Школа успешно изменена', 'success')
            if account_form.phone.data:
                if current_user.set_phone(account_form.phone.data):
                    flash('Телефон успешно изменен', 'success')

    user = UserInfo.get_user_info()
    return render_template('home/account.html',
                           title='Account',
                           user=user,
                           form_logout=logout_form,
                           form_account=account_form)


@main.route('/schedule', methods=['GET', 'POST'])
@auth_required
def schedule():
    date_start = datetime.now().date()
    lessons_in_week, code1 = CourseService.get_lessons_in_week(date_start, g.current_user.id)
    lessons_in_two_weeks, code2 = CourseService.get_lessons_in_week(get_next_monday(date_start), g.current_user.id)
    if code1 != 200 or code2 != 200:
        return (lessons_in_week, code1) if code1 != 200 else (lessons_in_two_weeks, code2)
    return {'lessons_in_week': lessons_in_week, 'lessons_in_two_weeks': lessons_in_two_weeks}, 200


@main.route('/all_courses')
def all_courses():
    courses = CourseService.get_all_courses()
    return jsonify(courses), 200
