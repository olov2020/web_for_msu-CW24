from marshmallow import Schema, fields, post_load

from web_for_msu_back.app.models import Pupil


class PupilDTO(Schema):
    id = fields.Int(dump_only=True)
    user_id = fields.Int()
    email = fields.Email(required=True, error_messages={"required": "Поле email обязательно."})
    password = fields.Str(required=True, error_messages={"required": "Поле пароль обязательно."})
    name = fields.Str(required=True, error_messages={"required": "Поле имя обязательно."})
    surname = fields.Str(required=True, error_messages={"required": "Поле фамилия обязательно."})
    patronymic = fields.Str(allow_none=True)
    birth_date = fields.Date(required=True, error_messages={"required": "Поле дата рождения обязательно."})
    nickname = fields.Str(default="Школьник")
    telegram = fields.Str(allow_none=True)
    vk = fields.Str(allow_none=True)
    phone = fields.Str(required=True, error_messages={"required": "Поле телефон обязательно."})
    passport_number = fields.Str(allow_none=True)
    passport_series = fields.Str(allow_none=True)
    passport_date = fields.Date(allow_none=True)
    passport_issued_by = fields.Str(allow_none=True)
    registration_address = fields.Str(required=True, error_messages={"required": "Поле адрес регистрации обязательно."})

    parent1_name = fields.Str(required=True, error_messages={"required": "Поле имя родителя 1 обязательно."})
    parent1_surname = fields.Str(required=True, error_messages={"required": "Поле фамилия родителя 1 обязательно."})
    parent1_patronymic = fields.Str(error_messages={})
    parent1_phone = fields.Str(required=True, error_messages={"required": "Поле телефон родителя 1 обязательно."})
    parent1_email = fields.Email(required=True, error_messages={"required": "Поле email родителя 1 обязательно."})

    parent2_name = fields.Str(allow_none=True)
    parent2_surname = fields.Str(allow_none=True)
    parent2_patronymic = fields.Str(allow_none=True)
    parent2_phone = fields.Str(allow_none=True)
    parent2_email = fields.Email(allow_none=True)

    school = fields.Str(required=True, error_messages={"required": "Поле школа обязательно."})
    school_grade = fields.Int(required=True, error_messages={"required": "Поле класс обязательно."})
    enroll_way = fields.Str(default="Вступительные")
    how_know = fields.Str(allow_none=True)
    mailing = fields.Bool(default=False)
    organization_fee = fields.Str(allow_none=True)
    present_FA = fields.Str(allow_none=True)
    security_key_card = fields.Str(allow_none=True)
    graduating = fields.Bool(default=False)
    achievements = fields.Str(allow_none=True)

    @post_load
    def make_pupil(self, data, **kwargs):
        data.setdefault('nickname', 'Школьник')
        data.setdefault('enroll_way', 'Вступительные')  # Пример для других полей
        data.setdefault('organization_fee', '')
        data.setdefault('present_FA', '')
        data.setdefault('security_key_card', '')
        data.setdefault('graduating', False)
        data.setdefault('achievements', '')
        data.pop('password', None)
        return Pupil(**data)
