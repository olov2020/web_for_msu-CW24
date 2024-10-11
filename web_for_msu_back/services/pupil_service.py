import flask
from marshmallow import ValidationError

from web_for_msu_back.dto.pupil import PupilDTO
from web_for_msu_back.models import Pupil
from web_for_msu_back.services import UserService, ImageService


class PupilService:
    def __init__(self, db, user_service: UserService, image_service: ImageService):
        self.db = db
        self.user_service = user_service
        self.image_service = image_service

    def add_pupil(self, request: flask.Request) -> (dict, int):
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
        self.db.session.add(pupil)
        self.db.session.commit()
        return {'Ученик успешно добавлен'}, 201

    def get_full_name(self, pupil: Pupil) -> str:
        return pupil.surname + ' ' + pupil.name + ' ' + pupil.patronymic

    def get_pupil_id(self, user_id: int):
        pupil = Pupil.query.filter_by(user_id=user_id).first()
        if not pupil:
            return None
        return pupil.id

    def get_pupil_by_email(self, email: str) -> Pupil:
        return Pupil.query.filter_by(email=email).first()
