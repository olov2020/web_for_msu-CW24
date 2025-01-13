from marshmallow import Schema, fields


class PupilAccountDTO(Schema):
    photo = fields.String(dump_only=True)
    email = fields.Email(required=True)
    phone = fields.String(required=True)
    school = fields.String(required=True)
