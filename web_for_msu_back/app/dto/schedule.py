from marshmallow import Schema, fields


class ScheduleDTO(Schema):
    lesson_number = fields.Int(required=True)
    date = fields.Date(required=True)
    theme = fields.String()
    plan = fields.String()
    additional_info = fields.String(allow_none=True)
