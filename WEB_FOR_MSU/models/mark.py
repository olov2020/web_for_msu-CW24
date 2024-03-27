from WEB_FOR_MSU import db


class Mark(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    pupil_id = db.Column(db.Integer, db.ForeignKey('pupil.id'), nullable=False)
    schedule_id = db.Column(db.Integer, db.ForeignKey('schedule.id'), nullable=False)
    pupil = db.relationship('Pupil', back_populates='schedules')
    schedule = db.relationship('Schedule', back_populates='pupils')
    mark = db.Column(db.String(), nullable=False)
    comment = db.Column(db.String())
