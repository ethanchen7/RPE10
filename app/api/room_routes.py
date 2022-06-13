from flask import Blueprint, jsonify, request, render_template
from flask_login import login_required, current_user
from app.forms.room_form import RoomForm
from app.models import db, User, Block, Week, Day, Exercise, Room, Chat

room_routes = Blueprint('rooms', __name__)

def validation_errors_to_error_messages(validation_errors):
    """
    Simple function that turns the WTForms validation errors into a simple list
    """
    errorMessages = []
    for field in validation_errors:
        for error in validation_errors[field]:
            errorMessages.append(f'{field} : {error}')
    return errorMessages

# @room_routes.route('/', methods=["GET"])
# def get_all_rooms():
#     user = User.query.get(current_user.id)
#     return 

# get all rooms of current user
@room_routes.route('/', methods=["GET"])
def get_all_rooms():
    user_rooms = Room.query.filter(Room.user_id == current_user.id or Room.friend_id == current_user.id).all()
    return {
        "user_rooms": [room.to_dict() for room in user_rooms]
    }

@room_routes.route('/<int:id>')
def get_room(id):
    room = Room.query.get(id)
    return room.to_dict()


@room_routes.route('/', methods=["POST"])
def new_room():
    form = RoomForm()
    form['csrf_token'].data = request.cookies('csrf_token')
    if form.validate_on_submit():
        user_id = current_user.id
        friend_id = form.data['friend_id']

        room = Room(
            user_id = user_id,
            friend_id = friend_id
        )
        db.session.add(room)
        db.session.commit()
    
    return room.to_dict()