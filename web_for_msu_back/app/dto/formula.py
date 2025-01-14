from marshmallow import Schema, fields
from marshmallow.validate import Length, Range


class FormulaDTO(Schema):
    name = fields.String(required=True, validate=Length(min=1))  # Название элемента контроля
    mark_type = fields.String(required=True)
    coefficient = fields.Float(required=True, validate=Range(min=0))
