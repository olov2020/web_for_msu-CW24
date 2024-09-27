from marshmallow import Schema, fields


class CourseInfoDTO(Schema):
    id = fields.Int(required=True)
    name = fields.Str(required=True)
    grades = fields.List(fields.Int(), required=True)
    crediting = fields.Str(required=True)
    direction = fields.Str(required=True)
    teachers = fields.List(fields.Str(), required=True)
    auditory = fields.Str(required=True)
    lesson_time = fields.Str(required=True)
