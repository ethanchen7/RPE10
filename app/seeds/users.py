from app.models import db, User


# Adds a demo user, you can add other users here if you want
def seed_users():
    demo = User(first_name='Demo', last_name="Athlete", email='demo@aa.io', password='password123!')
    ethan = User(first_name='Ethan', last_name="Chen", email='ethan@aa.io', password='Brokebois123!')

    db.session.add(demo)
    db.session.add(ethan)

    db.session.commit()


# Uses a raw SQL query to TRUNCATE the users table.
# SQLAlchemy doesn't have a built in function to do this
# TRUNCATE Removes all the data from the table, and RESET IDENTITY
# resets the auto incrementing primary key, CASCADE deletes any
# dependent entities
def undo_users():
    db.session.execute('TRUNCATE users RESTART IDENTITY CASCADE;')
    db.session.commit()
