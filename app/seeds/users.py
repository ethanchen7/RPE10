from app.models import db, User


# Adds a demo user, you can add other users here if you want
def seed_users():
    demo = User(first_name='Demo', last_name="Athlete", email='demo@gmail.com', password='password1233!')
    ethan = User(first_name='Ethan', last_name="Chen", email='ethan@gmail.com', password='Password123!')
    chan = User(first_name="Chan", last_name="Lee", email="chan@gmail.com", password="password123!")

    db.session.add(demo)
    db.session.add(ethan)
    db.session.add(chan)

    db.session.commit()


# Uses a raw SQL query to TRUNCATE the users table.
# SQLAlchemy doesn't have a built in function to do this
# TRUNCATE Removes all the data from the table, and RESET IDENTITY
# resets the auto incrementing primary key, CASCADE deletes any
# dependent entities
def undo_users():
    db.session.execute('TRUNCATE users RESTART IDENTITY CASCADE;')
    db.session.commit()
