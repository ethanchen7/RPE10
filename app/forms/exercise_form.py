from xml.dom import ValidationErr
from flask_wtf import FlaskForm
from wtforms import StringField, IntegerField
from wtforms.validators import Length, DataRequired

class ExerciseForm(FlaskForm):
    name = StringField('name', validators=[DataRequired(), Length(max=100, message="Exercise name must be less than 100 characters")])
    weight = IntegerField('weight', validators=[DataRequired()])
    sets = IntegerField('sets', validators=[DataRequired()])
    reps = IntegerField('reps', validators=[DataRequired()])
    rpe = IntegerField('rpe', validators=[DataRequired()])