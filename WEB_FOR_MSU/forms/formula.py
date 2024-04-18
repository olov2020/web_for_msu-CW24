from flask_wtf import Form
from wtforms import StringField
from wtforms.fields.numeric import FloatField
from wtforms.validators import DataRequired


class FormulaForm(Form):
    formula_name = StringField("Элемент контроля: *", validators=[DataRequired("Поле обязательно для заполнения")])
    coefficient = FloatField("Коэффициент: *", validators=[DataRequired("Поле обязательно для заполнения")])
