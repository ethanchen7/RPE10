from flask import Blueprint, jsonify, request, render_template
from flask_login import login_required, current_user
from app.models import db, User, Block, Week
from app.forms.block_form import BlockForm

block_routes = Blueprint('blocks', __name__)

def validation_errors_to_error_messages(validation_errors):
    """
    Simple function that turns the WTForms validation errors into a simple list
    """
    errorMessages = []
    for field in validation_errors:
        for error in validation_errors[field]:
            errorMessages.append(f'{field} : {error}')
    return errorMessages

@block_routes.route('/<int:id>')
@login_required
def get_block(id):
    block = Block.query.get(id)
    if block:
        return block.to_dict()
    else:
        return {'errors': ['Block not found.']}, 404

@block_routes.route('/<int:id>', methods=["PUT"])
# @login_required
def update_block(id):
    form = BlockForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        block = Block.query.get(id)
        if block:
            block.name = form.data['name']

            db.session.add(block)
            db.session.commit()
            return block.to_dict()
        else:
            return {'errors': ['Project not found.']}, 404
    
    else:
        return {'errors': validation_errors_to_error_messages(form.errors)}, 401

@block_routes.route('/<int:id>', methods=["DELETE"])
@login_required
def delete_block(id):
    block = Block.query.get(id)
    if block:
        db.session.delete(block)
        db.session.commit()
        return {'message': f'Block {id} was successfully deleted.'}
    
    else:
        return {'errors': 'Project not found.'}, 404

@block_routes.route('/<int:id>/weeks', methods=["POST"])
# @login_required
def create_week(id):
    block = Block.query.get(id)
    week = Week(
        block_id = block.id
    )
    db.session.add(week)
    db.session.commit()
    return week.to_dict()


