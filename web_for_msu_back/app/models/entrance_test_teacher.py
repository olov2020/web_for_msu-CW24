from web_for_msu_back.app import db


class EntranceTestTeacher(db.Model):
    __tablename__ = 'entrance_test_teacher'
    id = db.Column(db.Integer, primary_key=True)
    teacher_id = db.Column(db.Integer, db.ForeignKey('teacher.id'), nullable=False)
    teacher = db.relationship('Teacher', backref='entrance_tests')
    test_type = db.Column(db.String, nullable=False)
    year = db.Column(db.Integer, nullable=False)
