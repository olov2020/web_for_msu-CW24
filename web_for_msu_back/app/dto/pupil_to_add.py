from marshmallow import Schema, fields


class PupilToAddDTO(Schema):
    id = fields.Integer(dump_only=True)
    name = fields.String()
    grade = fields.Integer()
