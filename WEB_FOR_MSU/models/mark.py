from WEB_FOR_MSU import db


class Mark(db.Model):
    __tablename__ = 'mark'
    id = db.Column(db.Integer, primary_key=True)
    pupil_id = db.Column(db.Integer, db.ForeignKey('pupil.id'), nullable=False)
    schedule_id = db.Column(db.Integer, db.ForeignKey('schedule.id'), nullable=False)
    pupil = db.relationship('Pupil', back_populates='schedules')
    schedule = db.relationship('Schedule', back_populates='pupils')
    mark = db.Column(db.String(), nullable=False)
    comment = db.Column(db.String())
    course_id = db.Column(db.Integer, db.ForeignKey('course.id'), nullable=False)

    def __init__(self, schedule_id, pupil_id, mark, comment, course_id):
        self.schedule_id = schedule_id
        self.pupil_id = pupil_id
        self.mark = mark
        self.comment = comment
        self.course_id = course_id
