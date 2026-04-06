"""
Selenium tests — Login page
Tests covering TC-LOGIN-001 through TC-LOGIN-006.
"""
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC

BASE_URL = "https://qa.demoshop.example.com"


class TestLogin:
    """End-to-end login test cases executed via Selenium WebDriver."""

    def test_successful_login(self, driver):
        """TC-LOGIN-001: Valid credentials redirect user to dashboard."""
        driver.get(f"{BASE_URL}/login")
        driver.find_element(By.ID, "email").clear()
        driver.find_element(By.ID, "email").send_keys("testuser@example.com")
        driver.find_element(By.ID, "password").clear()
        driver.find_element(By.ID, "password").send_keys("Test@1234")
        driver.find_element(By.CSS_SELECTOR, "button[type='submit']").click()

        WebDriverWait(driver, 10).until(EC.url_contains("/dashboard"))
        assert "/dashboard" in driver.current_url
        assert driver.find_element(By.CSS_SELECTOR, "[data-testid='user-greeting']").is_displayed()

    def test_invalid_password_shows_error(self, driver):
        """TC-LOGIN-002: Wrong password displays generic error message."""
        driver.get(f"{BASE_URL}/login")
        driver.find_element(By.ID, "email").clear()
        driver.find_element(By.ID, "email").send_keys("testuser@example.com")
        driver.find_element(By.ID, "password").clear()
        driver.find_element(By.ID, "password").send_keys("WrongPassword!")
        driver.find_element(By.CSS_SELECTOR, "button[type='submit']").click()

        error = WebDriverWait(driver, 10).until(
            EC.visibility_of_element_located((By.CSS_SELECTOR, "[data-testid='login-error']"))
        )
        assert "Invalid email or password" in error.text
        assert "/login" in driver.current_url

    def test_unregistered_email_shows_error(self, driver):
        """TC-LOGIN-003: Unregistered email shows generic error (no enumeration)."""
        driver.get(f"{BASE_URL}/login")
        driver.find_element(By.ID, "email").clear()
        driver.find_element(By.ID, "email").send_keys("nobody@example.com")
        driver.find_element(By.ID, "password").clear()
        driver.find_element(By.ID, "password").send_keys("AnyPass@1")
        driver.find_element(By.CSS_SELECTOR, "button[type='submit']").click()

        error = WebDriverWait(driver, 10).until(
            EC.visibility_of_element_located((By.CSS_SELECTOR, "[data-testid='login-error']"))
        )
        assert "Invalid email or password" in error.text

    def test_empty_email_shows_validation(self, driver):
        """TC-LOGIN-004: Empty email triggers inline validation."""
        driver.get(f"{BASE_URL}/login")
        driver.find_element(By.ID, "email").clear()
        driver.find_element(By.ID, "password").clear()
        driver.find_element(By.ID, "password").send_keys("Test@1234")
        driver.find_element(By.CSS_SELECTOR, "button[type='submit']").click()

        error = driver.find_element(By.CSS_SELECTOR, "[data-testid='email-error']")
        assert error.is_displayed()
        assert "required" in error.text.lower()

    def test_empty_password_shows_validation(self, driver):
        """TC-LOGIN-005: Empty password triggers inline validation."""
        driver.get(f"{BASE_URL}/login")
        driver.find_element(By.ID, "email").clear()
        driver.find_element(By.ID, "email").send_keys("testuser@example.com")
        driver.find_element(By.ID, "password").clear()
        driver.find_element(By.CSS_SELECTOR, "button[type='submit']").click()

        error = driver.find_element(By.CSS_SELECTOR, "[data-testid='password-error']")
        assert error.is_displayed()
        assert "required" in error.text.lower()

    def test_both_fields_empty_shows_two_validations(self, driver):
        """TC-LOGIN-006: Both fields empty shows two validation messages."""
        driver.get(f"{BASE_URL}/login")
        driver.find_element(By.ID, "email").clear()
        driver.find_element(By.ID, "password").clear()
        driver.find_element(By.CSS_SELECTOR, "button[type='submit']").click()

        email_error = driver.find_element(By.CSS_SELECTOR, "[data-testid='email-error']")
        password_error = driver.find_element(By.CSS_SELECTOR, "[data-testid='password-error']")
        assert email_error.is_displayed()
        assert password_error.is_displayed()
