import os
from datetime import timedelta

from dotenv import load_dotenv

app_dir = os.path.abspath(os.path.dirname(__file__))
load_dotenv()


class BaseConfig:
    SECRET_KEY = os.getenv('SECRET_KEY') or 'A SECRET KEY'
    JWT_SECRET_KEY = os.getenv('JWT_SECRET_KEY') or 'A JWT SECRET KEY'
    JWT_ACCESS_TOKEN_EXPIRES = timedelta(minutes=30)  # Время жизни access-токена
    JWT_REFRESH_TOKEN_EXPIRES = timedelta(days=30)
    SQLALCHEMY_TRACK_MODIFICATIONS = False
    UPLOAD_FOLDER = os.path.join('app', 'static', 'photos', 'people_photo')
    SECURITY_MSG_UNAUTHENTICATED = ("Авторизуйтесь для доступа к этой странице", "error")
    SECURITY_MSG_UNAUTHORIZED = ("У вас нет прав доступа к этой странице", "error")
    WTF_CSRF_ENABLED = True
    SECURITY_UNAUTHORIZED_VIEW = 'home.login'

    # ##### настройка Flask-Mail #####
    # MAIL_SERVER = 'smtp.googlemail.com'
    # MAIL_PORT = 587
    # MAIL_USE_TLS = True
    # MAIL_USERNAME = os.getenv('MAIL_USERNAME') or 'YOU_MAIL@gmail.com'
    # MAIL_PASSWORD = os.getenv('MAIL_PASSWORD') or 'password'
    # MAIL_DEFAULT_SENDER = MAIL_USERNAME


class DevelopmentConfig(BaseConfig):
    DEBUG = True
    SQLALCHEMY_DATABASE_URI = os.getenv('DEVELOPMENT_DATABASE_URI') or \
                              'postgresql+psycopg2://user:123@localhost:5433/emsh_db'


class TestingConfig(BaseConfig):
    DEBUG = True
    SQLALCHEMY_DATABASE_URI = os.getenv('TESTING_DATABASE_URI') or \
                              'postgresql+psycopg2://user:123@localhost:5433/emsh_db'


class ProductionConfig(BaseConfig):
    DEBUG = False
    SQLALCHEMY_DATABASE_URI = os.getenv('PRODUCTION_DATABASE_URI') or \
                              'postgresql+psycopg2://user:123@localhost:5433/emsh_db'
