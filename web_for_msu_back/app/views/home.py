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
    from web_for_msu_back.app.services import UserService, CourseService, TeacherService, EventService


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
    def refresh(self):
        services = get_services()
        user_service: UserService = services["user_service"]
        response, code = user_service.refresh(request)
        return response, code

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
    def course(self, course_id: int):
        services = get_services()
        course_service: CourseService = services["course_service"]
        result, code = course_service.get_course(course_id)
        return jsonify(result), code

    @method("GET")
    def all_roles(self):
        services = get_services()
        user_service: UserService = services["user_service"]
        roles, code = user_service.get_all_roles()
        return jsonify(roles), code

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
        test_type = "tests_" + test_type
        services = get_services()
        teacher_service: TeacherService = services["teacher_service"]
        teachers, code = teacher_service.get_teachers_with_role(test_type)
        return jsonify(teachers), code

    @route("/events/<event_type>/", methods=["GET"])
    def events_teachers(self, event_type: str):
        event_types = {
            "contest-of-scientific-works": "knr",
            "residential-school": "vsh",
            "summer-school": "lsh",
        }
        if event_type not in event_types.keys():
            return {"error": "Нет такого типа события"}, 404
        role = event_types[event_type]
        services = get_services()
        teacher_service: TeacherService = services["teacher_service"]
        teachers, code = teacher_service.get_teachers_with_role(role)
        return jsonify(teachers), code

    @method("PUT")
    @auth_required
    def change_photo(self):
        services = get_services()
        user_service: UserService = services["user_service"]
        response, code = user_service.change_photo(g.current_user.id, request)
        return jsonify(response), code

    @route("/events/get-date/<event>/", methods=["GET"])
    def get_event_dates(self, event: str):
        services = get_services()
        event_service: EventService = services["event_service"]
        response, code = event_service.get_event_dates(event)
        return jsonify(response), code

    @method("GET")
    def teachers(self):
        services = get_services()
        teacher_service: TeacherService = services["teacher_service"]
        response, code = teacher_service.get_school_info()
        return jsonify(response), code

    @method("POST")
    def change_password(self, email: str):
        services = get_services()
        user_service: UserService = services["user_service"]
        response, code = user_service.change_password(email)
        return jsonify(response), code

    @method("POST")
    def reset_password(self, token: str):
        services = get_services()
        user_service: UserService = services["user_service"]
        response, code = user_service.reset_password(request, token)
        return jsonify(response), code

    @method("GET")
    @auth_required
    def check_user_on_course(self, course_id: int):
        services = get_services()
        course_service: CourseService = services["course_service"]
        response, code = course_service.check_user_on_course(course_id, g.current_user.id)
        return jsonify(response), code
