from xml.dom import ValidationErr
from flask_wtf import FlaskForm
from wtforms import StringField, IntegerField
from wtforms.validators import Length, DataRequired

class ExerciseForm(FlaskForm):
    name = StringField('name', validators=[Length(max=100, message="Exercise name must be less than 100 characters")])
    weight = IntegerField('weight')
    sets = IntegerField('sets')
    reps = IntegerField('reps')
    rpe = IntegerField('rpe')