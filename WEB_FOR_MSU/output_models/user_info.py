from flask_login import current_user

from WEB_FOR_MSU.services import ImageService


class UserInfo:
    def __init__(self, name, surname, status, photo, patronymic=None, email=None, password=None, new_password=None,
                 phone=None, school=None, admin=False):
        self.name = name
        self.surname = surname
        self.status = status
        self.photo = photo
        self.patronymic = patronymic
        self.email = email
        self.password = password
        self.new_password = new_password
        self.phone = phone
        self.school = school
        self.admin = admin

    @staticmethod
    def get_user_info():
        return UserInfo(current_user.get_name(),
                        current_user.get_surname(),
                        current_user.get_role_name(),
                        ImageService.get_user_image(),
                        current_user.get_patronymic(),
                        current_user.email,
                        '',
                        '',
                        current_user.get_phone(),
                        current_user.get_school(),
                        current_user.is_admin())
