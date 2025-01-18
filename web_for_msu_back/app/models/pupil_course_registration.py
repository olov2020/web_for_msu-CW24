from web_for_msu_back.app import db


class PupilCourseRegistration(db.Model):
    __tablename__ = 'pupil_course_registration'
    id = db.Column(db.Integer, primary_key=True)
    pupil_id = db.Column(db.Integer, db.ForeignKey('pupil.id'), nullable=False)
    registration_id = db.Column(db.Integer, db.ForeignKey('course_registration_period.id'), nullable=False)
    pupil = db.relationship('Pupil', back_populates='registrations')
    registration = db.relationship('CourseRegistrationPeriod', back_populates='pupils')

    def __init__(self, pupil_id, registration_id):
        self.pupil_id = pupil_id
        self.registration_id = registration_id
