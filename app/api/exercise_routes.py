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


    