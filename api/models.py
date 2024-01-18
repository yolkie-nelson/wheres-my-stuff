from pydantic import BaseModel
from jwtdown_fastapi.authentication import Token


class AccountIn(BaseModel):
    username: str
    password: str


class AccountForm(BaseModel):
    username: str
    password: str


class AccountOutWithHashedPassword(BaseModel):
    id: int
    username: str
    hashed_password: str


class AccountOut(BaseModel):
    id: int
    username: str
    password: str


class Equipment(BaseModel):
    id: int


class AccountToken(Token):
    account: AccountOut
