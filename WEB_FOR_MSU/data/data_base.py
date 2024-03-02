from flask_sqlalchemy import SQLAlchemy

db = None


def global_init(app):
    global db
    if db:
        return
    if not app:
        return

    db = SQLAlchemy(app)
    from . import models

def get_db():
    global db
    return db
