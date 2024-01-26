from fastapi.testclient import TestClient
from main import app
from queries.contract import ContractQueries, ContractOut
from authenticator import authenticator


client = TestClient(app)


class MockContractQueries:
    def get_one_contract(self, id: int):
        return ContractOut(
            id=id,
            equipment_id=2,
            job_site_id=2,
            start_date="2024-01-26",
            end_date="2024-01-26",
            description="Dig a big hole",
        )

    def delete_contract(self, id: int) -> bool:
        if id == 123:
            return True
        else:
            return False

    def get_contract(self):
        return [
            ContractOut(
                id=123,
                equipment_id=2,
                job_site_id=2,
                start_date="2024-01-26",
                end_date="2024-01-26",
                description="Dig a big hole"
                )
        ]


def mock_get_current_account_data():
    return {"id": 123, "username": "username", "password": "password"}


def test_get_one_contract():
    app.dependency_overrides[
        authenticator.get_current_account_data
    ] = mock_get_current_account_data
    app.dependency_overrides[ContractQueries] = MockContractQueries
    id = 123

    response = client.get(f"/api/contracts/{id}")

    assert response.status_code == 200
    contract = response.json()
    assert len(contract)
    assert response.json() == {
        "id": 123,
        "equipment_id": 2,
        "job_site_id": 2,
        "start_date": "2024-01-26",
        "end_date": "2024-01-26",
        "description": "Dig a big hole",
    }


def test_delete_contract():
    app.dependency_overrides[
        authenticator.get_current_account_data
    ] = mock_get_current_account_data
    app.dependency_overrides[ContractQueries] = MockContractQueries
    id_to_delete = 123

    response = client.delete(f"/api/contracts/{id_to_delete}")

    assert response.status_code == 200
    assert response.json() is True


def test_get_contracts():
    app.dependency_overrides[
        authenticator.get_current_account_data] = mock_get_current_account_data
    app.dependency_overrides[
        ContractQueries] = MockContractQueries

    response = client.get("/api/contracts/")

    assert response.status_code == 200
    contract = response.json()
    assert len(contract)
    assert response.json() == [{
        "id": 123,
        "equipment_id": 2,
        "job_site_id": 2,
        "start_date": "2024-01-26",
        "end_date": "2024-01-26",
        "description": "Dig a big hole"}]
