from app.models import db, User, Block, Week, Day, Exercise

def seed_blocks():
    block1 = Block(name="Hypertrophy", user_id=1)
    block2 = Block(name="Strength", user_id=1)

    db.session.add(block1)
    db.session.add(block2)

    db.session.commit()


# Uses a raw SQL query to TRUNCATE the users table.
# SQLAlchemy doesn't have a built in function to do this
# TRUNCATE Removes all the data from the table, and RESET IDENTITY
# resets the auto incrementing primary key, CASCADE deletes any
# dependent entities
def undo_blocks():
    db.session.execute('TRUNCATE blocks RESTART IDENTITY CASCADE;')
    db.session.commit()
