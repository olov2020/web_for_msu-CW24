from __future__ import annotations  # Поддержка строковых аннотаций

from typing import TYPE_CHECKING

from flask import Request
from marshmallow import ValidationError

from web_for_msu_back.app.dto.entrant import EntrantDTO

if TYPE_CHECKING:
    # Импортируем сервисы только для целей аннотации типов
    pass


class EntrantService:
    def __init__(self, db):
        self.db = db

    def add_entrant(self, request: Request) -> (dict, int):
        data = request.get_json()

        schema = EntrantDTO()
        try:
            entrant = schema.load(data)
        except ValidationError as err:
            return {"errors": err.messages}, 400
        self.db.session.add(entrant)
        self.db.session.commit()
        return {'msg': 'Регистрация успешно пройдена'}, 201
