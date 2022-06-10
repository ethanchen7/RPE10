from .db import db
from sqlalchemy.ext.hybrid import hybrid_property, hybrid_method
from sqlalchemy import select, func

class Day(db.Model):
    __tablename__ = 'days'
    id = db.Column(db.Integer, primary_key=True)
    notes = db.Column(db.Text, nullable=True)

    week_id = db.Column(db.Integer, db.ForeignKey("weeks.id"), nullable=False)
    week = db.relationship("Week", back_populates="days")

    exercises = db.relationship("Exercise", back_populates="day", cascade="all, delete-orphan")
    
    # total_vol = db.Column(db.Integer, default=0, nullable=True)

    @hybrid_property
    def exercise_count(self):
        return len(self.exercises)   # @note: use when non-dynamic relationship
        # return self.exercises.count()# @note: use when dynamic relationship
    
    @hybrid_method
    def total_vol(self):
        total = 0
        for exercise in self.exercises:
            total += exercise.total_vol
        return total

    @hybrid_method
    def avg_vol(self):
        return (self.total_vol() // self.exercise_count)

    def to_dict(self):
        return {
            "id":self.id,
            "notes": self.notes,
            "week_id": self.week_id,
            "exercises": {exercise.id: exercise.to_dict() for exercise in self.exercises},
            "total_vol": self.total_vol(),
            "avg_vol": self.avg_vol()
        }