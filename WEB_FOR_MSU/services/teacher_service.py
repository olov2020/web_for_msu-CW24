from WEB_FOR_MSU import db
from WEB_FOR_MSU.models import User, Pupil, Teacher


class TeacherService:
    @staticmethod
    def add_teacher(user_id, form):
        teacher = Teacher(
            user_id=user_id,
            email=form.email.data,
            name=form.name.data,
            surname=form.surname.data,
            patronymic=form.patronymic.data,
            second_surname=form.second_surname.data,
            nickname="Преподаватель",
            birth_date=form.birth_date.data,
            phone=form.phone.data,
            telegram=form.tg.data,
            vk=form.vk.data,
            school=form.school.data,
            school_date_start=None,
            school_date_end=form.school_finished.data,
            university=form.university.data,
            university_date_start=None,
            university_date_end=form.university_finished.data,
            workplace=form.workplace.data,
            registration_address=form.registration_address.data,
            was_pupil=form.was_pupil.data)
        db.session.add(teacher)
        db.session.commit()

    @staticmethod
    def get_full_name(teacher):
        return teacher.surname + ' ' + teacher.name + ' ' + teacher.patronymic

    @staticmethod
    def get_teacher_courses(user_id):
        teacher = Teacher.query.filter_by(user_id=user_id).first()
        return teacher.courses
