import os

from web_for_msu_back.app import create_app, db
from web_for_msu_back.app.create_roles import create_roles


config_class = os.getenv('FLASK_ENV', 'development').capitalize() + 'Config'
config_path = f'web_for_msu_back.app.config.{config_class}'
app = create_app(config_path)
with app.app_context():
    db.create_all()
    create_roles()

if __name__ == '__main__':
    app.run(host='127.0.0.1', port=5000, debug=True)
