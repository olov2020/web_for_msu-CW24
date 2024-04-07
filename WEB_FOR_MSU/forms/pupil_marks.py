from flask_wtf import FlaskForm, Form
from wtforms import StringField, SubmitField, TextAreaField, BooleanField, PasswordField, SelectField, DateField
from wtforms.fields.list import FieldList
from wtforms.fields.numeric import FloatField
from wtforms.fields.simple import TelField, EmailField, HiddenField
from wtforms.validators import DataRequired, Email, Length, Optional
from flask_wtf.file import FileField, FileAllowed, FileRequired


class PupilMarksForm(Form):
    id = HiddenField("ID")
    name = StringField()
    marks = FieldList(StringField())
    result = FloatField()
