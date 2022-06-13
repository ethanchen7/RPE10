from app.models import db, User, Block, Week, Day, Exercise, Room, Chat

def seed_chats():
    chat1 = Chat(message="test chat", user_id=1, room_id=1)
    chat2 = Chat(message="yoyo", user_id=2, room_id=1)
    chat3 = Chat(message="hey its working", user_id=1, room_id=1)
    chat4 = Chat(message="yeah it is", user_id=2, room_id=1)

    db.session.add(chat1)
    db.session.add(chat2)
    db.session.add(chat3)
    db.session.add(chat4)

    db.session.commit()


# Uses a raw SQL query to TRUNCATE the users table.
# SQLAlchemy doesn't have a built in function to do this
# TRUNCATE Removes all the data from the table, and RESET IDENTITY
# resets the auto incrementing primary key, CASCADE deletes any
# dependent entities
def undo_chats():
    db.session.execute('TRUNCATE chats RESTART IDENTITY CASCADE;')
    db.session.commit()