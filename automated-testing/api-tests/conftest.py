"""
API test suite — conftest.py
Shared fixtures for all API tests.
Uses the JSONPlaceholder public API as a realistic demo target.

Note: These tests are marked as `integration` and require network access.
      They are automatically skipped when the target host is unreachable.
"""
import socket

import pytest
import requests


BASE_URL = "https://jsonplaceholder.typicode.com"


def _host_reachable(hostname: str, port: int = 443, timeout: float = 3.0) -> bool:
    try:
        socket.setdefaulttimeout(timeout)
        socket.getaddrinfo(hostname, port)
        return True
    except OSError:
        return False


def pytest_collection_modifyitems(config, items):
    """Skip integration tests automatically when the target API is unreachable."""
    if not _host_reachable("jsonplaceholder.typicode.com"):
        skip_marker = pytest.mark.skip(reason="Target API unreachable — skipping integration tests")
        for item in items:
            item.add_marker(skip_marker)


@pytest.fixture(scope="session")
def api_client():
    """Return a requests.Session with common headers pre-configured."""
    session = requests.Session()
    session.headers.update(
        {
            "Content-Type": "application/json",
            "Accept": "application/json",
        }
    )
    yield session
    session.close()


@pytest.fixture(scope="session")
def base_url():
    return BASE_URL


@pytest.fixture
def new_user_payload():
    return {
        "name": "Jane Doe",
        "username": "janedoe",
        "email": "jane.doe@example.com",
        "phone": "555-0100",
        "website": "janedoe.example.com",
    }
