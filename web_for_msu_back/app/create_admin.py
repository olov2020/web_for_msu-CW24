import datetime
import os

from web_for_msu_back.app import db
from web_for_msu_back.app.models import Teacher, User, Role


def create_admin():
    if User.query.all():
        return
    user = User(os.getenv("ADMIN_EMAIL"), os.getenv("ADMIN_PASSWORD"))
    db.session.add(user)
    db.session.commit()
    teacher = Teacher(user.id, user.email, "ЭМШ", "EMSCH", datetime.datetime(2025, 1, 11), os.getenv("ADMIN_PHONE"),
                      "Лицей НИУ ВШЭ", 2022, "ВШЭ", 2026,
                      "Москва, Ленинские горы, III Гуманитарный корпус, д. 1, стр. 46,", False)
    teacher.agreement = "default.pdf"
    user.authorized = True
    user.roles.append(Role.query.filter_by(name="teacher").first())
    user.roles.append(Role.query.filter_by(name="admin").first())

    db.session.add(teacher)
    db.session.commit()
    print()
