from WEB_FOR_MSU import db


class Schedule(db.Model):
    __tablename__ = 'schedule'
    id = db.Column(db.Integer, primary_key=True)
    course_id = db.Column(db.Integer, db.ForeignKey('course.id'))
    course = db.relationship('Course', backref=db.backref('lessons', lazy='dynamic'))
    lesson_number = db.Column(db.Integer)
    date = db.Column(db.Date)
    theme = db.Column(db.String())
    plan = db.Column(db.String())
    additional_info = db.Column(db.String())
