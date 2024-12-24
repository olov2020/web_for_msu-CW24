from marshmallow import Schema, fields, validate


class TestTeacherInfoDTO(Schema):
    id = fields.Integer(required=True)
    name = fields.String(required=True)
    phone = fields.String(required=True)
