from marshmallow import Schema, fields


class TeacherAdminListDTO(Schema):
    id = fields.Integer(required=True, dump_only=True)
    name = fields.String(required=True)
    email = fields.Email(required=True)
    roles = fields.List(fields.String(), required=True)
    authorized = fields.Boolean(required=True, default=False)
