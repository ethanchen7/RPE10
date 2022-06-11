from xml.dom import ValidationErr
from flask_wtf import FlaskForm
from wtforms import StringField, IntegerField
from wtforms.validators import Length, NumberRange

class ExerciseForm(FlaskForm):
    name = StringField('name', validators=[Length(max=60, message="Exercise name must be less than 60 characters")])
    weight = IntegerField('weight',validators=[NumberRange(min=0, message="Cannot be negative.")])
    sets = IntegerField('sets',validators=[NumberRange(min=0, message="Cannot be negative.")])
    reps = IntegerField('reps',validators=[NumberRange(min=0, message="Cannot be negative.")])
    rpe = IntegerField('rpe',validators=[NumberRange(min=0, message="Cannot be negative.")])

    total_vol = IntegerField("total_vol")