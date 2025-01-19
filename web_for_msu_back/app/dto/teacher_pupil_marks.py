from marshmallow import Schema, fields


class TeacherPupilMarksDTO(Schema):
    id = fields.Integer(required=True)
    name = fields.String(required=True)
    marks = fields.List(fields.List(fields.String()), required=True)
    result = fields.Float()
    teacher_result = fields.String()
