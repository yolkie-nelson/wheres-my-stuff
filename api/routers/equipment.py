from fastapi import (
    APIRouter,
    Depends,

)
from queries.equipment import (
    EquipmentIn,
    EquipmentQueries,
    EquipmentOut,
    Error,
)

from typing import Union, List, Optional
from authenticator import authenticator


router = APIRouter()


@router.get(
    "/api/equipments/", response_model=Union[List[EquipmentOut], Error]
)
def get_equipment(queries: EquipmentQueries = Depends(),
                  account_data: dict = Depends(
                      authenticator.get_current_account_data)):
    return queries.get_equipment()


@router.post("/api/equipments/", response_model=Union[EquipmentOut, Error])
def create_equipment(
    equipment: EquipmentIn,
    queries: EquipmentQueries = Depends(),
    account_data: dict = Depends(
        authenticator.get_current_account_data)
):
    return queries.create_equipment(equipment)


@router.get(
    "/api/equipments/{serial_number}", response_model=Optional[EquipmentOut]
)
def get_one_equipment(
    serial_number: int, queries: EquipmentQueries = Depends(),
    account_data: dict = Depends(
        authenticator.get_current_account_data)
) -> EquipmentOut:
    return queries.get_one_equipment(serial_number)


@router.put(
    "/api/equipments/{serial_number}",
    response_model=Union[EquipmentOut, Error],
)
def update_equipment(
    serial_number: int,
    equipment: EquipmentIn,
    queries: EquipmentQueries = Depends(),
    account_data: dict = Depends(
        authenticator.get_current_account_data)
) -> Union[EquipmentOut, Error]:
    return queries.update_equipment(serial_number, equipment)


@router.delete("/api/equipments/{serial_number}", response_model=bool)
def delete_equipment(
    serial_number: int, queries: EquipmentQueries = Depends(),
    account_data: dict = Depends(
        authenticator.get_current_account_data)
) -> bool:
    return queries.delete_equipment(serial_number)
