from marshmallow import fields

from web_for_msu_back.app.dto.course_info import CourseInfoDTO


class CourseInfoPupilDTO(CourseInfoDTO):
    current_mark = fields.Float(allow_none=True)
    mark1 = fields.Integer(allow_none=True)
    mark2 = fields.Integer(allow_none=True)
    credit = fields.String()
