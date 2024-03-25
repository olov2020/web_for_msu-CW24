from flask_wtf import FlaskForm
from wtforms import Form, ValidationError
from wtforms import StringField, SubmitField, TextAreaField, BooleanField, PasswordField
from wtforms.validators import DataRequired, Email, Length


class LoginForm(FlaskForm):
    email = StringField("Email: ", validators=[Email(message="Это поле обязательно к заполнению")])
    password = PasswordField("Пароль: ", validators=[DataRequired(message="Это поле обязательно к заполнению")])
    remember = BooleanField("Запомнить меня")
    submit = SubmitField("Войти")
