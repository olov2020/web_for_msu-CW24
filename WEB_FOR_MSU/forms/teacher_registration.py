from datetime import datetime

from flask_wtf import FlaskForm
from flask_wtf.file import FileField, FileAllowed, FileRequired
from wtforms import StringField, SubmitField, BooleanField, PasswordField, DateField
from wtforms.fields.numeric import IntegerField
from wtforms.fields.simple import TelField, EmailField
from wtforms.validators import DataRequired, Email, Length, NumberRange


class TeacherRegistrationForm(FlaskForm):
    image = FileField("Фото профиля. Доступные форматы: '.jpg', '.png', '.jpeg', '.gif', '.bmp'. *", validators=[
        FileAllowed(['jpg', 'png', 'jpeg', 'gif', 'bmp'], message="Некорректный формат файла"),
        FileRequired(message="Необходимо выбрать файл")])
    name = StringField("Имя: *", validators=[DataRequired("Поле обязательно для заполнения")])
    surname = StringField("Фамилия: *", validators=[DataRequired("Поле обязательно для заполнения")])
    second_surname = StringField("Вторая фамилия: ")
    patronymic = StringField("Отчество: ")
    birth_date = DateField("Дата рождения: *", validators=[DataRequired("Поле обязательно для заполнения")])
    email = EmailField("Email: *", validators=[DataRequired("Поле обязательно для заполнения"),
                                              Email(message="Почта введена некорректно")])
    password = PasswordField("Пароль: *",
                             validators=[DataRequired("Поле обязательно для заполнения"),
                                         Length(min=8, message="Не менее 8 символов в пароле")])
    phone = TelField("Телефон: *", validators=[DataRequired("Поле обязательно для заполнения")])
    school = StringField("Школа: *", validators=[DataRequired("Поле обязательно для заполнения")])
    school_finished = IntegerField(
        "Год окончания школы: *",
        validators=[DataRequired("Поле обязательно для заполнения"),
                    NumberRange(
                        min=1900,
                        max=datetime.now().year,
                        message=f"Год в пределах от 1900 до {datetime.now().year}")])
    university = StringField("Университет: *", validators=[DataRequired("Поле обязательно для заполнения")])
    university_finished = IntegerField(
        "Год окончания ВУЗа: *",
        validators=[DataRequired("Поле обязательно для заполнения"),
                    NumberRange(
                        min=1900,
                        max=datetime.now().year + 6,
                        message=f"Год в пределах от 1900 до {datetime.now().year + 6}")])
    workplace = StringField("Место работы: ")
    registration_address = StringField("Адрес регистрации: *",
                                       validators=[DataRequired("Поле обязательно для заполнения")])
    tg = StringField("Telegram: ")
    vk = StringField("VK: ")
    was_pupil = BooleanField("Был учеником ЭМШ")
    submit = SubmitField("Зарегистрироваться")
