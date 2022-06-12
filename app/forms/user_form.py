from flask_wtf import FlaskForm
from wtforms import StringField
from wtforms.validators import DataRequired, ValidationError, Length

class UserForm(FlaskForm):
    first_name = StringField('first name', validators=[DataRequired(message="This field is required."),\
                                           Length(max=40, message="First name should be less than 40 characters.")])
    last_name = StringField('last name', validators=[DataRequired(message="This field is required."),\
                                           Length(max=40, message="Last name should be less than 40 characters.")])