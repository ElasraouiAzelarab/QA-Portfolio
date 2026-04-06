"""
Selenium test suite — conftest.py
Shared fixtures for all Selenium tests.
"""
import pytest
from selenium import webdriver
from selenium.webdriver.chrome.options import Options
from selenium.webdriver.chrome.service import Service


BASE_URL = "https://qa.demoshop.example.com"


@pytest.fixture(scope="session")
def driver():
    """Initialise a headless Chrome WebDriver session shared across the test session."""
    options = Options()
    options.add_argument("--headless")
    options.add_argument("--no-sandbox")
    options.add_argument("--disable-dev-shm-usage")
    options.add_argument("--window-size=1920,1080")

    service = Service()
    web_driver = webdriver.Chrome(service=service, options=options)
    web_driver.implicitly_wait(10)
    yield web_driver
    web_driver.quit()


@pytest.fixture
def logged_in_driver(driver):
    """Return a driver that is already logged in as a standard test user."""
    driver.get(f"{BASE_URL}/login")
    from selenium.webdriver.common.by import By
    driver.find_element(By.ID, "email").send_keys("testuser@example.com")
    driver.find_element(By.ID, "password").send_keys("Test@1234")
    driver.find_element(By.CSS_SELECTOR, "button[type='submit']").click()
    return driver
