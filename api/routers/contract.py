from fastapi import (
    APIRouter,
    Response,
    Depends,
)
from queries.contract import (
    ContractOut,
    ContractIn,
    ContractQueries,
    Error
)
from typing import Union, List, Optional

router = APIRouter()


@router.get("/api/contracts/", response_model=Union[List[ContractOut], Error])
def get_contract(
        queries: ContractQueries = Depends()
):
    return queries.get_contract()


@router.post("/api/contracts/", response_model=Union[ContractOut, Error])
def create_contract(
    contract: ContractIn,
    response: Response,
    queries: ContractQueries = Depends()
):
    return queries.create_contract(contract)


@router.get("/api/contracts/{id}", response_model=Optional[ContractOut])
def get_one_contract(
    id: int,
    queries: ContractQueries = Depends()
) -> ContractOut:
    return queries.get_one_contract(id)


@router.put("/api/contracts/{id}", response_model=Union[ContractOut, Error])
def update_contract(
    id: int,
    contract: ContractIn,
    queries: ContractQueries = Depends()
) -> Union[ContractOut, Error]:
    return queries.update_contract(id, contract)


@router.delete("/api/contracts/{id}", response_model=bool)
def delete_contract(
    id: int,
    queries: ContractQueries = Depends()
) -> bool:
    return queries.delete_contract(id)
