"""added total vol to day

Revision ID: 21476c5704d3
Revises: 6e6c5ef48b14
Create Date: 2022-06-10 11:08:05.739099

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '21476c5704d3'
down_revision = '6e6c5ef48b14'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.add_column('days', sa.Column('total_vol', sa.Integer(), nullable=True))
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_column('days', 'total_vol')
    # ### end Alembic commands ###
