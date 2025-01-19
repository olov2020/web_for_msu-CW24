from marshmallow import Schema, fields


class PupilMarksDTO(Schema):
    dates = fields.List(fields.String(), required=True)
    mark_type_choices = fields.List(fields.String(), required=True)
    marks = fields.List(fields.List(fields.String()), required=True)
    result = fields.Float(required=True)
    teacher_result = fields.String()
