from flask_wtf import FlaskForm
from flask_wtf.file import FileField, FileAllowed
from wtforms import StringField, SubmitField, PasswordField
from wtforms.fields.simple import EmailField, TelField
from wtforms.validators import Email, Length, Optional


class AccountForm(FlaskForm):
    name = StringField("Имя: ")
    surname = StringField("Фамилия: ")
    patronymic = StringField("Отчество: ")
    email = EmailField("Email: ", validators=[Optional(), Email(message="Почта введена некорректно")])
    password = PasswordField("Пароль: *",
                             validators=[Length(min=8, message="Не менее 8 символов в пароле")])
    new_password = PasswordField("Новый пароль: ",
                                 validators=[Optional(),
                                             Length(min=8, message="Не менее 8 символов в пароле")])
    phone = TelField("Телефон: ")
    school = StringField("Школа: ")
    image = FileField("Обновить фото профиля. Доступные форматы: '.jpg', '.png', '.jpeg', '.gif', '.bmp'",
                      validators=[
                          FileAllowed(['jpg', 'png', 'jpeg', 'gif', 'bmp'], message="Некорректный формат файла")])
    submit_save = SubmitField("Сохранить")
