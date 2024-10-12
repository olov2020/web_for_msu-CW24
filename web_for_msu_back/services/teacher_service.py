from __future__ import annotations  # Поддержка строковых аннотаций

from typing import TYPE_CHECKING

import flask
from marshmallow import ValidationError

from web_for_msu_back.dto.teacher import TeacherDTO
from web_for_msu_back.models import Teacher

if TYPE_CHECKING:
    # Импортируем сервисы только для целей аннотации типов
    from web_for_msu_back.services import UserService


class TeacherService:
    def __init__(self, db, user_service: UserService):
        self.db = db
        self.user_service = user_service

    def add_teacher(self, request: flask.Request):
        # TODO fix this. Copy from add_pupil
        result, code = self.user_service.add_teacher(request)
        if code != 201:
            return result, code
        teacher_dto = TeacherDTO()
        try:
            teacher = teacher_dto.load(request.json)
        except ValidationError as e:
            return e.messages, 400
        teacher.user_id = result['user_id']
        self.db.session.add(teacher)
        self.db.session.commit()
        return {'success': 'Преподаватель успешно добавлен'}, 201

    def get_full_name(self, teacher):
        return teacher.surname + ' ' + teacher.name + ' ' + teacher.patronymic

    def get_teacher_by_email(self, email):
        return Teacher.query.filter_by(email=email).first()
