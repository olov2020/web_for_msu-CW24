import os

from WEB_FOR_MSU import create_app, db
from WEB_FOR_MSU.create_roles import create_roles

app = create_app(os.getenv('FLASK_ENV') or 'WEB_FOR_MSU.config.DevelopementConfig')
with app.app_context():
    db.create_all()
    create_roles()

if __name__ == '__main__':
    app.run(host='127.0.0.1', port=5000, debug=True)
