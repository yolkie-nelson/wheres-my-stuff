from fastapi import (
    APIRouter,
    Request,
    Response,
    Depends,
    HTTPException,
    status
)
from queries.equipment_type import EquipmentTypeOut, EquipmentTypeIn, EquipmentTypeQueries
from authenticator import authenticator
from typing import Optional


router = APIRouter()


@router.post("/api/type/", response_model=EquipmentTypeOut)
def create_equipment_type(
    info: EquipmentTypeIn,
    # request: Request,
    # response: Response,
    queries: EquipmentTypeQueries = Depends()
):
    try:
        create_equipment = queries.create_equipment(info=info)
    except:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Cannot create an equipment type"
        )
    #form = EquipmentTypeIn(name=info.name)
    # token = await authenticator.login(response, request, form, repo)
    return EquipmentTypeOut(name=info.name)