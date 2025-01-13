from marshmallow import Schema, fields


class SchoolMemberDTO(Schema):
    id = fields.Int()
    name = fields.String()
