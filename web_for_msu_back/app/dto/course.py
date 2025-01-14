from datetime import datetime

from marshmallow import Schema, fields, post_load
from marshmallow.validate import Length, OneOf

from web_for_msu_back.app import db
from web_for_msu_back.app.dto.formula import FormulaDTO
from web_for_msu_back.app.dto.schedule import ScheduleDTO
from web_for_msu_back.app.dto.teacher_course import TeacherCourseDTO
from web_for_msu_back.app.models import Course, Schedule, Formula, TeacherCourse, Teacher


class CourseDTO(Schema):
    id = fields.Integer()  # Идентификатор курса
    name = fields.String(required=True, validate=Length(min=1))  # Название курса
    year = fields.Integer(allow_none=True)
    auditory = fields.String(allow_none=True)  # Аудитория (если есть)
    course_review_number = fields.String(required=True, validate=OneOf(
        ['в первый раз', 'во второй раз', 'в третий раз', 'в четвёртый раз', 'в пятый раз']))  # № рассмотрения курса
    direction = fields.String(required=True, validate=OneOf(['Математика', 'Экономика', 'Третий Путь']))  # Направление
    emsh_grades = fields.String(required=True, validate=OneOf(
        ['8-10', '8-11', '9', '9 - 10', '9 - 11', '10', '10 - 11', '11']))  # Классы ЭМШ
    crediting = fields.String(required=True, validate=OneOf(
        ['зачётный для всех классов', 'зачётный только для 8-и классников', 'зачётный только для 9-ти классников',
         'зачётный только для 10-ти классников', 'зачётный только для 11-ти классников',
         'зачётный только для 8-9-ти классников', 'зачётный только для 8-10-ти классников',
         'зачётный только для 9-10-ти классников', 'зачётный только для 9-11-ти классников',
         'зачётный только для 10-11-ти классников', 'факультативный для всех']))  # Система зачета
    distribution = fields.String(required=True, validate=Length(min=1))  # Распределение
    intern_work = fields.String(allow_none=True)  # Работа со стажёрами
    lesson_time = fields.String(required=True, validate=OneOf(
        ['Понедельник 17:20 - 18:40', 'Понедельник 18:55 - 20:15', 'Вторник 17:20 - 18:40', 'Вторник 18:55 - 20:15',
         'Среда 17:20 - 18:40', 'Среда 18:55 - 20:15', 'Четверг 17:20 - 18:40', 'Четверг 18:55 - 20:15',
         'Пятница 17:20 - 18:40', 'Пятница 18:55 - 20:15', 'Понедельник (2 пары) 17:20 - 20:15',
         'Вторник (2 пары) 17:20 - 20:15', 'Среда (2 пары) 17:20 - 20:15', 'Четверг (2 пары) 17:20 - 20:15',
         'Пятница (2 пары) 17:20 - 20:15']))  # Время урока
    additional_info_for_auditory = fields.String(required=True, validate=Length(min=1))  # Дополнительная информация
    course_purpose = fields.String(required=True, validate=Length(min=1))  # Цель курса
    course_objectives = fields.String(required=True, validate=Length(min=1))  # Задачи курса
    course_features = fields.String(required=True, validate=Length(min=1))  # Особенности курса
    course_format = fields.String(required=True, validate=Length(min=1))  # Формат курса
    target_audience = fields.String(required=True, validate=Length(min=1))  # Целевая аудитория
    short_description = fields.String(required=True, validate=Length(min=1))  # Краткое описание
    number_of_listeners = fields.String(required=True, validate=OneOf(
        ['до 10 человек', 'от 10 до 20 человек', 'от 20 до 30 человек', 'cвыше 30 человек']))  # Количество слушателей
    selection = fields.String(required=True, validate=Length(min=1))  # Отбор
    assessment = fields.String(required=True, validate=Length(min=1))  # Оценка
    platform_format = fields.String(required=True, validate=Length(min=1))  # Формат курса: онлайн/оффлайн/гибрид
    additional_info = fields.String(required=True, validate=Length(min=1))  # Дополнительная информация о курсе
    schedules = fields.List(fields.Nested(ScheduleDTO))  # Список расписаний
    formulas = fields.List(fields.Nested(FormulaDTO))  # Список формул оценивания
    teachers = fields.List(fields.Nested(TeacherCourseDTO))  # Список учителей

    @post_load
    def make_course(self, data, **kwargs):
        course = Course(  # В случае обновления
            name=data["name"],
            year=datetime.now().year,
            auditory=data.get("auditory"),
            course_review_number=data["course_review_number"],
            direction=data["direction"],
            emsh_grades=data["emsh_grades"],
            crediting=data.get("crediting"),
            distribution=data["distribution"],
            intern_work=data.get("intern_work"),
            lesson_time=data["lesson_time"],
            additional_info_for_auditory=data["additional_info_for_auditory"],
            course_purpose=data["course_purpose"],
            course_objectives=data["course_objectives"],
            course_features=data["course_features"],
            course_format=data["course_format"],
            target_audience=data["target_audience"],
            short_description=data["short_description"],
            number_of_listeners=data["number_of_listeners"],
            selection=data["selection"],
            assessment=data["assessment"],
            platform_format=data["platform_format"],
            additional_info=data["additional_info"],
        )

        db.session.add(course)
        db.session.flush()

        year = datetime.now().year
        # Добавляем связанные объекты расписания (schedules)
        if "schedules" in data:
            for schedule_data in data["schedules"]:
                schedule_data.setdefault("course_id", course.id)
                schedule = Schedule(**schedule_data)
                course.lessons.append(schedule)
                if schedule.lesson_number == 1:
                    year = schedule.date.year

        # Добавляем связанные объекты формул (formulas)
        if "formulas" in data:
            # course.formulas = [Formula(**formula_data) for formula_data in data["formulas"]]
            for formula_data in data["formulas"]:
                formula_data.setdefault("course_id", course.id)
                formula = Formula(**formula_data)
                course.formulas.append(formula)

        # Добавляем связанных учителей (teachers)
        if "teachers" in data:
            for teacher_data in data["teachers"]:
                if teacher_data["leads"] is False:
                    continue
                teacher = Teacher.query.get(teacher_data["id"])
                if teacher is None:
                    continue
                course.teachers.append(TeacherCourse(
                    teacher_id=teacher.id,
                    course_id=course.id,
                    year=year))

        course.year = year

        return course, year
