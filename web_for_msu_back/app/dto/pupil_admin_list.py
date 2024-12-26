from marshmallow import Schema, fields


class PupilAdminListDTO(Schema):
    id = fields.Integer(required=True, dump_only=True)
    name = fields.String(required=True)
    email = fields.Email(required=True)
    grade = fields.Integer(required=True)
    status = fields.String(required=True)
    authorized = fields.Boolean(required=True, default=False)
