from app.models import db, Exercise

def seed_exercises():
    exercise1 = Exercise(name="Something", weight=255,sets=4,reps=5,rpe=9)
    exercise2 = Exercise(block_id=1)
    exercise3 = Exercise(block_id=1)
    exercise4 = Exercise(block_id=1)
    exercise5 = Exercise(block_id=1)
    exercise6 = Exercise(block_id=1)

    exercise7 = Exercise(block_id=2)
    exercise8 = Exercise(block_id=2)
    exercise9 = Exercise(block_id=2)
    exercise10 = Exercise(block_id=2)

    db.session.add(exercise1)
    db.session.add(exercise2)
    db.session.add(exercise3)
    db.session.add(exercise4)
    db.session.add(exercise5)
    db.session.add(exercise6)

    db.session.add(exercise7)
    db.session.add(exercise8)
    db.session.add(exercise9)
    db.session.add(exercise10)

    db.session.commit()


# Uses a raw SQL query to TRUNCATE the users table.
# SQLAlchemy doesn't have a built in function to do this
# TRUNCATE Removes all the data from the table, and RESET IDENTITY
# resets the auto incrementing primary key, CASCADE deletes any
# dependent entities
def undo_exercises():
    db.session.execute('TRUNCATE exercises RESTART IDENTITY CASCADE;')
    db.session.commit()
