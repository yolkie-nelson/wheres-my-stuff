from fastapi import (
    APIRouter,
    Request,
    Response,
    Depends,
    HTTPException,
    status
)
from queries.equipment import EquipmentIn, EquipmentQueries, EquipmentOut
from authenticator import authenticator
from typing import Optional


router = APIRouter()

@router.post("/api/equipment/", response_model=EquipmentOut)
async def create_equipment(
    info: EquipmentIn,
    # request: Request,
    # response: Response,
    queries: EquipmentQueries = Depends()
):
    try:
        create_equipment = queries.create_equipment(info=info)
    except:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Cannot create an equipment type"
        )
    form = EquipmentIn(equipment_type=info.equipment_type,
                        model_name=info.model_name,
                        description=info.description,
                        serial_number=info.serial_number,
                        warehouse=info.warehouse,
                        date_serviced=info.date_serviced,
                        photo=info.photo)
    # token = await authenticator.login(response, request, form, repo)
    return EquipmentOut(form)