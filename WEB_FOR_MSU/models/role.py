from WEB_FOR_MSU import db
from flask_security import RoleMixin


class Role(db.Model, RoleMixin):
    __tablename__ = 'role'
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(), nullable=False)
