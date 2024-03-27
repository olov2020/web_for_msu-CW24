import uuid

from WEB_FOR_MSU import db, login_manager
from datetime import datetime
from flask_security import UserMixin
from werkzeug.security import generate_password_hash, check_password_hash


@login_manager.user_loader
def load_user(user_id):
    return User.query.get(int(user_id))


class User(db.Model, UserMixin):
    __tablename__ = 'user'
    id = db.Column(db.Integer, primary_key=True)
    email = db.Column(db.String(), nullable=False, unique=True)
    password = db.Column(db.String(), nullable=False)
    image = db.Column(db.String(), nullable=False, default='default.jpg')
    created_on = db.Column(db.DateTime(), default=None)
    updated_on = db.Column(db.DateTime(), default=datetime.utcnow, onupdate=datetime.utcnow)
    role_id = db.Column(db.Integer, db.ForeignKey('role.id'), nullable=False)
    role = db.relationship('Role', backref='users')
    fs_uniquifier = db.Column(db.String(255), unique=True, nullable=False, default=str(uuid.uuid4()))

    active = True

    def __init__(self, email, password, role_id, image='default.jpg'):
        self.email = email
        self.password = generate_password_hash(password)
        self.image = image
        self.role_id = role_id
        self.created_on = datetime.utcnow()

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
        if self.role == 'pupil':
            return self.pupil[0].name
        elif self.role == 'teacher':
            return self.teacher[0].name

    def get_surname(self):
        if self.role == 'pupil':
            return self.pupil[0].surname
        elif self.role == 'teacher':
            return self.teacher[0].surname

    def get_patronymic(self):
        if self.role == 'pupil':
            return self.pupil[0].patronymic
        elif self.role == 'teacher':
            return self.teacher[0].patronymic

    def get_role(self):
        if self.role == 'pupil':
            return 'Ученик'
        elif self.role == 'teacher':
            return 'Преподаватель'

    def get_phone(self):
        if self.role == 'pupil':
            return self.pupil[0].phone
        elif self.role == 'teacher':
            return self.teacher[0].phone

    def get_school(self):
        if self.role == 'pupil':
            return self.pupil[0].school
        elif self.role == 'teacher':
            return self.teacher[0].school

    def set_email(self, email):
        if self.email == email:
            return False
        self.email = email
        if self.role == 'pupil':
            self.pupil[0].email = email
        elif self.role == 'teacher':
            self.teacher[0].email = email
        db.session.commit()
        return True

    def set_name(self, name):
        if self.role == 'pupil':
            if self.pupil[0].name == name:
                return False
            self.pupil[0].name = name
        elif self.role == 'teacher':
            if self.teacher[0].name == name:
                return False
            self.teacher[0].name = name
        db.session.commit()
        return True

    def set_surname(self, surname):
        if self.role == 'pupil':
            if self.pupil[0].surname == surname:
                return False
            self.pupil[0].surname = surname
        elif self.role == 'teacher':
            if self.teacher[0].surname == surname:
                return False
            self.teacher[0].surname = surname
        db.session.commit()
        return True

    def set_patronymic(self, patronymic):
        if self.role == 'pupil':
            if self.pupil[0].patronymic == patronymic:
                return False
            self.pupil[0].patronymic = patronymic
        elif self.role == 'teacher':
            if self.teacher[0].patronymic == patronymic:
                return False
            self.teacher[0].patronymic = patronymic
        db.session.commit()
        return True

    def set_phone(self, phone):
        if self.role == 'pupil':
            if self.pupil[0].phone == phone:
                return False
            self.pupil[0].phone = phone
        elif self.role == 'teacher':
            if self.teacher[0].phone == phone:
                return False
            self.teacher[0].phone = phone
        db.session.commit()
        return True

    def set_school(self, school):
        if self.role == 'pupil':
            if self.pupil[0].school == school:
                return False
            self.pupil[0].school = school
        elif self.role == 'teacher':
            if self.teacher[0].school == school:
                return False
            self.teacher[0].school = school
        db.session.commit()
        return True
