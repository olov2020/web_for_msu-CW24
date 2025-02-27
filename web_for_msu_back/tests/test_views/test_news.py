import os
import sys
import unittest
from unittest.mock import patch, MagicMock

from flask import jsonify

from web_for_msu_back.app.views.news import NewsView

sys.path.insert(0, os.path.abspath(os.path.join(os.path.dirname(__file__), "..", "..")))

import web_for_msu_back.app.config
from web_for_msu_back.app import create_app


class TestNews(unittest.TestCase):
    @classmethod
    def setUpClass(cls):
        cls.app = create_app(web_for_msu_back.app.config.TestingConfig)
        cls.client = cls.app.test_client()
        cls.app_context = cls.app.app_context()  # Создаем контекст приложения
        cls.app_context.push()  # Активируем контекст приложения

    @classmethod
    def tearDownClass(cls):
        cls.app_context.pop()  # Удаляем контекст приложения

    @patch("web_for_msu_back.app.views.news.get_services")
    def test_get_all_news_success(self, mock_get_services):
        mock_news_service = MagicMock()
        expected_response = [{
            "date": "2024-11-22",
            "description": "We are excited to announce a new course on Python programming.",
            "id": 1,
            "photo": "https://storage.yandexcloud.net/emshnews/e50acd24-897f-4b45-b272-36ac320847ce.jpg",
            "title": "Python course"
        }]
        mock_news_service.get_news.return_value = (expected_response, 200)

        mock_get_services.return_value = {"news_service": mock_news_service}

        view = NewsView()
        response, code = view.get_all()
        self.assertEqual(code, 200)
        self.assertEqual(response.json, expected_response)
