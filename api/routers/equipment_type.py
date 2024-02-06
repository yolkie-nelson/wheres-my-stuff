from fastapi import (
    APIRouter,
    Response,
    Depends,
)
from queries.equipment_type import (
    EquipmentTypeOut,
    EquipmentTypeIn,
    EquipmentTypeQueries,
    Error
)
from typing import Union, List, Optional
from authenticator import authenticator


router = APIRouter()


@router.get("/api/types", response_model=Union[List[EquipmentTypeOut], Error])
def get_equipment_type(
    queries: EquipmentTypeQueries = Depends(),
    account_data: dict = Depends(
        authenticator.get_current_account_data)
):
    return queries.get_equipment_type()


@router.post("/api/types", response_model=Union[
    EquipmentTypeOut, Error])
def create_equipment_type(
    equipment_type: EquipmentTypeIn,
    response: Response,
    queries: EquipmentTypeQueries = Depends(),
    account_data: dict = Depends(
        authenticator.get_current_account_data)
):
    return queries.create_equipment_type(equipment_type)


@router.get(
    "/api/types/{equipment_type_id}",
    response_model=Optional[EquipmentTypeOut]
)
def get_one_equipment_type(
    equipment_type_id: int,
    queries: EquipmentTypeQueries = Depends(),
    account_data: dict = Depends(
        authenticator.get_current_account_data)
) -> EquipmentTypeOut:
    return queries.get_one_equipment_type(equipment_type_id)


@router.put(
        "/api/types/{equipment_type_id}",
        response_model=Union[EquipmentTypeOut, Error]
        )
def update_equipment_type(
    equipment_type_id: int,
    equipment_type: EquipmentTypeIn,
    queries: EquipmentTypeQueries = Depends(),
    account_data: dict = Depends(
        authenticator.get_current_account_data)
) -> Union[EquipmentTypeOut, Error]:
    return queries.update_equipment_type(equipment_type_id, equipment_type)


@router.delete("/api/types/{equipment_type_id}", response_model=bool)
def delete_equipment_type(
    equipment_type_id: int,
    queries: EquipmentTypeQueries = Depends(),
    account_data: dict = Depends(
        authenticator.get_current_account_data)
) -> bool:
    return queries.delete_equipment_type(equipment_type_id)
