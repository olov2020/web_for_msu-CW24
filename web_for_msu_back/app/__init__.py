import os

from flask import Flask
from flask_apscheduler import APScheduler
from flask_cors import CORS
from flask_jwt_extended import JWTManager
# from flask_migrate import Migrate
from flask_mail import Mail
from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()
scheduler = APScheduler()

mail = Mail()

# migrate = Migrate()


# Фабрика приложения
def create_app(config):
    # создание экземпляра приложения
    app = Flask(__name__)
    app.config.from_object(config)

    db.init_app(app)
    JWTManager(app)
    origins = [
        os.getenv("FRONTEND_HOST"),
        # os.getenv("APP_NAME")
    ]
    CORS(app, resources={r"/*": {"origins": origins}},
         supports_credentials=True,
         allow_headers=["Content-Type", "Authorization", "X-Requested-With", "Content-Disposition"])
    # migrate.init_app(app, db)

    from web_for_msu_back.app.views.home import HomeView
    from web_for_msu_back.app.views.admin import AdminView
    from web_for_msu_back.app.views.pupil import PupilView
    from web_for_msu_back.app.views.teacher import TeacherView
    from web_for_msu_back.app.views.news import NewsView

    HomeView.register(app)
    AdminView.register(app)
    PupilView.register(app)
    TeacherView.register(app)
    NewsView.register(app)

    scheduler.init_app(app)
    mail.init_app(app)
    # with app.test_request_context():  # Необходимо для доступа к url_map вне контекста запроса
    #     for rule in app.url_map.iter_rules():
    #         print(rule)

    return app
