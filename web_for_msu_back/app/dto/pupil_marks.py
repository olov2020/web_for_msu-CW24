from marshmallow import Schema, fields


class PupilMarksDTO(Schema):
    course_name = fields.String(required=True)
    dates = fields.List(fields.String(), required=True)
    mark_types = fields.List(fields.String(), required=True)
    marks = fields.List(fields.String(), required=True)
    skips = fields.Int(required=True)
    result = fields.Float(required=True)
