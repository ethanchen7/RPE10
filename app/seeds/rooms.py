from app.models import db, User, Block, Week, Day, Exercise, Room

def seed_rooms():
    room1 = Room(user_id=1, friend_id=2)
    room2 = Room(user_id=1, friend_id=3)

    db.session.add(room1)
    db.session.add(room2)

    db.session.commit()


# Uses a raw SQL query to TRUNCATE the users table.
# SQLAlchemy doesn't have a built in function to do this
# TRUNCATE Removes all the data from the table, and RESET IDENTITY
# resets the auto incrementing primary key, CASCADE deletes any
# dependent entities
def undo_rooms():
    db.session.execute('TRUNCATE rooms RESTART IDENTITY CASCADE;')
    db.session.commit()