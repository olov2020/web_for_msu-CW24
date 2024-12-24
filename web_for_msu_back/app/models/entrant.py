from datetime import datetime

import pytz

from web_for_msu_back.app import db


class Entrant(db.Model):
    __tablename__ = 'entrant'
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(), nullable=False)
    surname = db.Column(db.String(), nullable=False)
    patronymic = db.Column(db.String())
    phone = db.Column(db.String(), nullable=False)
    email = db.Column(db.String(), nullable=False, unique=True)
    authorized = db.Column(db.Boolean, default=False)
    created_on = db.Column(db.DateTime(), default=lambda: datetime.now(tz=pytz.timezone('Europe/Moscow')).date())
