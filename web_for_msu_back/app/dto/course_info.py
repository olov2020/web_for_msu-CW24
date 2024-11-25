from marshmallow import Schema, fields

from dto.schedule import ScheduleDTO


class CourseInfoDTO(Schema):
    id = fields.Int(required=True)
    name = fields.Str(required=True)
    emsh_grades = fields.String(required=True)
    crediting = fields.Str(required=True)
    direction = fields.Str(required=True)
    teachers = fields.List(fields.Str(), required=True, allow_none=True)
    auditory = fields.Str(required=True, allow_none=True)
    lesson_time = fields.Str(required=True)
    lessons = fields.List(fields.Nested(ScheduleDTO))  # Список расписаний