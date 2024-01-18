import os
# from queries.equipment import SQLQueries
import psycopg2
# from psycopg_pool import ConnectionPool
from models import AccountIn

DATABASE_URL = os.enviorn['DATABASE_URL']
# pool = ConnectionPool(conninfo=os.environ.get("DATABASE_URL"))
client = psycopg2(DATABASE_URL)
db = client['postgres-data']


class DuplicateAccountError(ValueError):
    pass


class AccountsQueries:
    collection_name = 'accounts'

    @property
    def collection(self):
        return db[self.collection_name]  # accounts.username??

    def get(self, username: str):
        account = self.collection.find_one({"username": username})
        if account is None:
            return account
        account['id'] = str(account['_id'])
        return account

    def create(self, info: AccountIn, hashed_password: str):
        if self.get(username=info.username) is not None:
            raise DuplicateAccountError
        account = info.dict()
        account['hashed_password'] = hashed_password
        self.collection.insert_one(account)
