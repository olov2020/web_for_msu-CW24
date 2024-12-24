from __future__ import annotations  # Поддержка строковых аннотаций

from datetime import datetime
from typing import TYPE_CHECKING

from flask import jsonify, g
from flask import request
from flask_classful import FlaskView, method, route
from flask_jwt_extended import jwt_required

from web_for_msu_back.app.functions import get_next_monday, auth_required, get_services, output_json

if TYPE_CHECKING:
    # Импортируем сервисы только для целей аннотации типов
    from web_for_msu_back.app.services import UserService, CourseService, TeacherService


class HomeView(FlaskView):
    representations = {'application/json': output_json}

    @method("GET")
    @jwt_required()
    def user_info(self):
        services = get_services()
        user_service: UserService = services["user_service"]
        response, code = user_service.get_user_info()
        return response, code

    @method("POST")
    def login(self):
        services = get_services()
        user_service: UserService = services["user_service"]
        response, code = user_service.login(request)
        return response, code

    @method("POST")
    @jwt_required(refresh=True)
    def refresh(self):
        services = get_services()
        user_service: UserService = services["user_service"]
        response, code = user_service.refresh()
        return response, code

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

    @method("GET")
    @auth_required
    def schedule(self):
        services = get_services()
        course_service: CourseService = services["course_service"]
        date_start = datetime.now().date()
        lessons_in_week, code1 = course_service.get_lessons_in_week(date_start, g.current_user.id)
        lessons_in_two_weeks, code2 = course_service.get_lessons_in_week(get_next_monday(date_start), g.current_user.id)
        return {'lessons_in_week': lessons_in_week, 'lessons_in_two_weeks': lessons_in_two_weeks}, code1

    @method("GET")
    def all_courses(self):
        services = get_services()
        course_service: CourseService = services["course_service"]
        result, code = course_service.get_all_courses()
        return jsonify(result), code

    @method("GET")
    def all_roles(self):
        services = get_services()
        user_service: UserService = services["user_service"]
        roles, code = user_service.get_all_roles()
        return jsonify(roles), code

    @method("GET")
    def all_users_with_role(self, role: str):
        services = get_services()
        user_service: UserService = services["user_service"]
        users, code = user_service.get_all_users_with_role(role)
        return jsonify(users), code

    @route("/select_courses/status/", methods=["GET"])
    def is_course_selection_opened(self):
        services = get_services()
        course_service: CourseService = services["course_service"]
        response, code = course_service.is_courses_registration_opened()
        return response, code

    @route("/events/tests/status/", methods=["GET"])
    def is_registration_opened(self):
        services = get_services()
        user_service: UserService = services["user_service"]
        response, code = user_service.is_registration_opened()
        return response, code

    @route("/events/tests/<test_type>/", methods=["GET"])
    def tests_teachers(self, test_type: str):
        test_types = ["offline", "online"]
        if test_type not in test_types:
            return {"error": "Нет такого типа теста"}, 404
        services = get_services()
        teacher_service: TeacherService = services["teacher_service"]
        teachers, code = teacher_service.get_entrance_tests_teachers(test_type)
        return jsonify(teachers), code
