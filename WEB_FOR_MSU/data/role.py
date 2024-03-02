from .data_base import db


class Role(db.Model):
    __tablename__ = 'role'
    id = db.Column(db, primary_key=True)
    name = db.Column(db)
