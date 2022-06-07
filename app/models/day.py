from .db import db

class Day(db.Model):
    __tablename__ = 'days'
    id = db.Column(db.Integer, primary_key=True)
    notes = db.Column(db.Text, nullable=True)

    week_id = db.Column(db.Integer, db.ForeignKey("weeks.id"), nullable=False)
    week = db.relationship("Week", back_populates="week")

    exercises = db.relationship("Exercise", back_populates="day")

    def to_dict(self):
        return {
            "id":self.id,
            "notes": self.notes,
            "week_id": self.week_id,
            "exercises": {exercise.id: exercise.to_dict() for exercise in self.exercises}
        }