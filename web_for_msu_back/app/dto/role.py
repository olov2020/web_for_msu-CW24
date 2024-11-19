from marshmallow import Schema, fields


class RoleDTO(Schema):
    name = fields.String(required=True)
