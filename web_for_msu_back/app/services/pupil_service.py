from __future__ import annotations  # Поддержка строковых аннотаций

import json
from typing import TYPE_CHECKING  # Условный импорт для проверки типов

import flask
from flask_jwt_extended import create_access_token
from marshmallow import ValidationError

from web_for_msu_back.app.dto.pupil import PupilDTO
from web_for_msu_back.app.dto.pupil_account import PupilAccountDTO
from web_for_msu_back.app.models import Pupil, Role, User

if TYPE_CHECKING:
    # Импортируем сервисы только для целей аннотации типов
    from web_for_msu_back.app.services import UserService, ImageService


class PupilService:
    def __init__(self, db, user_service: UserService, image_service: ImageService):
        self.db = db
        self.user_service = user_service
        self.image_service = image_service

    def add_pupil(self, request: flask.Request) -> (dict, int):
        pdf = request.files.get("agreement")
        if not pdf:
            return {"error": "Не хватает соглашения"}
        result, code = self.user_service.add_pupil(request)
        if code != 201:
            return result, code
        data = json.loads(request.form.get('data'))
        data['user_id'] = result['user_id']
        pupil_dto = PupilDTO()
        try:
            pupil: Pupil = pupil_dto.load(data)
        except ValidationError as e:
            return e.messages, 400
        pupil.user_id = result['user_id']
        pupil.agreement = self.image_service.save_user_agreement(request.files['agreement'])
        pupil.graduating = pupil.school_grade == 11
        self.db.session.add(pupil)
        self.db.session.commit()
        return {'msg': 'Ученик успешно добавлен'}, 201

    def get_full_name(self, pupil: Pupil) -> str:
        return pupil.surname + ' ' + pupil.name + ' ' + pupil.patronymic

    def get_pupil_id(self, user_id: int):
        pupil = Pupil.query.filter_by(user_id=user_id).first()
        if not pupil:
            return None
        return pupil.id

    def get_pupil_by_email(self, email: str) -> Pupil:
        return Pupil.query.filter_by(email=email).first()

    def increase_grade(self) -> (dict, int):
        pupils = Pupil.query.all()
        for pupil in pupils:
            if pupil.graduated:
                continue
            if pupil.graduating:
                pupil.graduated = True
                role = Role.query.filter_by(name='retired').first()
                pupil.user.roles.append(role)
                continue
            pupil.school_grade = max(pupil.school_grade + 1, 11)
            if pupil.school_grade == 11:
                pupil.graduating = True
        self.db.session.commit()
        return {"msg": "Все ученики перешли на следующий год"}, 200

    def retire(self, pupil_id: int) -> (dict, int):
        pupil = Pupil.query.get(pupil_id)
        if not pupil:
            return {"error": "Нет такого ученика"}, 404
        if pupil.former:
            return {"error": "Ученик уже отчислен"}, 404
        if pupil.graduated:
            return {"error": "Ученик уже выпустился из школы"}, 404
        pupil.former = True
        role = Role.query.filter_by(name='retired').first()
        pupil.user.roles.append(role)
        self.db.session.commit()
        return {"msg": "Ученик отчислен"}, 200

    def recover(self, pupil_id: int) -> (dict, int):
        pupil = Pupil.query.get(pupil_id)
        if not pupil:
            return {"error": "Нет такого ученика"}, 404
        if not pupil.former:
            return {"error": "Ученик не был отчислен"}, 404
        if pupil.graduated:
            return {"error": "Ученик уже выпустился из школы"}, 404
        pupil.former = False
        role = Role.query.filter_by(name='retired').first()
        try:
            pupil.user.roles.remove(role)
        except ValueError:
            pass
        self.db.session.commit()
        return {"msg": "Ученик восстановлен"}, 200

    def change_account(self, user_id: int, request: flask.Request) -> (dict, int):
        user = User.query.get(user_id)
        if not user:
            return {"error": "Пользователь не найден"}, 404
        pupil = Pupil.query.filter(Pupil.user_id == user_id).first()
        if not pupil:
            return {"error": "Пользователь не найден"}, 404
        try:
            data = PupilAccountDTO().load(request.json)
        except ValidationError as e:
            return e.messages, 400
        if data["email"] != user.email and User.query.filter_by(email=data["email"]).first():
            return {"error": "Пользователь с такой почтой уже существует"}, 404
        user.email = pupil.email = data["email"]
        pupil.name = data["name"]
        pupil.surname = data["surname"]
        pupil.patronymic = data["lastname"]
        pupil.phone = data["phone"]
        pupil.school = data["school"]
        self.db.session.commit()
        identity = self.user_service.create_user_identity(user)
        access_token = create_access_token(identity=identity, fresh=False)
        return {"msg": "Данные изменены", "access_token": access_token}, 200

    def get_data_to_change(self, user_id: int):
        user = User.query.get(user_id)
        if not user:
            return {"error": "Пользователь не найден"}, 404
        pupil = Pupil.query.filter(Pupil.user_id == user_id).first()
        if not pupil:
            return {"error": "Пользователь не найден"}, 404
        data = {
            "name": pupil.name,
            "surname": pupil.surname,
            "lastname": pupil.patronymic,
            "email": pupil.email,
            "phone": pupil.phone,
            "school": pupil.school,
        }
        return PupilAccountDTO().dump(data), 200
