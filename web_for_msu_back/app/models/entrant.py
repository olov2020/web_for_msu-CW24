from datetime import datetime

import pytz

from web_for_msu_back.app import db


class Entrant(db.Model):
    __tablename__ = 'entrant'
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(), nullable=False)
    surname = db.Column(db.String(), nullable=False)
    lastname = db.Column(db.String())  # patronymic
    phone = db.Column(db.String(), nullable=False)
    email = db.Column(db.String(), nullable=False, unique=True)
    classOver = db.Column(db.Integer, nullable=False)
    format = db.Column(db.String(), nullable=False)
    city = db.Column(db.String(), nullable=False)
    agreementAb = db.Column(db.Boolean, nullable=False, default=False)
    created_on = db.Column(db.DateTime(), default=lambda: datetime.now(tz=pytz.timezone('Europe/Moscow')).date())

    def __init__(self, name, surname, lastname, phone, email, classOver, format, city, agreementAb):
        self.name = name,
        self.surname = surname
        self.lastname = lastname
        self.phone = phone
        self.email = email
        self.classOver = classOver
        self.format = format
        self.city = city
        self.agreementAb = agreementAb

    def get_full_name(self):
        return f"{self.name} {self.lastname} {self.surname}"
