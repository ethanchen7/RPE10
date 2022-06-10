"""removed self attributes and added hybrids

Revision ID: 7af09ab2aacd
Revises: 21476c5704d3
Create Date: 2022-06-10 12:12:31.251074

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '7af09ab2aacd'
down_revision = '21476c5704d3'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_column('days', 'total_vol')
    op.add_column('exercises', sa.Column('total_vol', sa.Integer(), nullable=True))
    op.drop_column('weeks', 'avg_vol')
    op.drop_column('weeks', 'avg_rpe')
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.add_column('weeks', sa.Column('avg_rpe', sa.INTEGER(), autoincrement=False, nullable=True))
    op.add_column('weeks', sa.Column('avg_vol', sa.INTEGER(), autoincrement=False, nullable=True))
    op.drop_column('exercises', 'total_vol')
    op.add_column('days', sa.Column('total_vol', sa.INTEGER(), autoincrement=False, nullable=True))
    # ### end Alembic commands ###