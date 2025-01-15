from __future__ import annotations  # Поддержка строковых аннотаций

import json
import os
from datetime import datetime
from typing import TYPE_CHECKING

import flask
import pytz
from flask_jwt_extended import get_jwt_identity, create_access_token, create_refresh_token, decode_token
from itsdangerous import URLSafeTimedSerializer, SignatureExpired, BadSignature
from marshmallow import ValidationError
from sqlalchemy import desc
from werkzeug.datastructures import FileStorage

from functions import send_reset_email
from web_for_msu_back.app.dto.login import LoginDTO
from web_for_msu_back.app.dto.pupil_admin_list import PupilAdminListDTO
from web_for_msu_back.app.dto.role import RoleDTO
from web_for_msu_back.app.dto.teacher_admin_list import TeacherAdminListDTO
from web_for_msu_back.app.dto.user_info import UserInfoDTO
from web_for_msu_back.app.models import User, Role, Teacher, Pupil, RegistrationPeriod, user_role

if TYPE_CHECKING:
    # Импортируем сервисы только для целей аннотации типов
    from web_for_msu_back.app.services import ImageService, PupilService, TeacherService


class UserService:
    def __init__(self, db, teacher_service: TeacherService, pupil_service: PupilService, image_service: ImageService):
        self.db = db
        self.teacher_service = teacher_service
        self.pupil_service = pupil_service
        self.image_service = image_service

    def add_pupil(self, request: flask.Request) -> (dict, int):
        data = json.loads(request.form.get('data'))
        if self.get_user_by_email(data.get('email', None)) is not None:
            return {'error': 'Пользователь с такой почтой уже существует'}, 400
        roles = [Role.query.filter_by(name='pupil').first()]
        user = self.add_user(email=data['email'], password=data['password'], roles=roles,
                             user_image=request.files.get('image', None))
        return {'user_id': user.id}, 201

    def add_teacher(self, request: flask.Request) -> (dict, int):
        roles = []
        user_exists = False
        data = json.loads(request.form.get('data'))
        if self.get_user_by_email(data['email']):
            if self.teacher_service.get_teacher_by_email(data['email']):
                return {'error': 'Преподаватель с такой почтой уже существует'}, 400
            pupil = self.pupil_service.get_pupil_by_email(data['email'])
            if pupil and pupil.name == data['name'] and pupil.surname == data['surname'] and pupil.user.authorized:
                user_exists = True
            else:
                return {'error': 'Пользователь с такой почтой уже существует'}, 400
        roles.append(Role.query.filter_by(name='teacher').first())
        user = self.add_user(email=data['email'], password=data['password'], roles=roles,
                             user_image=request.files.get('image', None), user_exists=user_exists)
        return {'user_id': user.id, 'user_exists': user_exists}, 201

    def add_user(self, email: str, password: str, roles: list[Role], user_image: FileStorage = None,
                 user_exists: bool = False) -> User:
        if user_image:
            image = self.image_service.save_user_image(user_image)
        else:
            if user_exists:
                image = None
            else:
                image = 'default.svg'
        if not user_exists:
            user = User(email=email, password=password, image=image)
            user.roles = roles
            self.db.session.add(user)
            self.db.session.commit()
        else:
            user = User.query.filter_by(email=email).first()
            if image:
                self.image_service.delete_from_yandex_s3("images", user.image)
                user.image = image
            user.roles = roles
            user.authorized = False
            self.db.session.commit()
        # if user.is_teacher():
        #     TeacherService.add_teacher(user_id=user.id, form=form)
        # if user.is_pupil():
        #     agreement = ImageService.save_user_agreement(form.agreement.data)
        #     PupilService.add_pupil(user_id=user.id, form=form, agreement=agreement)
        return user

    def login(self, request: flask.Request) -> (dict, int):
        data = request.get_json()

        schema = LoginDTO()
        try:
            validated_data = schema.load(data)
        except ValidationError as err:
            return {"errors": err.messages}, 400

        email = validated_data.get('email')
        password = validated_data.get('password')

        # Проверка пользователя и его пароля
        user = self.get_user_by_email(email)
        if user and user.check_password(password) and user.authorized:
            # Создание JWT токена с ролями пользователя
            identity = self.create_user_identity(user)
            access_token = create_access_token(identity=identity, fresh=True)
            refresh_token = create_refresh_token(identity=identity)
            return {"access_token": access_token, "refresh_token": refresh_token}, 200

        return {"error": "Неверные данные"}, 401

    def create_user_identity(self, user):
        return {
            'id': user.id,
            'name': user.get_name(),
            'patronymic': user.get_patronymic(),
            'surname': user.get_surname(),
            'email': user.email,
            'image': self.image_service.get_from_yandex_s3("images", user.image),
            'roles': user.get_roles(),
        }

    def refresh(self, request: flask.Request) -> (dict, int):

        data = request.get_json()
        if not data or "refresh_token" not in data:
            return {"error": "Неправильный запрос"}, 400

        refresh_token = data["refresh_token"]

        try:
            decoded_token = decode_token(refresh_token)
            if decoded_token["type"] != "refresh":
                return {"error": "Неправильный тип токена, ожидается refresh"}, 400

            identity = decoded_token["sub"]
            email = identity["email"]
        except Exception as e:
            return {"message": f"Неправильный refresh token: {str(e)}"}, 401

        user = self.get_user_by_email(email)
        if not user:
            return {"error": "Войдите в аккаунт еще раз"}, 404
        identity = {'id': user.id,
                    'name': user.get_name(),
                    'patronymic': user.get_patronymic(),
                    'surname': user.get_surname(),
                    'email': email,
                    'image': self.image_service.get_from_yandex_s3("images", user.image),
                    'roles': user.get_roles()}
        access_token = create_access_token(identity=identity, fresh=False)
        return {"access_token": access_token}, 200

    def get_user_by_id(self, user_id: int) -> User:
        return User.query.get(user_id)

    def get_user_by_email(self, email: str) -> User:
        return User.query.filter_by(email=email).first()

    def get_user_info(self) -> (UserInfoDTO, int):
        identity = get_jwt_identity()
        data = {
            'name': identity.get('name'),
            'surname': identity.get('surname'),
            'status': ", ".join(identity.get('roles')),
            'photo': identity.get('image'),
            'patronymic': identity.get('patronymic'),
            'email': identity.get('email'),
            'admin': 'admin' in identity.get('roles')
        }
        return UserInfoDTO().dump(data), 200

    def get_all_roles(self) -> (list[RoleDTO], int):
        roles = Role.query.all()
        return [RoleDTO().dump({"name": role.name}) for role in roles], 200

    def get_pupil_admin_list(self) -> (list[PupilAdminListDTO], int):
        users = Pupil.query.with_entities(
            User.id,
            User.email,
            Pupil.name,
            Pupil.surname,
            Pupil.patronymic,
            Pupil.school_grade,
            Pupil.graduated,
            Pupil.former,
            User.authorized,
        ).join(User, Pupil.user_id == User.id).order_by(desc(User.created_on), desc(User.id))

        result = []
        for user in users:
            status = "Ученик"
            if user.former:
                status = "Бывший ученик"
            elif user.graduated:
                status = "Выпускник"
            data = {
                "id": user.id,
                "name": f"{user.surname} {user.name} {user.patronymic}",
                "email": user.email,
                "grade": user.school_grade,
                "status": status,
                "authorized": user.authorized
            }
            result.append(PupilAdminListDTO().dump(data))
        return result, 200

    def get_teacher_admin_list(self) -> (list[TeacherAdminListDTO], int):
        users = Pupil.query.with_entities(
            User.id,
            User.email,
            Teacher.name,
            Teacher.surname,
            Teacher.patronymic,
            User.authorized,
        ).join(User, Teacher.user_id == User.id).order_by(desc(User.created_on), desc(User.id))

        result = []
        for user in users:
            roles = (Role.query
                     .join(user_role, user_role.c.role_id == Role.id)
                     .filter(user_role.c.user_id == user.id).all())
            role_names = [role.name for role in roles]
            if "admin" in role_names:
                continue
            data = {
                "id": user.id,
                "name": f"{user.surname} {user.name} {user.patronymic}",
                "email": user.email,
                "roles": role_names,
                "authorized": user.authorized
            }
            result.append(TeacherAdminListDTO().dump(data))
        return result, 200

    def add_role(self, user_id: int, role: str) -> (dict, int):
        user: User = User.query.get(user_id)
        if not user:
            return {"error": "Нет такого пользователя"}, 404
        role_to_add = Role.query.filter_by(name=role).first()
        if role_to_add not in user.roles:
            user.roles.append(Role.query.filter_by(name=role).first())
            self.db.session.commit()
        return {"msg": "Роль добавлена"}, 200

    def delete_role(self, user_id: int, role: str) -> (dict, int):
        user: User = User.query.get(user_id)
        if not user:
            return {"error": "Нет такого пользователя"}, 404
        role_to_delete = Role.query.filter_by(name=role).first()
        if role_to_delete in user.roles:
            user.roles.remove(role_to_delete)
        self.db.session.commit()
        return {"msg": "Роль удалена"}, 200

    def open_registration(self) -> (dict, int):
        opened = RegistrationPeriod.query.filter_by(is_open=True).all()
        today_date = datetime.now(tz=pytz.timezone('Europe/Moscow')).date()
        for reg in opened:
            reg.is_open = False
            reg.closed_at = today_date
        new_reg = RegistrationPeriod(is_open=True,
                                     opened_at=today_date)
        self.db.session.add(new_reg)
        self.db.session.commit()
        return {"msg": "Регистрация открыта"}, 200

    def close_registration(self) -> (dict, int):
        opened = RegistrationPeriod.query.filter_by(is_open=True).all()
        if not opened:
            return {"error": "Регистрация не была открыта"}, 404
        today_date = datetime.now(tz=pytz.timezone('Europe/Moscow')).date()
        for reg in opened:
            reg.is_open = False
            reg.closed_at = today_date
        self.db.session.commit()
        return {"msg": "Регистрация закрыта"}, 200

    def is_registration_opened(self) -> (bool, int):
        opened = RegistrationPeriod.query.filter_by(is_open=True).all()
        if opened:
            return True, 200
        return False, 200

    def authorize_user(self, user_id: int) -> (dict, int):
        user = User.query.get(user_id)
        if not user:
            return {"error": "Пользователь не найден"}, 404
        user.authorized = True
        self.db.session.commit()
        return {"msg": "Пользователь успешно добавлен"}, 200

    def delete_user(self, user_id: int, role: str) -> (dict, int):
        user = User.query.get(user_id)
        if not user:
            return {"error": "Пользователь не найден"}, 404
        if user.authorized:
            return {"error": "Пользователь уже авторизован"}, 404
        match role:
            case "pupil":
                if user.is_teacher():
                    return {"error": "Пользователь уже подал заявку на роль учителя"}, 404
                model = Pupil
            case _:
                model = Teacher
        self.db.session.query(model).filter(model.user_id == user_id).delete()
        if model == Teacher:
            pupil = self.db.session.query(Pupil).filter(Pupil.user_id == user_id).first()
            if pupil:
                role = Role.query.filter_by(name='pupil').first()
                user.roles = [role]
                user.authorized = True
                self.db.session.commit()
                return {"msg": "Заявка ученика на статус преподавателя успешно удалена"}, 200
        self.image_service.delete_from_yandex_s3("images", user.image)
        instance = model.query.filter(model.user_id == user_id).first()
        if instance:
            self.image_service.delete_from_yandex_s3("documents", instance.agreement)
        self.db.session.delete(user)
        self.db.session.commit()
        return {"msg": "Заявка успешно удалена"}, 200

    def change_photo(self, user_id: int, request: flask.Request) -> (dict, int):
        user = User.query.get(user_id)
        if not user:
            return {"error": "Пользователь не найден"}, 404
        if "photo" not in request.files:
            return {"error": "Неправильный формат запроса"}, 400
        self.image_service.change_user_image(request.files.get("photo"), user_id)
        identity = self.create_user_identity(user)
        access_token = create_access_token(identity=identity, fresh=False)
        return {"msg": "Фотография изменена", "access_token": access_token}, 200

    def change_password(self, email: str) -> (dict, int):
        user = self.get_user_by_email(email)
        if not user:
            return {"error": "Пользователь с такой почтой не найден"}, 404

        s = URLSafeTimedSerializer(os.getenv("SECRET_KEY"))
        token = s.dumps(email, salt=os.getenv("PASSWORD_RESET_SALT"))
        # TODO check link
        reset_link = f"{os.getenv("APP_NAME")}/reset_password/{token}/"
        send_reset_email(email, reset_link)
        return {"msg": "Письмо с ссылкой для смены пароля отправлено"}, 200

    def reset_password(self, request: flask.Request, token: str):
        s = URLSafeTimedSerializer(os.getenv("SECRET_KEY"))
        try:
            # Декодирование токена
            email = s.loads(token, salt=os.getenv("PASSWORD_RESET_SALT"), max_age=3600)
        except SignatureExpired:
            return {"error": "Ссылка просрочена, попробуйте еще раз"}, 400
        except BadSignature:
            return {"error": "Некорректная ссылка"}, 400

        data = request.get_json()
        new_password = data.get('new_password')
        return self.update_password(email, new_password)

    def update_password(self, email, password):
        user = self.get_user_by_email(email)
        if not user:
            return {"error": "Нет такого пользователя"}, 404
        user.set_password(password)
        return {"msg": "Пароль успешно обновлен"}, 200
