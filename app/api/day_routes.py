from flask import Blueprint, jsonify, request, render_template
from flask_login import login_required, current_user
from app.models import db, User, Block, Week, Day, Exercise
from app.forms.day_form import DayForm
from app.forms.exercise_form import ExerciseForm

day_routes = Blueprint('days', __name__)

def validation_errors_to_error_messages(validation_errors):
    """
    Simple function that turns the WTForms validation errors into a simple list
    """
    errorMessages = []
    for field in validation_errors:
        for error in validation_errors[field]:
            errorMessages.append(f'{field} : {error}')
    return errorMessages

@day_routes.route('/<int:id>', methods=["GET"])
@login_required
def get_day(id):
    day = Day.query.get(id)
    if day:
        return day.to_dict()
    else:
        return {'errors': "The requested day was not found."}, 404

@day_routes.route('/<int:id>', methods=["PUT"])
@login_required
def update_day(id):

    form = DayForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        day = Day.query.get(id)
        if day:
            day.notes = form.data['notes']
            db.session.commit()
            return day.to_dict()
        else:
            return {'errors': ['Day not found.']}, 404
    return {'errors': validation_errors_to_error_messages(form.errors)}, 401

@day_routes.route('/<int:id>', methods=["DELETE"])
@login_required
def delete_day(id):
    day = Day.query.get(id)
    if day:
        db.session.delete(day)
        db.session.commit()
        return {'message': f'Day {id} was deleted successfully.'}
    else:
        return {'errors': ['Day not found.']}, 404

@day_routes.route('/<int:id>/exercises', methods=["POST"])
@login_required
def create_exercise(id):
    form = ExerciseForm()
    form['csrf_token'].data = request.cookies['csrf_token']

    if form.validate_on_submit():
        day = Day.query.get(id)
        exercise = Exercise(
            name= form.data['name'],
            weight = form.data['weight'],
            sets = form.data['sets'],
            reps = form.data['reps'],
            rpe = form.data['rpe'],
            day_id = day.id
        )
        db.session.add(exercise)
        db.session.commit()
        return exercise.to_dict()
    
    return {'errors': validation_errors_to_error_messages(form.errors)}, 401
    