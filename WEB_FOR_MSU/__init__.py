from flask import Flask
from flask_login import LoginManager
from flask_migrate import Migrate
# from flask_mail import Mail, Message
from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()
# mail = Mail()
migrate = Migrate()
login_manager = LoginManager()
login_manager.login_view = 'home.home'


# Фабрика приложения
def create_app(config):
    # создание экземпляра приложения
    app = Flask(__name__)
    app.config.from_object(config)

    db.init_app(app)
    # mail.init_app(app)
    migrate.init_app(app, db)
    login_manager.init_app(app)

    from .views.home import main as main_blueprint
    app.register_blueprint(main_blueprint)

    # from .admin import home as admin_blueprint
    # app.register_blueprint(admin_blueprint)

    return app