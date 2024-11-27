from marshmallow import Schema, fields

from web_for_msu_back.app.dto.schedule import ScheduleDTO
from web_for_msu_back.app.dto.formula import FormulaDTO


class CourseInfoDTO(Schema):
    id = fields.Int(required=True)
    name = fields.Str(required=True)
    emsh_grades = fields.String(required=True)
    crediting = fields.Str(required=True)
    direction = fields.Str(required=True)
    teachers = fields.List(fields.Str(), required=True, allow_none=True)
    auditory = fields.Str(required=True, allow_none=True)
    lesson_time = fields.Str(required=True)
    additional_info_for_auditory = fields.String(required=True)  # Дополнительная информация
    course_purpose = fields.String(required=True)  # Цель курса
    course_objectives = fields.String(required=True)  # Задачи курса
    course_features = fields.String(required=True)  # Особенности курса
    course_format = fields.String(required=True)  # Формат курса
    target_audience = fields.String(required=True)  # Целевая аудитория
    short_description = fields.String(required=True)  # Краткое описание
    number_of_listeners = fields.String(required=True)  # Количество слушателей
    selection = fields.String(required=True)  # Отбор
    assessment = fields.String(required=True)  # Оценка
    platform_format = fields.String(required=True)  # Формат курса: онлайн/оффлайн/гибрид
    additional_info = fields.String(required=True)  # Дополнительная информация о курсе
    lessons = fields.List(fields.Nested(ScheduleDTO))  # Список расписаний
    formulas = fields.List(fields.Nested(FormulaDTO))
