"""nullable vol rpe

Revision ID: 6e6c5ef48b14
Revises: 9ff249bd63a5
Create Date: 2022-06-10 10:39:12.417143

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '6e6c5ef48b14'
down_revision = '9ff249bd63a5'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.add_column('weeks', sa.Column('avg_vol', sa.Integer(), nullable=True))
    op.add_column('weeks', sa.Column('avg_rpe', sa.Integer(), nullable=True))
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_column('weeks', 'avg_rpe')
    op.drop_column('weeks', 'avg_vol')
    # ### end Alembic commands ###
