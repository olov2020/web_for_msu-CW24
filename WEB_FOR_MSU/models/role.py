from WEB_FOR_MSU import db, login_manager
from flask import current_app


class Role(db.Model):
    __tablename__ = 'role'
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(), nullable=False)
