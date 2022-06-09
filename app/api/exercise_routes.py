from flask import Blueprint, jsonify, request, render_template
from flask_login import login_required, current_user
from app.models import db, Day, Exercise
from app.forms.exercise_form import ExerciseForm

exercise_routes = Blueprint('exercises', __name__)

def validation_errors_to_error_messages(validation_errors):
    """
    Simple function that turns the WTForms validation errors into a simple list
    """
    errorMessages = []
    for field in validation_errors:
        for error in validation_errors[field]:
            errorMessages.append(f'{field} : {error}')
    return errorMessages

@exercise_routes.route('/<int:id>', methods=["GET"])
def get_exercise(id):
    exercise = Exercise.query.get(id)
    if exercise:
        return exercise.to_dict()
    else:
        return {'errors': ["Exercise not found"]}, 404

@exercise_routes.route('/<int:id>', methods=['PUT'])
def update_exercise(id):
    form = ExerciseForm()
    form['csrf_token'].data = request.cookies['csrf_token']

    if form.validate_on_submit():
        exercise = Exercise.query.get(id)
        if exercise:
            exercise.name=form.data['name']
            exercise.weight=form.data['weight']
            exercise.sets = form.data['sets']
            exercise.reps = form.data['reps']
            exercise.rpe = form.data['rpe']
            
            db.session.commit()
            return exercise.to_dict()
        else:
            return {'errors': ["Exercise not found"]}, 404
    return {'errors': validation_errors_to_error_messages(form.errors)}, 401

@exercise_routes.route('/<int:id>', methods=["DELETE"])
def delete_exercise(id):
    exercise = Exercise.query.get(id)
    if exercise:
        db.session.delete(exercise)
        return exercise.to_dict()
    else:
        return {'errors': ["Exercise not found"]}, 404


    