from flask_wtf import FlaskForm
from wtforms import Form, ValidationError
from wtforms import StringField, SubmitField, TextAreaField, BooleanField, PasswordField, SelectField, DateField
from wtforms.fields.form import FormField
from wtforms.fields.list import FieldList
from wtforms.fields.simple import TelField, EmailField
from wtforms.validators import DataRequired, Email, Length, Optional
from flask_wtf.file import FileField, FileAllowed, FileRequired

from WEB_FOR_MSU.forms.teacher_course import TeacherCourseForm
from WEB_FOR_MSU.forms.formula import FormulaForm
from WEB_FOR_MSU.forms.schedule import ScheduleForm


class CourseForm(FlaskForm):
    name = StringField("Название курса: *", validators=[DataRequired("Поле обязательно для заполнения")])
    auditory = StringField("Аудитория: *")
    course_review_number = SelectField("№ рассмотрения курса:",
                                       choices=[(choice, choice) for choice in
                                                ['в первый раз', 'во второй раз', 'в третий раз', 'в четвёртый раз',
                                                 'в пятый раз']])
    direction = SelectField("Направление: *",
                            choices=[(choice, choice) for choice in
                                     ['Математика', 'Экономика', 'Третий Путь']],
                            validators=[
                                DataRequired("Поле обязательно для заполнения")])
    emsh_grades = SelectField('Классы ЭМШ: *',
                              choices=[(choice, choice) for choice in
                                       ['8-10', '8-11', '9', '9 - 10', '9 - 11', '10', '10 - 11', '11']],
                              validators=[DataRequired("Поле обязательно для заполнения")])
    crediting = SelectField('Зачётный: *',
                            choices=[(choice, choice) for choice in [
                                'зачётный для все классов',
                                'зачётный только для 8-и классников',
                                'зачётный только для 9-ти классников',
                                'зачётный только для 10-ти классников',
                                'зачётный только для 11-ти классников',
                                'зачётный только для 8-9-ти классников',
                                'зачётный только для 8-10-ти классников',
                                'зачётный только для 9-10-ти классников',
                                'зачётный только для 9-11-ти классников',
                                'зачётный только для 10-11-ти классников',
                                'факультативный для всех']],
                            validators=[DataRequired("Поле обязательно для заполнения")])
    distribution = StringField("Распределение: *", validators=[DataRequired("Поле обязательно для заполнения")])
    intern_work = StringField("Работа со стажерами:")
    lesson_time = SelectField('Время проведения: *',
                              choices=[(choice, choice) for choice in [
                                  'Понедельник 17:20 - 18:40',
                                  'Понедельник 18:55 - 20:15',
                                  'Вторник 17:20 - 18:40',
                                  'Вторник 18:55 - 20:15',
                                  'Среда 17:20 - 18:40',
                                  'Среда 18:55 - 20:15',
                                  'Четверг 17:20 - 18:40',
                                  'Четверг 18:55 - 20:15',
                                  'Пятница 17:20 - 18:40',
                                  'Пятница 18:55 - 20:15',
                                  'Понедельник (2 пары) 17:20 - 20:15',
                                  'Вторник (2 пары) 17:20 - 20:15',
                                  'Среда (2 пары) 17:20 - 20:15',
                                  'Четверг (2 пары) 17:20 - 20:15',
                                  'Пятница (2 пары) 17:20 - 20:15']],
                              validators=[DataRequired("Поле обязательно для заполнения")])
    additional_info_for_auditory = StringField("Дополнительная информация о времени и требования к аудтории: *",
                                               validators=[DataRequired("Поле обязательно для заполнения")])
    course_purpose = StringField("Цель курса: *", validators=[DataRequired("Поле обязательно для заполнения")])
    course_objectives = StringField("Задачи курса: *", validators=[DataRequired("Поле обязательно для заполнения")])
    course_features = StringField("Особенности курса: *", validators=[DataRequired("Поле обязательно для заполнения")])
    course_format = StringField("Формат проведения занятия: *",
                                validators=[DataRequired("Поле обязательно для заполнения")])
    target_audience = StringField("Целевая аудитория: *", validators=[DataRequired("Поле обязательно для заполнения")])
    short_description = StringField("Краткое описание курса: *",
                                    validators=[DataRequired("Поле обязательно для заполнения")])
    number_of_listeners = SelectField('Количество слушателей: *',
                                      choices=[
                                          ('до 10 человек', 'до 10 человек'),
                                          ('от 10 до 20 человек', 'от 10 до 20 человек'),
                                          ('от 20 до 30 человек', 'от 20 до 30 человек'),
                                          ('cвыше 30 человек', 'cвыше 30 человек')],
                                      validators=[DataRequired("Поле обязательно для заполнения")])

    selection = StringField("Отбор: *", validators=[DataRequired("Поле обязательно для заполнения")])
    assessment = StringField("Оценка: *", validators=[DataRequired("Поле обязательно для заполнения")])
    platform_format = StringField(
        "Формат курса: онлайн/оффлайн/гибрид. В случае онлайн, какие платформы используются? *",
        validators=[DataRequired("Поле обязательно для заполнения")])
    additional_info = StringField("Дополнительная информация о курсе: *",
                                  validators=[DataRequired("Поле обязательно для заполнения")])
    submit = SubmitField("Создать курс")
    schedules = FieldList(FormField(ScheduleForm))
    formulas = FieldList(FormField(FormulaForm))
    teachers = FieldList(FormField(TeacherCourseForm))
