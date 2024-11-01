from flask import Flask
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
    jwt = JWTManager(app)
    # mail.init_app(app)
    # migrate.init_app(app, db)

    from .views.home import HomeView
    from .views.admin import AdminView
    from .views.pupil import PupilView
    from .views.teacher import TeacherView

    HomeView.register(app)
    AdminView.register(app)
    PupilView.register(app)
    TeacherView.register(app)

    return app
