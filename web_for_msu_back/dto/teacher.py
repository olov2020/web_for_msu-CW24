from marshmallow import Schema, fields, post_load

from web_for_msu_back.models import Teacher


class TeacherDTO(Schema):
    id = fields.Int(dump_only=True)
    user_id = fields.Int(required=True)
    email = fields.Email(required=True, error_messages={"required": "Поле email обязательно."})
    name = fields.Str(required=True, error_messages={"required": "Поле имя обязательно."})
    surname = fields.Str(required=True, error_messages={"required": "Поле фамилия обязательно."})
    patronymic = fields.Str(allow_none=True)
    second_surname = fields.Str(allow_none=True)
    nickname = fields.Str(default="Преподаватель")
    birth_date = fields.Date(required=True, error_messages={"required": "Поле дата рождения обязательно."})
    date_of_death = fields.Date(allow_none=True)
    phone = fields.Str(required=True, error_messages={"required": "Поле телефон обязательно."})
    telegram = fields.Str(allow_none=True)
    vk = fields.Str(allow_none=True)
    school = fields.Str(required=True, error_messages={"required": "Поле школа обязательно."})
    school_date_start = fields.Int(allow_none=True)
    school_date_end = fields.Int(required=True, error_messages={"required": "Поле дата окончания школы обязательно."})
    university = fields.Str(required=True, error_messages={"required": "Поле университет обязательно."})
    university_date_start = fields.Int(allow_none=True)
    university_date_end = fields.Int(allow_none=True)
    workplace = fields.Str(allow_none=True)
    passport_number = fields.Str(allow_none=True)
    passport_series = fields.Str(allow_none=True)
    passport_date = fields.Date(allow_none=True)
    passport_issued_by = fields.Str(allow_none=True)
    registration_address = fields.Str(required=True, error_messages={"required": "Поле адрес регистрации обязательно."})
    was_pupil = fields.Bool(default=False)

    @post_load
    def make_teacher(self, data, **kwargs):
        return Teacher(**data)
