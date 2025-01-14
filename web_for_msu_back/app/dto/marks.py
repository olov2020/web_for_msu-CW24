from marshmallow import Schema, fields

from web_for_msu_back.app.dto.teacher_pupil_marks import TeacherPupilMarksDTO


class MarksDTO(Schema):
    dates = fields.List(fields.String(), required=True)
    mark_type_choices = fields.List(fields.String(), required=True)  # Список возможных типов отметок
    pupils = fields.List(fields.Nested(TeacherPupilMarksDTO), required=True)
    visits = fields.List(fields.String(), required=True)
