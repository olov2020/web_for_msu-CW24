from flask_wtf import FlaskForm, Form
from wtforms import StringField, SubmitField, TextAreaField, BooleanField, PasswordField, SelectField, DateField
from wtforms.fields.numeric import IntegerField
from wtforms.fields.simple import TelField, EmailField, HiddenField
from wtforms.validators import DataRequired, Email, Length, Optional
from flask_wtf.file import FileField, FileAllowed, FileRequired


class ScheduleForm(Form):
    lesson_number = IntegerField("Номер занятия: *", validators=[DataRequired("Поле обязательно для заполнения")])
    date = DateField("Дата: *", validators=[DataRequired("Поле обязательно для заполнения")])
    theme = StringField("Тема: *")
    plan = StringField("План: *")
    additional_info = StringField("Дополнительная информация:")
