from marshmallow import fields

from web_for_msu_back.app.dto.school_member import SchoolMemberDTO


class SchoolTeacherDTO(SchoolMemberDTO):
    email = fields.Email()
    subjects = fields.String()
