from WEB_FOR_MSU import db


class PupilCourse(db.Model):
    __tablename__ = 'pupil_course'
    id = db.Column(db.Integer, primary_key=True)
    pupil_id = db.Column(db.Integer, db.ForeignKey('pupil.id'), nullable=False)
    course_id = db.Column(db.Integer, db.ForeignKey('course.id'), nullable=False)
    year = db.Column(db.Integer, nullable=False)
    crediting = db.Column(db.Boolean, default=False)
    finished = db.Column(db.Boolean, default=False)
    term1_mark = db.Column(db.Integer)
    term2_mark = db.Column(db.Integer)
