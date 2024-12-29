from datetime import datetime

import pytz
from werkzeug.security import generate_password_hash, check_password_hash

from web_for_msu_back.app import db
from web_for_msu_back.app.models.user_role import user_role


class User(db.Model):
    __tablename__ = 'user'
    id = db.Column(db.Integer, primary_key=True)
    email = db.Column(db.String(), nullable=False, unique=True)
    password = db.Column(db.String(), nullable=False)
    image = db.Column(db.String(), nullable=False, default='default.jpg')
    authorized = db.Column(db.Boolean, default=False)
    created_on = db.Column(db.DateTime(), default=None)
    updated_on = db.Column(db.DateTime(), default=lambda: datetime.now(tz=pytz.timezone('Europe/Moscow')).date(),
                           onupdate=lambda: datetime.now(tz=pytz.timezone('Europe/Moscow')).date())
    roles = db.relationship('Role', secondary=user_role, backref='users')

    active = True

    def __init__(self, email, password, image='default.jpg'):
        self.email = email
        self.password = generate_password_hash(password)
        self.image = image
        self.created_on = datetime.now(tz=pytz.timezone('Europe/Moscow')).date()

    def set_password(self, password):
        if self.password == generate_password_hash(password):
            return False
        self.password = generate_password_hash(password)
        db.session.commit()
        return True

    def check_password(self, password):
        # return self.password == password  # пока не добавлена регистрация
        return check_password_hash(self.password, password)

    def save(self):
        # db.session.add(self)
        db.session.commit()

    def get_name(self):

        if self.is_pupil():
            return self.pupil[0].name
        elif self.is_teacher():
            return self.teacher[0].name

    def get_surname(self):
        if self.is_pupil():
            return self.pupil[0].surname
        elif self.is_teacher():
            return self.teacher[0].surname

    def get_patronymic(self):
        if self.is_pupil():
            return self.pupil[0].patronymic
        elif self.is_teacher():
            return self.teacher[0].patronymic

    def get_roles(self):
        return [role.name for role in self.roles]

    def get_role_name(self):
        if self.is_pupil():
            return 'Ученик'
        elif self.is_teacher():
            return 'Преподаватель'

    def get_phone(self):
        if self.is_pupil():
            return self.pupil[0].phone
        elif self.is_teacher():
            return self.teacher[0].phone

    def get_school(self):
        if self.is_pupil():
            return self.pupil[0].school
        elif self.is_teacher():
            return self.teacher[0].school

    def set_email(self, email):
        if self.email == email:
            return False
        self.email = email
        if self.is_pupil():
            self.pupil[0].email = email
        elif self.is_teacher():
            self.teacher[0].email = email
        db.session.commit()
        return True

    def set_name(self, name):
        if self.is_pupil():
            if self.pupil[0].name == name:
                return False
            self.pupil[0].name = name
        elif self.is_teacher():
            if self.teacher[0].name == name:
                return False
            self.teacher[0].name = name
        db.session.commit()
        return True

    def set_surname(self, surname):
        if self.is_pupil():
            if self.pupil[0].surname == surname:
                return False
            self.pupil[0].surname = surname
        elif self.is_teacher():
            if self.teacher[0].surname == surname:
                return False
            self.teacher[0].surname = surname
        db.session.commit()
        return True

    def set_patronymic(self, patronymic):
        if self.is_pupil():
            if self.pupil[0].patronymic == patronymic:
                return False
            self.pupil[0].patronymic = patronymic
        elif self.is_teacher():
            if self.teacher[0].patronymic == patronymic:
                return False
            self.teacher[0].patronymic = patronymic
        db.session.commit()
        return True

    def set_phone(self, phone):
        if self.is_pupil():
            if self.pupil[0].phone == phone:
                return False
            self.pupil[0].phone = phone
        elif self.is_teacher():
            if self.teacher[0].phone == phone:
                return False
            self.teacher[0].phone = phone
        db.session.commit()
        return True

    def set_school(self, school):
        if self.is_pupil():
            if self.pupil[0].school == school:
                return False
            self.pupil[0].school = school
        elif self.is_teacher():
            if self.teacher[0].school == school:
                return False
            self.teacher[0].school = school
        db.session.commit()
        return True

    def is_teacher(self):
        for role in self.roles:
            if role.name == 'teacher':
                return True
        return False

    def is_pupil(self):
        flag = False
        for role in self.roles:
            if role.name == 'pupil':
                flag = True
            if role.name == 'teacher':
                return False
        return flag

    def is_admin(self):
        for role in self.roles:
            if role.name == 'admin':
                return True
        return False
