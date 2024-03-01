from flask import Flask, render_template
from flask_sqlalchemy import SQLAlchemy
from dotenv import load_dotenv
from data.db_session import global_init, db
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


@app.route('/')
def index():
    user = {'name': 'Vladimir',
            'surname': 'Vinogradov',
            'status': 'Teacher',
            }
    return render_template('home.html',
                           title='Home',
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
    global_init(app)
    app.run(debug=True)
