import os
from flask import Flask, render_template, request, session, redirect
from flask_cors import CORS
from flask_migrate import Migrate
from flask_wtf.csrf import CSRFProtect, generate_csrf
from flask_login import LoginManager

from .models import db, User
from .api.user_routes import user_routes
from .api.auth_routes import auth_routes
from .api.block_routes import block_routes
from .api.week_routes import week_routes
from .api.day_routes import day_routes
from .api.exercise_routes import exercise_routes
from .api.room_routes import room_routes
from .api.chat_routes import chat_routes

from .seeds import seed_commands

from .socket import socketio

from .config import Config

app = Flask(__name__, static_folder='../react-app/build', static_url_path='/')
socketio.init_app(app)

# Setup login manager
login = LoginManager(app)
login.login_view = 'auth.unauthorized'


@login.user_loader
def load_user(id):
    return User.query.get(int(id))


# Tell flask about our seed commands
app.cli.add_command(seed_commands)

app.config.from_object(Config)
app.register_blueprint(user_routes, url_prefix='/api/users')
app.register_blueprint(auth_routes, url_prefix='/api/auth')
app.register_blueprint(block_routes, url_prefix="/api/block")
app.register_blueprint(week_routes, url_prefix="/api/week")
app.register_blueprint(day_routes, url_prefix="/api/day")
app.register_blueprint(exercise_routes, url_prefix="/api/exercise")
app.register_blueprint(room_routes, url_prefix="/api/room")
app.register_blueprint(chat_routes, url_prefix="/api/chat")
db.init_app(app)
Migrate(app, db, compare_type=True)

# Application Security
CORS(app)


# Since we are deploying with Docker and Flask,
# we won't be using a buildpack when we deploy to Heroku.
# Therefore, we need to make sure that in production any
# request made over http is redirected to https.
# Well.........
@app.before_request
def https_redirect():
    if os.environ.get('FLASK_ENV') == 'production':
        if request.headers.get('X-Forwarded-Proto') == 'http':
            url = request.url.replace('http://', 'https://', 1)
            code = 301
            return redirect(url, code=code)


@app.after_request
def inject_csrf_token(response):
    response.set_cookie(
        'csrf_token',
        generate_csrf(),
        secure=True if os.environ.get('FLASK_ENV') == 'production' else False,
        samesite='Strict' if os.environ.get(
            'FLASK_ENV') == 'production' else None,
        httponly=True)
    return response


@app.route('/', defaults={'path': ''})
@app.route('/<path:path>')
def react_root(path):
    if path == 'favicon.ico':
        return app.send_static_file('favicon.ico')
    return app.send_static_file('index.html')

if __name__ == '__main__':
    socketio.run(app)