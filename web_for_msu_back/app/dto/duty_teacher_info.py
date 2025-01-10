from marshmallow import Schema, fields, validate


class DutyTeacherInfoDTO(Schema):
    id = fields.Integer()
    name = fields.String()
    email = fields.String()
