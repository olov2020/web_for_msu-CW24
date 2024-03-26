from flask_wtf import FlaskForm
from wtforms import Form, ValidationError
from wtforms import StringField, SubmitField, TextAreaField, BooleanField, PasswordField
from wtforms.validators import DataRequired, Email, Length


class LoginForm(FlaskForm):
    email = StringField("Email: ", validators=[Email(message="Почта введена некорректно"),])
    password = PasswordField("Пароль: ", validators=[DataRequired(message="Поле обязательно для заполнения"),])
    remember = BooleanField("Запомнить меня")
    submit = SubmitField("Войти")
