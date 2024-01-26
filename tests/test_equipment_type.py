from pydantic import BaseModel
from fastapi import FastAPI
from api.authenticator import authenticator

app = FastAPI()
router = TestC

class TestEquipmentType(BaseModel):
    name: str

def fake_get_current_account_data():
    return TestEquipmentType(name="Beowulf")

def test_equipment_type():
    # Arrange
    app.dependency_overrides[authenticator.get_current_account_data] = fake_get_current_account_data

    # Act
    response = router.get("/api/thing")

    # Clean up
    app.dependency_overrides = {}

    # Assert
    assert response.status_code == 200
    assert response.json() == ThingOut(thing=2)