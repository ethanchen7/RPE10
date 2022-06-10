from app.models import db, Exercise

def seed_exercises():
    exercise1 = Exercise(name="Tempo Squat 3 Sec", weight=300,sets=3,reps=8,rpe=7, day_id=1)
    exercise2 = Exercise(name="2ct Pause Bench", weight=210,sets=3,reps=3,rpe=6.5, day_id=1)
    exercise3 = Exercise(name="Flat Dumbbell Press", weight=90, sets=4, reps=15, rpe=7, day_id=1)
    exercise4 = Exercise(name="Tricep Accessory", weight=0, sets=4, reps=15, rpe=7, day_id=1)
    exercise5 = Exercise(name="Leg Extensions", weight=0, sets=4, reps=15, rpe=7, day_id=1)
    
    exercise6 = Exercise(name="Progressive Highbar Squat", weight=320, sets=3, reps=5, rpe=6, day_id=2)
    exercise7 = Exercise(name="Competition Deadlift", weight=357, sets=4, reps=2, rpe=7, day_id=2)
    exercise8 = Exercise(name="Pull-ups AMRAP", weight=0, sets=3, reps=10, rpe=10, day_id=2)
    exercise9 = Exercise(name="Romanian Deadlift", weight=225, sets=3, reps=10, rpe=7, day_id=2)
    exercise10 = Exercise(name="BB/DB Rows", weight=90, sets=4, reps=15, rpe=7, day_id=2)
    exercise11 = Exercise(name="Lat Pulldowns", weight=140, sets=4, reps=15, rpe=7, day_id=2)

    exercise12= Exercise(name="Competition Bench", weight=253, sets=1, reps=2, rpe=7, day_id=3)
    exercise13 = Exercise(name="Competition Bench", weight=210, sets=3, reps=8, rpe=7, day_id=3)
    exercise14 = Exercise(name="Incline Dumbbell Press", weight=70, sets=3, reps=15, rpe=7, day_id=3)
    exercise15 = Exercise(name="Cable Flys", weight=0, sets=3, reps=15, rpe=7, day_id=3)
    exercise16 = Exercise(name="Lat Pulldowns", weight=140, sets=3, reps=10, rpe=7, day_id=3)
    exercise17 = Exercise(name="Tricep Accessory", weight=0, sets=3, reps=10, rpe=7, day_id=3)

    exercise18 = Exercise(name="Competition Squat", weight=402, sets=1, reps=1, rpe=6, day_id=4)
    exercise19 = Exercise(name="Competition Squat", weight=306, sets=3, reps=6, rpe=7, day_id=4)
    exercise20 = Exercise(name="Tempo Bench 3/1/3", weight=225, sets=5, reps=2, rpe=6, day_id = 4)
    exercise21 = Exercise(name="Planks", weight=0, sets=3, reps=10, rpe=10, day_id=4)

    exercise22 = Exercise(name="Tempo Squat 3 Sec", weight=285, sets=3, reps=10, rpe=7, day_id=5)
    exercise23 = Exercise(name="2ct Pause Bench", weight=215, sets=4, reps=3, rpe=7, day_id=5)
    exercise24 = Exercise(name="Flat Dumbbell Press", weight=70, sets=4, reps=15, rpe=7, day_id=5)
    exercise25 = Exercise(name="Tricep Accessory", weight=0, sets=4, reps=15, rpe=7, day_id=5)
    exercise26= Exercise(name="Leg Extensions", weight=0, sets=4, reps=15, rpe=7, day_id=5)

    exercise27 = Exercise(name="Progressive Highbar Squats", weight=330, sets=4, reps=4, rpe=6, day_id=6)
    exercise28 = Exercise(name="Competition Deadlift", weight=365, sets=3, reps=3, rpe=8, day_id=6)
    exercise29 = Exercise(name="Pull-ups AMRAP", weight=0, sets=4, reps=15, rpe=7, day_id=6)
    exercise30 = Exercise(name="Romanian Deadlifts", weight=235, sets=3, reps=10, rpe=7, day_id=6)
    exercise31 = Exercise(name="BB/DB Rows", weight=80, sets=4, reps=15, rpe=7, day_id=6)
    exercise32 = Exercise(name="Lat Pulldowns", weight=140, sets=4, reps=15, rpe=7, day_id=6)
    
    exercise33 = Exercise(name="Competition Bench", weight=255, sets=1, reps=2, rpe=7.5, day_id=7)
    exercise33 = Exercise(name="Competition Bench", weight=205, sets=3, reps=10, rpe=7, day_id=7)
    exercise34 = Exercise(name="Incline Dumbbell Press", weight=80, sets=3, reps=15, rpe=7, day_id=7)
    exercise35 = Exercise(name='Cable Flys', weight=0, sets=3, reps=10, rpe=7, day_id=7)
    exercise36 = Exercise(name="Lat Pulldowns", weight=145, sets=3, reps=10, rpe=7, day_id=7)
    exercise37 = Exercise(name="Tricep Accessory", weight=0, sets=3, reps=10, rpe=7, day_id=7)

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
    db.session.add(exercise11)

    db.session.add(exercise12)
    db.session.add(exercise13)
    db.session.add(exercise14)
    db.session.add(exercise15)
    db.session.add(exercise16)
    db.session.add(exercise17)

    db.session.add(exercise18)
    db.session.add(exercise19)
    db.session.add(exercise20)
    db.session.add(exercise21)

    db.session.add(exercise22)
    db.session.add(exercise23)
    db.session.add(exercise24)
    db.session.add(exercise25)
    db.session.add(exercise26)

    db.session.add(exercise27)
    db.session.add(exercise28)
    db.session.add(exercise29)
    db.session.add(exercise30)
    db.session.add(exercise31)
    db.session.add(exercise32)

    db.session.add(exercise33)
    db.session.add(exercise34)
    db.session.add(exercise35)
    db.session.add(exercise36)
    db.session.add(exercise37)

    db.session.commit()


# Uses a raw SQL query to TRUNCATE the users table.
# SQLAlchemy doesn't have a built in function to do this
# TRUNCATE Removes all the data from the table, and RESET IDENTITY
# resets the auto incrementing primary key, CASCADE deletes any
# dependent entities
def undo_exercises():
    db.session.execute('TRUNCATE exercises RESTART IDENTITY CASCADE;')
    db.session.commit()
