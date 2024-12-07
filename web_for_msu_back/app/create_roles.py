from web_for_msu_back.app import db
from web_for_msu_back.app.models import Role


def create_roles():
    if Role.query.all():
        return
    roles = [
        Role(id=1, name='admin'),
        Role(id=2, name='teacher'),
        Role(id=3, name='pupil'),
        Role(id=4, name='newsmaker'),
        Role(id=5, name='coursemaker'),
        Role(id=6, name='marksmaker'),
    ]
    for role in roles:
        db.session.add(role)
    db.session.commit()
