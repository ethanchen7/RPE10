from app.models import db, User, Block, Week, Day, Exercise

def seed_weeks():
    week1 = Week(block_id=1)
    week2 = Week(block_id=1)
    week3 = Week(block_id=1)
    week4 = Week(block_id=1)
    week5 = Week(block_id=1)
    week6 = Week(block_id=1)

    week7 = Week(block_id=2)
    week8 = Week(block_id=2)
    week9 = Week(block_id=2)
    week10 = Week(block_id=2)

    db.session.add(week1)
    db.session.add(week2)
    db.session.add(week3)
    db.session.add(week4)
    db.session.add(week5)
    db.session.add(week6)

    db.session.add(week7)
    db.session.add(week8)
    db.session.add(week9)
    db.session.add(week10)

    db.session.commit()


# Uses a raw SQL query to TRUNCATE the users table.
# SQLAlchemy doesn't have a built in function to do this
# TRUNCATE Removes all the data from the table, and RESET IDENTITY
# resets the auto incrementing primary key, CASCADE deletes any
# dependent entities
def undo_weeks():
    db.session.execute('TRUNCATE weeks RESTART IDENTITY CASCADE;')
    db.session.commit()
