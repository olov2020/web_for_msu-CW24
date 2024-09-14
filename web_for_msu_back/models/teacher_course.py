from web_for_msu_back import db


class TeacherCourse(db.Model):
    __tablename__ = 'teacher_course'
    id = db.Column(db.Integer, primary_key=True)
    teacher_id = db.Column(db.Integer, db.ForeignKey('teacher.id'), nullable=False)
    course_id = db.Column(db.Integer, db.ForeignKey('course.id'), nullable=False)
    teacher = db.relationship('Teacher', back_populates='courses')
    course = db.relationship('Course', back_populates='teachers')
    year = db.Column(db.Integer, nullable=False)

    def __init__(self, teacher_id, course_id, year):
        self.teacher_id = teacher_id
        self.course_id = course_id
        self.year = year
