from marshmallow import Schema, fields, validates_schema, ValidationError

from web_for_msu_back.app.dto.teacher_pupil_marks import TeacherPupilMarksDTO


class MarksDTO(Schema):
    dates = fields.List(fields.String(), required=True)
    mark_type_choices = fields.List(fields.String(), required=True)  # Список возможных типов отметок
    mark_types = fields.List(fields.String(), required=True)  # Список текущих значений для каждого элемента

    pupils = fields.List(fields.Nested(TeacherPupilMarksDTO), required=True)
    visits = fields.List(fields.String(), required=True)
    averages = fields.List(fields.Float(), required=True)

    @validates_schema
    def validate_mark_type(self, data, **kwargs):
        # Проверяем, что каждое значение mark_type входит в mark_type_choices
        for idx, mark in enumerate(data['mark_types']):
            if mark not in data['mark_type_choices']:
                raise ValidationError(f'mark_type[{idx}] должно быть одним из значений mark_type_choices')
