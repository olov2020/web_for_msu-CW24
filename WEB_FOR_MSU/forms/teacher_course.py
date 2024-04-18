from flask_wtf import Form
from wtforms import BooleanField
from wtforms.fields.simple import HiddenField


class TeacherCourseForm(Form):
    id = HiddenField("ID")
    name = BooleanField(default=False)
