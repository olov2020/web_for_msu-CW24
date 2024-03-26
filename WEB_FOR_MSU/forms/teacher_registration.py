from flask_wtf import FlaskForm
from wtforms import Form, ValidationError
from wtforms import StringField, SubmitField, TextAreaField, BooleanField, PasswordField, SelectField, DateField
from wtforms.fields.simple import TelField, EmailField
from wtforms.validators import DataRequired, Email, Length, Optional
from flask_wtf.file import FileField, FileAllowed, FileRequired


class TeacherRegistrationForm(FlaskForm):
    image = FileField("Фото профиля", validators=[FileAllowed(['jpg', 'png', 'jpeg', 'gif', 'bmp']), FileRequired()])
    name = StringField("Имя: ", validators=[DataRequired()])
    surname = StringField("Фамилия: ", validators=[DataRequired()])
    second_surname = StringField("Вторая фамилия: ")
    patronymic = StringField("Отчество: ")
    birth_date = DateField("Дата рождения: ", validators=[DataRequired()])
    email = EmailField("Email: ", validators=[DataRequired(), Email()])
    password = PasswordField("Пароль: ", validators=[DataRequired(), Length(min=8,
                                                                            message="Пароль должен содержать не менее 8 символов")])
    phone = TelField("Телефон: ", validators=[DataRequired()])
    # role = SelectField('Статус',
    #                    choices=[('pupil', 'Ученик'), ('teacher', 'Преподаватель')],
    #                    validators=[DataRequired()])
    school = StringField("Школа: ", validators=[DataRequired()])
    school_started = DateField("Дата поступления в школу: ", validators=[DataRequired()])
    school_finished = DateField("Дата окончания школы: ", validators=[DataRequired()])
    university = StringField("Университет: ", validators=[DataRequired()])
    university_started = DateField("Дата поступления в университет: ", validators=[DataRequired()])
    university_finished = DateField("Дата окончания университета: ", validators=[DataRequired()])
    workplace = StringField("Место работы: ", validators=[DataRequired()])
    passport_series = StringField("Серия паспорта: ", validators=[DataRequired()])
    passport_number = StringField("Номер паспорта: ", validators=[DataRequired()])
    passport_date = DateField("Дата выдачи паспорта: ", validators=[DataRequired()])
    passport_issued_by = StringField("Кем выдан паспорт: ", validators=[DataRequired()])
    registration_address = StringField("Адрес регистрации: ", validators=[DataRequired()])
    tg = StringField("Telegram: ")
    vk = StringField("VK: ")
    was_pupil = BooleanField("Был учеником ЭМШ")
    submit = SubmitField("Зарегистрироваться")
