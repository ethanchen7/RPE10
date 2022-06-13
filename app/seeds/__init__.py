from flask.cli import AppGroup
from .users import seed_users, undo_users
from .blocks import seed_blocks, undo_blocks
from .weeks import seed_weeks, undo_weeks
from .days import seed_days, undo_days
from .exercises import seed_exercises, undo_exercises
from .rooms import seed_rooms, undo_rooms

# Creates a seed group to hold our commands
# So we can type `flask seed --help`
seed_commands = AppGroup('seed')


# Creates the `flask seed all` command
@seed_commands.command('all')
def seed():
    seed_users()
    seed_blocks()
    seed_weeks()
    seed_days()
    seed_exercises()
    seed_rooms()


# Creates the `flask seed undo` command
@seed_commands.command('undo')
def undo():
    undo_users()
    undo_blocks()
    undo_weeks()
    undo_days()
    undo_exercises()
    undo_rooms()
    
