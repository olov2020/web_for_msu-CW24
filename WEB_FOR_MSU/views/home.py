import os

from flask import request, render_template, current_app
from flask_login import login_required
from WEB_FOR_MSU.models import User

# from .forms import ContactForm, LoginForm
# from app.utils import send_mail

from flask import Blueprint

main = Blueprint('home', __name__)


@login_required
@main.route('/home')
def home():
    user = {'name': 'Vladimir',
            'surname': 'Vinogradov',
            'status': 'Teacher',
            }
    return render_template('home/home.html',
                           title='Home',
                           user=user)


@main.route('/')
@main.route('/login', methods=['GET', 'POST'])
def login_page():
    if request.method == 'POST':
        email = request.form['email']
        password = request.form['password']
        user = User.query.filter_by(email=email).first()
        # if user and user.verify_password(password):
        #     login_user(user, remember=True)
        #     return redirect(url_for('.home'))
        # flash("Invalid username/password", 'error')
        # return redirect(url_for('.login'))
    return render_template('home/home.html', title='Login')


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
