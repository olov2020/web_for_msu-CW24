from web_for_msu_back.app import db


class Pupil(db.Model):
    __tablename__ = 'pupil'
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)
    user = db.relationship('User', backref='pupil', passive_deletes=True)
    email = db.Column(db.String(), nullable=False)
    name = db.Column(db.String(), nullable=False)
    surname = db.Column(db.String(), nullable=False)
    patronymic = db.Column(db.String(), default="")
    birth_date = db.Column(db.Date(), nullable=False)
    nickname = db.Column(db.String(), nullable=False)
    telegram = db.Column(db.String())
    vk = db.Column(db.String())
    phone = db.Column(db.String(), nullable=False)
    passport_number = db.Column(db.String())
    passport_series = db.Column(db.String())
    passport_date = db.Column(db.Date())
    passport_issued_by = db.Column(db.String())
    registration_address = db.Column(db.String(), nullable=False)
    parent1_name = db.Column(db.String(), nullable=False)
    parent1_surname = db.Column(db.String(), nullable=False)
    parent1_patronymic = db.Column(db.String(), default="")
    parent1_phone = db.Column(db.String(), nullable=False)
    parent1_email = db.Column(db.String(), nullable=False)
    parent2_name = db.Column(db.String(), default="")
    parent2_surname = db.Column(db.String(), default="")
    parent2_patronymic = db.Column(db.String(), default="")
    parent2_phone = db.Column(db.String(), default="")
    parent2_email = db.Column(db.String(), default="")
    school = db.Column(db.String(), nullable=False)
    school_grade = db.Column(db.Integer, nullable=False)
    enroll_way = db.Column(db.String(), nullable=False)
    agreement = db.Column(db.String, nullable=False)
    how_know = db.Column(db.String(), default="")
    mailing = db.Column(db.Boolean, default=False)
    organization_fee = db.Column(db.String())
    present_FA = db.Column(db.String())
    security_key_card = db.Column(db.String())
    graduating = db.Column(db.Boolean, default=False)
    achievements = db.Column(db.String())
    courses = db.relationship('PupilCourse', back_populates='pupil')
    schedules = db.relationship('Mark', back_populates='pupil')
    registrations = db.relationship('PupilCourseRegistration', back_populates='pupil')
    former = db.Column(db.Boolean, default=False)
    graduated = db.Column(db.Boolean, default=False)

    # TODO: add foreign keys: KNR_id	VS_id	NS_id	OK_id	OC_id	LS_ids	graduation_id

    def __init__(self, user_id, email, name, surname, birth_date, nickname, phone,
                 registration_address, parent1_name, parent1_surname,
                 parent1_phone, parent1_email, school, school_grade, enroll_way,
                 agreement, organization_fee, present_FA, security_key_card, graduating, achievements, mailing=False,
                 parent1_patronymic="", patronymic="", telegram="", vk="", parent2_name="", parent2_surname="",
                 parent2_patronymic="", parent2_phone="", parent2_email="", how_know=""):
        self.user_id = user_id
        self.email = email
        self.name = name
        self.surname = surname
        self.patronymic = patronymic
        self.birth_date = birth_date
        self.nickname = nickname
        self.telegram = telegram
        self.vk = vk
        self.phone = phone
        self.passport_number = None
        self.passport_series = None
        self.passport_date = None
        self.passport_issued_by = None
        self.registration_address = registration_address
        self.parent1_name = parent1_name
        self.parent1_surname = parent1_surname
        self.parent1_patronymic = parent1_patronymic
        self.parent1_phone = parent1_phone
        self.parent1_email = parent1_email
        self.parent2_name = parent2_name
        self.parent2_surname = parent2_surname
        self.parent2_patronymic = parent2_patronymic
        self.parent2_phone = parent2_phone
        self.parent2_email = parent2_email
        self.school = school
        self.school_grade = school_grade
        self.enroll_way = enroll_way
        self.agreement = agreement
        self.how_know = how_know
        self.mailing = mailing
        self.organization_fee = organization_fee
        self.present_FA = present_FA
        self.security_key_card = security_key_card
        self.graduating = graduating
        self.achievements = achievements
