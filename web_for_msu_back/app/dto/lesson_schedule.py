from marshmallow import Schema, fields


class LessonScheduleDTO(Schema):
    course_name = fields.String(required=True)
    course_type = fields.String(required=True, allow_none=True)
    auditory = fields.String(required=True, allow_none=True)
    date = fields.String(required=True)
    lesson_time = fields.String(required=True)
    plan = fields.String(required=True)
