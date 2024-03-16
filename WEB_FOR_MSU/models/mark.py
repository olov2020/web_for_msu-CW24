from WEB_FOR_MSU import db


class Mark(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    pupil_id = db.Column(db.Integer, db.ForeignKey('pupil.id'), nullable=False)
    schedule_id = db.Column(db.Integer, db.ForeignKey('schedule.id'), nullable=False)
    mark = db.Column(db.Integer, nullable=False)
    comment = db.Column(db.String())