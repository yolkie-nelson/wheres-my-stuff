from pydantic import BaseModel
from datetime import date
from queries.equipment_type import EquipmentTypeIn
from psycopg_pool import ConnectionPool
import os


pool = ConnectionPool(conninfo=os.environ.get('DATABASE_URL'))


class EquipmentIn(BaseModel):
    equipment_type: EquipmentTypeIn
    model_name: str
    description: str
    serial_number: int
    warehouse: int
    date_serviced: date
    photo: str


class EquipmentOut(BaseModel):
    id: int
    equipment_type: EquipmentTypeIn
    model_name: str
    description: str
    serial_number: int
    warehouse: int
    date_serviced: date
    photo: str


class EquipmentQueries:
    def get(self, serial_number: str) -> EquipmentOut:
        with pool.connection() as conn:
            with conn.cursor() as cur:
                cur.execute(
                    """
                    SELECT *
                    FROM equipment
                    WHERE serial_number = %s;
                    """,
                    [serial_number],
                )
                try:
                    record = None
                    for row in cur.fetchall():
                        record = {}
                        for i, column in enumerate(cur.description):
                            record[column.name] = row[i]
                    return EquipmentOut(**record)
                except Exception:
                    print("exception")
                    return {
                        "message": "Could not get equipment from this serial number"
                    }

    def create_equipment(
            self, data) -> EquipmentOut:
        with pool.connection() as conn:
            with conn.cursor() as cur:
                params = [
                    data.equipment_type,
                    data.model_name,
                    data.description,
                    data.serial_number,
                    data.warehouse,
                    data.date_serviced,
                    data.photo,
                ]
                cur.execute(
                    """
                    INSERT INTO equipment (
                        equipment_type,
                        model_name,
                        description,
                        serial_number,
                        warehouse,
                        date_serviced,
                        photo)
                    VALUES (%s, %s, %s, %s, %s, %s, %s)
                    RETURNING id, model_name, serial_number
                    """,
                    params,
                )

                record = None
                row = cur.fetchone()
                if row is not None:
                    record = {}
                    for i, column in enumerate(cur.description):
                        record[column.name] = row[i]
                print(record)
                return EquipmentOut(**record)
