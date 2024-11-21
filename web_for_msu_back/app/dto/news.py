import pytz
from marshmallow import Schema, fields, validates, ValidationError, post_load
from datetime import datetime

from web_for_msu_back.app.models.news import News


class NewsDTO(Schema):
    id = fields.Integer(dump_only=True)  # Только для чтения, так как `id` генерируется автоматически
    title = fields.String(required=True, validate=lambda x: len(x) > 0)  # Заголовок обязателен и не может быть пустым
    description = fields.String()
    date = fields.DateTime(default=lambda: datetime.now(tz=pytz.timezone('Europe/Moscow')).date(),
                           format='%Y-%m-%d')
    photo = fields.String(required=True, validate=lambda x: len(x) > 0)  # Фото обязательно и не может быть пустым

    @validates("date")
    def validate_date(self, value):
        if value > datetime.now():
            raise ValidationError("Дата публикации не может быть в будущем.")

    @validates("photo")
    def validate_photo(self, value):
        allowed_extensions = ['.jpg', '.jpeg', '.png', '.gif']
        if not any(value.endswith(ext) for ext in allowed_extensions):
            raise ValidationError(f"Неверный формат файла. Допустимы: {', '.join(allowed_extensions)}.")

    @post_load
    def make_news(self, data, **kwargs):
        return News(**data)
