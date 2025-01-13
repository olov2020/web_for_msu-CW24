from marshmallow import Schema, fields


class TeacherAccountDTO(Schema):
    photo = fields.String(dump_only=True)
    email = fields.Email(required=True)
    phone = fields.String(required=True)
    university = fields.String(required=True)
    work = fields.String(required=True)
