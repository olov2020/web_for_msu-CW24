from WEB_FOR_MSU import db


class Formula(db.Model):
    __tablename__ = 'formula'
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(), nullable=False)
    coefficient = db.Column(db.Float(), nullable=False)
    course_id = db.Column(db.Integer, db.ForeignKey('course.id'), nullable=False)
