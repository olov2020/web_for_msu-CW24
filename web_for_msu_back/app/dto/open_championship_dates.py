from marshmallow import Schema, fields


class OpenChampionshipDatesDTO(Schema):
    date_start = fields.Date(format="%d.%m.%Y")
    date_end = fields.Date(format="%d.%m.%Y")
