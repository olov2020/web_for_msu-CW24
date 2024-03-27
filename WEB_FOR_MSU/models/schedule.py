from WEB_FOR_MSU import db


class Schedule(db.Model):
    __tablename__ = 'schedule'
    id = db.Column(db.Integer, primary_key=True)
    course_id = db.Column(db.Integer, db.ForeignKey('course.id'))
    course = db.relationship('Course', backref=db.backref('lessons', lazy='dynamic'))
    lesson_number = db.Column(db.Integer, autoincrement=True, nullable=False)
    date = db.Column(db.Date, nullable=False)
    theme = db.Column(db.String())
    plan = db.Column(db.String())
    additional_info = db.Column(db.String())
    pupils = db.relationship('Mark', back_populates='schedule')
