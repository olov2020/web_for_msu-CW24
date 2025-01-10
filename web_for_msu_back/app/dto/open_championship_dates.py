from marshmallow import Schema, fields


class OpenChampionshipDatesDTO(Schema):
    date_start = fields.Date()
    date_end = fields.Date()
