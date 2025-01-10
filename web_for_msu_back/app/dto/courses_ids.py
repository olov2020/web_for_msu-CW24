from marshmallow import Schema, fields


class CoursesIdsDTO(Schema):
    id = fields.Int()
    name = fields.String()
