from marshmallow import fields

from web_for_msu_back.app.dto.school_member import SchoolMemberDTO


class SchoolOrganizerDTO(SchoolMemberDTO):
    email = fields.Email()
    what = fields.String()
