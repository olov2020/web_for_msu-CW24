from marshmallow import Schema, fields


class LessonScheduleDTO(Schema):
    course_name = fields.String(required=True)
    course_type = fields.String(required=True)
    auditory = fields.String(required=True)
    date = fields.Date(required=True)  # Дата занятия в формате YYYY-MM-DD
    lesson_time = fields.Time(required=True)  # Время урока в формате HH:MM:SS
