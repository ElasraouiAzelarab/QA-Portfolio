"""
Performance / Load test — DemoShop API
Uses Locust to simulate concurrent users hitting key endpoints.

Run:
    locust -f locust_config.py --headless -u 50 -r 5 --run-time 60s \
           --host https://qa.demoshop.example.com
"""
from locust import HttpUser, TaskSet, task, between


class BrowsingBehaviour(TaskSet):
    """Simulates a user browsing the product catalogue."""

    @task(5)
    def get_product_list(self):
        with self.client.get("/api/products", catch_response=True) as response:
            if response.status_code == 200:
                response.success()
            else:
                response.failure(f"Expected 200, got {response.status_code}")

    @task(3)
    def get_single_product(self):
        with self.client.get("/api/products/1", catch_response=True) as response:
            if response.status_code == 200:
                response.success()
            else:
                response.failure(f"Expected 200, got {response.status_code}")

    @task(2)
    def search_products(self):
        with self.client.get("/api/products?search=laptop", catch_response=True) as response:
            if response.status_code == 200:
                response.success()
            else:
                response.failure(f"Expected 200, got {response.status_code}")


class CheckoutBehaviour(TaskSet):
    """Simulates a user adding items to cart and viewing order summary."""

    @task(3)
    def view_cart(self):
        with self.client.get("/api/cart", catch_response=True) as response:
            if response.status_code in (200, 401):
                response.success()
            else:
                response.failure(f"Unexpected status: {response.status_code}")

    @task(1)
    def add_to_cart(self):
        payload = {"productId": 1, "quantity": 1}
        with self.client.post("/api/cart/items", json=payload, catch_response=True) as response:
            if response.status_code in (200, 201, 401):
                response.success()
            else:
                response.failure(f"Unexpected status: {response.status_code}")


class BrowsingUser(HttpUser):
    """Low-think-time browsing user (peak traffic simulation)."""
    tasks = [BrowsingBehaviour]
    wait_time = between(1, 3)
    weight = 3


class ShoppingUser(HttpUser):
    """User actively browsing and adding to cart."""
    tasks = [BrowsingBehaviour, CheckoutBehaviour]
    wait_time = between(2, 5)
    weight = 1
