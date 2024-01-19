import os
from psycopg_pool import ConnectionPool
from pydantic import BaseModel
from jwtdown_fastapi.authentication import Token


pool = ConnectionPool(conninfo=os.environ.get('DATABASE_URL'))


class DuplicateAccountError(ValueError):
    pass


class AccountIn(BaseModel):
    username: str
    password: str


class AccountForm(BaseModel):
    username: str
    password: str


class AccountOut(BaseModel):
    id: int
    username: str


class AccountToken(Token):
    account: AccountOut


class AccountOutWithHashedPassword(AccountOut):
    id: str
    username: str
    hashed_password: str


class AccountsQueries:
    def get(self, username: str) -> AccountOutWithHashedPassword:
        with pool.connection() as conn:
            with conn.cursor() as cur:
                cur.execute(
                    """
                    SELECT *
                    FROM accounts
                    WHERE username = %s;
                    """,
                    [username],
                )
                try:
                    record = None
                    for row in cur.fetchall():
                        record = {}
                        for i, column in enumerate(cur.description):
                            print(cur.description)
                            record[column.name] = row[i]
                    return AccountOutWithHashedPassword(**record)
                except Exception:
                    return {
                        "message": "Could not get account from this username"
                    }

    def create_account(
            self, data, hashed_password) -> AccountOutWithHashedPassword:
        with pool.connection() as conn:
            with conn.cursor() as cur:
                params = [
                    data.username,
                    hashed_password
                ]
                cur.execute(
                    """
                    INSERT INTO accounts (username, hashed_password)
                    VALUES (%s, %s)
                    RETURNING id, username, hashed_password
                    """,
                    params,
                )

                record = None
                row = cur.fetchone()
                if row is not None:
                    record = {}
                    for i, column in enumerate(cur.description):
                        record[column.name] = row[i]
                return AccountOutWithHashedPassword(**record)
