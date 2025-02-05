from __future__ import annotations  # Поддержка строковых аннотаций

import json
from typing import TYPE_CHECKING

import flask
from marshmallow import ValidationError
from sqlalchemy import desc

from web_for_msu_back.app.dto.news import NewsDTO
from web_for_msu_back.app.models import News

if TYPE_CHECKING:
    # Импортируем сервисы только для целей аннотации типов
    from web_for_msu_back.app.services import ImageService


class NewsService:
    def __init__(self, db, image_service: ImageService):
        self.db = db
        self.image_service = image_service

    def add_news(self, request: flask.Request) -> (dict, int):
        data = json.loads(request.form.get('data'))
        if 'photo' in request.files:
            photo = request.files['photo']
            try:
                data["photo"] = self.image_service.save_news_photo(photo)
            except Exception:
                data["photo"] = "default.jpg"
        else:
            data["photo"] = "default.jpg"
        if "file" in request.files:
            file = request.files['file']
            try:
                data["file"] = self.image_service.save_news_photo(file)
            except Exception:
                pass
        try:
            news = NewsDTO().load(data)
        except ValidationError as e:
            return e.messages, 400
        self.db.session.add(news)
        self.db.session.commit()
        return {"msg": 'Новость успешно добавлена'}, 201

    def get_news(self) -> (list[NewsDTO], int):
        news = News.query.order_by(desc(News.date), desc(News.id)).all()
        for n in news:
            n.photo = self.image_service.get_from_yandex_s3("news", n.photo)
            if n.file:
                n.file = self.image_service.get_from_yandex_s3("news", n.file)
        news = NewsDTO().dump(news, many=True)
        return news, 200

    def delete_news(self, news_id: int) -> (dict, int):
        news = News.query.get(news_id)
        if not news:
            return {"error": "Новость не найдена"}, 404
        self.db.session.delete(news)
        self.db.session.commit()
        return {"msg": "Новость удалена"}, 200
