from flask_wtf import FlaskForm, Form
from wtforms import StringField, SubmitField, TextAreaField, BooleanField, PasswordField, SelectField, DateField
from wtforms.fields.numeric import IntegerField, FloatField
from wtforms.fields.simple import TelField, EmailField, HiddenField
from wtforms.validators import DataRequired, Email, Length, Optional
from flask_wtf.file import FileField, FileAllowed, FileRequired


class FormulaForm(Form):
    formula_name = StringField("Элемент контроля: *", validators=[DataRequired("Поле обязательно для заполнения")])
    coefficient = FloatField("Коэффициент: *", validators=[DataRequired("Поле обязательно для заполнения")])
