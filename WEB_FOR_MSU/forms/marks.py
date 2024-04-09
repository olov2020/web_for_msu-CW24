from flask_wtf import FlaskForm
from wtforms import Form, ValidationError
from wtforms import StringField, SubmitField, TextAreaField, BooleanField, PasswordField, SelectField, DateField
from wtforms.fields.form import FormField
from wtforms.fields.list import FieldList
from wtforms.fields.numeric import IntegerField, FloatField
from wtforms.fields.simple import TelField, EmailField
from wtforms.validators import DataRequired, Email, Length, Optional
from flask_wtf.file import FileField, FileAllowed, FileRequired

from WEB_FOR_MSU.forms.pupil_marks import PupilMarksForm


class MarksForm(FlaskForm):
    dates = FieldList(StringField(render_kw={'readonly': True}))
    mark_types = FieldList(SelectField(choices=[('Отсутствие', 'Отсутствие')]))
    pupils = FieldList(FormField(PupilMarksForm))
    visits = FieldList(IntegerField(render_kw={'readonly': True}))
    average = FieldList(FloatField(render_kw={'readonly': True}))
    submit = SubmitField("Подтвердить")
