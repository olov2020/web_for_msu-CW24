from __future__ import annotations  # Поддержка строковых аннотаций

from typing import TYPE_CHECKING

import flask
from marshmallow import ValidationError

from web_for_msu_back.dto.teacher import TeacherDTO
from web_for_msu_back.models import Teacher

if TYPE_CHECKING:
    # Импортируем сервисы только для целей аннотации типов
    from web_for_msu_back.services import UserService


class TeacherService:
    def __init__(self, db, user_service: UserService):
        self.db = db
        self.user_service = user_service

    def add_teacher(self, request: flask.Request):
        result, code = UserService.add_teacher(request)
        if code != 201:
            return result, code
        teacher_dto = TeacherDTO()
        try:
            teacher = teacher_dto.load(request.form)
        except ValidationError as e:
            return e.messages, 400
        teacher.user_id = result['user_id']
        self.db.session.add(teacher)
        self.db.session.commit()
        return {'Преподаватель успешно добавлен'}, 201

    def add_teacher(self, user_id, form):
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
        self.db.session.add(teacher)
        self.db.session.commit()

    def get_full_name(self, teacher):
        return teacher.surname + ' ' + teacher.name + ' ' + teacher.patronymic

    def get_teacher_by_email(self, email):
        return Teacher.query.filter_by(email=email).first()
