from __future__ import annotations  # Поддержка строковых аннотаций

import json
from typing import TYPE_CHECKING

import flask
from marshmallow import ValidationError

from web_for_msu_back.app.dto.teacher import TeacherDTO
from web_for_msu_back.app.dto.test_teacher_info import TestTeacherInfoDTO
from web_for_msu_back.app.models import Teacher, User, user_role, Role

if TYPE_CHECKING:
    # Импортируем сервисы только для целей аннотации типов
    from web_for_msu_back.app.services import UserService


class TeacherService:
    def __init__(self, db, user_service: UserService):
        self.db = db
        self.user_service = user_service

    def add_teacher(self, request: flask.Request):
        result, code = self.user_service.add_teacher(request)
        if code != 201:
            return result, code
        data = json.loads(request.form.get('data'))
        data['user_id'] = result['user_id']
        teacher_dto = TeacherDTO()
        try:
            teacher = teacher_dto.load(data)
        except ValidationError as e:
            return e.messages, 400
        teacher.user_id = result['user_id']
        self.db.session.add(teacher)
        self.db.session.commit()
        return {'msg': 'Преподаватель успешно добавлен'}, 201

    def get_full_name(self, teacher):
        return teacher.surname + ' ' + teacher.name + ' ' + teacher.patronymic

    def get_teacher_by_email(self, email):
        return Teacher.query.filter_by(email=email).first()

    def get_entrance_tests_teachers(self, test_type: str) -> (list[TestTeacherInfoDTO], int):
        teachers = ((self.db.session.query(Teacher)
                     .join(User, Teacher.user_id == User.id)
                     .join(user_role, User.id == user_role.c.user_id)
                     .join(Role, Role.id == user_role.c.role_id)
                     .filter(Role.name == test_type))
                    .all())
        test_teachers = []
        for teacher in teachers:
            data = {
                "id": teacher.id,
                "name": self.get_full_name(teacher),
                "phone": teacher.phone
            }
            test_teachers.append(TestTeacherInfoDTO().dump(data))
        return test_teachers, 200
