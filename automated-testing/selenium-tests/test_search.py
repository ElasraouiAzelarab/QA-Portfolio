"""
Selenium tests — Product search
Tests covering product search and results filtering.
"""
from selenium.webdriver.common.by import By
from selenium.webdriver.common.keys import Keys
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC

BASE_URL = "https://qa.demoshop.example.com"


class TestProductSearch:
    """End-to-end product search test cases."""

    def test_search_returns_relevant_results(self, logged_in_driver):
        """Searching for a known product term returns matching results."""
        driver = logged_in_driver
        driver.get(f"{BASE_URL}/products")
        search_input = driver.find_element(By.CSS_SELECTOR, "[data-testid='search-input']")
        search_input.clear()
        search_input.send_keys("laptop")
        search_input.send_keys(Keys.RETURN)

        WebDriverWait(driver, 10).until(
            EC.presence_of_element_located((By.CSS_SELECTOR, "[data-testid='product-card']"))
        )
        results = driver.find_elements(By.CSS_SELECTOR, "[data-testid='product-card']")
        assert len(results) > 0, "Expected at least one search result for 'laptop'"

    def test_search_no_results_shows_message(self, logged_in_driver):
        """Searching for gibberish shows a 'no results' message."""
        driver = logged_in_driver
        driver.get(f"{BASE_URL}/products")
        search_input = driver.find_element(By.CSS_SELECTOR, "[data-testid='search-input']")
        search_input.clear()
        search_input.send_keys("xyznonexistentproduct123")
        search_input.send_keys(Keys.RETURN)

        no_results = WebDriverWait(driver, 10).until(
            EC.visibility_of_element_located(
                (By.CSS_SELECTOR, "[data-testid='no-results-message']")
            )
        )
        assert no_results.is_displayed()

    def test_filter_by_category(self, logged_in_driver):
        """Selecting a category filter narrows down results."""
        driver = logged_in_driver
        driver.get(f"{BASE_URL}/products")
        category_filter = driver.find_element(
            By.CSS_SELECTOR, "[data-testid='category-electronics']"
        )
        category_filter.click()

        WebDriverWait(driver, 10).until(
            EC.presence_of_element_located((By.CSS_SELECTOR, "[data-testid='product-card']"))
        )
        badges = driver.find_elements(By.CSS_SELECTOR, "[data-testid='product-category-badge']")
        for badge in badges:
            assert "Electronics" in badge.text

    def test_product_card_links_to_detail_page(self, logged_in_driver):
        """Clicking a product card navigates to the product detail page."""
        driver = logged_in_driver
        driver.get(f"{BASE_URL}/products")
        WebDriverWait(driver, 10).until(
            EC.presence_of_element_located((By.CSS_SELECTOR, "[data-testid='product-card']"))
        )
        first_card = driver.find_element(By.CSS_SELECTOR, "[data-testid='product-card']")
        first_card.click()

        WebDriverWait(driver, 10).until(EC.url_contains("/products/"))
        assert "/products/" in driver.current_url
        assert driver.find_element(
            By.CSS_SELECTOR, "[data-testid='add-to-cart-button']"
        ).is_displayed()
