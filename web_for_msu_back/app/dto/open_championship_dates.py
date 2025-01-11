from datetime import datetime

from marshmallow import Schema, fields, post_dump


class OpenChampionshipDatesDTO(Schema):
    date_start = fields.Date()
    date_end = fields.Date()

    @post_dump
    def format_dates(self, data, **kwargs):
        date_format = "%d.%m.%Y"
        for key in ["date_start", "date_end"]:
            if key in data and data[key]:
                # Преобразование строки 'YYYY-MM-DD' к объекту datetime и форматирование
                if isinstance(data[key], str):
                    data[key] = datetime.strptime(data[key], "%Y-%m-%d").strftime(date_format)
                elif isinstance(data[key], datetime):
                    data[key] = data[key].strftime(date_format)
        return data