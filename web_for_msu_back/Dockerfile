# Используем базовый образ с Python
FROM python:3.12

# Устанавливаем рабочую директорию внутри контейнера
WORKDIR /web_for_msu-CW24/web_for_msu_back

COPY wait-for-it.sh /usr/local/bin/
RUN chmod +x /usr/local/bin/wait-for-it.sh

# TODO --no-cache-dir при деплое
COPY requirements.txt /web_for_msu-CW24/web_for_msu_back/requirements.txt
RUN pip install -r requirements.txt

# Копируем все файлы проекта в контейнер, включая Dockerfile
COPY . /web_for_msu-CW24/web_for_msu_back

# Устанавливаем переменные окружения для Flask
ENV FLASK_APP=runner.py
ENV FLASK_RUN_HOST=0.0.0.0
ENV PYTHONPATH=/web_for_msu-CW24

EXPOSE 5000

CMD ["sh", "-c", "wait-for-it.sh postgres:5432 -- gunicorn --bind 0.0.0.0:5000 --limit-request-line 52428800 web_for_msu_back.runner:app"]

