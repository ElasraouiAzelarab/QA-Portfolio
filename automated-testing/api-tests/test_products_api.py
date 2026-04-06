"""
API tests — Posts (Products equivalent) endpoint
Tests against https://jsonplaceholder.typicode.com/posts
"""
import pytest


POSTS_ENDPOINT = "/posts"


class TestGetPosts:
    """GET /posts — list all posts (represents product catalogue)."""

    def test_get_all_posts_returns_200(self, api_client, base_url):
        response = api_client.get(f"{base_url}{POSTS_ENDPOINT}")
        assert response.status_code == 200

    def test_get_all_posts_content_type_is_json(self, api_client, base_url):
        response = api_client.get(f"{base_url}{POSTS_ENDPOINT}")
        assert "application/json" in response.headers.get("Content-Type", "")

    def test_get_all_posts_returns_list_of_objects(self, api_client, base_url):
        response = api_client.get(f"{base_url}{POSTS_ENDPOINT}")
        data = response.json()
        assert isinstance(data, list)
        assert len(data) > 0

    def test_post_objects_have_required_fields(self, api_client, base_url):
        response = api_client.get(f"{base_url}{POSTS_ENDPOINT}")
        posts = response.json()
        required_fields = {"id", "userId", "title", "body"}
        for post in posts:
            assert required_fields.issubset(post.keys()), (
                f"Post {post.get('id')} missing required fields"
            )

    def test_get_all_posts_response_time(self, api_client, base_url):
        response = api_client.get(f"{base_url}{POSTS_ENDPOINT}")
        assert response.elapsed.total_seconds() < 3.0


class TestGetSinglePost:
    """GET /posts/{id} — retrieve a single post."""

    def test_get_existing_post_returns_200(self, api_client, base_url):
        response = api_client.get(f"{base_url}{POSTS_ENDPOINT}/1")
        assert response.status_code == 200

    def test_get_existing_post_returns_correct_id(self, api_client, base_url):
        response = api_client.get(f"{base_url}{POSTS_ENDPOINT}/1")
        data = response.json()
        assert data["id"] == 1

    def test_get_nonexistent_post_returns_404(self, api_client, base_url):
        response = api_client.get(f"{base_url}{POSTS_ENDPOINT}/99999")
        assert response.status_code == 404

    @pytest.mark.parametrize("post_id", [1, 5, 10, 50, 100])
    def test_multiple_posts_return_200(self, api_client, base_url, post_id):
        response = api_client.get(f"{base_url}{POSTS_ENDPOINT}/{post_id}")
        assert response.status_code == 200


class TestCreatePost:
    """POST /posts — create a new post."""

    def test_create_post_returns_201(self, api_client, base_url):
        payload = {"title": "New Product", "body": "Product description", "userId": 1}
        response = api_client.post(f"{base_url}{POSTS_ENDPOINT}", json=payload)
        assert response.status_code == 201

    def test_create_post_response_has_id(self, api_client, base_url):
        payload = {"title": "New Product", "body": "Product description", "userId": 1}
        response = api_client.post(f"{base_url}{POSTS_ENDPOINT}", json=payload)
        data = response.json()
        assert "id" in data

    def test_create_post_empty_body_handled(self, api_client, base_url):
        """Empty payload should not cause a 5xx server error."""
        response = api_client.post(f"{base_url}{POSTS_ENDPOINT}", json={})
        assert response.status_code < 500


class TestFilterPosts:
    """GET /posts?userId=X — filter posts by user."""

    def test_filter_by_user_id_returns_correct_posts(self, api_client, base_url):
        response = api_client.get(f"{base_url}{POSTS_ENDPOINT}", params={"userId": 1})
        assert response.status_code == 200
        data = response.json()
        assert all(post["userId"] == 1 for post in data), "All posts should belong to userId 1"

    def test_filter_invalid_user_returns_empty_list(self, api_client, base_url):
        response = api_client.get(f"{base_url}{POSTS_ENDPOINT}", params={"userId": 9999})
        assert response.status_code == 200
        data = response.json()
        assert data == [], "Expected empty list for non-existent userId"
