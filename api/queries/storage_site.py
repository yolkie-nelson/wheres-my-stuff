from pydantic import BaseModel
from psycopg_pool import ConnectionPool
import os
from typing import List, Union, Optional

pool = ConnectionPool(conninfo=os.environ.get("DATABASE_URL"))


class Error(BaseModel):
    message: str


class StorageSiteIn(BaseModel):
    warehouse_number: int
    location_address: str
    point_of_contact: str


class StorageSiteOut(BaseModel):
    id: int
    warehouse_number: int
    location_address: str
    point_of_contact: str


class StorageSiteQueries:
    def get_storage_site(self) -> Union[Error, List[StorageSiteOut]]:
        try:
            with pool.connection() as conn:
                with conn.cursor() as cur:
                    cur.execute(
                        """
                        SELECT id,
                        warehouse_number,
                        location_address,
                        point_of_contact
                        FROM storage_site
                        ORDER BY id;
                        """,
                    )
                    return [
                        StorageSiteOut(
                            id=record[0],
                            warehouse_number=record[1],
                            location_address=record[2],
                            point_of_contact=record[3],
                        )
                        for record in cur
                    ]
        except Exception:
            return {"message": "Could not get storage site"}

    def create_storage_site(
        self, storage_site: StorageSiteIn
    ) -> StorageSiteOut:
        try:
            with pool.connection() as conn:
                with conn.cursor() as cur:
                    result = cur.execute(
                        """
                        INSERT INTO storage_site
                            (warehouse_number,
                            location_address,
                            point_of_contact)
                        VALUES
                            (%s, %s, %s)
                        RETURNING id,
                        warehouse_number,
                        location_address,
                        point_of_contact;
                        """,
                        [
                            storage_site.warehouse_number,
                            storage_site.location_address,
                            storage_site.point_of_contact,
                        ],
                    )
                    id = result.fetchone()[0]
                    return self.storage_site_in_to_out(id, storage_site)
        except Exception:
            return {"message": "Could not create storage site"}

    def get_one_storage_site(
        self, storage_site_id: int
    ) -> Optional[StorageSiteOut]:
        try:
            with pool.connection() as conn:
                with conn.cursor() as cur:
                    result = cur.execute(
                        """
                        SELECT id
                            , warehouse_number
                            , location_address
                            , point_of_contact
                        FROM storage_site
                        WHERE id = %s
                        """,
                        [storage_site_id],
                    )
                    record = result.fetchone()
                    return StorageSiteOut(
                        id=record[0],
                        warehouse_number=record[1],
                        location_address=record[2],
                        point_of_contact=record[3],
                    )
        except Exception:
            return {"message": "Could not find this storage site"}

    def update_storage_site(
        self, storage_site_id: int, storage_site: StorageSiteIn
    ) -> Union[StorageSiteOut, Error]:
        try:
            with pool.connection() as conn:
                with conn.cursor() as cur:
                    cur.execute(
                        """
                        UPDATE storage_site
                        SET warehouse_number = %s
                            , location_address = %s
                            , point_of_contact = %s
                        WHERE id = %s
                        """,
                        [
                            storage_site.warehouse_number,
                            storage_site.location_address,
                            storage_site.point_of_contact,
                            storage_site_id,
                        ],
                    )
                    return self.storage_site_in_to_out(
                        storage_site_id, storage_site
                    )
        except Exception:
            return {"message": "Could not update this storage site"}

    def delete_storage_site(self, storage_site_id: int) -> bool:
        try:
            with pool.connection() as conn:
                with conn.cursor() as cur:
                    cur.execute(
                        """
                        DELETE FROM storage_site
                        WHERE id = %s
                        """,
                        [storage_site_id],
                    )
                    return True
        except Exception:
            return False

    def storage_site_in_to_out(self, id: int, storage_site: StorageSiteIn):
        old_data = storage_site.dict()
        return StorageSiteOut(id=id, **old_data)
