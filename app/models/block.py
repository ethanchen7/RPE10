from .db import db

class Block(db.Model):
    __tablename__ = 'blocks'
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(40))

    user_id = db.Column(db.Integer, db.ForeignKey("users.id"), nullable=False)
    user = db.relationship("User", back_populates="blocks")

    weeks = db.relationship("Week", back_populates="block", cascade="all, delete-orphan")

    def to_dict(self):
        return {
            "id":self.id,
            "name": self.name,
            "user_id": self.user.id,
            "weeks": {week.id: week.todict() for week in self.weeks}
        }