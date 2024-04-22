from flask_wtf import Form
from wtforms import StringField, DateField
from wtforms.fields.numeric import IntegerField
from wtforms.validators import DataRequired


class ScheduleForm(Form):
    lesson_number = IntegerField("Номер занятия: *", validators=[DataRequired("Поле обязательно для заполнения")],
                                 render_kw={'readonly': True})
    date = DateField("Дата: *", validators=[DataRequired("Поле обязательно для заполнения")],
                     render_kw={'readonly': True})
    theme = StringField("Тема: *")
    plan = StringField("План: *")
    additional_info = StringField("Дополнительная информация:")
