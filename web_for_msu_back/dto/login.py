from marshmallow import Schema, fields, validate, ValidationError


class LoginSchema(Schema):
    email = fields.Email(required=True, error_messages={"required": "Поле обязательно для заполнения",
                                                        "invalid": "Почта введена некорректно"})
    password = fields.String(required=True, validate=validate.Length(min=1),
                             error_messages={"required": "Поле обязательно для заполнения"})
    remember = fields.Boolean(missing=False)



# Example usage:
schema = LoginSchema()

# To validate and deserialize input data:
data, errors = schema.load({
    "email": "example@example.com",
    "password": "securepassword",
    "remember": True
})

if errors:
    raise ValidationError(errors)

# To serialize output data:
result = schema.dump({
    "email": "example@example.com",
    "password": "securepassword",
    "remember": True
})

print(result)
