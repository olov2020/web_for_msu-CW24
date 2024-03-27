from WEB_FOR_MSU import db
from WEB_FOR_MSU.models import User, Pupil, Teacher, Course


class CourseService:
    @staticmethod  # TODO: check form fields
    def add_course(form):
        course = Course(
            name=form.name.data,
            formula=form.formula.data,
            course_review_number=form.course_review_number.data,
            direction=form.direction.data,
            emsh_grades=form.emsh_grades.data,
            distribution=form.distribution.data,
            intern_work=form.intern_work.data,
            emsh_lesson=form.emsh_lesson.data,
            additional_info_for_auditory=form.additional_info_for_auditory.data,
            course_purpose=form.course_purpose.data,
            course_objectives=form.course_objectives.data,
            course_features=form.course_features.data,
            course_format=form.course_format.data,
            target_audience=form.target_audience.data,
            short_description=form.short_description.data,
            number_of_listeners=form.number_of_listeners.data,
            selection=form.selection.data,
            assessment=form.assessment.data,
            platform_format=form.platform_format.data,
            additional_info=form.additional_info.data
        )
        db.session.add(course)
        db.session.commit()
        return course

