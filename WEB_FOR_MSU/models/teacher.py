from WEB_FOR_MSU import db


class Teacher(db.Model):
    __tablename__ = 'teacher'
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)
    user = db.relationship('User', backref='teachers')
    name = db.Column(db.String(), nullable=False)
    surname = db.Column(db.String(), nullable=False)
    patronymic = db.Column(db.String(), nullable=False)
    second_surname = db.Column(db.String())
    nickname = db.Column(db.String(), nullable=False)
    birth_date = db.Column(db.Date(), nullable=False)
    date_of_death = db.Column(db.Date())
    phone = db.Column(db.String(), nullable=False)
    telegram = db.Column(db.String())
    vk = db.Column(db.String())
    school = db.Column(db.String(), nullable=False)
    school_date_start = db.Column(db.Date(), nullable=False)
    school_date_end = db.Column(db.Date(), nullable=False)
    university = db.Column(db.String(), nullable=False)
    university_date_start = db.Column(db.Date(), nullable=False)
    university_date_end = db.Column(db.Date())
    workplace = db.Column(db.String())
    passport_number = db.Column(db.String(), nullable=False)
    passport_series = db.Column(db.String(), nullable=False)
    passport_date = db.Column(db.Date(), nullable=False)
    passport_issued_by = db.Column(db.String(), nullable=False)
    registration_address = db.Column(db.String(), nullable=False)
    was_pupil = db.Column(db.Boolean, default=False)
    courses = db.relationship('Course', secondary='teacher_course', backref='teachers')
    # TODO add foreign keys: entrance_id	organizational_meeting_ids	FA_id	KNR_id	KOTE_id	VS_id	NS_ids	OK_ids	OC_ids	LS_id	graduation_id	council_id	method_council_id
