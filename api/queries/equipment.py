from pydantic import BaseModel
from datetime import date
from typing import Union, List, Optional
from psycopg_pool import ConnectionPool
import os


pool = ConnectionPool(conninfo=os.environ.get("DATABASE_URL"))


class Error(BaseModel):
    message: str


class EquipmentIn(BaseModel):
    model_name: str
    description: str
    serial_number: int
    storage_site_id: int
    date_serviced: date
    photo: str
    equipment_type_id: int


class EquipmentOut(BaseModel):
    id: int
    model_name: str
    description: str
    serial_number: int
    storage_site_id: int
    date_serviced: date
    photo: str
    equipment_type_id: int


class EquipmentQueries:
    def get_equipment(self) -> Union[Error, List[EquipmentOut]]:
        try:
            with pool.connection() as conn:
                with conn.cursor() as cur:
                    cur.execute(
                        """
                        SELECT *
                        FROM equipment
                        ORDER BY equipment_id;
                        """,
                    )
                    return [
                        EquipmentOut(
                            id=record[0],
                            model_name=record[1],
                            description=record[2],
                            serial_number=record[3],
                            storage_site_id=record[4],
                            date_serviced=record[5],
                            photo=record[6],
                            equipment_type_id=record[7],
                        )
                        for record in cur
                    ]
        except Exception as e:
            print(e)
            return {"message": "Could not get equipment"}

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
                        ],
                    )
                    id = result.fetchone()[0]
                    return self.equipment_in_to_out(id, equipment)
        except Exception as e:
            print(e)
            return {"message": "Could not create equipment type"}

    def get_one_equipment(self, serial_number: int) -> Optional[EquipmentOut]:
        try:
            with pool.connection() as conn:
                with conn.cursor() as cur:
                    result = cur.execute(
                        """
                        SELECT equipment_id
                            , model_name
                            , description
                            , serial_number
                            , storage_site_id
                            , date_serviced
                            , photo
                            , equipment_type_id
                        FROM equipment
                        WHERE serial_number = %s
                        """,
                        [serial_number],
                    )
                    record = result.fetchone()
                    return EquipmentOut(
                        id=record[0],
                        model_name=record[1],
                        description=record[2],
                        serial_number=record[3],
                        storage_site_id=record[4],
                        date_serviced=record[5],
                        photo=record[6],
                        equipment_type_id=record[7],
                    )
        except Exception:
            return {"message": "Could not find this equipment"}

    def update_equipment(
        self, serial_number: int, equipment: EquipmentIn
    ) -> Union[EquipmentOut, Error]:
        try:
            with pool.connection() as conn:
                with conn.cursor() as cur:
                    cur.execute(
                        """
                        UPDATE equipment
                        SET model_name = %s
                            , description = %s
                            , serial_number = %s
                            , storage_site_id = %s
                            , date_serviced = %s
                            , photo = %s
                            , equipment_type_id = %s
                        WHERE serial_number = %s
                        """,
                        [
                            equipment.model_name,
                            equipment.description,
                            equipment.serial_number,
                            equipment.storage_site_id,
                            equipment.date_serviced,
                            equipment.photo,
                            equipment.equipment_type_id,
                            serial_number,
                        ],
                    )
                    return self.equipment_in_to_out(serial_number, equipment)
        except Exception:
            return {"message": "Could not update this equipment"}

    def delete_equipment(self, serial_number: int) -> bool:
        try:
            with pool.connection() as conn:
                with conn.cursor() as cur:
                    cur.execute(
                        """
                        DELETE FROM equipment
                        WHERE serial_number = %s
                        """,
                        [serial_number],
                    )
                    return True
        except Exception:
            return False

    def equipment_in_to_out(self, id: int, equipment: EquipmentIn):
        old_data = equipment.dict()
        return EquipmentOut(id=id, **old_data)
