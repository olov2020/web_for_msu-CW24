from WEB_FOR_MSU import db
from WEB_FOR_MSU.models import User, Pupil, Teacher


class PupilService:
    @staticmethod
    def add_pupil(user_id, form, agreement):
        pupil = Pupil(
            user_id=user_id,
            email=form.email.data,
            name=form.name.data,
            surname=form.surname.data,
            patronymic=form.patronymic.data,
            birth_date=form.birth_date.data,
            nickname="Школьник",
            telegram=form.tg.data,
            vk=form.vk.data,
            phone=form.phone.data,
            passport_number=form.passport_number.data,
            passport_series=form.passport_series.data,
            passport_date=form.passport_date.data,
            passport_issued_by=form.passport_issued_by.data,
            registration_address=form.registration_address.data,
            parent1_name=form.parent1_name.data,
            parent1_surname=form.parent1_surname.data,
            parent1_patronymic=form.parent1_patronymic.data,
            parent1_phone=form.parent1_phone.data,
            parent1_email=form.parent1_email.data,
            parent2_name=form.parent2_name.data,
            parent2_surname=form.parent2_surname.data,
            parent2_patronymic=form.parent2_patronymic.data,
            parent2_phone=form.parent2_phone.data,
            parent2_email=form.parent2_email.data,
            school=form.school.data,
            school_grade=form.grade.data,
            enroll_way="Вступительные",
            agreement=agreement,
            organization_fee=None,
            present_FA=None,
            security_key_card=None,
            graduating=form.grade.data == '11',
            achievements=None,
            mailing=form.mailing.data,
            how_know=form.how_know.data
        )
        db.session.add(pupil)
        db.session.commit()
