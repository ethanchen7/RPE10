from .db import db
from sqlalchemy.ext.hybrid import hybrid_property, hybrid_method

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

    @hybrid_method
    def total_vol(self):
        if self.sets != 0 or self.reps != 0:

            if self.weight != 0:
                totalVolume = self.weight * self.sets * self.reps
            else:
                totalVolume = 80 * self.sets * self.reps
            return totalVolume
        return 0

    def to_dict(self):
        return {
            "id":self.id,
            "name": self.name,
            "weight": self.weight,
            "sets": self.sets,
            "reps": self.reps,
            "rpe": self.rpe,
            "day_id": self.day_id,
            "total_vol": self.total_vol()
        }