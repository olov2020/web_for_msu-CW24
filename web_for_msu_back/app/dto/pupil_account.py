from marshmallow import Schema, fields


class PupilAccountDTO(Schema):
    name = fields.String(required=True)
    surname = fields.String(required=True)
    lastname = fields.String(required=True)
    email = fields.Email(required=True)
    phone = fields.String(required=True)
    school = fields.String(required=True)
