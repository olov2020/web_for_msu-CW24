from __future__ import annotations  # Поддержка строковых аннотаций

from typing import TYPE_CHECKING

if TYPE_CHECKING:
    # Импортируем сервисы только для целей аннотации типов
    pass


class EntrantService:
    def __init__(self, db):
        self.db = db
