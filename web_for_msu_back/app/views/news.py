from __future__ import annotations  # Поддержка строковых аннотаций

from typing import TYPE_CHECKING

import flask
from flask import jsonify
from flask_classful import FlaskView, method

from web_for_msu_back.app.functions import get_services, auth_required, roles_required, output_json

if TYPE_CHECKING:
    # Импортируем сервисы только для целей аннотации типов
    from web_for_msu_back.app.services import NewsService


class NewsView(FlaskView):
    representations = {'application/json': output_json}

    @method("POST")
    @auth_required
    @roles_required('newsmaker', 'admin')
    def create(self):
        services = get_services()
        news_service: NewsService = services["news_service"]
        response, code = news_service.add_news(flask.request)
        return jsonify(response), code

    @method("GET")
    def get(self):
        services = get_services()
        news_service: NewsService = services["news_service"]
        response, code = news_service.get_news()
        return jsonify(response), code
