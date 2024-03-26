from flask import request, render_template, current_app, redirect, url_for, flash
from flask_login import login_required, login_user, current_user, logout_user

# from WEB_FOR_MSU.models.user import User
from WEB_FOR_MSU.models import *
from WEB_FOR_MSU.controllers import *
from WEB_FOR_MSU.forms import *
# from app.utils import send_mail

from flask import Blueprint

main = Blueprint('home', __name__)


@main.route('/')
@main.route('/home')
def home():
    if current_user.is_authenticated:
        user = {'name': current_user.get_name(),
                'surname': current_user.get_surname(),
                'status': current_user.get_role(),
                }
    else:
        user = None
    return render_template('home/home.html',
                           title='Home',
                           user=user,
                           authenticated=current_user.is_authenticated)


@main.route('/registration', methods=['GET', 'POST'])
def registration():
    if current_user.is_authenticated:
        return redirect(url_for('.home'))
    registration_form = RegistrationForm()
    controller = ImageController()
    if registration_form.validate_on_submit():
        if registration_form.role.data == 'pupil':
            if User.query.filter_by(email=registration_form.email.data).first() is not None:
                flash('User with this email already exists', 'error')
                return redirect(url_for('.registration'))
            role = Role.query.filter_by(name=registration_form.role.data).first()
            User.add_user(email=registration_form.email.data,
                          password=registration_form.password.data,
                          role_id=role.id,
                          image=image_name,
                          form=registration_form,
                          agreement=registration_form.agreement.data)

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
    logout_form = LogoutForm()
    account_form = AccountForm()
    controller = ImageController()
    if logout_form.submit.data and logout_form.is_submitted():
        logout_user()
        return redirect(url_for('.home'))
    if account_form.submit_save.data and account_form.validate():
        image = account_form.image.data
        if image:
            controller.change_user_image(image)

    image = controller.get_user_image()
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
