from flask import Flask, render_template

app = Flask(__name__)


@app.route('/')
def index():
    user = {'name': 'Vladimir',
            'surname': 'Vinogradov',
            'status': 'Teacher',
            }
    return render_template('home.html',
                           title='Home',
                           user=user)


if __name__ == '__main__':
    app.run(debug=True)
