from email.policy import default
from .db import db
from datetime import datetime
from dateutil.relativedelta import relativedelta
from sqlalchemy.ext.hybrid import hybrid_property, hybrid_method

class Week(db.Model):
    __tablename__ = 'weeks'
    id = db.Column(db.Integer, primary_key=True)

    block_id = db.Column(db.Integer, db.ForeignKey("blocks.id"), nullable=False)
    block = db.relationship("Block", back_populates="weeks")

    days = db.relationship("Day", back_populates="week", cascade="all, delete-orphan")

    @hybrid_property
    def day_count(self):
        return len(self.days)   # @note: use when non-dynamic relationship
        # return self.exercises.count()# @note: use when dynamic relationship

    @hybrid_method
    def avg_vol(self):
        total = 0
        for day in self.days:
            total += day.avg_vol()
        if self.day_count:
            return (total // self.day_count)
        return 0

    def to_dict(self):
        return {
            "id":self.id,
            "block_id": self.block.id,
            "days": {day.id: day.to_dict() for day in self.days},
            "avg_vol": self.avg_vol(),
            # "avg_rpe": self.avg_rpe,
        }