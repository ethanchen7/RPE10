from .db import db
from datetime import datetime

class Chat(db.Model):
    __tablename__ = 'chats'
    id = db.Column(db.Integer, primary_key=True)
    message = db.Column(db.String(500), nullable=False)
    created_at = db.Column(db.DateTime, nullable=False, default=datetime.now())

    user_id = db.Column(db.Integer, db.ForeignKey("users.id"), nullable=False)
    user = db.relationship('User', back_populates='chats')

    room_id = db.Column(db.Integer, db.ForeignKey("rooms.id"), nullable=False)
    room = db.relationship('Room', back_populates='chats')

    def to_dict(self):
        return {
            "id":self.id,
            "message":self.message,
            "created_at": self.created_at.strftime("%m/%d/%Y at %I:%M:%S%p"),
            "user_id": self.user_id,
            "room_id": self.room_id
        }