from datetime import datetime

import flask
import pandas as pd
from marshmallow import ValidationError

from web_for_msu_back import db
from web_for_msu_back.dto.course import CourseDTO
from web_for_msu_back.dto.course_info import CourseInfoDTO
from web_for_msu_back.dto.course_info_pupil import CourseInfoPupilDTO
from web_for_msu_back.dto.course_info_teacher import CourseInfoTeacherDTO
from web_for_msu_back.dto.lesson_schedule import LessonScheduleDTO
from web_for_msu_back.functions import get_next_monday
from web_for_msu_back.models import User, Pupil, Teacher, Course, PupilCourse, TeacherCourse, Schedule, Formula
from web_for_msu_back.output_models import LessonSchedule
from web_for_msu_back.output_models.course_info import CourseInfo
from web_for_msu_back.services.teacher_service import TeacherService


class CourseService:
    @staticmethod
    def add_course(request: flask.Request):
        try:
            course = CourseDTO().load(request.form)
        except ValidationError as e:
            return e.messages, 400
        db.session.add(course)
        db.session.commit()
        return {'Курс успешно добавлен'}, 201

    @staticmethod
    def get_pupils(course_id: int) -> list[Pupil]:
        course = Course.query.get(course_id)
        if not course:
            return []
        return [assoc.pupil for assoc in course.pupils]

    @staticmethod
    def get_teachers(course_id: int) -> list[Teacher]:
        course = Course.query.get(course_id)
        if not course:
            return []
        return [assoc.teacher for assoc in course.teachers]

    @staticmethod
    def get_all_courses() -> list[CourseInfoDTO]:
        courses = Course.query.all()
        return [CourseService.get_course_info(course) for course in courses]

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
    def get_lessons_in_week(date_start: datetime.date, user_id: int) -> (list[LessonScheduleDTO], int):
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
                    data = {
                        "course_name": course.name,
                        "course_type": course_type,
                        "auditory": course.auditory,
                        "date": lesson.date.strftime('%d.%m'),
                        "lesson_time": course.lesson_time
                    }
                    result.append(LessonScheduleDTO().load(data))
        if not result:
            return {"error": "Занятий нет"}, 404
        return result, 200

    @staticmethod
    def load_from_file(request: flask.Request) -> (dict, int):
        file = request.files['file']
        try:
            data = pd.read_excel(file)
        except Exception as e:
            return {"error": "Неправильный формат файла"}, 400
        name = data.keys()[1]
        data = data.values
        for i in range(len(data)):
            for j in range(len(data[i])):
                if str(data[i][j]) == 'nan':
                    data[i][j] = None
        auditory = None
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

        course_data = {
            "name": name,
            "auditory": auditory,
            "course_review_number": course_review_number,
            "direction": direction,
            "emsh_grades": emsh_grades,
            "crediting": crediting,
            "distribution": distribution,
            "intern_work": intern_work,
            "lesson_time": lesson_time,
            "additional_info_for_auditory": additional_info_for_auditory,
            "course_purpose": course_purpose,
            "course_objectives": course_objectives,
            "course_features": course_features,
            "course_format": course_format,
            "target_audience": target_audience,
            "short_description": short_description,
            "number_of_listeners": number_of_listeners,
            "selection": selection,
            "assessment": assessment,
            "platform_format": platform_format,
            "additional_info": additional_info
        }

        schedules = []
        for i in range(48, 87):
            if data[i][0] is None:
                continue
            lesson_number = data[i][0]
            date = data[i][1]
            theme = data[i][2]
            plan = data[i][3]
            additional_info = data[i][4]
            schedule_data = {
                "lesson_number": lesson_number,
                "date": date.date(),
                "theme": theme,
                "plan": plan,
                "additional_info": additional_info
            }
            schedules.append(schedule_data)
        course_data["schedules"] = schedules

        ind = 0
        flag = False
        while ind < len(data):
            if flag:
                break
            for j in range(len(data[ind])):
                if data[ind][j] == 'Формула':
                    flag = True
                    break
            ind += 1
        ind += 2
        formulas = []
        while ind < len(data) and flag:
            if data[ind][1] is None:
                break
            name = data[ind][1]
            coefficient = data[ind][3].replace(',', '.')
            try:
                coefficient = float(coefficient)
            except ValueError:
                continue
            formula_data = {
                "formula_name": name,
                "coefficient": coefficient
            }
            formulas.append(formula_data)
            ind += 1
        course_data["formulas"] = formulas

        teachers = Teacher.query.all()
        teachers_course = []
        for teacher in teachers:
            teacher_data = {
                "id": teacher.id,
                "name": TeacherService.get_full_name(teacher),
                "leads": False
            }
            teachers_course.append(teacher_data)
        for i in range(3, 14, 5):
            if data[i + 4][3] is None:
                continue
            teacher = Teacher.query.filter_by(email=data[i + 4][3]).first()
            if teacher is None:
                continue

            for j in range(len(teachers_course)):
                if teachers_course[j]["id"] == teacher.id:
                    teachers_course[i]["leads"] = True
                    break

        other = data[18][3]
        if other is not None:
            other = other.split(';')
            for person in other:
                person = person.split(',')
                email = person[-1].strip()
                teacher = Teacher.query.filter_by(email=email).first()
                if teacher is None:
                    continue
                for j in range(len(teachers_course)):
                    if teachers_course[j]["id"] == teacher.id:
                        teachers_course[j]["leads"] = True
                        break
        course_data["teachers"] = teachers_course

        try:
            course_dto = CourseDTO.from_dict(course_data)
        except ValidationError as e:
            return e.messages, 400
        return course_dto, 200

    @staticmethod
    def create_course(request: flask.Request) -> (dict, int):
        try:
            course, year = CourseDTO().load(request.form)
        except ValidationError as e:
            return e.messages, 400
        db.session.add(course)
        db.session.commit()
        pupils = Pupil.query.all()
        for pupil in pupils:
            grade = pupil.school_grade
            if str(grade) in course.crediting or course.crediting == 'зачётный для всех классов':
                crediting = True
            else:
                crediting = False
            pupil_course = PupilCourse(
                pupil_id=pupil.id,
                course_id=course.id,
                year=year,
                crediting=crediting
            )
            db.session.add(pupil_course)
        db.session.commit()
        return {'Курс успешно добавлен'}, 201

    @staticmethod
    def get_lessons(course_id):
        course = Course.query.get(course_id)
        if not course:
            return []
        return sorted(course.lessons, key=lambda x: x.lesson_number)

    @staticmethod
    def get_course_teachers(course):
        if not course:
            return []
        return [TeacherService.get_full_name(assoc.teacher) for assoc in
                course.teachers]

    @staticmethod
    def get_course_info(course: Course) -> CourseInfoDTO:
        data = {
            "id": course.id,
            "name": course.name,
            "grades"
            "crediting": course.crediting,
            "direction": course.direction,
            "teachers": course.teachers,
            "auditory": course.auditory,
            "lesson_time": course.lesson_time
        }
        return CourseInfoDTO().load(data)

    @staticmethod
    def get_course_info_pupil(pupil_course: PupilCourse, course: Course) -> CourseInfoPupilDTO:
        data = {
            "id": course.id,
            "name": course.name,
            "grades"
            "crediting": course.crediting,
            "direction": course.direction,
            "teachers": course.teachers,
            "auditory": course.auditory,
            "lesson_time": course.lesson_time,
            "current_mark": pupil_course.current_mark
        }
        return CourseInfoPupilDTO().load(data)

    @staticmethod
    def get_course_info_teacher(course: Course) -> CourseInfoTeacherDTO:
        pupils_number = len(CourseService.get_pupils(course.id))
        data = {
            "id": course.id,
            "name": course.name,
            "grades"
            "crediting": course.crediting,
            "direction": course.direction,
            "teachers": course.teachers,
            "auditory": course.auditory,
            "lesson_time": course.lesson_time,
            "pupils_number": pupils_number
        }
        return CourseInfoTeacherDTO().load(data)

    @staticmethod
    def get_pupil_courses(user_id: int) -> (list[CourseInfoDTO], int):
        pupil = Pupil.query.filter_by(user_id=user_id).first()
        if not pupil:
            return [], 403
        return [CourseService.get_course_info_pupil(assoc, assoc.course) for assoc in pupil.courses], 200

    @staticmethod
    def get_teacher_courses(user_id: int) -> (list[CourseInfoDTO], int):
        teacher = Teacher.query.filter_by(user_id=user_id).first()
        if not teacher:
            return []
        return [CourseService.get_course_info_teacher(assoc.course) for assoc in teacher.courses]
