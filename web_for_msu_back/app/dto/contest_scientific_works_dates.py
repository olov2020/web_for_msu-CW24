from marshmallow import Schema, fields


class ContestScientificWorksDatesDTO(Schema):
    date_first = fields.Date()
    date_second = fields.Date()
    date_third = fields.Date()
