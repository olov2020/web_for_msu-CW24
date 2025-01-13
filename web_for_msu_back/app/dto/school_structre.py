from marshmallow import Schema, fields

from web_for_msu_back.app.dto.school_member import SchoolMemberDTO
from web_for_msu_back.app.dto.school_teacher import SchoolTeacherDTO
from web_for_msu_back.app.dto.school_organizer import SchoolOrganizerDTO


class SchoolStructureDTO(Schema):
    directory = fields.List(fields.Nested(SchoolMemberDTO))
    council = fields.List(fields.Nested(SchoolMemberDTO))
    teachers = fields.List(fields.Nested(SchoolTeacherDTO))
    organizers = fields.List(fields.Nested(SchoolOrganizerDTO))
