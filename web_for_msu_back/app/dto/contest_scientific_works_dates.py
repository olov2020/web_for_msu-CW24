from datetime import datetime

from marshmallow import Schema, fields, post_dump


class ContestScientificWorksDatesDTO(Schema):
    date_first = fields.Date()
    date_second = fields.Date()
    date_third = fields.Date()

    @post_dump
    def format_dates(self, data, **kwargs):
        date_format = "%d.%m.%Y"
        for key in ["date_first", "date_second", "date_third"]:
            if key in data and data[key]:
                # Преобразование строки 'YYYY-MM-DD' к объекту datetime и форматирование
                if isinstance(data[key], str):
                    data[key] = datetime.strptime(data[key], "%Y-%m-%d").strftime(date_format)
                elif isinstance(data[key], datetime):
                    data[key] = data[key].strftime(date_format)
        return data