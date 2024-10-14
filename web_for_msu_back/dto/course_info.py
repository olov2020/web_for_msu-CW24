from marshmallow import Schema, fields


class CourseInfoDTO(Schema):
    id = fields.Int(required=True)
    name = fields.Str(required=True)
    emsh_grades = fields.String(required=True)
    crediting = fields.Str(required=True)
    direction = fields.Str(required=True)
    teachers = fields.List(fields.Str(), required=True)
    auditory = fields.Str(required=True, allow_none=True)
    lesson_time = fields.Str(required=True)
