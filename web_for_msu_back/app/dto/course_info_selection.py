from marshmallow import fields, Schema


class CourseInfoSelectionDTO(Schema):
    id = fields.Int(required=True)
    name = fields.Str()
    emsh_grades = fields.String()
    crediting = fields.Str()
    direction = fields.Str()
    lesson_time = fields.Str()
    selected = fields.String(required=True)
