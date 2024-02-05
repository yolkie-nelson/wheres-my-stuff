from fastapi import (
    APIRouter,
    Depends,
)
from queries.job_site import (
    JobSiteOut,
    JobSiteIn,
    JobSiteQueries,
    Error
)
from typing import Union, List, Optional
from authenticator import authenticator


router = APIRouter()


@router.get("/api/jobsites", response_model=Union[List[JobSiteOut], Error])
def get_job_site(
    queries: JobSiteQueries = Depends(),
    account_data: dict = Depends(
        authenticator.get_current_account_data)
):
    return queries.get_job_site()


@router.post("/api/jobsites", response_model=Union[JobSiteOut, Error])
def create_job_site(
    job_site: JobSiteIn,
    queries: JobSiteQueries = Depends(),
    account_data: dict = Depends(
        authenticator.get_current_account_data)
):
    return queries.create_job_site(job_site)


@router.get("/api/jobsites/{job_site_id}", response_model=Optional[JobSiteOut])
def get_one_job_site(
    id: int,
    queries: JobSiteQueries = Depends(),
    account_data: dict = Depends(
        authenticator.get_current_account_data)
) -> JobSiteOut:
    return queries.get_one_job_site(id)


@router.put("/api/jobsites/{job_site_id}", response_model=Union[
    JobSiteOut, Error])
def update_job_site(
    id: int,
    job_site: JobSiteIn,
    queries: JobSiteQueries = Depends(),
    account_data: dict = Depends(
        authenticator.get_current_account_data)
) -> Union[JobSiteOut, Error]:
    return queries.update_job_site(id, job_site)


@router.delete("/api/jobsites/{job_site_id}", response_model=bool)
def delete_job_site(
    job_site_id: int,
    queries: JobSiteQueries = Depends(),
    account_data: dict = Depends(
        authenticator.get_current_account_data)
) -> bool:
    return queries.delete_job_site(job_site_id)
