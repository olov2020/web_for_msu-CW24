from marshmallow import Schema, fields


class TeacherAccountDTO(Schema):
    name = fields.String(required=True)
    surname = fields.String(required=True)
    lastname = fields.String(required=True)
    email = fields.Email(required=True)
    phone = fields.String(required=True)
    university = fields.String(required=True)
    work = fields.String(required=True)
