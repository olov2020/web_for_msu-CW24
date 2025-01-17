from __future__ import annotations  # Откладывает разрешение аннотаций типов

from datetime import datetime
from typing import TYPE_CHECKING

import flask
import pandas as pd
import pytz
from marshmallow import ValidationError
from sqlalchemy import desc

from web_for_msu_back.app.dto.auditoriums import AuditoriumsDTO
from web_for_msu_back.app.dto.course import CourseDTO
from web_for_msu_back.app.dto.course_info import CourseInfoDTO
from web_for_msu_back.app.dto.course_info_pupil import CourseInfoPupilDTO
from web_for_msu_back.app.dto.course_info_selection import CourseInfoSelectionDTO
from web_for_msu_back.app.dto.course_info_teacher import CourseInfoTeacherDTO
from web_for_msu_back.app.dto.courses_ids import CoursesIdsDTO
from web_for_msu_back.app.dto.lesson_schedule import LessonScheduleDTO
from web_for_msu_back.app.dto.pupil_course_approval_list import PupilCourseApprovalListDTO
from web_for_msu_back.app.dto.pupil_to_add import PupilToAddDTO
from web_for_msu_back.app.functions import get_next_monday
from web_for_msu_back.app.models import *

if TYPE_CHECKING:
    # Импортируем сервисы только для целей аннотации типов
    from web_for_msu_back.app.services import TeacherService


class CourseService:
    def __init__(self, db, teacher_service: TeacherService):
        self.db = db
        self.teacher_service = teacher_service

    def add_course(self, request: flask.Request):
        try:
            course = CourseDTO().load(request.json)
        except ValidationError as e:
            return e.messages, 400
        self.db.session.add(course)
        self.db.session.commit()
        return {'Курс успешно добавлен'}, 201

    def get_pupils(self, course_id: int) -> list[Pupil]:
        course = Course.query.get(course_id)
        if not course:
            return []
        return [pupil_course.pupil for pupil_course in course.pupils if
                pupil_course.approved and not pupil_course.pupil.former]

    def get_teachers(self, course_id: int) -> list[Teacher]:
        course = Course.query.get(course_id)
        if not course:
            return []
        return [assoc.teacher for assoc in course.teachers]

    def get_all_courses(self) -> (dict[int, list[CourseInfoDTO]], int):
        courses = Course.query.all()
        grouped_courses = {}
        for course in courses:
            year: int = course.year
            if year not in grouped_courses:
                grouped_courses[year] = []
            grouped_courses[year].append(self.get_course_info(course))
        return grouped_courses, 200

    def get_courses_ids(self) -> (dict[int, list[CoursesIdsDTO]], int):
        courses = Course.query.all()
        data = []
        for course in courses:
            data.append({
                "id": course.id,
                "name": course.name,
            })
        return CoursesIdsDTO().dump(data, many=True), 200

    def get_all_current_courses(self, pupil_id: int) -> (list[CourseInfoSelectionDTO], int):
        pupil = Pupil.query.get(pupil_id)
        if not pupil:
            return {"error": "Нет такого ученика"}, 404
        pupil_courses = pupil.courses
        pupil_courses_dict = {pupil_course.course_id: pupil_course.crediting for pupil_course in pupil_courses}
        grade = pupil.school_grade
        year = datetime.now(tz=pytz.timezone('Europe/Moscow')).year
        if datetime.now(tz=pytz.timezone('Europe/Moscow')).month in range(7):
            year -= 1
        courses = Course.query.filter(Course.year == year).all()
        available_courses = []
        for course in courses:
            if str(grade) in course.emsh_grades or (
                    grade == 9 and "8" in course.emsh_grades and "10" in course.emsh_grades) or (
                    grade == 10 and "9" in course.emsh_grades and "11" in course.emsh_grades):
                available_courses.append(course)
        courses_for_selection = [self.get_course_info_selection(course, str(pupil_courses_dict.get(course.id, ""))) for
                                 course in available_courses]
        return courses_for_selection, 200

    def add_pupil_to_course(self, course_id: int, pupil: Pupil, crediting_selected: str) -> (dict, int):
        course = Course.query.get(course_id)
        if not course:
            return {"error": f"Курс с id {course_id} не найден"}, 404
        year = datetime.now(tz=pytz.timezone('Europe/Moscow')).year
        grade = pupil.school_grade
        match crediting_selected:
            case "Зачетный":
                if str(grade) in course.crediting or course.crediting == 'зачётный для всех классов' or (
                        grade == 9 and "8" in course.crediting and "10" in course.crediting) or (
                        grade == 10 and "9" in course.crediting and "11" in course.crediting):
                    crediting = True
                else:
                    return {
                        "error": f"Нельзя выбрать курс {course.name} зачетным, так как вы в {str(grade)} классе, "
                                 f"а курс {course.crediting}"}, 404
            case "Незачетный":
                if str(grade) in course.emsh_grades or (
                        grade == 9 and "8" in course.emsh_grades and "10" in course.emsh_grades) or (
                        grade == 10 and "9" in course.emsh_grades and "11" in course.emsh_grades):
                    crediting = False
                else:
                    return {
                        "error": f"Нельзя выбрать курс {course.name} незачетным, так как вы в {str(grade)} классе, "
                                 f"а на курс могут поступить только учащиеся {course.emsh_grades} классов"}, 404
            case _:
                return {"error": "Некорректный тип курса, может быть только Зачетный или Незачетный"}, 404
        pupil_course = PupilCourse.query.filter(PupilCourse.pupil_id == pupil.id,
                                                PupilCourse.course_id == course.id,
                                                PupilCourse.year == year).first()
        if pupil_course:
            pupil_course.crediting = crediting
        else:
            pupil_course = PupilCourse(
                pupil_id=pupil.id,
                course_id=course.id,
                year=year,
                crediting=crediting
            )
            self.db.session.add(pupil_course)
        return {"msg": f"Заявка на курс {course.name} подана"}, 200

    def add_teacher_to_course(self, course_id, teacher_id, year):
        course = Course.query.get(course_id)
        teacher = Teacher.query.get(teacher_id)
        if not course or not teacher:
            return False
        teacher_course = TeacherCourse(teacher_id=teacher_id, course_id=course_id, year=year)
        self.db.session.add(teacher_course)
        self.db.session.commit()
        return True

    def get_lessons_in_week(self, date_start: datetime.date, user_id: int) -> (list[LessonScheduleDTO], int):
        # TODO check that result is sorted correctly
        user = User.query.get(user_id)
        if not user:
            return {"error": "Пользователь не найден"}, 404
        if user.is_teacher():
            associations = user.teacher[0].courses
        else:
            associations = user.pupil[0].courses
        if not associations:
            return {"error": "У пользователя нет курсов"}, 404
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
                        "lesson_time": course.lesson_time,
                        "plan": lesson.plan
                    }
                    result.append((LessonScheduleDTO().dump(data), lesson.date))

        lesson_times = ["Вторник 17:20 - 18:40",
                        "Вторник 18:55 - 20:15",
                        "Среда 17:20 - 18:40",
                        "Среда 18:55 - 20:15",
                        "Четверг 17:20 - 18:40",
                        "Четверг 18:55 - 20:15",
                        "Пятница 17:20 - 18:40",
                        "Пятница 18:55 - 20:15", ]
        result.sort(key=lambda x: (x[1], lesson_times.index(x[0]["lesson_time"])))
        result = [x[0] for x in result]
        return result, 200

    def load_from_file(self, request: flask.Request) -> (dict, int):
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
                else:
                    # Замена переносов строк на конец предложений.
                    sentences = str(data[i][j]).split('\n')
                    for k in range(1, len(sentences)):
                        for m in range(len(sentences[k])):
                            if sentences[k][m].isalpha():
                                sentences[k] = sentences[k][:m] + sentences[k][m].capitalize() + sentences[k][m + 1:]
                                break
                    data[i][j] = '. '.join(sentences)

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
        for i in range(62, 102):
            if data[i][0] is None:
                continue
            lesson_number = data[i][0]
            date = data[i][1]
            theme = data[i][2]
            plan = data[i][3]
            additional_info = data[i][4]
            schedule_data = {
                "lesson_number": lesson_number,
                "date": str(date).split()[0],
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
                if data[ind][j] == 'Формула оценивания':
                    flag = True
                    break
            ind += 1
        ind += 2
        formulas = []
        p = 0
        while p < 10 and flag:
            if data[ind + p][1] is None:
                p += 1
                continue
            name = data[ind + p][1]
            # mark_type
            if data[ind + p][2] is None or data[ind + p][2].lower() == "пусто":
                p += 1
                continue
            mark_type = data[ind + p][2]
            if data[ind + p][3] is None:
                coefficient = 1
            else:
                coefficient = data[ind + p][3].replace(',', '.')
            try:
                coefficient = float(coefficient)
            except ValueError:
                continue
            formula_data = {
                "name": name,
                "mark_type": mark_type,  # mark_type
                "coefficient": coefficient
            }
            formulas.append(formula_data)
            p += 1
        course_data["formulas"] = formulas

        teachers = Teacher.query.all()
        teachers_course = []
        for teacher in teachers:
            teacher_data = {
                "id": teacher.id,
                "name": self.teacher_service.get_full_name(teacher),
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
                    teachers_course[j]["leads"] = True
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

        errors = CourseDTO().validate(course_data)
        if errors:
            return errors, 400
        return course_data, 200

    def create_course(self, request: flask.Request) -> (dict, int):
        data, code = self.load_from_file(request)
        if code != 200:
            return data, code

        try:
            course, year = CourseDTO().load(data)
        except ValidationError as e:
            return e.messages, 400
        self.db.session.add(course)
        self.db.session.commit()

        self.db.session.commit()
        return {'msg': 'Курс успешно добавлен'}, 201

    def update_course(self, course_id: int, request: flask.Request) -> (dict, int):
        # TODO update other parts of course
        course = Course.query.get(course_id)
        if not course:
            return {'error': 'Курс не найден'}, 404

        data, code = self.load_from_file(request)
        if code != 200:
            return data, code

        for key, value in data.items():
            match key:
                case "formulas":
                    formulas = course.formulas
                    j = 0
                    k = 0
                    while j < len(formulas) and k < len(data["formulas"]):
                        formulas[j].name = data["formulas"][k]["name"]
                        formulas[j].coefficient = data["formulas"][k]["coefficient"]
                        formulas[j].mark_type = data["formulas"][k]["mark_type"]
                        j += 1
                        k += 1
                    if len(data["formulas"]) == k:
                        while j < len(formulas):
                            self.db.session.delete(formulas[j])
                            j += 1
                    elif j == len(formulas):
                        for i in range(k, len(data["formulas"])):
                            course.formulas.append(Formula(course_id=course_id,
                                                           name=data["formulas"][i]["name"],
                                                           coefficient=data["formulas"][i]["coefficient"],
                                                           mark_type=data["formulas"][i]["mark_type"]))

                case "schedules":
                    schedules = Schedule.query.where(Schedule.course_id == course_id).order_by(
                        Schedule.lesson_number).all()
                    for i in range(min(len(schedules), len(data["schedules"]))):
                        schedules[i].lesson_number = data["schedules"][i]["lesson_number"]
                        schedules[i].date = data["schedules"][i]["date"]
                        schedules[i].theme = data["schedules"][i]["theme"]
                        schedules[i].plan = data["schedules"][i]["plan"]
                        schedules[i].additional_info = data["schedules"][i]["additional_info"]
                    if len(data["schedules"]) < len(schedules):
                        for i in range(len(data["schedules"]), len(schedules)):
                            self.db.session.delete(schedules[i])
                    elif len(data["schedules"]) > len(schedules):
                        for i in range(len(schedules), len(data["schedules"])):
                            course.lessons.append(Schedule(course_id=course_id,
                                                           lesson_number=data["schedules"][i]["lesson_number"],
                                                           date=data["schedules"][i]["date"],
                                                           theme=data["schedules"][i]["theme"],
                                                           plan=data["schedules"][i]["plan"],
                                                           additional_info=data["schedules"][i]["additional_info"]))
                case "teachers":
                    teachers = course.teachers
                    for teacher in teachers:
                        self.db.session.delete(teacher)
                    for teacher in data["teachers"]:
                        if teacher["leads"]:
                            teacher_course = TeacherCourse(teacher_id=teacher["id"],
                                                           course_id=course_id,
                                                           year=course.year)
                            self.db.session.add(teacher_course)
                case _:
                    setattr(course, key, value)

        self.db.session.commit()
        return {'msg': 'Курс успешно обновлён'}, 200

    def get_lessons(self, course_id: int) -> list[Schedule]:
        course = Course.query.get(course_id)
        if not course:
            return []
        return sorted(course.lessons, key=lambda x: x.lesson_number)

    def get_lessons_first_part(self, course_id: int) -> list[Schedule]:
        course = Course.query.get(course_id)
        if not course:
            return []
        lessons = sorted(course.lessons, key=lambda x: x.lesson_number)
        lessons_in_part = [lesson for lesson in lessons if lesson.date.year == lessons[0].date.year]
        return lessons_in_part

    def get_lessons_second_part(self, course_id: int) -> list[Schedule]:
        course = Course.query.get(course_id)
        if not course:
            return []
        lessons = sorted(course.lessons, key=lambda x: x.lesson_number)
        lessons_in_part = [lesson for lesson in lessons if lesson.date.year == lessons[-1].date.year]
        return lessons_in_part

    def get_course_teachers(self, course):
        if not course:
            return []
        return [self.teacher_service.get_full_name(assoc.teacher) for assoc in
                course.teachers]

    def get_base_course_info(self, course: Course) -> dict:
        data = {
            "id": course.id,
            "name": course.name,
            "emsh_grades": course.emsh_grades,
            "crediting": course.crediting,
            "direction": course.direction,
            "teachers": [self.teacher_service.get_full_name(assoc.teacher) for assoc in course.teachers],
            "auditory": course.auditory,
            "lesson_time": course.lesson_time,
            "additional_info_for_auditory": course.additional_info_for_auditory,
            "course_purpose": course.course_purpose,
            "course_objectives": course.course_objectives,
            "course_features": course.course_features,
            "course_format": course.course_format,
            "target_audience": course.target_audience,
            "short_description": course.short_description,
            "number_of_listeners": course.number_of_listeners,
            "selection": course.selection,
            "assessment": course.assessment,
            "platform_format": course.platform_format,
            "additional_info": course.additional_info,
            "lessons": self.get_lessons_info(course),
            "formulas": self.get_formulas_info(course),

        }
        return data

    def get_lessons_info(self, course: Course) -> list[dict]:
        lessons = []
        for lesson in course.lessons:
            data = {
                "lesson_number": lesson.lesson_number,
                "date": lesson.date,
                "theme": lesson.theme,
                "plan": lesson.plan,
                "additional_info": lesson.additional_info,
            }
            lessons.append(data)
        return lessons

    def get_formulas_info(self, course: Course) -> list[dict]:
        formulas = []
        for formula in course.formulas:
            data = {
                "name": formula.name,
                "coefficient": formula.coefficient
            }
            formulas.append(data)
        return formulas

    def get_course_info(self, course: Course) -> CourseInfoDTO:
        data = self.get_base_course_info(course)
        return CourseInfoDTO().dump(data)

    def get_course_info_pupil(self, pupil_course: PupilCourse, course: Course) -> CourseInfoPupilDTO:
        data = self.get_base_course_info(course)
        data["current_mark"] = pupil_course.current_mark
        data["credit"] = "Зачётный" if pupil_course.crediting else "Не зачётный"
        data["mark1"] = pupil_course.term1_mark
        data["mark2"] = pupil_course.term2_mark
        return CourseInfoPupilDTO().dump(data)

    def get_course_info_teacher(self, course: Course) -> CourseInfoTeacherDTO:
        data = self.get_base_course_info(course)
        data["pupils_number"] = len(self.get_pupils(course.id))
        return CourseInfoTeacherDTO().dump(data)

    def get_course_info_selection(self, course: Course, crediting) -> CourseInfoSelectionDTO:
        if crediting == "True":
            selected = "Зачетный"
        elif crediting == "False":
            selected = "Незачетный"
        else:
            selected = ""
        data = {
            "id": course.id,
            "name": course.name,
            "emsh_grades": course.emsh_grades,
            "crediting": course.crediting,
            "direction": course.direction,
            "auditory": course.auditory,
            "lesson_time": course.lesson_time,
            "selected": selected,
        }
        return CourseInfoSelectionDTO().dump(data)

    def get_pupil_courses(self, user_id: int) -> (list[CourseInfoDTO], int):
        pupil = Pupil.query.filter_by(user_id=user_id).first()
        if not pupil:
            return [], 403
        grouped_courses = {}
        for assoc in pupil.courses:
            # проверка на то, что ученика добавили на курс
            if not assoc.approved:
                continue
            year: int = assoc.course.year
            if year not in grouped_courses:
                grouped_courses[year] = []
            grouped_courses[year].append(self.get_course_info_pupil(assoc, assoc.course))
        return grouped_courses, 200

    def get_teacher_courses(self, user_id: int) -> (list[CourseInfoDTO], int):
        teacher = Teacher.query.filter_by(user_id=user_id).first()
        if not teacher:
            return [], 403
        grouped_courses = {}
        for assoc in teacher.courses:
            year: int = assoc.course.year
            if year not in grouped_courses:
                grouped_courses[year] = []
            grouped_courses[year].append(self.get_course_info_teacher(assoc.course))
        return grouped_courses, 200

    def open_courses_registration(self) -> (dict, int):
        opened = CourseRegistrationPeriod.query.filter_by(is_open=True).all()
        today_date = datetime.now(tz=pytz.timezone('Europe/Moscow')).date()
        for reg in opened:
            reg.is_open = False
            reg.closed_at = today_date
        new_reg = CourseRegistrationPeriod(is_open=True,
                                           opened_at=today_date)
        self.db.session.add(new_reg)
        self.db.session.commit()
        return {"msg": "Регистрация на курсы открыта"}, 200

    def close_courses_registration(self) -> (dict, int):
        opened = CourseRegistrationPeriod.query.filter_by(is_open=True).all()
        if not opened:
            return {"error": "Регистрация на курс не была открыта"}, 404
        today_date = datetime.now(tz=pytz.timezone('Europe/Moscow')).date()
        for reg in opened:
            reg.is_open = False
            reg.closed_at = today_date
        self.db.session.commit()
        return {"msg": "Регистрация на курсы закрыта"}, 200

    def is_courses_registration_opened(self) -> (bool, int):
        opened = CourseRegistrationPeriod.query.filter_by(is_open=True).all()
        if opened:
            return True, 200
        return False, 200

    def add_pupil_to_courses(self, pupil_id: int, request: flask.Request):
        if not self.is_courses_registration_opened():
            return {"error": "Сейчас нельзя записаться на курс"}
        pupil = Pupil.query.get(pupil_id)
        if not pupil:
            return {"error": "Ученик не найден"}
        data = request.json
        courses = []
        for key in data:
            course_id = key.split()[-1]
            if not course_id.isdigit():
                continue
            course_id = int(course_id)
            courses.append({"id": course_id, "selected": data[key]})
        selected_courses = [course for course in courses if course["selected"] != ""]
        crediting_courses = [course for course in courses if course["selected"] == "Зачетный"]
        crediting_count = len(crediting_courses)
        if crediting_count != 2:
            return {"error": f"Надо выбрать два курса зачетными, вы выбрали {str(crediting_count)}"}, 404
        first_crediting_id = crediting_courses[0]["id"]
        second_crediting_id = crediting_courses[1]["id"]
        first_crediting = Course.query.get(first_crediting_id)
        second_crediting = Course.query.get(second_crediting_id)
        if not first_crediting:
            return {"error": f"Курс с id {first_crediting_id} не найден"}, 404
        if not second_crediting:
            return {"error": f"Курс с id {second_crediting_id} не найден"}, 404
        if first_crediting.direction == second_crediting.direction:
            return {
                "error": f"Нельзя выбирать два зачетных курса одного направления, "
                         f"вы выбрали оба курса направления {first_crediting.direction}"}, 404
        for course in selected_courses:
            response, code = self.add_pupil_to_course(course["id"], pupil, course["selected"])
            if code != 200:
                return response, code
        self.db.session.commit()
        return {"msg": "Заявки успешно поданы на все курсы"}, 200

    def approve_pupil_course(self, course_id: int, pupil_id: int) -> (dict, int):
        course = Course.query.get(course_id)
        pupil = Pupil.query.get(pupil_id)
        if not course:
            return {"error": "Нет такого курса"}, 404
        if not pupil:
            return {"error": "Нет такого ученика"}, 404
        pupil_course = PupilCourse.query.filter(PupilCourse.pupil_id == pupil_id,
                                                PupilCourse.course_id == course_id).first()
        if not pupil_course:
            return {"error": "Этот ученик не подавал заявку на этот курс"}, 404
        pupil_course.approved = True
        self.db.session.commit()
        return {"msg": "Ученик успешно добавлен на курс"}, 200

    def delete_pupil_course(self, course_id: int, pupil_id: int, existing=False) -> (dict, int):
        course = Course.query.get(course_id)
        pupil = Pupil.query.get(pupil_id)
        if not course:
            return {"error": "Нет такого курса"}, 404
        if not pupil:
            return {"error": "Нет такого ученика"}, 404
        pupil_course = PupilCourse.query.filter(PupilCourse.pupil_id == pupil_id,
                                                PupilCourse.course_id == course_id).first()
        if not pupil_course:
            return {"error": "Этот ученик не подавал заявку на этот курс"}, 404
        if not existing and pupil_course.approved:
            return {"error": "Этот ученик уже записан на курс"}, 404
        if pupil_course.crediting:
            return {
                "error": "Для ученика этот курс зачетный, чтобы отчислить его с курса, его необходимо отчислить"}, 404
        marks = Mark.query.filter(Mark.course_id == course_id, Mark.pupil_id == pupil_id).all()
        for mark_to_delete in marks:
            self.db.session.delete(mark_to_delete)
        self.db.session.delete(pupil_course)
        self.db.session.commit()
        return {"msg": "Ученику отказано в зачислении на курс"}, 200

    def get_pupils_list(self, course_id: int) -> (dict, int):
        course = Course.query.get(course_id)
        if not course:
            return {"error": "Нет такого курса"}, 404
        data = []
        for pupil_course in course.pupils:
            if pupil_course.approved:
                continue
            pupil = pupil_course.pupil
            pupil_data = {
                "id": pupil.id,
                "name": f'{pupil.surname} {pupil.name} {pupil.patronymic}',
                "grade": pupil.school_grade,
            }
            data.append(pupil_data)

        return PupilCourseApprovalListDTO().dump(data, many=True), 200

    def change_auditoriums(self, request: flask.Request) -> (dict, int):
        data = request.json
        if not data:
            return {"msg": "Аудитории для обновления не переданы"}, 200
        for key in data.keys():
            auditory = data[key]
            course_id = int(key.split()[1])
            course = Course.query.get(course_id)
            if not course:
                continue
            course.auditory = auditory
        self.db.session.commit()
        return {"msg": "Аудитории обновлены"}, 200

    def get_auditoriums(self) -> (list[AuditoriumsDTO], int):
        year = datetime.now(tz=pytz.timezone('Europe/Moscow')).year
        years_range = [year - 1, year, year + 1]
        courses = Course.query.filter(Course.year.in_(years_range)).order_by(desc(Course.year)).all()
        data = []
        for course in courses:
            data.append({
                "id": course.id,
                "name": course.name,
                "lesson_time": course.lesson_time,
                "auditory": course.auditory,
            })
        return AuditoriumsDTO().dump(data, many=True), 200

    def add_pupil_to_course_by_teacher(self, course_id: int, pupil_id: int, user_id: int, is_admin: bool) \
            -> (dict, int):
        if not is_admin:
            teacher = Teacher.query.filter(Teacher.user_id == user_id).first()
            if not teacher:
                return {"error": "Вы не можете добавить ученика на курс, на котором не преподаете"}, 404
        course = Course.query.get(course_id)
        pupil = Pupil.query.get(pupil_id)
        if not course:
            return {"error": "Нет такого курса"}, 404
        if not pupil:
            return {"error": "Нет такого ученика"}, 404
        pupil_course = PupilCourse.query.filter(PupilCourse.pupil_id == pupil_id,
                                                PupilCourse.course_id == course_id).first()
        if pupil_course:
            return {"error": "Этот ученик уже подал заявку на этот курс"}, 404
        pupil_course = PupilCourse(pupil_id, course_id, course.year, approved=True)
        self.db.session.add(pupil_course)
        self.db.session.commit()
        return {"msg": "Ученик успешно зачислен на курс"}, 200

    def get_course_pupils_to_delete(self, course_id: int) -> (list[PupilToAddDTO], int):
        pupils = self.get_pupils(course_id)
        data = []
        for pupil in pupils:
            data.append(
                {"id": pupil.id,
                 "name": pupil.surname + ' ' + pupil.name + ' ' + pupil.patronymic,
                 "grade": pupil.school_grade}
            )
        return PupilToAddDTO().dump(data, many=True), 200

    def delete_pupil_from_course_by_teacher(self, course_id: int, pupil_id: int, user_id: int) \
            -> (dict, int):
        teacher = Teacher.query.filter(Teacher.user_id == user_id).first()
        if not teacher:
            return {"error": "Вы не можете добавить ученика на курс, на котором не преподаете"}, 404
        return self.delete_pupil_course(course_id, pupil_id, True)
