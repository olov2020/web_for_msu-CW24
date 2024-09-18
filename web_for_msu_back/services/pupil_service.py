from marshmallow import ValidationError

from web_for_msu_back import db
from web_for_msu_back.dto.pupil import PupilDTO
from web_for_msu_back.models import Pupil
from web_for_msu_back.services import UserService, ImageService


class PupilService:
    @staticmethod
    def add_pupil(request):
        result, code = UserService.add_pupil(request)
        if code != 201:
            return result, code
        pupil_dto = PupilDTO()
        try:
            pupil: Pupil = pupil_dto.load(request.form)
        except ValidationError as e:
            return e.messages, 400
        pupil.user_id = result['user_id']
        pupil.agreement = ImageService.save_user_agreement(request.files['agreement'])
        pupil.graduating = pupil.school_grade == 11
        db.session.add(pupil)
        db.session.commit()
        return {'Ученик успешно добавлен'}, 201

    @staticmethod
    def get_full_name(pupil):
        return pupil.surname + ' ' + pupil.name + ' ' + pupil.patronymic

    @staticmethod
    def get_pupil_id(user_id):
        pupil = Pupil.query.filter_by(user_id=user_id).first()
        if not pupil:
            return None
        return pupil.id

    @staticmethod
    def get_pupil_by_email(email):
        return Pupil.query.filter_by(email=email).first()
