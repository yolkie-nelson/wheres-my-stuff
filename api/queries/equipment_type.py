from pydantic import BaseModel
from datetime import date
from psycopg_pool import ConnectionPool
import os


pool = ConnectionPool(conninfo=os.environ.get('DATABASE_URL'))


class EquipmentTypeIn(BaseModel):
    name: str

class EquipmentTypeOut(BaseModel):
    id: int
    name: str

class EquipmentTypeQueries:
    def get(self, id: int) -> EquipmentTypeOut:
        print("here in get): " + id)
        with pool.connection() as conn:
            with conn.cursor() as cur:
                cur.execute(
                    """
                    SELECT *
                    FROM equipment_type
                    WHERE id = %s;
                    """,
                    [id],
                )
                try:
                    record = None
                    for row in cur.fetchall():
                        record = {}
                        for i, column in enumerate(cur.description):
                            record[column.name] = row[i]
                    return EquipmentTypeOut(**record)
                except Exception:
                    print("exception")
                    return {
                        "message": "Could not get equipment type from this id"
                    }

    def create_equipment_type(
            self, data) -> EquipmentTypeOut:
        with pool.connection() as conn:
            with conn.cursor() as cur:
                params = [data.name]
                cur.execute(
                    """
                    INSERT INTO equipment_type (name)
                    VALUES (%s)
                    RETURNING name
                    """,
                    params,
                )

                record = None
                create_id = cur.fetchone()[0]
                row = cur.fetchone()
                if row is not None:
                    record = {}
                    for i, column in enumerate(cur.description):
                        record[column.name] = row[i]
                print(record)
                return EquipmentTypeOut(id=create_id, **record)