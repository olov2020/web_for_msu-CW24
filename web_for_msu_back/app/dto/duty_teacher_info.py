from marshmallow import Schema, fields, validate


class DutyTeacherInfoDTO(Schema):
    id = fields.Integer(required=True)
    name = fields.String(required=True)
    phone = fields.String(required=True)
