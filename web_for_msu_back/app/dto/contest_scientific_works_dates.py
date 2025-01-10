from marshmallow import Schema, fields


class ContestScientificWorksDatesDTO(Schema):
    date_first = fields.Date(format="%d.%m.%Y")
    date_second = fields.Date(format="%d.%m.%Y")
    date_third = fields.Date(format="%d.%m.%Y")
