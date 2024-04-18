from flask_wtf import FlaskForm
from wtforms import StringField, SubmitField, SelectField
from wtforms.fields.form import FormField
from wtforms.fields.list import FieldList
from wtforms.fields.numeric import FloatField

from WEB_FOR_MSU.forms.pupil_marks import PupilMarksForm


class MarksForm(FlaskForm):
    dates = FieldList(StringField(render_kw={'readonly': True}))
    mark_types = FieldList(SelectField(choices=[('Отсутствие', 'Отсутствие')]))
    pupils = FieldList(FormField(PupilMarksForm))
    visits = FieldList(StringField(render_kw={'readonly': True}))
    average = FieldList(FloatField(render_kw={'readonly': True}))
    submit = SubmitField("Подтвердить")
