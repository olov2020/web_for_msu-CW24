from marshmallow import fields

from web_for_msu_back.dto.course_info import CourseInfoDTO


class CourseInfoPupilDTO(CourseInfoDTO):
    current_mark = fields.Float()