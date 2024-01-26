# from api.queries.accounts import AccountsQueries, AccountOutWithHashedPassword
# from api.authenticator import authenticator
# import api
# from fastapi.testclient import TestClient


# def fake_create_account(data, hashed_password
#                         ) -> AccountOutWithHashedPassword:
#     return AccountOutWithHashedPassword(id=1,
#                                         username=data.username,
#                                         hashed_password=hashed_password)


# def test_get_account():
#     api.dependency_overrides[
#         authenticator.hash_password] = lambda password: "hashed_password"
#     api.dependency_overrides[
#         AccountsQueries] = lambda: AccountsQueries()
#     api.dependency_overrides[
#         AccountsQueries].create_account = fake_create_account

#     client = TestClient(api)
#     response = client.get("/api/routers/accounts",
#                           json={"username": "Linda", "password": "password"})

#     api.dependency_overrides = {}

#     assert response.status_code == 200
#     assert response.json() == {"username": "Linda"}
