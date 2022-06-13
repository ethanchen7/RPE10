from flask import Blueprint, jsonify, request
from flask_login import login_required, current_user
from app.api.week_routes import validation_errors_to_error_messages
from app.models import db, User, Block
from app.forms.block_form import BlockForm
from app.forms.user_form import UserForm

user_routes = Blueprint('users', __name__)


@user_routes.route('/')
@login_required
def users():
    users = User.query.all()
    return {'users': [user.to_dict() for user in users]}


@user_routes.route('/<int:id>')
@login_required
def user(id):
    user = User.query.get(id)
    user_dict = user.to_dict()

    blocks_dict = {block.id: block.to_dict() for block in user.blocks}
    blocks = list(blocks_dict.values())
    
    weeks = {}
    for block in blocks:
        weeks.update(block["weeks"])

    days = {}
    weeks_list = list(weeks.values())
    for week in weeks_list:
        days.update(week['days'])
    
    exercises = {}
    days_list = list(days.values())
    for day in days_list:
        exercises.update(day['exercises'])

    user_dict['weeks'] = weeks
    user_dict['days'] = days
    user_dict['exercises'] = exercises
    return user_dict

@user_routes.route('/rooms', methods=["GET"])
@login_required
def user_rooms():
    user = User.query.get(current_user.id)
    return user.to_dict()

@user_routes.route('/<int:id>', methods=["PUT"])
@login_required
def user_name_change(id):
    
    form =UserForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        user = User.query.get(id)
        user.first_name = form.data['first_name']
        user.last_name = form.data['last_name']

        db.session.commit()
        return user.to_dict()
        
    return {'errors': validation_errors_to_error_messages(form.errors)}, 401

@user_routes.route('/<int:id>/block', methods=["POST"])
@login_required
def create_block(id):
    form = BlockForm()
    form['csrf_token'].data = request.cookies['csrf_token']

    if form.validate_on_submit():
        block = Block(
            user_id = current_user.id,
            name=form.data['name']
        )

        db.session.add(block)
        db.session.commit()
        return block.to_dict()
    
    return {'errors': validation_errors_to_error_messages(form.errors)}, 401