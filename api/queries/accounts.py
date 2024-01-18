import os
import psycopg2

from models import AccountIn

#pool = ConnectionPool(conninfo=os.environ.get('DATABASE_URL'))
class DuplicateAccountError(ValueError):
    pass
class AccountsQueries:
    def __init__(self, conn):
        self.conn = conn

    def get(self, username: str):
        with self.conn.cursor() as cur:
            cur.execute("SELECT * FROM accounts WHERE username = %s", (username,))
            account = cur.fetchone()
            if account is None:
                return account
            return {
                'id': account[0],
                'username': account[1],
                'hashed_password': account[2]
            }

    def create(self, info: AccountIn, hashed_password: str):

        # with pool.connection() as conn:
        #     with conn.cursor() as cur:
        #         params = [
        #             info.username,
        #             info.password
        #         ]
        #         cur.execute(
        #             """
        #             INSERT INTO accounts (username, hashed_password)
        #             VALUES (%s, %s)
        #             RETURNING id, username, hashed_password)
        #             """
        #             )
            with self.conn.cursor() as cur:
                try:
                    cur.execute("INSERT INTO accounts (username, hashed_password) VALUES (%s, %s)",
                                (info.username, hashed_password))
                    self.conn.commit()
                except psycopg2.IntegrityError:
                    raise DuplicateAccountError
