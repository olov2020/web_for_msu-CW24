from marshmallow import Schema, fields, post_load

from web_for_msu_back.app.models import Entrant


class EntrantDTO(Schema):
    id = fields.Int(dump_only=True)
    name = fields.Str(required=True)
    surname = fields.Str(required=True)
    lastname = fields.Str(allow_none=True)
    phone = fields.Str(required=True)
    email = fields.Email(required=True)
    classOver = fields.Int(required=True)
    format = fields.Str(required=True)
    city = fields.Str(required=True)
    agreementAb = fields.Bool(required=True)
    created_on = fields.DateTime(dump_only=True)

    @post_load
    def make_entrant(self, data, **kwargs):
        return Entrant(**data)
