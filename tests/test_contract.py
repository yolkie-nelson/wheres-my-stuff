from datetime import date
from fastapi.testclient import TestClient
import api
from api.queries.contract import ContractQueries
from api.authenticator import authenticator
from api.queries.contract import ContractOut


client = TestClient(api)


class MockContractQueries:
    def get_contract(self, id: int, equipment_id: int, job_site_id: int, start_date: date, end_date: date, description: str):
        return [
            ContractOut(
                id=1,
                equipment_id=2,
                job_site_id=2,
                start_date="2024-01-26",
                end_date="2024-01-26",
                description="Dig a big hole"
                )
        ]


def mock_get_current_account_data():
    return {"id": 123, "username": "username", "password": "password"}


def test_get_contract():
    api.dependecny_overrides[
        authenticator.get_account_getter] = mock_get_current_account_data
    api.dependency_overrides[
        ContractQueries] = MockContractQueries
    id = 123

    response = client.get(F"/categories/{id}")

    assert response.status_code == 200
    contract = response.json()
    assert len(contract)
    assert response.json() == [
            {"id": 1, "equipment_id": 2, "job_site_id": 2, "start_date": "2024-01-26", "end_date": "2024-01-26", "description": "Dig a big hole"}
    ]
