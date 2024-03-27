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
    emsh_lesson = db.Column(db.String())
    additional_info_for_auditory = db.Column(db.String())
    course_purpose = db.Column(db.String(), nullable=False)
    course_objectives = db.Column(db.String(), nullable=False)
    course_features = db.Column(db.String(), nullable=False)
    course_format = db.Column(db.String(), nullable=False)
    target_audience = db.Column(db.String(), nullable=False)
    short_description = db.Column(db.String(), nullable=False)
    number_of_listeners = db.Column(db.String(), nullable=False)
    selection = db.Column(db.String(), nullable=False)
    assessment = db.Column(db.String(), nullable=False)
    platform_format = db.Column(db.String(), nullable=False)
    additional_info = db.Column(db.String(), nullable=False)
    pupils = db.relationship('PupilCourse', back_populates='course')

    def __init__(self, name, formula, course_review_number, direction, emsh_grades, distribution, intern_work,
                 emsh_lesson,
                 additional_info_for_auditory, course_purpose, course_objectives, course_features, course_format,
                 target_audience, short_description, number_of_listeners, selection, assessment, platform_format,
                 additional_info):
        self.name = name
        self.formula = formula
        self.course_review_number = course_review_number
        self.direction = direction
        self.emsh_grades = emsh_grades
        self.distribution = distribution
        self.intern_work = intern_work
        self.emsh_lesson = emsh_lesson
        self.additional_info_for_auditory = additional_info_for_auditory
        self.course_purpose = course_purpose
        self.course_objectives = course_objectives
        self.course_features = course_features
        self.course_format = course_format
        self.target_audience = target_audience
        self.short_description = short_description
        self.number_of_listeners = number_of_listeners
        self.selection = selection
        self.assessment = assessment
        self.platform_format = platform_format
        self.additional_info = additional_info
