from WEB_FOR_MSU import db
from WEB_FOR_MSU.models import User, Pupil, Teacher
from WEB_FOR_MSU.services.image_service import ImageService
from WEB_FOR_MSU.services.pupil_service import PupilService
from WEB_FOR_MSU.services.teacher_service import TeacherService


class UserService:
    @staticmethod
    def add_user(email, password, roles, form, user_exists=False):
        image = form.image.data
        if image:
            image = ImageService.save_user_image(image)
        else:
            image = 'default.png'
        if not user_exists:
            user = User(email=email, password=password, image=image)
            user.roles = roles
            db.session.add(user)
            db.session.commit()
        else:
            user = User.query.filter_by(email=email).first()
            user.image = image
            user.roles = roles
            db.session.commit()
        if user.is_teacher():
            TeacherService.add_teacher(user_id=user.id, form=form)
        if user.is_pupil():
            agreement = ImageService.save_user_agreement(form.agreement.data)
            PupilService.add_pupil(user_id=user.id, form=form, agreement=agreement)
        return user
