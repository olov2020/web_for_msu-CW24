from datetime import datetime
from email.policy import default

from web_for_msu_back.app import db


class CourseItem(db.Model):
    __tablename__ = 'course'
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(), nullable=False)
    year = db.Column(db.Integer, default=datetime.now().year)
    auditory = db.Column(db.String())
    course_review_number = db.Column(db.String)
    direction = db.Column(db.String(), nullable=False)
    emsh_grades = db.Column(db.String(), nullable=False)
    crediting = db.Column(db.String())
    distribution = db.Column(db.String())
    intern_work = db.Column(db.String())
    lesson_time = db.Column(db.String())
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
    teachers = db.relationship('TeacherCourse', back_populates='course')
    formulas = db.relationship('Formula', backref='course')

    def __init__(self, name, year, auditory, course_review_number, direction, emsh_grades, crediting, distribution,
                 intern_work, lesson_time,
                 additional_info_for_auditory, course_purpose, course_objectives, course_features, course_format,
                 target_audience, short_description, number_of_listeners, selection, assessment, platform_format,
                 additional_info, id=None):
        if id is not None:
            self.id = id
        self.name = name
        self.year = year
        self.auditory = auditory
        self.course_review_number = course_review_number
        self.direction = direction
        self.emsh_grades = emsh_grades
        self.crediting = crediting
        self.distribution = distribution
        self.intern_work = intern_work
        self.lesson_time = lesson_time
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
