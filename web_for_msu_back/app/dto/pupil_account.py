from marshmallow import Schema, fields


class PupilAccountDTO(Schema):
    email = fields.Email(required=True)
    phone = fields.String(required=True)
    school = fields.String(required=True)
