from web_for_msu_back import db


class Formula(db.Model):
    __tablename__ = 'formula'
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(), nullable=False)
    coefficient = db.Column(db.Float(), nullable=False)
    course_id = db.Column(db.Integer, db.ForeignKey('course.id'), nullable=False)

    def __init__(self, course_id, name, coefficient):
        self.course_id = course_id
        self.name = name
        self.coefficient = coefficient
