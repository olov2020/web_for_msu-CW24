import os

from flask import request, render_template, current_app, redirect, url_for, flash
from flask_login import login_required, login_user, current_user
# from WEB_FOR_MSU.models.user import User
from WEB_FOR_MSU.models import *

from WEB_FOR_MSU.forms import *
# from app.utils import send_mail

from flask import Blueprint

main = Blueprint('home', __name__)


@login_required
@main.route('/')
@main.route('/home')
def home():
    user = {'name': 'Vladimir',
            'surname': 'Vinogradov',
            'status': 'Teacher',
            }
    return render_template('home/home.html',
                           title='Home',
                           user=user)


@main.route('/entrance', methods=['GET', 'POST'])
def entrance():
    if current_user.is_authenticated:
        return redirect(url_for('.home'))
    login_form = LoginForm()
    if login_form.validate_on_submit():
        email = login_form.email.data
        password = login_form.password.data
        user = User.query.filter_by(email=email).first()  # чтобы заработало, надо в базу данных добавить пользователей
        if user and user.verify_password(password):
            login_user(user, remember=login_form.remember.data)
            return redirect(url_for('.home'))
        flash("Invalid username/password", 'error')
        return redirect(url_for('.login'))
    return render_template('home/entrance.html', title='Login', form=login_form)


@login_required
@main.route('/account')
def account():
    image = os.path.join(current_app.config['UPLOAD_FOLDER'], 'Me in msu.jpg')
    user = {'name': 'Vladimir',
            'surname': 'Vinogradov',
            'status': 'Teacher',
            'photo': image,
            }
    return render_template('home/account.html',
                           title='Account',
                           user=user)

# @app.route('/schedule')
# def schedule():
#     return render_template('schedule.html')
#
#
# @app.route('/my_courses')
# def my_courses():
#     return render_template('my_courses.html')
#
