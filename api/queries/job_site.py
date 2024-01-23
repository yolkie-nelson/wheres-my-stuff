from pydantic import BaseModel
from typing import List, Union, Optional
from psycopg_pool import ConnectionPool
import os


pool = ConnectionPool(conninfo=os.environ.get('DATABASE_URL'))


class Error(BaseModel):
    message: str


class JobSiteIn(BaseModel):
    job_name: str
    job_address: str
    job_poc: str


class JobSiteOut(BaseModel):
    id: int
    job_name: str
    job_address: str
    job_poc: str


class JobSiteQueries:
    def get_job_site(self) -> Union[Error, List[JobSiteOut]]:
        try:
            with pool.connection() as conn:
                with conn.cursor() as cur:
                    cur.execute(
                        """
                        SELECT id, job_name, job_address, job_poc
                        FROM job_site
                        ORDER BY id;
                        """,
                    )
                    return [
                        JobSiteOut(
                            id=record[0],
                            job_name=record[1],
                            job_address=record[2],
                            job_poc=record[3]
                        )
                        for record in cur
                    ]
        except Exception:
            return {
                "message": "Could not get Job Site"
            }

    def create_job_site(self, job_site:JobSiteIn) -> JobSiteOut:
        try:
            with pool.connection() as conn:
                with conn.cursor() as cur:
                    result = cur.execute(
                        """
                        INSERT INTO job_site (job_name, job_address, job_poc)
                        VALUES (%s, %s, %s)
                        RETURNING id, job_name, job_address, job_poc;
                        """,
                        [job_site.job_name, job_site.job_address, job_site.job_poc]
                    )
                    id= result.fetchone()[0]
                    return self.get_job_site_in_to_out(id, job_site)
        except Exception:

            return {
                "message": "Could not create Job Site"
            }

    def get_one_job_site(self, job_site_id: int) -> Optional[JobSiteOut]:
        try:
            with pool.connection() as conn:
                with conn.cursor() as cur:
                    result = cur.execute(
                        """
                        SELECT id, job_name, job_address, job_poc
                        FROM job_site
                        WHERE id = %s
                        """,
                        [job_site_id]
                    )
                    record = result.fetchone()
                    return JobSiteOut(
                            id=record[0],
                            job_name=record[1],
                            job_address=record[2],
                            job_poc=record[3]
                        )
        except Exception:
            return {
                    "message": "Could not find this job site"
                }

    def update_job_site(self, id: int, job_site: JobSiteIn) -> Union[JobSiteOut, Error]:
        try:
            with pool.connection() as conn:
                with conn.cursor() as cur:
                    cur.execute(
                        """
                        UPDATE job_site
                        SET job_name = %s, job_address = %s, job_poc = %s
                        WHERE id = %s
                        """,
                        [job_site.job_name, job_site.job_address, job_site.job_poc, id]
                    )
                    return self.get_job_site_in_to_out(id, job_site)
        except Exception:
            return {
                    "message": "Could not update this equipment type"
                    }

    def delete_job_site(self, id: int) -> bool:
        try:
            with pool.connection() as conn:
                with conn.cursor() as cur:
                    cur.execute(
                        """
                        DELETE FROM job_site
                        WHERE id = %s
                        """,
                        [id]
                    )
                    return True
        except Exception:
            return False

    def get_job_site_in_to_out(self, id: int, job_site: JobSiteIn):
        old_data = job_site.dict()
        return JobSiteOut(id=id, **old_data)
