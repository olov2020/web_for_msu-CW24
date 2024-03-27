from WEB_FOR_MSU import db


class TeacherCourse(db.Model):
    __tablename__ = 'teacher_course'
    id = db.Column(db.Integer, primary_key=True)
    teacher_id = db.Column(db.Integer, db.ForeignKey('teacher.id'), nullable=False)
    # teacher = db.relationship('Teacher', backref='teacher_courses')
    course_id = db.Column(db.Integer, db.ForeignKey('course.id'), nullable=False)
    # course = db.relationship('Course', backref='teacher_courses')
    year = db.Column(db.Integer, nullable=False)
