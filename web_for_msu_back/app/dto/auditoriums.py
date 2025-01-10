from marshmallow import Schema, fields


class AuditoriumsDTO(Schema):
    id = fields.Int(dump_only=True)
    name = fields.String()
    lesson_time = fields.String()
    auditory = fields.String()
