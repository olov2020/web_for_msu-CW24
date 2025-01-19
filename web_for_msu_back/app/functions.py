import json
import os
from datetime import timedelta
from decimal import Decimal, ROUND_HALF_UP
from functools import wraps

from flask import jsonify, g, make_response
from flask_jwt_extended import jwt_required, get_jwt_identity

from web_for_msu_back.app import mail


def get_next_monday(date_start):
    days_until_monday = (7 - date_start.weekday()) % 7
    if days_until_monday == 0:
        days_until_monday = 7
    next_monday = date_start + timedelta(days=days_until_monday)
    return next_monday


# Декоратор для проверки нескольких ролей
def roles_required(*roles):
    def decorator(fn):
        @jwt_required()
        @wraps(fn)
        def wrapper(*args, **kwargs):
            # Получаем данные о текущем пользователе из JWT
            current_user = get_jwt_identity()

            # Проверяем, есть ли у пользователя хотя бы одна из указанных ролей
            if 'roles' not in current_user or not any(role in current_user['roles'] for role in roles):
                return jsonify({"msg": f"Доступ запрещён: требуется одна из ролей {roles}"}), 403

            return fn(*args, **kwargs)

        return wrapper

    return decorator


def roles_prohibited(*roles):
    def decorator(fn):
        @jwt_required()
        @wraps(fn)
        def wrapper(*args, **kwargs):
            # Получаем данные о текущем пользователе из JWT
            current_user = get_jwt_identity()

            # Проверяем, есть ли у пользователя хотя бы одна из указанных ролей
            if 'roles' in current_user and any(role in current_user['roles'] for role in roles):
                return jsonify({"msg": f"Доступ с любой из ролей {roles} запрещен"}), 403

            return fn(*args, **kwargs)

        return wrapper

    return decorator


# Функция для извлечения текущего пользователя из JWT токена
def load_current_user():
    identity = get_jwt_identity()
    if identity:
        # Здесь можно загрузить данные пользователя из базы данных, если нужно
        services = get_services()
        user_service = services["user_service"]
        user_id = identity.get('id')
        return user_service.get_user_by_id(user_id)
    return None


# Кастомный декоратор для загрузки пользователя в g (аналог Flask-Login current_user)
def auth_required(fn):
    @jwt_required()
    @wraps(fn)
    def wrapper(*args, **kwargs):
        # Загружаем текущего пользователя
        g.current_user = load_current_user()
        if g.current_user is None:
            return jsonify({"msg": "Пользователь не найден"}), 404
        return fn(*args, **kwargs)

    return wrapper


def get_services() -> dict:
    from web_for_msu_back.app.factory import create_services
    if 'services' not in g:
        g.services = create_services()
    return g.services


def output_json(data, code, headers=None):
    content_type = 'application/json'
    dumped = json.dumps(data)
    if headers:
        headers.update({'Content-Type': content_type})
    else:
        headers = {'Content-Type': content_type}
    response = make_response(dumped, code, headers)
    return response


def send_reset_email(email, reset_link):
    from flask_mail import Message
    msg = Message("Смена пароля", recipients=[email])
    msg.body = f"Перейдите по этой ссылке, чтобы сбросить пароль: {reset_link}"
    mail.send(msg)


def arithmetic_round(number, decimals=0):
    factor = Decimal(10) ** -decimals
    return float(Decimal(number).quantize(factor, rounding=ROUND_HALF_UP))
