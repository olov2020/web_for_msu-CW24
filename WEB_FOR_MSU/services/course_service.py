from datetime import datetime, timedelta

from WEB_FOR_MSU import db
from WEB_FOR_MSU.models import User, Pupil, Teacher, Course, PupilCourse, TeacherCourse
from WEB_FOR_MSU.output_models import LessonSchedule
from WEB_FOR_MSU.functions import get_next_monday


class CourseService:
    @staticmethod  # TODO: check form fields
    def add_course(form):
        course = Course(
            name=form.name.data,
            auditory=form.auditory.data,
            formula=form.formula.data,
            course_review_number=form.course_review_number.data,
            direction=form.direction.data,
            emsh_grades=form.emsh_grades.data,
            distribution=form.distribution.data,
            intern_work=form.intern_work.data,
            lesson_time=form.lesson_time.data,
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

    @staticmethod
    def get_pupils(course_id):
        course = Course.query.get(course_id)
        if not course:
            return []
        return [assoc.pupil for assoc in course.pupils]

    @staticmethod
    def get_teachers(course_id):
        course = Course.query.get(course_id)
        if not course:
            return []
        return [assoc.teacher for assoc in course.teachers]

    @staticmethod
    def get_all_courses():
        return Course.query.all()

    @staticmethod
    def add_pupil_to_course(course_id, pupil_id, year):
        course = Course.query.get(course_id)
        pupil = Pupil.query.get(pupil_id)
        if not course or not pupil:
            return False
        pupil_course = PupilCourse(pupil_id=pupil_id, course_id=course_id, year=year)
        db.session.add(pupil_course)
        db.session.commit()
        return True

    @staticmethod
    def add_teacher_to_course(course_id, teacher_id, year):
        course = Course.query.get(course_id)
        teacher = Teacher.query.get(teacher_id)
        if not course or not teacher:
            return False
        teacher_course = TeacherCourse(teacher_id=teacher_id, course_id=course_id, year=year)
        db.session.add(teacher_course)
        db.session.commit()
        return True

    @staticmethod
    def get_lessons_in_week(date_start, user_id):
        user = User.query.get(user_id)
        if not user:
            return []
        if user.is_teacher():
            associations = user.teacher[0].courses
        else:
            associations = user.pupil[0].courses
        if not associations:
            return []
        result = []
        for assoc in associations:
            course = assoc.course
            lessons = course.lessons
            for lesson in lessons:
                if date_start <= lesson.date < get_next_monday(date_start):
                    result.append(LessonSchedule(
                        course_name=course.name,
                        course_type=str(assoc.crediting),
                        auditory=course.auditory,
                        date=lesson.date.strftime('%d.%m'),
                        lesson_time=course.lesson_time
                    ))
        return result
