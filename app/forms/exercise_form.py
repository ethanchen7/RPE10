from xml.dom import ValidationErr
from flask_wtf import FlaskForm
from wtforms import StringField, IntegerField
from wtforms.validators import Length, NumberRange

class ExerciseForm(FlaskForm):
    name = StringField('name', validators=[Length(max=60, message="Exercise name must be less than 60 characters.")])
    weight = IntegerField('weight',validators=[NumberRange(min=0, message="Cannot be negative."), NumberRange(max=1500, message="You're not that strong. Weight must be <= 1500.")])
    sets = IntegerField('sets',validators=[NumberRange(min=0, message="Cannot be negative."), NumberRange(max=20, message="Sets must be <= 20.")])
    reps = IntegerField('reps',validators=[NumberRange(min=0, message="Cannot be negative."), NumberRange(max=100, message="Reps must be <= 100.")])
    rpe = IntegerField('rpe',validators=[NumberRange(min=0, message="Cannot be negative."), NumberRange(max=10, message="RPE must be <= 10.")])

    total_vol = IntegerField("total_vol")