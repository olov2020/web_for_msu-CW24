import os

from flask import request, render_template, current_app, redirect, url_for, flash
from flask_login import login_required, login_user, current_user, logout_user

# from WEB_FOR_MSU.models.user import User
from WEB_FOR_MSU.models import *

from WEB_FOR_MSU.forms import *
# from app.utils import send_mail

from flask import Blueprint

main = Blueprint('home', __name__)


@main.route('/')
@main.route('/home')
def home():
    user = {'name': 'Vladimir',
            'surname': 'Vinogradov',
            'status': 'Teacher',
            }
    return render_template('home/home.html',
                           title='Home',
                           user=user,
                           authenticated=current_user.is_authenticated)


@main.route('/registration', methods=['GET', 'POST'])
def registration():
    if current_user.is_authenticated:
        return redirect(url_for('.home'))
    registration_form = RegistrationForm()
    if registration_form.validate_on_submit():
        if registration_form.role.data == 'pupil':
            if User.query.filter_by(email=registration_form.email.data).first() is not None:
                flash('User with this email already exists', 'error')
                return redirect(url_for('.registration'))
            role = Role.query.filter_by(name=registration_form.role.data).first()
            image = registration_form.image.data if registration_form.image.data else 'default.jpg'
            User.add_user(email=registration_form.email.data,
                          password=registration_form.password.data,
                          role_id=role.id,
                          image=image)
            pupil = Pupil.add_pupil(user_id=user.id,
                                    name=registration_form.name.data,
                                    surname=registration_form.surname.data,
                                    birth_date=registration_form.birth_date.data,
                                    nickname=registration_form.nickname.data,
                                    phone=registration_form.phone.data,
                                    passport_number=registration_form.passport_number.data,
                                    passport_series=registration_form.passport_series.data,
                                    passport_date=registration_form.passport_date.data,
                                    passport_issued_by=registration_form.passport_issued_by.data,
                                    registration_address=registration_form.registration_address.data,
                                    parent1_name=registration_form.parent1_name.data,
                                    parent1_surname=registration_form.parent1_surname.data,
                                    parent1_patronymic=registration_form.parent1_patronymic.data,
                                    parent1_phone=registration_form.parent1_phone.data,
                                    parent1_email=registration_form.email.data,
                                    school=registration_form.school.data,
                                    school_grade=registration_form.grade.data,
                                    enroll_way="Вступительные",
                                    agreement=registration_form.agreement.name,
                                    organization_fee=None,
                                    )

    return render_template('home/registration.html',
                           title='Registration',
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
        elif not user.verify_password(password):
            flash("Неверный пароль", 'error')
        else:
            login_user(user, remember=login_form.remember.data, force=True)
            return redirect(url_for('.home'))
        return redirect(url_for('.login'))
    return render_template('home/login.html', title='Login', form_login=login_form)


@main.route('/account', methods=['GET', 'POST'])
@login_required
def account():
    image = os.path.join(current_app.config['UPLOAD_FOLDER'], 'Me in msu.jpg')
    account_form = AccountForm()
    logout_form = LogoutForm()
    if logout_form.is_submitted():
        logout_user()
        return redirect(url_for('.home'))
    user = {'name': 'Vladimir',
            'surname': 'Vinogradov',
            'status': 'Teacher',
            'photo': image,
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
