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
    fs_uniquifier = db.Column(db.String(255), unique=True, nullable=False)

    active = True

    def set_password(self, password):
        self.password = generate_password_hash(password)

    def verify_password(self, password):
        return self.password == password  # пока не добавлена регистрация
        # return check_password_hash(self.password, password)
