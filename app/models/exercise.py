from .db import db

class Exercise(db.Model):
    __tablename__ = 'exercises'
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), nullable=False)
    weight = db.Column(db.Integer, nullable=False)
    sets = db.Column(db.Integer, nullable=False)
    reps = db.Column(db.Integer, nullable=False)
    rpe = db.Column(db.Integer, nullable=False)

    day_id = db.Column(db.Integer, db.ForeignKey("days.id"), nullable=False)
    day = db.relationship("Day", back_populates="exercises")

    def to_dict(self):
        return {
            "id":self.id,
            "name": self.name,
            "weight": self.weight,
            "sets": self.sets,
            "reps": self.reps,
            "rpe": self.rpe,
            "day_id": self.day_id
        }