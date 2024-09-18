import flask
from werkzeug.datastructures import FileStorage

from web_for_msu_back import db
from web_for_msu_back.models import User, Role
from web_for_msu_back.services import TeacherService, PupilService
from web_for_msu_back.services.image_service import ImageService


class UserService:
    @staticmethod
    def add_pupil(request: flask.Request) -> (dict, int):
        if UserService.get_user_by_email(request.form['email']) is not None:
            return {'error': 'Пользователь с такой почтой уже существует'}, 400
        roles = [Role.query.filter_by(name='pupil').first()]
        user = UserService.add_user(email=request.form['email'], password=request.form['password'], roles=roles,
                                    user_image=request.files['image'])
        return {'user_id': user.id}, 201

    @staticmethod
    def add_teacher(request: flask.Request):
        roles = []
        user_exists = False
        if UserService.get_user_by_email(request.form['email']) is not None:
            if TeacherService.get_teacher_by_email(request.form['email']) is not None:
                return {'error': 'Преподаватель с такой почтой уже существует'}, 400
            pupil = PupilService.get_pupil_by_email(request.form['email'])
            if pupil.name == request.form['name'] and pupil.surname == request.form['surname']:
                roles = [Role.query.filter_by(name='pupil').first()]
                user_exists = True
            else:
                return {'error': 'Пользователь с такой почтой уже существует'}, 400
        roles.append(Role.query.filter_by(name='teacher').first())
        user = UserService.add_user(email=request.form['email'], password=request.form['password'], roles=roles,
                                    user_image=request.files['image'], user_exists=user_exists)
        return {'user_id': user.id, 'user_exists': user_exists}, 201

    @staticmethod
    def add_user(email: str, password: str, roles: list[Role], user_image: FileStorage = None,
                 user_exists: bool = False):
        # TODO change form to json
        if user_image:
            image = ImageService.save_user_image(user_image)
        else:
            image = 'default.png'
        if not user_exists:
            user = User(email=email, password=password, image=image)
            user.roles = roles
            db.session.add(user)
            db.session.commit()
        else:
            user = User.query.filter_by(email=email).first()
            user.image = image
            user.roles = roles
            db.session.commit()
        # if user.is_teacher():
        #     TeacherService.add_teacher(user_id=user.id, form=form)
        # if user.is_pupil():
        #     agreement = ImageService.save_user_agreement(form.agreement.data)
        #     PupilService.add_pupil(user_id=user.id, form=form, agreement=agreement)
        return user

    @staticmethod
    def get_user_by_id(user_id: int):
        return User.query.get(user_id)

    @staticmethod
    def get_user_by_email(email: str):
        return User.query.filter_by(email=email).first()
