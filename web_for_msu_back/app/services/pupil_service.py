from __future__ import annotations  # Поддержка строковых аннотаций

import json
from typing import TYPE_CHECKING  # Условный импорт для проверки типов

import flask
from marshmallow import ValidationError

from web_for_msu_back.app.dto.pupil import PupilDTO
from web_for_msu_back.app.models import Pupil, Role

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
            if pupil.former:
                continue
            if pupil.graduating:
                pupil.former = True
                role = Role.query.filter_by(name='graduated_pupil').first()
                pupil.user.roles.append(role)
                continue
            pupil.school_grade = max(pupil.school_grade + 1, 11)
            if pupil.school_grade == 11:
                pupil.graduating = True
        self.db.session.commit()
        return {"msg": "Все ученики перешли на следующий год"}, 200
