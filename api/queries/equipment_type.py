from pydantic import Basemodel
from psycopg_pool import ConnectionPool

pool = ConnectionPool(conninfo=os.environ.get('DATABASE_URL'))

class EquipmentType(Basemodel):
    name: str

class EquipmentTypeQueries:
    def get(self):
        with pool.connection() as conn:
            with conn.cursor() as cur:
                cur.execute(
                    """
                    SELECT *
                    FROM equipment
                    WHERE name
                    """,
                    [name],
                )
