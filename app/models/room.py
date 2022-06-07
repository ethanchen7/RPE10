from .db import db

class Room(db.Model):
    __tablename__ = 'rooms'
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey("users.id"), nullable=False)

    user = db.relationship("User", back_populates="rooms", foreign_keys=[user_id])
    chats = db.relationship('Chat', back_populates='room', cascade="all, delete")

    def to_dict(self):
        return {
            "id":self.id,
            "user_id":self.user_id
        }