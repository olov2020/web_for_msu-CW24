from web_for_msu_back import db
from web_for_msu_back.models import User
from web_for_msu_back.services.image_service import ImageService
from web_for_msu_back.services.pupil_service import PupilService
from web_for_msu_back.services.teacher_service import TeacherService


class UserService:
    @staticmethod
    def add_user(email, password, roles, form, user_exists=False):
        # TODO change form to json
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

    @staticmethod
    def get_user_by_id(user_id):
        return User.query.get(user_id)

    @staticmethod
    def get_user_by_email(email):
        return User.query.filter_by(email=email).first()
