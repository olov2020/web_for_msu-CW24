from flask import Flask, render_template
from flask_sqlalchemy import SQLAlchemy
from dotenv import load_dotenv
from PIL import Image
import os

load_dotenv()
app = Flask(__name__)
app.config['SECRET_KEY'] = os.getenv('SECRET_KEY')
app.config['SQLALCHEMY_DATABASE_URI'] = (f'postgresql+psycopg2://'
                                         + f'{os.getenv("DB_USER")}:'
                                         + f'{os.getenv("DB_PASSWORD")}@'
                                         + f'{os.getenv("DB_HOST")}:'
                                         + f'{os.getenv("DB_PORT")}/'
                                         + f'{os.getenv("DB_NAME")}')

# db = SQLAlchemy(app)

PEOPLE_FOLDER = os.path.join('static', 'photos', 'people_photo')

app = Flask(__name__)
app.config['UPLOAD_FOLDER'] = PEOPLE_FOLDER


@app.route('/')
@app.route('/home')
def home():
    user = {'name': 'Vladimir',
            'surname': 'Vinogradov',
            'status': 'Teacher',
            }
    return render_template('home.html',
                           title='Home',
                           user=user)


@app.route('/registration')
def registration():
    user = {'name': 'Vladimir',
            'surname': 'Vinogradov',
            'status': 'Teacher',
            }
    return render_template('registration.html',
                           title='Registration',
                           user=user)


@app.route('/account')
def account():
    image = os.path.join(app.config['UPLOAD_FOLDER'], 'Me in msu.jpg')
    user = {'name': 'Vladimir',
            'surname': 'Vinogradov',
            'status': 'Teacher',
            'photo': image,
            }
    return render_template('account.html',
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

if __name__ == '__main__':
    app.run(debug=True)
