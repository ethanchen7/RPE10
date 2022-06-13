from flask_wtf import FlaskForm
from wtforms import StringField, IntegerField
from wtforms.validators import DataRequired, Length

class RoomForm(FlaskForm):
    friend_id = IntegerField("friend_id", validators=[DataRequired()])