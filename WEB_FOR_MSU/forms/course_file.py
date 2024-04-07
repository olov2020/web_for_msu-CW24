from flask_wtf import FlaskForm
from wtforms import Form, ValidationError
from wtforms import StringField, SubmitField, TextAreaField, BooleanField, PasswordField, SelectField, DateField
from wtforms.fields.numeric import IntegerField
from wtforms.fields.simple import TelField, EmailField, HiddenField
from wtforms.validators import DataRequired, Email, Length, Optional
from flask_wtf.file import FileField, FileAllowed, FileRequired


class CourseFileForm(FlaskForm):
    file = FileField("Файл с курсом. Доступные форматы: '.xls', '.xlsx'. *",
                     validators=[FileAllowed(['xls', 'xlsx'], message="Некорректный формат файла")])
    load_submit = SubmitField("Загрузить курс")