from .db import db
from datetime import datetime
from dateutil.relativedelta import relativedelta

class Week(db.Model):
    __tablename__ = 'weeks'
    id = db.Column(db.Integer, primary_key=True)

    block_id = db.Column(db.Integer, db.ForeignKey("blocks.id"), nullable=False)
    block = db.relationship("Block", back_populates="weeks")

    days = db.relationship("Day", back_populates="week", cascade="all, delete-orphan")

    def to_dict(self):
        return {
            "id":self.id,
            "block_id": self.block.id,
            "days": {day.id: day.to_dict() for day in self.days}
        }