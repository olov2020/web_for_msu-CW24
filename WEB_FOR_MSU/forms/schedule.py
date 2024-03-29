from flask_wtf import FlaskForm
from wtforms import Form, ValidationError
from wtforms import StringField, SubmitField, TextAreaField, BooleanField, PasswordField, SelectField, DateField
from wtforms.fields.numeric import IntegerField
from wtforms.fields.simple import TelField, EmailField, HiddenField
from wtforms.validators import DataRequired, Email, Length, Optional
from flask_wtf.file import FileField, FileAllowed, FileRequired


class ScheduleForm(FlaskForm):
    lesson_number = IntegerField("Номер занятия: *", validators=[DataRequired("Поле обязательно для заполнения")])
    date = DateField("Дата: *", validators=[DataRequired("Поле обязательно для заполнения")])
    theme = StringField("Тема: *", validators=[DataRequired("Поле обязательно для заполнения")])
    plan = StringField("План: *", validators=[DataRequired("Поле обязательно для заполнения")])
    additional_info = StringField("Дополнительная информация:")
