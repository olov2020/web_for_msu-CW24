from flask_wtf import Form
from wtforms import StringField
from wtforms.fields.list import FieldList
from wtforms.fields.numeric import FloatField
from wtforms.fields.simple import HiddenField


class PupilMarksForm(Form):
    id = HiddenField("ID")
    name = StringField(render_kw={'readonly': True})
    marks = FieldList(StringField())
    result = FloatField(render_kw={'readonly': True})
