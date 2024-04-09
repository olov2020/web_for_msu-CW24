from flask import Flask
from flask_login import LoginManager
# from flask_migrate import Migrate
# from flask_mail import Mail, Message
from flask_sqlalchemy import SQLAlchemy
from flask_security import Security, SQLAlchemySessionUserDatastore

db = SQLAlchemy()
# mail = Mail()
# migrate = Migrate()
login_manager = LoginManager()
login_manager.login_view = 'home.login'
security = Security()


# Фабрика приложения
def create_app(config):
    # создание экземпляра приложения
    app = Flask(__name__)
    app.config.from_object(config)

    db.init_app(app)
    # mail.init_app(app)
    # migrate.init_app(app, db)
    login_manager.init_app(app)

    from .views.home import main as main_blueprint
    from .views.admin import admin as admin_blueprint
    from .views.pupil import pupil as pupil_blueprint
    from .views.teacher import teacher as teacher_blueprint
    from WEB_FOR_MSU.models import User, Role

    app.register_blueprint(main_blueprint)
    app.register_blueprint(admin_blueprint)
    app.register_blueprint(pupil_blueprint)
    app.register_blueprint(teacher_blueprint)
    user_datastore = SQLAlchemySessionUserDatastore(db.session, User, Role)
    security.init_app(app, user_datastore)

    return app
