from __future__ import annotations  # Поддержка строковых аннотаций

from typing import TYPE_CHECKING

import flask
from marshmallow import ValidationError

from web_for_msu_back.app.dto.contest_scientific_works_dates import ContestScientificWorksDatesDTO
from web_for_msu_back.app.dto.open_championship_dates import OpenChampionshipDatesDTO
from web_for_msu_back.app.models.event_date import EventDate

if TYPE_CHECKING:
    # Импортируем сервисы только для целей аннотации типов
    pass


class EventService:
    def __init__(self, db):
        self.db = db

    def set_event_dates(self, event: str, request: flask.Request) -> (dict, int):
        match event:
            case "open-championship":
                schema = OpenChampionshipDatesDTO
            case "contest-scientific-works":
                schema = ContestScientificWorksDatesDTO
            case _:
                return {"error": "Нет такого события"}, 404
        try:
            data = schema().load(request.json)
        except ValidationError as e:
            return e.messages, 400
        for key in data.keys():
            date_name = event + " " + key
            date = data[key]

            existing_event_date = EventDate.query.filter_by(date_name=date_name).first()

            if existing_event_date:
                # Обновление записи
                existing_event_date.date = date
            else:
                # Вставка новой записи
                event_date = EventDate(date_name=date_name, date=date)
                self.db.session.add(event_date)
        self.db.session.commit()
        return {"msg": "Даты обновлены"}, 200

    def get_event_dates(self, event: str) -> (dict, int):
        match event:
            case "open-championship":
                schema = OpenChampionshipDatesDTO
            case "contest-scientific-works":
                schema = ContestScientificWorksDatesDTO
            case _:
                return {"error": "Нет такого события"}, 404
        dates = self.db.session.query(EventDate).filter(EventDate.date_name.like(f"%{event}%")).all()
        data = {date.date_name.split()[-1]: date.date for date in dates}
        return schema().dump(data), 200
