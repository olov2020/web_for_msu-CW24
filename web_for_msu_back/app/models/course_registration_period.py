from datetime import datetime

import pytz

from web_for_msu_back.app import db


class CourseRegistrationPeriod(db.Model):
    __tablename__ = 'course_registration_period'
    id = db.Column(db.Integer, primary_key=True)
    is_open = db.Column(db.Boolean, default=True)
    opened_at = db.Column(db.Date, default=lambda: datetime.now(tz=pytz.timezone('Europe/Moscow')).date())
    closed_at = db.Column(db.Date())
    pupils = db.relationship('PupilCourseRegistration', back_populates='registration')

    def __init__(self, is_open, opened_at, closed_at=None):
        self.is_open = is_open
        self.opened_at = opened_at
        self.closed_at = closed_at
