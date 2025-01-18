from __future__ import annotations  # Поддержка строковых аннотаций

import json
from datetime import datetime
from typing import TYPE_CHECKING

import flask
import pytz
from flask_jwt_extended import create_access_token
from marshmallow import ValidationError

from web_for_msu_back.app.dto.duty_teacher_info import DutyTeacherInfoDTO
from web_for_msu_back.app.dto.school_structre import SchoolStructureDTO
from web_for_msu_back.app.dto.teacher import TeacherDTO
from web_for_msu_back.app.dto.teacher_account import TeacherAccountDTO
from web_for_msu_back.app.models import Teacher, User, user_role, Role, Course, TeacherCourse

if TYPE_CHECKING:
    # Импортируем сервисы только для целей аннотации типов
    from web_for_msu_back.app.services import UserService, ImageService


class TeacherService:
    def __init__(self, db, user_service: UserService, image_service: ImageService):
        self.db = db
        self.user_service = user_service
        self.image_service = image_service

    def add_teacher(self, request: flask.Request):
        result, code = self.user_service.add_teacher(request)
        if code != 201:
            return result, code
        data = json.loads(request.form.get('data'))
        data['user_id'] = result['user_id']
        teacher_dto = TeacherDTO()
        try:
            teacher = teacher_dto.load(data)
        except ValidationError as e:
            return e.messages, 400
        teacher.user_id = result['user_id']
        self.db.session.add(teacher)
        self.db.session.commit()
        return {'msg': 'Преподаватель успешно добавлен'}, 201

    def get_full_name(self, teacher):
        return teacher.surname + ' ' + teacher.name + ' ' + teacher.patronymic

    def get_teacher_by_email(self, email):
        return Teacher.query.filter_by(email=email).first()

    def get_teachers_with_role(self, role: str) -> (list[DutyTeacherInfoDTO], int):
        teachers = ((self.db.session.query(Teacher)
                     .join(User, Teacher.user_id == User.id)
                     .join(user_role, User.id == user_role.c.user_id)
                     .join(Role, Role.id == user_role.c.role_id)
                     .filter(Role.name == role))
                    .all())
        role_teachers = []
        for teacher in teachers:
            data = {
                "id": teacher.id,
                "name": self.get_full_name(teacher),
                "email": teacher.email
            }
            role_teachers.append(DutyTeacherInfoDTO().dump(data))
        return role_teachers, 200

    def change_account(self, user_id: int, request: flask.Request) -> (dict, int):
        user = User.query.get(user_id)
        if not user:
            return {"error": "Пользователь не найден"}, 404
        teacher = Teacher.query.filter(Teacher.user_id == user_id).first()
        if not teacher:
            return {"error": "Пользователь не найден"}, 404
        try:
            data = TeacherAccountDTO().load(json.loads(request.form.get("data")))
        except ValidationError as e:
            return e.messages, 400
        if data["email"] != user.email and User.query.filter_by(email=data["email"]).first():
            return {"error": "Пользователь с такой почтой уже существует"}, 404
        user.email = teacher.email = data["email"]
        teacher.phone = data["phone"]
        teacher.university = data["university"]
        teacher.workplace = data["work"]
        if "image" in request.files:
            self.image_service.change_user_image(request.files["image"], user_id)
        self.db.session.commit()
        identity = self.user_service.create_user_identity(user)
        access_token = create_access_token(identity=identity, fresh=False)
        return {"msg": "Данные изменены", "access_token": access_token}, 200

    def get_data_to_change(self, user_id: int):
        user = User.query.get(user_id)
        if not user:
            return {"error": "Пользователь не найден"}, 404
        teacher = Teacher.query.filter(Teacher.user_id == user_id).first()
        if not teacher:
            return {"error": "Пользователь не найден"}, 404
        data = {
            "email": teacher.email,
            "phone": teacher.phone,
            "university": teacher.university,
            "work": teacher.workplace,
        }
        if not user.image.endswith("default.svg"):
            data["photo"] = self.image_service.get_from_yandex_s3("images", user.image)
        else:
            data["photo"] = ""
        return TeacherAccountDTO().dump(data), 200

    def get_school_info(self):
        directory = (Teacher.query.with_entities(User.id, Teacher.name, Teacher.surname, Teacher.patronymic)
                     .join(User, User.id == Teacher.user_id)
                     .join(user_role, user_role.c.user_id == User.id)
                     .join(Role, Role.id == user_role.c.role_id)
                     .filter(User.id != 1)  # for better speed, excluding admin
                     .filter(Role.name == "directory").all())
        directory_data = [{"id": member.id, "name": f"{member.name} {member.surname} {member.patronymic}"} for member in
                          directory]
        council = (Teacher.query.join(User, User.id == Teacher.user_id)
                   .join(user_role, user_role.c.user_id == User.id)
                   .join(Role, Role.id == user_role.c.role_id)
                   .filter(User.id != 1)  # for better speed, excluding admin
                   .filter(Role.name == "sovet").all())
        council_data = [{"id": member.id, "name": self.get_full_name(member)} for member in
                        council]
        teachers = Teacher.query.all()
        teachers_data = []
        organizers_data = []
        year = datetime.now(tz=pytz.timezone('Europe/Moscow')).year
        if datetime.now(tz=pytz.timezone('Europe/Moscow')).month in range(9):
            year -= 1
        for teacher in teachers:
            roles = [role.name for role in teacher.user.roles]
            if "admin" in roles:
                continue
            subjects = (Course.query.with_entities(Course.name)
                        .join(TeacherCourse, TeacherCourse.course_id == Course.id)
                        .filter(TeacherCourse.teacher_id == teacher.id, Course.year == year).all())
            subjects = [subject[0] for subject in subjects]
            events_roles = ["tests_online", "tests_offline", "knr", "vsh", "lsh"]
            events_roles_names = ["Вступительные испытания очно", "Вступительные испытания онлайн",
                                  "Конкурс начных работ", "Выездная школа", "Летняя школа"]
            teacher_events_roles = set(roles).intersection(set(events_roles))
            what = [events_roles_names[i] for i in range(len(events_roles)) if events_roles[i] in teacher_events_roles]
            teachers_data.append(
                {"id": teacher.user.id, "name": self.get_full_name(teacher), "subjects": ", ".join(subjects)}
            )

            organizers_data.append(
                {"id": teacher.user.id, "name": self.get_full_name(teacher), "what": ", ".join(what)}
            )
        school_data = {
            "directory": directory_data,
            "council": council_data,
            "teachers": teachers_data,
            "organizers": organizers_data,
        }
        return SchoolStructureDTO().dump(school_data), 200
