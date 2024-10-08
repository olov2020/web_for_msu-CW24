from marshmallow import Schema, fields
from marshmallow.validate import Length, Range


class FormulaDTO(Schema):
    formula_name = fields.String(required=True, validate=Length(min=1))  # Название элемента контроля
    coefficient = fields.Float(required=True, validate=Range(min=0))
