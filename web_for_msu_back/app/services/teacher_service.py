from __future__ import annotations  # Поддержка строковых аннотаций

import json
from typing import TYPE_CHECKING

import flask
from flask_jwt_extended import create_access_token
from marshmallow import ValidationError

from web_for_msu_back.app.dto.duty_teacher_info import DutyTeacherInfoDTO
from web_for_msu_back.app.dto.teacher import TeacherDTO
from web_for_msu_back.app.dto.teacher_account import TeacherAccountDTO
from web_for_msu_back.app.models import Teacher, User, user_role, Role

if TYPE_CHECKING:
    # Импортируем сервисы только для целей аннотации типов
    from web_for_msu_back.app.services import UserService, ImageService


class TeacherService:
    def __init__(self, db, user_service: UserService, image_service: ImageService):
        self.db = db
        self.user_service = user_service
        self.image_service = image_service

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
        teacher.agreement = self.image_service.save_user_agreement(request.files['agreement'])
        self.db.session.add(teacher)
        self.db.session.commit()
        return {'msg': 'Преподаватель успешно добавлен'}, 201

    def get_full_name(self, teacher):
        return teacher.surname + ' ' + teacher.name + ' ' + teacher.patronymic

    def get_teacher_by_email(self, email):
        return Teacher.query.filter_by(email=email).first()

    def get_teachers_with_role(self, role: str) -> (list[DutyTeacherInfoDTO], int):
        teachers = ((self.db.session.query(Teacher)
                     .join(User, Teacher.user_id == User.id)
                     .join(user_role, User.id == user_role.c.user_id)
                     .join(Role, Role.id == user_role.c.role_id)
                     .filter(Role.name == role))
                    .all())
        role_teachers = []
        for teacher in teachers:
            data = {
                "id": teacher.id,
                "name": self.get_full_name(teacher),
                "phone": teacher.phone
            }
            role_teachers.append(DutyTeacherInfoDTO().dump(data))
        return role_teachers, 200

    def change_account(self, user_id: int, request: flask.Request) -> (dict, int):
        user = User.query.get(user_id)
        if not user:
            return {"error": "Пользователь не найден"}, 404
        teacher = Teacher.query.filter(Teacher.user_id == user_id).first()
        if not teacher:
            return {"error": "Пользователь не найден"}, 404
        try:
            data = TeacherAccountDTO().load(request.json)
        except ValidationError as e:
            return e.messages, 400
        if data["email"] != user.email and User.query.filter_by(email=data["email"]).first():
            return {"error": "Пользователь с такой почтой уже существует"}, 404
        user.email = teacher.email = data["email"]
        teacher.phone = data["phone"]
        teacher.university = data["university"]
        teacher.workplace = data["work"]
        self.db.session.commit()
        identity = self.user_service.create_user_identity(user)
        access_token = create_access_token(identity=identity, fresh=False)
        return {"msg": "Данные изменены", "access_token": access_token}, 200

    def get_data_to_change(self, user_id: int):
        user = User.query.get(user_id)
        if not user:
            return {"error": "Пользователь не найден"}, 404
        teacher = Teacher.query.filter(Teacher.user_id == user_id).first()
        if not teacher:
            return {"error": "Пользователь не найден"}, 404
        data = {
            "email": teacher.email,
            "phone": teacher.phone,
            "university": teacher.university,
            "work": teacher.workplace,
        }
        return TeacherAccountDTO().dump(data), 200
