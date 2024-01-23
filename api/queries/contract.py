from pydantic import BaseModel
from datetime import date
from typing import List, Union
from psycopg_pool import ConnectionPool
import os


pool = ConnectionPool(conninfo=os.environ.get("DATABASE_URL"))


class Error(BaseModel):
    message: str


class ContractIn(BaseModel):
    equipment_id: int
    job_site_id: int
    start_date: date
    end_date: date
    description: str


class ContractOut(BaseModel):
    id: int
    equipment_id: int
    job_site_id: int
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
                            equipment_id=record[1],
                            job_site_name=record[3],
                            start_date=record[4],
                            end_date=record[5],
                            description=record[6],
                        )
                        for record in cur
                    ]
        except Exception:
            return {"message": "could not get list of contracts"}

    def create_contract(self, contract: ContractIn) -> ContractOut:
        try:
            with pool.connection() as conn:
                with conn.cursor() as cur:
                    result = cur.execute(
                        """
                        INSERT INTO contract (
                        equipment_id,
                        job_site_id,
                        start_date,
                        end_date,
                        description
                        )
                        VALUES (%s, %s, %s, %s, %s)
                        RETURNING id,
                        equipment_id,
                        job_site_id,
                        start_date,
                        end_date,
                        description
;
                        """,
                        [
                            contract.equipment_id,
                            contract.job_site_id,
                            contract.start_date,
                            contract.end_date,
                            contract.description,
                        ],
                    )
                    id = result.fetchone()[0]
                    return self.contract_in_to_out(id, contract)
        except Exception as e:
            print(e)
            return {"message": "Could not create contract"}

    def contract_in_to_out(self, id: int, contract: ContractIn):
        old_data = contract.dict()
        return ContractOut(id=id, **old_data)
