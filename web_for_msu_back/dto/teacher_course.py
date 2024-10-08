from marshmallow import Schema, fields


class TeacherCourseDTO(Schema):
    id = fields.Int(required=True)
    name = fields.String(required=True)
    leads = fields.Bool()
