from .db import db
from datetime import datetime

class Week(db.Model):
    __tablename__ = 'weeks'
    id = db.Column(db.Integer, primary_key=True)
    start_date = db.Column(db.Date, nullable=False)

    block_id = db.Column(db.Integer, db.ForeignKey("blocks.id"), nullable=False)
    block = db.relationship("Block", back_populates="weeks")

    days = db.relationship("Day", back_populates="week", cascade="all, delete-orphan")

    def to_dict(self):
        return {
            "id":self.id,
            "name": self.name,
            "start_date": self.start_date.strftime("%m/%d/%Y"),
            "block_id": self.block.id,
            "days": {day.id: day.to_dict() for day in self.days}
        }