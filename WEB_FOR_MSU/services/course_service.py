from datetime import datetime, timedelta

from openpyxl.reader.excel import load_workbook

from WEB_FOR_MSU import db
from WEB_FOR_MSU.models import User, Pupil, Teacher, Course, PupilCourse, TeacherCourse
from WEB_FOR_MSU.output_models import LessonSchedule
from WEB_FOR_MSU.functions import get_next_monday
import pandas as pd


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
                    course_type = str(assoc.crediting) if user.is_pupil() else 'none'
                    result.append(LessonSchedule(
                        course_name=course.name,
                        course_type=course_type,
                        auditory=course.auditory,
                        date=lesson.date.strftime('%d.%m'),
                        lesson_time=course.lesson_time
                    ))
        return result

    @staticmethod
    def load_from_file(file):
        data = pd.read_excel(file)
        name = data.keys()[1]
        data = data.values
        auditory = data[1][1]
        for i in range(140):
            print(i, end='\t')
            print(data[i][1], data[i][3], sep=';\t\t\t')
        course_review_number = data[23][3]
        direction = data[24][3]
        emsh_grades = data[25][3]
        crediting = data[26][3]
        distribution = data[28][3]
        intern_work = data[30][3]
        lesson_time = data[31][3]
        additional_info_for_auditory = data[32][3]
        course_purpose = data[33][3]
        course_objectives = data[34][3]
        course_features = data[35][3]
        course_format = data[36][3]
        target_audience = data[37][3]
        short_description = data[38][3]
        number_of_listeners = data[39][3]
        selection = data[40][3]
        assessment = data[41][3]
        platform_format = data[42][3]
        additional_info = data[43][3]
        course = Course(
            name=name,
            auditory=auditory,
            course_review_number=course_review_number,
            direction=direction,
            emsh_grades=emsh_grades,
            crediting=crediting,
            distribution=distribution,
            intern_work=intern_work,
            lesson_time=lesson_time,
            additional_info_for_auditory=additional_info_for_auditory,
            course_purpose=course_purpose,
            course_objectives=course_objectives,
            course_features=course_features,
            course_format=course_format,
            target_audience=target_audience,
            short_description=short_description,
            number_of_listeners=number_of_listeners,
            selection=selection,
            assessment=assessment,
            platform_format=platform_format,
            additional_info=additional_info
        )
