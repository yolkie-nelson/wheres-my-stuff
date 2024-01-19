from fastapi import (
    APIRouter,
    Request,
    Response,
    Depends,
    HTTPException,
    status
)
from queries.accounts import AccountIn, AccountToken, AccountOut, AccountForm
from queries.accounts import AccountsQueries, DuplicateAccountError
from authenticator import authenticator
from typing import Optional


router = APIRouter()


@router.get("/api/accounts")
async def get_account(
    account_data: Optional[dict] = Depends(
        authenticator.try_get_current_account_data
        ),
):
    if account_data:
        return AccountOut
    else:
        raise HTTPException(status_code=401, detail="Access denied, kick rocks")


@router.post("/api/accounts/", response_model=AccountToken)
async def create_account(
    info: AccountIn,
    request: Request,
    response: Response,
    queries: AccountsQueries = Depends()
):
    hashed_password = authenticator.hash_password(info.password)
    try:
        account = queries.create_account(info, hashed_password)
    except DuplicateAccountError:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Cannot create an account with those credentials"
        )
    form = AccountForm(username=info.username, password=info.password)
    token = await authenticator.login(response, request, form, queries)
    return AccountToken(account=account, **token.dict())


@router.get('/token', response_model=AccountToken | None)
async def get_token(
    request: Request,
    account: dict = Depends(authenticator.try_get_current_account_data),
) -> AccountToken | None:
    if account and authenticator.cookie_name in request.cookies:
        return {
            "access_token": request.cookies[authenticator.cookie_name],
            "type": "Bearer",
            "account": account,
        }
