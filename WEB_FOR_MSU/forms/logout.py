from flask_wtf import FlaskForm
from wtforms import SubmitField


class LogoutForm(FlaskForm):
    submit = SubmitField("Выйти")
