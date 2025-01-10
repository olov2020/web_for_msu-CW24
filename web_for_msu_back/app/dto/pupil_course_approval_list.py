from marshmallow import Schema, fields


class PupilCourseApprovalListDTO(Schema):
    id = fields.Integer(required=True, dump_only=True)
    name = fields.String(required=True)
    grade = fields.Integer(required=True, default=False)
