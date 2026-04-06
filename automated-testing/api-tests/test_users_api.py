"""
API tests — Users endpoint
Tests against https://jsonplaceholder.typicode.com/users
"""
USERS_ENDPOINT = "/users"


class TestGetUsers:
    """GET /users — list all users."""

    def test_get_all_users_returns_200(self, api_client, base_url):
        response = api_client.get(f"{base_url}{USERS_ENDPOINT}")
        assert response.status_code == 200

    def test_get_all_users_returns_list(self, api_client, base_url):
        response = api_client.get(f"{base_url}{USERS_ENDPOINT}")
        data = response.json()
        assert isinstance(data, list)
        assert len(data) > 0

    def test_get_all_users_have_required_fields(self, api_client, base_url):
        response = api_client.get(f"{base_url}{USERS_ENDPOINT}")
        users = response.json()
        required_fields = {"id", "name", "username", "email"}
        for user in users:
            assert required_fields.issubset(user.keys()), (
                f"User {user.get('id')} is missing required fields"
            )

    def test_get_all_users_response_time(self, api_client, base_url):
        response = api_client.get(f"{base_url}{USERS_ENDPOINT}")
        assert response.elapsed.total_seconds() < 3.0, "Response time exceeded 3 seconds"


class TestGetSingleUser:
    """GET /users/{id} — retrieve a single user."""

    def test_get_existing_user_returns_200(self, api_client, base_url):
        response = api_client.get(f"{base_url}{USERS_ENDPOINT}/1")
        assert response.status_code == 200

    def test_get_existing_user_returns_correct_id(self, api_client, base_url):
        response = api_client.get(f"{base_url}{USERS_ENDPOINT}/1")
        data = response.json()
        assert data["id"] == 1

    def test_get_nonexistent_user_returns_404(self, api_client, base_url):
        response = api_client.get(f"{base_url}{USERS_ENDPOINT}/9999")
        assert response.status_code == 404

    def test_get_user_email_format(self, api_client, base_url):
        response = api_client.get(f"{base_url}{USERS_ENDPOINT}/1")
        data = response.json()
        assert "@" in data["email"], "User email does not contain '@'"


class TestCreateUser:
    """POST /users — create a new user."""

    def test_create_user_returns_201(self, api_client, base_url, new_user_payload):
        response = api_client.post(f"{base_url}{USERS_ENDPOINT}", json=new_user_payload)
        assert response.status_code == 201

    def test_create_user_response_contains_id(self, api_client, base_url, new_user_payload):
        response = api_client.post(f"{base_url}{USERS_ENDPOINT}", json=new_user_payload)
        data = response.json()
        assert "id" in data, "Created user response should contain an 'id'"

    def test_create_user_response_reflects_payload(self, api_client, base_url, new_user_payload):
        response = api_client.post(f"{base_url}{USERS_ENDPOINT}", json=new_user_payload)
        data = response.json()
        assert data["name"] == new_user_payload["name"]
        assert data["email"] == new_user_payload["email"]


class TestUpdateUser:
    """PUT /users/{id} — update an existing user."""

    def test_update_user_returns_200(self, api_client, base_url):
        payload = {"name": "Updated Name", "email": "updated@example.com"}
        response = api_client.put(f"{base_url}{USERS_ENDPOINT}/1", json=payload)
        assert response.status_code == 200

    def test_update_user_response_reflects_changes(self, api_client, base_url):
        payload = {"name": "Updated Name", "email": "updated@example.com"}
        response = api_client.put(f"{base_url}{USERS_ENDPOINT}/1", json=payload)
        data = response.json()
        assert data["name"] == "Updated Name"
        assert data["email"] == "updated@example.com"


class TestDeleteUser:
    """DELETE /users/{id} — delete a user."""

    def test_delete_user_returns_200(self, api_client, base_url):
        response = api_client.delete(f"{base_url}{USERS_ENDPOINT}/1")
        assert response.status_code == 200
