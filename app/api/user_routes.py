from flask import Blueprint, jsonify, request
from flask_login import login_required, current_user
from app.api.week_routes import validation_errors_to_error_messages
from app.models import db, User, Block
from app.forms.block_form import BlockForm

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
    return user.to_dict()

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