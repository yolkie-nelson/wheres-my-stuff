import os
from fastapi import Depends
from jwtdown_fastapi.authentication import Authenticator
from queries.accounts import AccountsQueries, AccountOutWithHashedPassword


class MyAuthenticator(Authenticator):
    async def get_account_data(
        self,
        username: str,
        accounts: AccountsQueries,
    ):
        return accounts.get(username)

    def get_account_getter(
        self,
        accounts: AccountsQueries = Depends(),
    ):
        return accounts

    def get_hashed_password(self, account: AccountOutWithHashedPassword):
        return account.hashed_password

    def get_account_data_for_cookie(
        self,
        account
    ):
        if isinstance(account, dict):
            account = AccountOutWithHashedPassword(**account)
        return account.username, account.dict()


authenticator = MyAuthenticator(os.environ["SIGNING_KEY"])
