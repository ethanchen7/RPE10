from xml.dom import ValidationErr
from flask_wtf import FlaskForm
from wtforms import StringField
from wtforms.validators import Length

class BlockForm(FlaskForm):
    name = StringField("name", validators=[Length(max=40, message="Block name must be less than 40 characters.")])