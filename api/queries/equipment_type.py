from pydantic import BaseModel
from typing import List, Union, Optional
from psycopg_pool import ConnectionPool
import os
pool = ConnectionPool(conninfo=os.environ.get("DATABASE_URL"))


class Error(BaseModel):
    message: str


class EquipmentTypeIn(BaseModel):
    name: str


class EquipmentTypeOut(BaseModel):
    id: int
    name: str


class EquipmentTypeQueries:
    def get_equipment_type(self) -> Union[Error, List[EquipmentTypeOut]]:
        try:
            with pool.connection() as conn:
                with conn.cursor() as cur:
                    cur.execute(
                        """
                        SELECT id, name
                        FROM equipment_type
                        ORDER BY id;
                        """,
                    )
                    return [
                        EquipmentTypeOut(id=record[0], name=record[1])
                        for record in cur
                    ]
        except Exception:
            return {"message": "Could not get equipment type"}

    def create_equipment_type(
        self, equipment_type: EquipmentTypeIn
    ) -> EquipmentTypeOut:
        try:
            with pool.connection() as conn:
                with conn.cursor() as cur:
                    result = cur.execute(
                        """
                        INSERT INTO equipment_type (name)
                        VALUES (%s)
                        RETURNING id, name;
                        """,
                        [equipment_type.name],
                    )
                    id = result.fetchone()[0]
                    return self.equipment_type_in_to_out(id, equipment_type)
        except Exception:
            return {"message": "Could not create equipment type"}

    def get_one_equipment_type(
        self, equipment_type_id: int
    ) -> Optional[EquipmentTypeOut]:
        try:
            with pool.connection() as conn:
                with conn.cursor() as cur:
                    result = cur.execute(
                        """
                        SELECT id
                            , name
                        FROM equipment_type
                        WHERE id = %s
                        """,
                        [equipment_type_id],
                    )
                    record = result.fetchone()
                    return EquipmentTypeOut(id=record[0], name=record[1])
        except Exception:
            return {"message": "Could not find this equipment type"}

    def update_equipment_type(
        self, equipment_type_id: int, equipment_type: EquipmentTypeIn
    ) -> Union[EquipmentTypeOut, Error]:
        try:
            with pool.connection() as conn:
                with conn.cursor() as cur:
                    cur.execute(
                        """
                        UPDATE equipment_type
                        SET name = %s
                        WHERE id = %s
                        """,
                        [equipment_type.name, equipment_type_id],
                    )
                    return self.equipment_type_in_to_out(
                        equipment_type_id, equipment_type
                    )
        except Exception:
            return {"message": "Could not update this equipment type"}

    def delete_equipment_type(self, equipment_type_id: int) -> bool:
        try:
            with pool.connection() as conn:
                with conn.cursor() as cur:
                    cur.execute(
                        """
                        DELETE FROM equipment_type
                        WHERE id = %s
                        """,
                        [equipment_type_id],
                    )
                    return True
        except Exception:
            return False
        
    def equipment_type_in_to_out(
        self, id: int, equipment_type: EquipmentTypeIn
    ):
        old_data = equipment_type.dict()
        return EquipmentTypeOut(id=id, **old_data)
