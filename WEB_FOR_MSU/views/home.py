from flask import request, render_template, current_app, redirect, url_for, flash
from flask_login import login_required, login_user, current_user, logout_user

# from WEB_FOR_MSU.models.user import User
from WEB_FOR_MSU.models import *
from WEB_FOR_MSU.services import *
from WEB_FOR_MSU.forms import *
# from app.utils import send_mail

from flask import Blueprint

main = Blueprint('home', __name__)


@main.route('/')
@main.route('/home')
def home():
    if current_user.is_authenticated:
        image_service = ImageService()
        image = image_service.get_user_image()
        user = {'name': current_user.get_name(),
                'surname': current_user.get_surname(),
                'status': current_user.get_role(),
                'photo': image,
                }
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
    registration_form = RegistrationForm
    if registration_type == 'pupil':
        registration_form = RegistrationForm()
    elif registration_type == 'teacher':
        registration_form = TeacherRegistrationForm()

    if registration_form.validate_on_submit():
        if User.query.filter_by(email=registration_form.email.data).first() is not None:
            flash('Пользователь с такой почтой уже существует', 'error')
            return redirect(url_for('.registration', registration_type=registration_type))
        role = Role.query.filter_by(name=registration_type).first()
        user = UserService.add_user(email=registration_form.email.data,
                                    password=registration_form.password.data,
                                    role_id=role.id,
                                    form=registration_form)

        login_user(user, force=True)
        return redirect(url_for('.home'))

    return render_template('home/registration.html',
                           title='Registration',
                           user={},
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
            return redirect(url_for('.home'))
        return redirect(url_for('.login'))
    return render_template('home/login.html', title='Login',
                           user={}, form_login=login_form)


@main.route('/account', methods=['GET', 'POST'])
@login_required
def account():
    logout_form = LogoutForm()
    account_form = AccountForm()
    image_service = ImageService()
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
                image_service.change_user_image(account_form.image.data)
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

    image = image_service.get_user_image()
    user = {'name': current_user.get_name(),
            'surname': current_user.get_surname(),
            'status': current_user.get_role(),
            'patronymic': current_user.get_patronymic(),
            'photo': image,
            'email': current_user.email,
            'password': '',
            'new_password': '',
            'phone': current_user.get_phone(),
            'school': current_user.get_school(),
            }
    return render_template('home/account.html',
                           title='Account',
                           user=user,
                           form_logout=logout_form,
                           form_account=account_form)

# @app.route('/schedule')
# def schedule():
#     return render_template('schedule.html')
#
#
# @app.route('/my_courses')
# def my_courses():
#     return render_template('my_courses.html')
#
