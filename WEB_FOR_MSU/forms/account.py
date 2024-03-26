from flask_wtf import FlaskForm
from wtforms import Form, ValidationError
from wtforms import StringField, SubmitField, TextAreaField, BooleanField, PasswordField
from wtforms.fields.simple import EmailField, TelField
from wtforms.validators import DataRequired, Email, Length
from flask_wtf.file import FileField, FileAllowed, FileRequired


class AccountForm(FlaskForm):
    name = StringField("Имя: ")
    surname = StringField("Фамилия: ")
    patronymic = StringField("Отчество: ")
    email = EmailField("Email: ", validators=[Email()])
    password = PasswordField("Пароль: ", validators=[Length(min=4, max=100)])
    phone = TelField("Телефон: ")
    school = StringField("Школа: ")
    image = FileField("Обновить фото профиля", validators=[FileAllowed(['jpg', 'png', 'jpeg', 'gif', 'bmp'])])
    submit_save = SubmitField("Сохранить")