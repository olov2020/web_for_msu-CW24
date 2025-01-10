from web_for_msu_back.app import db


class EventDate(db.Model):
    __tablename__ = 'event_date'
    id = db.Column(db.Integer, primary_key=True)
    date_name = db.Column(db.String(255), unique=True, nullable=False)
    date = db.Column(db.Date)

    def __init__(self, date_name, date):
        self.date_name = date_name
        self.date = date
