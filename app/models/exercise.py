from .db import db

class Exercise(db.Model):
    __tablename__ = 'exercises'
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), nullable=True)
    weight = db.Column(db.Integer, nullable=True)
    sets = db.Column(db.Integer, nullable=True)
    reps = db.Column(db.Integer, nullable=True)
    rpe = db.Column(db.Integer, nullable=True)

    day_id = db.Column(db.Integer, db.ForeignKey("days.id"), nullable=False)
    day = db.relationship("Day", back_populates="exercises")

    total_vol = db.Column(db.Integer, default=0, nullable=True)

    def to_dict(self):
        return {
            "id":self.id,
            "name": self.name,
            "weight": self.weight,
            "sets": self.sets,
            "reps": self.reps,
            "rpe": self.rpe,
            "day_id": self.day_id,
            "total_vol": self.total_vol
        }