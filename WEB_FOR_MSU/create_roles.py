from WEB_FOR_MSU import db
from WEB_FOR_MSU.models import Role


def create_roles():
    if Role.query.all():
        return
    admin = Role(id=1, name='admin')
    teacher = Role(id=2, name='teacher')
    pupil = Role(id=3, name='pupil')

    db.session.add(admin)
    db.session.add(teacher)
    db.session.add(pupil)

    db.session.commit()
