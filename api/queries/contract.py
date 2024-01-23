from pydantic import BaseModel
from datetime import date
from typing import List, Union
from psycopg_pool import ConnectionPool
import os


pool = ConnectionPool(conninfo=os.environ.get('DATABASE_URL'))


class Error(BaseModel):
    message: str


class ContractIn(BaseModel):
    equipment_serial: int
    job_site_name: str
    start_date: date
    end_date: date
    description: str


class ContractOut(BaseModel):
    id: int
    equipment_serial: int
    job_site_name: str
    start_date: date
    end_date: date
    description: str


class ContractQueries:
    def get_contract(self) -> Union[Error, List[ContractOut]]:
        try:
            with pool.connection() as conn:
                with conn.cursor() as cur:
                    cur.execute(
                        """
                        SELECT *
                        FROM contract
                        ORDER BY id;
                        """,
                    )
                    return [
                        ContractOut(
                            id=record[0],
                            equipment_serial=record[1],
                            job_site_name=record[3],
                            start_date=record[4],
                            end_date=record[5],
                            description=record[6]
                        )
                        for record in cur
                    ]
        except Exception:
            return {
                "message": "could not get list of contracts"
            }

    def contract_in_to_out(self, id: int, contract: ContractIn):
        old_data = contract.dict()
        return ContractOut(id=id, **old_data)
