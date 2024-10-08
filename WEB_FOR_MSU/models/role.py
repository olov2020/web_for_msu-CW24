from flask_security import RoleMixin

from WEB_FOR_MSU import db


class Role(db.Model, RoleMixin):
    __tablename__ = 'role'
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(), nullable=False)

    def __init__(self, id, name):
        self.id = id
        self.name = name
