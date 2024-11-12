# Используем базовый образ с Python
FROM python:3.12

# Устанавливаем рабочую директорию внутри контейнера
WORKDIR /web_for_msu-CW24/web_for_msu_back

# Копируем все файлы проекта в контейнер, включая Dockerfile
COPY . /web_for_msu-CW24/web_for_msu_back
RUN pip install --no-cache-dir -r requirements.txt

# Устанавливаем переменные окружения для Flask
ENV FLASK_APP=runner.py
ENV FLASK_RUN_HOST=0.0.0.0
ENV PYTHONPATH=/web_for_msu-CW24/web_for_msu_back

# Открываем порт для Flask
EXPOSE 5000

# Запускаем Flask приложение
CMD ["sh", "-c", "export PYTHONPATH=/web_for_msu-CW24/web_for_msu_back && flask run"]

