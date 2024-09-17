from marshmallow import Schema, fields, validate, ValidationError


class LoginDTO(Schema):
    email = fields.Email(required=True, error_messages={"required": "Поле обязательно для заполнения",
                                                        "invalid": "Почта введена некорректно"})
    password = fields.String(required=True, validate=validate.Length(min=1),
                             error_messages={"required": "Поле обязательно для заполнения"})

