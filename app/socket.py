from flask_socketio import SocketIO

# create your SocketIO instance
socketio = SocketIO()

socketio = SocketIO(cors_allowed_origins="*")