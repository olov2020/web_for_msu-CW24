import flask
from werkzeug.datastructures import FileStorage

from web_for_msu_back.dto.user_info import UserInfoDTO
from web_for_msu_back.models import User, Role
from web_for_msu_back.services.image_service import ImageService
from web_for_msu_back.services.pupil_service import PupilService
from web_for_msu_back.services.teacher_service import TeacherService


class UserService:
    def __init__(self, db, teacher_service: TeacherService, pupil_service: PupilService, image_service: ImageService):
        self.db = db
        self.teacher_service = teacher_service
        self.pupil_service = pupil_service
        self.image_service = image_service

    def add_pupil(self, request: flask.Request) -> (dict, int):
        if self.get_user_by_email(request.form['email']) is not None:
            return {'error': 'Пользователь с такой почтой уже существует'}, 400
        roles = [Role.query.filter_by(name='pupil').first()]
        user = self.add_user(email=request.form['email'], password=request.form['password'], roles=roles,
                             user_image=request.files['image'])
        return {'user_id': user.id}, 201

    def add_teacher(self, request: flask.Request) -> (dict, int):
        roles = []
        user_exists = False
        if self.get_user_by_email(request.form['email']) is not None:
            if TeacherService.get_teacher_by_email(request.form['email']) is not None:
                return {'error': 'Преподаватель с такой почтой уже существует'}, 400
            pupil = PupilService.get_pupil_by_email(request.form['email'])
            if pupil.name == request.form['name'] and pupil.surname == request.form['surname']:
                roles = [Role.query.filter_by(name='pupil').first()]
                user_exists = True
            else:
                return {'error': 'Пользователь с такой почтой уже существует'}, 400
        roles.append(Role.query.filter_by(name='teacher').first())
        user = self.add_user(email=request.form['email'], password=request.form['password'], roles=roles,
                             user_image=request.files['image'], user_exists=user_exists)
        return {'user_id': user.id, 'user_exists': user_exists}, 201

    def add_user(self, email: str, password: str, roles: list[Role], user_image: FileStorage = None,
                 user_exists: bool = False) -> User:
        if user_image:
            image = ImageService.save_user_image(user_image)
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

    def get_user_by_id(self, user_id: int) -> User:
        return User.query.get(user_id)

    def get_user_by_email(self, email: str) -> User:
        return User.query.filter_by(email=email).first()

    def get_user_info(self, user_id: int) -> (UserInfoDTO, int):
        user = self.get_user_by_id(user_id)
        if not user:
            return {'error': 'Такого пользователя не существует'}, 404
        data = {
            'name': user.get_name(),
            'surname': user.get_surname(),
            'status': user.get_role_name(),
            'photo': ImageService.get_user_image(user.image),
            'patronymic': user.get_patronymic(),
            'email': user.email,
            'password': '',
            'new_password': '',
            'phone': user.get_phone(),
            'school': user.get_school(),
            'admin': user.is_admin()
        }
        return UserInfoDTO().load(data), 200
