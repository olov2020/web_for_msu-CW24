from datetime import datetime

import pytz

from web_for_msu_back.app import db


class News(db.Model):
    __tablename__ = 'news'
    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(255), nullable=False)
    description = db.Column(db.Text)
    date = db.Column(db.Date, default=lambda: datetime.now(tz=pytz.timezone('Europe/Moscow')).date())
    photo = db.Column(db.String(255))

    def __init__(self, title, description, date, photo):
        self.title = title
        self.description = description
        self.date = date
        self.photo = photo
