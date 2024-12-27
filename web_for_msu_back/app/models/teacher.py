from web_for_msu_back.app import db


class Teacher(db.Model):
    __tablename__ = 'teacher'
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)
    user = db.relationship('User', backref='teacher', passive_deletes=True)
    email = db.Column(db.String(), nullable=False)
    name = db.Column(db.String(), nullable=False)
    surname = db.Column(db.String(), nullable=False)
    patronymic = db.Column(db.String())
    second_surname = db.Column(db.String())
    nickname = db.Column(db.String(), nullable=False, default="Преподаватель")
    birth_date = db.Column(db.Date(), nullable=False)
    date_of_death = db.Column(db.Date())
    phone = db.Column(db.String(), nullable=False)
    telegram = db.Column(db.String())
    vk = db.Column(db.String())
    school = db.Column(db.String(), nullable=False)
    school_date_start = db.Column(db.Integer)
    school_date_end = db.Column(db.Integer, nullable=False)
    university = db.Column(db.String(), nullable=False)
    university_date_start = db.Column(db.Integer)
    university_date_end = db.Column(db.Integer)
    workplace = db.Column(db.String())
    passport_number = db.Column(db.String())
    passport_series = db.Column(db.String())
    passport_date = db.Column(db.Date())
    passport_issued_by = db.Column(db.String())
    registration_address = db.Column(db.String(), nullable=False)
    agreement = db.Column(db.String, nullable=False)
    was_pupil = db.Column(db.Boolean, default=False)
    courses = db.relationship('TeacherCourse', back_populates='teacher')

    # TODO add foreign keys: entrance_id	organizational_meeting_ids	FA_id	KNR_id	KOTE_id	VS_id	NS_ids	OK_ids	OC_ids	LS_id	graduation_id	council_id	method_council_id

    def __init__(self, user_id, email, name, surname, birth_date, phone, school, school_date_end, university,
                 university_date_end, registration_address,
                 was_pupil, patronymic=None, second_surname=None, nickname=None, telegram=None,
                 vk=None, school_date_start=None, university_date_start=None, workplace=None):
        self.user_id = user_id
        self.email = email
        self.name = name
        self.surname = surname
        self.patronymic = patronymic
        self.second_surname = second_surname
        self.nickname = nickname
        self.birth_date = birth_date
        self.phone = phone
        self.telegram = telegram
        self.vk = vk
        self.school = school
        self.school_date_start = school_date_start
        self.school_date_end = school_date_end
        self.university = university
        self.university_date_start = university_date_start
        self.university_date_end = university_date_end
        self.workplace = workplace
        self.passport_number = None
        self.passport_series = None
        self.passport_date = None
        self.passport_issued_by = None
        self.registration_address = registration_address
        self.was_pupil = was_pupil
