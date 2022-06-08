from flask import Blueprint, jsonify, request, render_template
from flask_login import login_required, current_user
from app.models import db, User, Block, Week, Day
from app.forms.day_form import DayForm

week_routes = Blueprint('weeks', __name__)

def validation_errors_to_error_messages(validation_errors):
    """
    Simple function that turns the WTForms validation errors into a simple list
    """
    errorMessages = []
    for field in validation_errors:
        for error in validation_errors[field]:
            errorMessages.append(f'{field} : {error}')
    return errorMessages

@week_routes.route('/<int:id>', methods=["GET"])
@login_required
def get_week(id):
    week = Week.query.get(id)
    if week:
        return week.to_dict()
    else:
        return {'errors': "The requested week was not found."}, 404

@week_routes.route('/<int:id>', methods=["DELETE"])
# @login_required
def delete_week(id):
    week = Week.query.get(id)
    db.session.delete(week)
    db.session.commit()
    return {'message': f'Week ID {id} was deleted.'}

@week_routes.route('/<int:id>/days', methods=["POST"])
def create_day(id):
    form = DayForm()
    form['csrf_token'].data = request.cookies['csrf_token']

    if form.validate_on_submit():
        
        week = Week.query.get(id)
        day = Day(
            week_id = week.id,
            notes = form.data['notes']
        )
        db.session.add(day)
        db.session.commit()
        return day.to_dict()
    
    return {'errors': validation_errors_to_error_messages(form.errors)}, 401
        