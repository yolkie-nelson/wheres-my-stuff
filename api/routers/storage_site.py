from fastapi import (
    APIRouter,
    Depends,
)
from queries.storage_site import (
    StorageSiteOut,
    StorageSiteIn,
    StorageSiteQueries,
    Error,
)
from typing import Union, List, Optional

router = APIRouter()


@router.get(
    "/api/storages/", response_model=Union[List[StorageSiteOut], Error]
)
def get_storage_site(queries: StorageSiteQueries = Depends()):
    return queries.get_storage_site()


@router.post("/api/storages/", response_model=Union[StorageSiteOut, Error])
def create_storage_site(
    storage_site: StorageSiteIn, queries: StorageSiteQueries = Depends()
):
    return queries.create_storage_site(storage_site)


@router.get(
    "/api/storages/{storage_site_id}", response_model=Optional[StorageSiteOut]
)
def get_one_storage_site(
    storage_site_id: int, queries: StorageSiteQueries = Depends()
) -> StorageSiteOut:
    return queries.get_one_storage_site(storage_site_id)


@router.put(
    "/api/storages/{storage_site_id}",
    response_model=Union[StorageSiteOut, Error],
)
def update_storage_site(
    storage_site_id: int,
    storage_site: StorageSiteIn,
    queries: StorageSiteQueries = Depends(),
) -> Union[StorageSiteOut, Error]:
    return queries.update_storage_site(storage_site_id, storage_site)


@router.delete("/api/storages/{storage_site_id}", response_model=bool)
def delete_storage_site(
    storage_site_id: int, queries: StorageSiteQueries = Depends()
) -> bool:
    return queries.delete_storage_site(storage_site_id)
