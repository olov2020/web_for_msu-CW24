from marshmallow import fields

from web_for_msu_back.app.dto.course_info import CourseInfoDTO


class CourseInfoTeacherDTO(CourseInfoDTO):
    pupils_number = fields.Int()
