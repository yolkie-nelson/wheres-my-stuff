from fastapi import (
    APIRouter,
    Response,
    Depends,
)
from queries.contract import ContractOut, ContractIn, ContractQueries, Error
from typing import Union, List, Optional
from authenticator import authenticator
# from authenticator import authenticator

router = APIRouter()


@router.get("/api/contracts", response_model=Union[List[ContractOut], Error])
def get_contract(queries: ContractQueries = Depends(),
                 account_data: dict = Depends(
                    authenticator.get_current_account_data)):
    return queries.get_contract()


@router.post("/api/contracts/create", response_model=Union[ContractOut, Error])
def create_contract(
    contract: ContractIn,
    response: Response,
    queries: ContractQueries = Depends(),
    account_data: dict = Depends(
        authenticator.get_current_account_data),
):
    return queries.create_contract(contract)


@router.get("/api/contracts/{contract_id}", response_model=Optional[
    ContractOut])
def get_one_contract(
    id: int, queries: ContractQueries = Depends(),
    account_data: dict = Depends(
        authenticator.get_current_account_data)
) -> ContractOut:
    return queries.get_one_contract(id)


@router.put("/api/contracts/{contract_id}", response_model=Union[
    ContractOut, Error])
def update_contract(
    id: int, contract: ContractIn, queries: ContractQueries = Depends(),
    account_data: dict = Depends(
        authenticator.get_current_account_data)
) -> Union[ContractOut, Error]:
    return queries.update_contract(id, contract)


@router.delete("/api/contracts/{contract_id}", response_model=bool)
def delete_contract(id: int, queries: ContractQueries = Depends(),
                    account_data: dict = Depends(
                        authenticator.get_current_account_data)) -> bool:
    return queries.delete_contract(id)
