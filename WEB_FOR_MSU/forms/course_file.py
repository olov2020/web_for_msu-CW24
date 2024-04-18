from flask_wtf import FlaskForm
from flask_wtf.file import FileField, FileAllowed
from wtforms import SubmitField


class CourseFileForm(FlaskForm):
    file = FileField("Файл с курсом. Доступные форматы: '.xls', '.xlsx'. *",
                     validators=[FileAllowed(['xls', 'xlsx'], message="Некорректный формат файла")])
    load_submit = SubmitField("Загрузить курс")
