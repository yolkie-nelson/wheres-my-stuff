from fastapi import (
    APIRouter,
    Request,
    Response,
    Depends,
    HTTPException,
    status
)
from queries.equipment import EquipmentIn
from authenticator import authenticator
from typing import Optional


router = APIRouter()

