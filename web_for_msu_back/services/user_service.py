from __future__ import annotations  # Поддержка строковых аннотаций

import json
from typing import TYPE_CHECKING

import flask
from flask_jwt_extended import get_jwt_identity, create_access_token, create_refresh_token
from marshmallow import ValidationError
from werkzeug.datastructures import FileStorage

from web_for_msu_back.dto.login import LoginDTO
from web_for_msu_back.dto.user_info import UserInfoDTO
from web_for_msu_back.models import User, Role

if TYPE_CHECKING:
    # Импортируем сервисы только для целей аннотации типов
    from web_for_msu_back.services import ImageService, PupilService, TeacherService


class UserService:
    def __init__(self, db, teacher_service: TeacherService, pupil_service: PupilService, image_service: ImageService):
        self.db = db
        self.teacher_service = teacher_service
        self.pupil_service = pupil_service
        self.image_service = image_service

    def add_pupil(self, request: flask.Request) -> (dict, int):
        # TODO fix this. should firstly parse to dto
        data = json.loads(request.form.get('data'))
        if self.get_user_by_email(data.get('email', None)) is not None:
            return {'error': 'Пользователь с такой почтой уже существует'}, 400
        roles = [Role.query.filter_by(name='pupil').first()]
        user = self.add_user(email=data['email'], password=data['password'], roles=roles,
                             user_image=request.files['image'])
        return {'user_id': user.id}, 201

    def add_teacher(self, request: flask.Request) -> (dict, int):
        roles = []
        user_exists = False
        data = json.loads(request.form.get('data'))
        if self.get_user_by_email(data['email']) is not None:
            if self.teacher_service.get_teacher_by_email(data['email']) is not None:
                return {'error': 'Преподаватель с такой почтой уже существует'}, 400
            pupil = self.pupil_service.get_pupil_by_email(data['email'])
            if pupil.name == data['name'] and pupil.surname == data['surname']:
                roles = [Role.query.filter_by(name='pupil').first()]
                user_exists = True
            else:
                return {'error': 'Пользователь с такой почтой уже существует'}, 400
        roles.append(Role.query.filter_by(name='teacher').first())
        user = self.add_user(email=data['email'], password=data['password'], roles=roles,
                             user_image=request.files['image'], user_exists=user_exists)
        return {'user_id': user.id, 'user_exists': user_exists}, 201

    def add_user(self, email: str, password: str, roles: list[Role], user_image: FileStorage = None,
                 user_exists: bool = False) -> User:
        if user_image:
            image = self.image_service.save_user_image(user_image)
        else:
            image = 'default.png'
        if not user_exists:
            user = User(email=email, password=password, image=image)
            user.roles = roles
            self.db.session.add(user)
            self.db.session.commit()
        else:
            user = User.query.filter_by(email=email).first()
            user.image = image
            user.roles = roles
            self.db.session.commit()
        # if user.is_teacher():
        #     TeacherService.add_teacher(user_id=user.id, form=form)
        # if user.is_pupil():
        #     agreement = ImageService.save_user_agreement(form.agreement.data)
        #     PupilService.add_pupil(user_id=user.id, form=form, agreement=agreement)
        return user

    def login(self, request: flask.Request) -> (dict, int):
        # TODO add refreshment for token
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
        if user and user.check_password(password):
            # Создание JWT токена с ролями пользователя
            identity = {'id': user.id,
                        'name': user.get_name(),
                        'patronymic': user.get_patronymic(),
                        'surname': user.get_surname(),
                        'email': email,
                        'image': self.image_service.get_from_yandex_s3("images", user.image),
                        'roles': user.get_roles()}
            access_token = create_access_token(identity=identity, fresh=True)
            refresh_token = create_refresh_token(identity=identity)
            return {"access_token": access_token, "refresh_token": refresh_token}, 200

        return {"error": "Неверные данные"}, 401

    def refresh(self) -> (dict, int):
        identity = get_jwt_identity()
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
            'status': identity.get('roles')[-1],
            'photo': identity.get('image'),
            'patronymic': identity.get('patronymic'),
            'email': identity.get('email'),
            'admin': 'admin' in identity.get('roles')
        }
        return UserInfoDTO().load(data), 200
