from fastapi import (
    APIRouter,
    Request,
    Response,
    Depends,
    HTTPException,
    status
)
from queries.equipment import EquipmentIn, EquipmentQueries, EquipmentOut, Error
from queries.storage_site import StorageSiteQueries
from queries.equipment_type import EquipmentTypeQueries
from authenticator import authenticator
from typing import Union, List


router = APIRouter()

@router.get("/api/equipments/", response_model=Union[List[EquipmentOut], Error])
def get_equipment(
    queries: EquipmentQueries = Depends()
):
    return queries.get_equipment()

@router.post("/api/equipments/", response_model=Union[EquipmentOut, Error])
def create_equipment(
    equipment: EquipmentIn,
    queries: EquipmentQueries = Depends(),
):

    return queries.create_equipment(equipment)
