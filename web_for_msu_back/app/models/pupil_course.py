from web_for_msu_back.app import db


class PupilCourse(db.Model):
    __tablename__ = 'pupil_course'
    id = db.Column(db.Integer, primary_key=True)
    pupil_id = db.Column(db.Integer, db.ForeignKey('pupil.id'), nullable=False)
    course_id = db.Column(db.Integer, db.ForeignKey('course.id'), nullable=False)
    pupil = db.relationship('Pupil', back_populates='courses')
    course = db.relationship('Course', back_populates='pupils')
    year = db.Column(db.Integer, nullable=False)
    crediting = db.Column(db.Boolean, default=False)
    finished = db.Column(db.Boolean, default=False)
    current_mark = db.Column(db.Float)
    term1_mark = db.Column(db.Integer)
    term2_mark = db.Column(db.Integer)

    def __init__(self, pupil_id, course_id, year, crediting=False, finished=False, current_mark=None, term1_mark=None,
                 term2_mark=None):
        self.pupil_id = pupil_id
        self.course_id = course_id
        self.year = year
        self.crediting = crediting
        self.finished = finished
        self.current_mark = current_mark
        self.term1_mark = term1_mark
        self.term2_mark = term2_mark
