from WEB_FOR_MSU import db
from WEB_FOR_MSU.models import User, Pupil, Teacher
from WEB_FOR_MSU.services.image_service import ImageService
from WEB_FOR_MSU.services.pupil_service import PupilService
from WEB_FOR_MSU.services.teacher_service import TeacherService


class UserService:
    @staticmethod
    def add_user(email, password, role_id, form):
        image = form.image.data
        image_service = ImageService()
        if image:
            image = image_service.save_user_image(image)
        else:
            image = 'default.png'
        user = User(email=email, password=password, image=image, role_id=role_id)
        db.session.add(user)
        db.session.commit()
        if user.role == 'pupil':
            agreement = image_service.save_user_agreement(form.agreement.data)
            PupilService.add_pupil(user_id=user.id, form=form, agreement=agreement)
        if user.role == 'teacher':
            TeacherService.add_teacher(user_id=user.id, form=form)
        return user
