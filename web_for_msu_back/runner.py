import os

from web_for_msu_back.app.scheduled import add_scheduled_jobs
from web_for_msu_back.app import create_app, db, scheduler
from web_for_msu_back.app.create_roles import create_roles
from web_for_msu_back.app.create_admin import create_admin

config_class = os.getenv('FLASK_ENV', 'development').capitalize() + 'Config'
config_path = f'web_for_msu_back.app.config.{config_class}'
app = create_app(config_path)
with app.app_context():
    db.create_all()
    create_roles()
    create_admin()
    add_scheduled_jobs(scheduler)

if __name__ == '__main__':
    scheduler.start()
    app.run(host='127.0.0.1', port=5000, debug=False)
