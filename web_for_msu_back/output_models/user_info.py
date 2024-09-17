from web_for_msu_back.services import ImageService


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
