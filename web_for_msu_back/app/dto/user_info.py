from marshmallow import Schema, fields, validate


class UserInfoDTO(Schema):
    name = fields.String(required=True)
    surname = fields.String(required=True)
    status = fields.String(required=True)
    photo = fields.String(required=True)
    patronymic = fields.String(allow_none=True)
    email = fields.Email(allow_none=True)
    password = fields.String(validate=validate.Length(min=8), allow_none=True)
    new_password = fields.String(validate=validate.Length(min=8), allow_none=True)
    phone = fields.String(allow_none=True)
    school = fields.String(allow_none=True)
    admin = fields.Boolean(default=False)
    authorized = fields.Boolean(default=False)
