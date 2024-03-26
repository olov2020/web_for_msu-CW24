from flask_wtf import FlaskForm
from wtforms import Form, ValidationError
from wtforms import StringField, SubmitField, TextAreaField, BooleanField, PasswordField, SelectField, DateField
from wtforms.fields.simple import TelField, EmailField
from wtforms.validators import DataRequired, Email, Length, Optional
from flask_wtf.file import FileField, FileAllowed, FileRequired


class RegistrationForm(FlaskForm):
    image = FileField("Фото профиля", validators=[FileAllowed(['jpg', 'png', 'jpeg', 'gif', 'bmp']), FileRequired()])
    name = StringField("Имя: ", validators=[DataRequired('Поле обязательно для заполнения')])
    surname = StringField("Фамилия: ", validators=[DataRequired('Поле обязательно для заполнения')])
    patronymic = StringField("Отчество: ")
    birth_date = DateField("Дата рождения: ", validators=[DataRequired('Поле обязательно для заполнения')])
    email = EmailField("Email: ",
                       validators=[DataRequired('Поле обязательно для заполнения'), Email('Почта введена неверно')])
    password = PasswordField("Пароль: ", validators=[DataRequired('Поле обязательно для заполнения'), Length(min=8,
                                                                                                             message="Пароль должен содержать не менее 8 символов")])
    phone = TelField("Телефон: ", validators=[DataRequired('Поле обязательно для заполнения')])
    # role = SelectField('Статус',
    #                    choices=[('pupil', 'Ученик'), ('teacher', 'Преподаватель')],
    #                    validators=[DataRequired()])
    grade = SelectField('Класс',
                        choices=[(i, str(i)) for i in range(8, 12)] + [('graduated', 'Закончил школу')],
                        validators=[DataRequired()])
    school = StringField("Школа: ", validators=[DataRequired()])
    passport_series = StringField("Серия паспорта: ", validators=[DataRequired('Поле обязательно для заполнения')])
    passport_number = StringField("Номер паспорта: ", validators=[DataRequired('Поле обязательно для заполнения')])
    passport_date = DateField("Дата выдачи паспорта: ", validators=[DataRequired('Поле обязательно для заполнения')])
    passport_issued_by = StringField("Кем выдан паспорт: ",
                                     validators=[DataRequired('Поле обязательно для заполнения')])
    registration_address = StringField("Адрес регистрации: ",
                                       validators=[DataRequired('Поле обязательно для заполнения')])
    tg = StringField("Telegram: ")
    vk = StringField("VK: ")
    parent1_surname = StringField("Фамилия родителя / опекуна: ",
                                  validators=[DataRequired('Поле обязательно для заполнения')])
    parent1_name = StringField("Имя родителя / опекуна: ", validators=[DataRequired('Поле обязательно для заполнения')])
    parent1_patronymic = StringField("Отчество родителя / опекуна: ")
    parent1_phone = TelField("Телефон родителя / опекуна: ",
                             validators=[DataRequired('Поле обязательно для заполнения')])
    parent1_email = EmailField("Email родителя / опекуна: ",
                               validators=[DataRequired('Поле обязательно для заполнения'),
                                           Email('Почта введена неверно')])
    parent2_surname = StringField("Фамилия родителя / опекуна: ")
    parent2_name = StringField("Имя родителя / опекуна: ")
    parent2_patronymic = StringField("Отчество родителя / опекуна: ")
    parent2_phone = TelField("Телефон родителя / опекуна: ")
    parent2_email = EmailField("Email родителя / опекуна: ",
                               validators=[Optional('Поле обязательно для заполнения'), Email('Почта введена неверно')])
    agreement = FileField("Согласие на обработку персональных данных",
                          validators=[FileAllowed(['pdf']), FileRequired()])
    how_know = StringField("Откуда узнали об ЭМШ: ")
    mailing = BooleanField("Согласие на получение рассылки")
    submit = SubmitField("Зарегистрироваться")
