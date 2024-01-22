from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
import os
from authenticator import authenticator
from routers import (
    accounts,
    equipment_type,
    equipment,
    storage_site
)


app = FastAPI()
app.include_router(authenticator.router, tags=['Auth'])
app.include_router(accounts.router, tags=['Account'])
app.include_router(equipment_type.router, tags=['Equipment Type'])
app.include_router(equipment.router, tags=['Equipment'])
app.include_router(storage_site.router, tags=['Storage Site'])


app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        os.environ.get("CORS_HOST")
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/api/launch-details")
def launch_details():
    return {
        "launch_details": {
            "module": 3,
            "week": 17,
            "day": 5,
            "hour": 19,
            "min": "00"
        }
    }
