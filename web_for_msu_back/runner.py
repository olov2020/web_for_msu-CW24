import os

from web_for_msu_back.app import create_app, db
from web_for_msu_back.app.create_roles import create_roles

app = create_app('web_for_msu_back.app.config.DevelopementConfig')
with app.app_context():
    db.create_all()
    create_roles()

if __name__ == '__main__':
    app.run(host='127.0.0.1', port=5000, debug=True)
