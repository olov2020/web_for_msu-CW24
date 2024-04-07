from datetime import datetime, timedelta

from flask import request, render_template, current_app, redirect, url_for, flash
from flask_login import login_required, login_user, current_user, logout_user
from flask_security import auth_required, roles_required

# from WEB_FOR_MSU.models.user import User
from WEB_FOR_MSU.models import *
from WEB_FOR_MSU.output_models.courses import Courses
from WEB_FOR_MSU.services import *
from WEB_FOR_MSU.forms import *
from WEB_FOR_MSU.functions import get_next_monday
from WEB_FOR_MSU.output_models import *
# from app.utils import send_mail

from flask import Blueprint

main = Blueprint('home', __name__)


@main.route('/')
@main.route('/home')
def home():
    if current_user.is_authenticated:
        user = UserInfo.get_user_info()
    else:
        user = None
    return render_template('home/home.html',
                           title='Home',
                           user=user,
                           authenticated=current_user.is_authenticated)


@main.route('/registration/<registration_type>', methods=['GET', 'POST'])
def registration(registration_type):
    if registration_type not in ['pupil', 'teacher']:
        return redirect(url_for('.login'))
    if current_user.is_authenticated:
        return redirect(url_for('.home'))
    registration_form = RegistrationForm()
    if registration_type == 'pupil':
        registration_form = RegistrationForm()
    elif registration_type == 'teacher':
        registration_form = TeacherRegistrationForm()
    roles = []
    user_exists = False
    if registration_form.validate_on_submit():
        if User.query.filter_by(email=registration_form.email.data).first() is not None:
            if registration_type == 'pupil':
                flash('Пользователь с такой почтой уже существует', 'error')
                return redirect(url_for('.registration', registration_type=registration_type))
            elif registration_type == 'teacher':
                teacher = Teacher.query.filter_by(email=registration_form.email.data).first()
                if teacher is not None:
                    flash('Преподаватель с такой почтой уже существует', 'error')
                    return redirect(url_for('.registration', registration_type=registration_type))
                pupil = Pupil.query.filter_by(email=registration_form.email.data).first()
                if pupil.name == registration_form.name.data and pupil.surname == registration_form.surname.data:
                    roles = [Role.query.filter_by(name='pupil').first()]
                    user_exists = True
                    registration_form.was_pupil.data = True
                else:
                    flash('Пользователь с такой почтой уже существует', 'error')
                    return redirect(url_for('.registration', registration_type=registration_type))

        role = Role.query.filter_by(name=registration_type).first()
        roles.append(role)
        user = UserService.add_user(email=registration_form.email.data,
                                    password=registration_form.password.data,
                                    roles=roles,
                                    form=registration_form,
                                    user_exists=user_exists)

        login_user(user, force=True)
        return redirect(url_for('.home'))

    return render_template('home/registration.html',
                           title='Registration',
                           user=None,
                           authenticated=current_user.is_authenticated,
                           form_registration=registration_form)


@main.route('/login', methods=['GET', 'POST'])
def login():
    if current_user.is_authenticated:
        return redirect(url_for('.home'))
    login_form = LoginForm()
    if login_form.validate_on_submit():
        email = login_form.email.data
        password = login_form.password.data
        user = User.query.filter_by(email=email).first()
        if not user:
            flash("Нет пользователя с такой почтой", 'error')
        elif not user.check_password(password):
            flash("Неверный пароль", 'error')
        else:
            login_user(user, remember=login_form.remember.data, force=True)
            return redirect(request.args.get("next") or url_for('.home'))
        return redirect(url_for('.login'))
    return render_template('home/login.html', title='Login',
                           user=None, form_login=login_form)


@main.route('/account', methods=['GET', 'POST'])
@auth_required()
def account():
    logout_form = LogoutForm()
    account_form = AccountForm()
    if logout_form.submit.data and logout_form.is_submitted():
        logout_user()
        return redirect(url_for('.home'))
    if account_form.submit_save.data and account_form.validate():
        if not current_user.check_password(account_form.password.data):
            flash('Неверный пароль', 'error')
            return redirect(url_for('.account'))
        else:
            if account_form.email.data:
                if account_form.email.data != current_user.email and User.query.filter_by(
                        email=account_form.email.data).first() is not None:
                    flash('Пользователь с такой почтой уже существует', 'error')
                    return redirect(url_for('.account'))
                if current_user.set_email(account_form.email.data):
                    flash('Почта успешно изменена', 'success')
            if account_form.image.data:
                ImageService.change_user_image(account_form.image.data)
                flash('Фото успешно изменено', 'success')
            if account_form.new_password.data:
                if current_user.set_password(account_form.new_password.data):
                    flash('Пароль успешно изменен', 'success')
            if account_form.name.data:
                if current_user.set_name(account_form.name.data):
                    flash('Имя успешно изменено', 'success')
            if account_form.surname.data:
                if current_user.set_surname(account_form.surname.data):
                    flash('Фамилия успешно изменена', 'success')
            if account_form.patronymic.data:
                if current_user.set_patronymic(account_form.patronymic.data):
                    flash('Отчество успешно изменено', 'success')
            if account_form.school.data:
                if current_user.set_school(account_form.school.data):
                    flash('Школа успешно изменена', 'success')
            if account_form.phone.data:
                if current_user.set_phone(account_form.phone.data):
                    flash('Телефон успешно изменен', 'success')

    user = UserInfo.get_user_info()
    return render_template('home/account.html',
                           title='Account',
                           user=user,
                           form_logout=logout_form,
                           form_account=account_form)


@main.route('/marks/<int:course_id>', methods=['GET', 'POST'])
@auth_required()
def marks(course_id):
    if current_user.is_pupil():
        return redirect(url_for('.home'))
    marks_form = MarksForm()
    if marks_form.submit.data:
        MarkService.save_from_form(course_id, marks_form)
        flash('Оценки успешно сохранены', 'success')
        return redirect(url_for('.marks', course_id=course_id))
    user = UserInfo.get_user_info()
    course = Course.query.get(course_id)
    if not course:
        flash('Такого курса не существует', 'error')
        return redirect(url_for('.my_courses'))
    formulas = course.formulas
    choices = [
                  (formula.name, formula.name) for formula in formulas
              ] + [('Отсутствие', 'Отсутствие')]
    lessons = CourseService.get_lessons(course_id)
    if not lessons:
        flash('Уроков пока нет', 'error')
        return redirect(url_for('.my_courses'))
    for lesson in lessons:
        marks_form.mark_types.append_entry()
        marks_form.dates.append_entry()
        formula_name = lesson.formulas.name if lesson.formulas else 'Отсутствие'
        marks_form.mark_types[-1].data = formula_name
        marks_form.mark_types[-1].choices = choices
        marks_form.dates[-1].data = lesson.date
    for pupil in CourseService.get_pupils(course_id):
        marks_form.pupils.append_entry()
        pupil_marks_form = marks_form.pupils[-1].form
        pupil_marks_form.id.data = pupil.id
        pupil_marks_form.name.data = PupilService.get_full_name(pupil)
        pupil_course_marks = []
        for lesson in lessons:
            mark = MarkService.get_pupil_mark_by_lesson(pupil.id, lesson.id)
            pupil_course_marks.append(mark)
            pupil_marks_form.marks.append_entry()
            pupil_marks_form.marks[-1].data = mark
        pupil_marks_form.result.data = MarkService.calculate_result(pupil_course_marks, marks_form.mark_types.data, formulas)

    return render_template('home/marks.html',
                           title='Marks',
                           authenticated=current_user.is_authenticated,
                           user=user,
                           form=marks_form, )


@main.route('/schedule', methods=['GET', 'POST'])
@auth_required()
def schedule():
    date_start = datetime.now().date()
    lessons_in_week = CourseService.get_lessons_in_week(date_start, current_user.id)
    lessons_in_two_weeks = CourseService.get_lessons_in_week(get_next_monday(date_start), current_user.id)
    user = UserInfo.get_user_info()
    return render_template('home/schedule.html',
                           title='Schedule',
                           authenticated=current_user.is_authenticated,
                           lessons_in_week=lessons_in_week,
                           lessons_in_two_weeks=lessons_in_two_weeks,
                           user=user, )


@main.route('/my_courses', methods=['GET', 'POST'])
@auth_required()
def my_courses():
    user = UserInfo.get_user_info()
    if current_user.is_pupil():
        assocs = PupilService.get_pupil_courses(current_user.id)
    else:
        assocs = TeacherService.get_teacher_courses(current_user.id)
    courses = [Courses(assoc.course.id, assoc.course.name) for assoc in assocs]
    return render_template('home/my_courses.html',
                           title='My courses',
                           authenticated=current_user.is_authenticated,
                           user=user,
                           courses=courses, )
