from marshmallow import Schema, fields


class TeacherAccountDTO(Schema):
    email = fields.Email(required=True)
    phone = fields.String(required=True)
    university = fields.String(required=True)
    work = fields.String(required=True)
