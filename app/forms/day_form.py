from xml.dom import ValidationErr
from flask_wtf import FlaskForm
from wtforms import StringField
from wtforms.validators import Length

class DayForm(FlaskForm):
    notes = StringField('notes', validators= [Length(max=500, message="The note must not be greater than 500 characters.")])