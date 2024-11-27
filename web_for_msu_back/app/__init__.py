import os

from flask import Flask
from flask_cors import CORS
from flask_jwt_extended import JWTManager
# from flask_migrate import Migrate
# from flask_mail import Mail, Message
from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()


# mail = Mail()
# migrate = Migrate()


# Фабрика приложения
def create_app(config):
    # создание экземпляра приложения
    app = Flask(__name__)
    app.config.from_object(config)

    db.init_app(app)
    JWTManager(app)
    CORS(app, resources={r"/*": {"origins": os.getenv('FRONTEND_HOST', '*')}})
    # mail.init_app(app)
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

    return app
