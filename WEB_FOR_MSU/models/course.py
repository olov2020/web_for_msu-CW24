from WEB_FOR_MSU import db


class Course(db.Model):
    __tablename__ = 'course'
    # TODO add relations for teachers, interns, schedule
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(), nullable=False)
    formula = db.Column(db.String(), nullable=False)
    course_review_number = db.Column(db.String)
    direction = db.Column(db.String(), nullable=False)
    emsh_grades = db.Column(db.String(), nullable=False)
    distribution = db.Column(db.String())
    intern_work = db.Column(db.String())
    additional_info_for_auditory = db.Column(db.String())
    course_purpose = db.Column(db.String(), nullable=False)
    course_objectives = db.Column(db.String(), nullable=False)
    course_features = db.Column(db.String(), nullable=False)
    course_format = db.Column(db.String(), nullable=False)
    target_audience = db.Column(db.String(), nullable=False)
    short_description = db.Column(db.String(), nullable=False)
    number_of_listeners = db.Column(db.Integer, nullable=False)
    selection = db.Column(db.String(), nullable=False)
    assessment = db.Column(db.String(), nullable=False)
    platform_format = db.Column(db.String(), nullable=False)
    additional_info = db.Column(db.String(), nullable=False)
    