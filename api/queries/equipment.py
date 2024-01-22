from pydantic import BaseModel
from datetime import date
from typing import Union, List
from queries.equipment_type import EquipmentTypeOut
from queries.storage_site import StorageSiteOut
from psycopg_pool import ConnectionPool
import os


pool = ConnectionPool(conninfo=os.environ.get('DATABASE_URL'))

class Error(BaseModel):
    message: str

class EquipmentIn(BaseModel):
    equipment_type_id: int
    model_name: str
    description: str
    serial_number: int
    storage_site_id: int
    date_serviced: date
    photo: str


class EquipmentOut(BaseModel):
    id: int
    equipment_type_id: int
    model_name: str
    description: str
    serial_number: int
    storage_site_id: int
    date_serviced: date
    photo: str


class EquipmentQueries:
    def get_equipment(self) -> Union[Error, List[EquipmentOut]]:
        try:
            with pool.connection() as conn:
                with conn.cursor() as cur:
                    cur.execute(
                        """
                        SELECT *
                        FROM equipment
                        ORDER BY id;
                        """,
                    )
                    return [
                        EquipmentOut(
                            id=record[0],
                            equipment_type=record[1],
                            model_name=record[2],
                            description=record[3],
                            serial_number=record[4],
                            storage_site=record[5],
                            date_serviced=record[6],
                            photo=record[7]
                        )
                        for record in cur
                    ]
        except Exception:
            return {
                "message": "Could not get equipment from this serial number"
            }

    def create_equipment(self, equipment: EquipmentIn) -> EquipmentOut:
        try:
            with pool.connection() as conn:
                with conn.cursor() as cur:
                    result = cur.execute(
                        """
                        INSERT INTO equipment (
                        model_name,
                        description,
                        serial_number,
                        storage_site_id,
                        date_serviced,
                        photo,
                        equipment_type_id
                        )
                        VALUES (%s, %s, %s, %s, %s, %s, %s)
                        RETURNING equipment_id;
                        """,
                        [
                            equipment.model_name,
                            equipment.description,
                            equipment.serial_number,
                            equipment.storage_site_id,
                            equipment.date_serviced,
                            equipment.photo,
                            equipment.equipment_type_id,
                        ]
                    )
                    id = result.fetchone()[0]
                    return self.equipment_in_to_out(id, equipment)
        except Exception as e:
                print(e)
                return {
                    "message": "Could not create equipment type"
                }

    def equipment_in_to_out(self, id: int, equipment: EquipmentIn):
        old_data = equipment.dict()
        return EquipmentOut(id=id, **old_data)
