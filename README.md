# QA Portfolio — Azelarab Elasraoui

A comprehensive Quality Assurance portfolio demonstrating expertise across manual testing, test automation, API testing, performance testing, and CI/CD integration.

---

## 📁 Portfolio Structure

```
QA-Portfolio/
├── manual-testing/
│   ├── test-plan.md                  # Sample test plan for a web application
│   └── test-cases/
│       ├── login-test-cases.md       # Functional test cases for login feature
│       └── checkout-test-cases.md   # Functional test cases for e-commerce checkout
├── automated-testing/
│   ├── selenium-tests/               # Selenium WebDriver tests (Python)
│   │   ├── conftest.py
│   │   ├── test_login.py
│   │   └── test_search.py
│   └── api-tests/                    # API automation tests (Python + pytest)
│       ├── conftest.py
│       ├── test_users_api.py
│       └── test_products_api.py
├── bug-reports/
│   ├── bug-report-template.md        # Standard bug report template
│   ├── BUG-001.md                    # Sample critical bug report
│   └── BUG-002.md                    # Sample UI bug report
├── performance-testing/
│   ├── locust_config.py              # Locust load test configuration
│   └── results/
│       └── load-test-report.md       # Sample load test analysis report
└── .github/
    └── workflows/
        └── ci.yml                    # GitHub Actions CI workflow
```

---

## 🛠️ Skills Demonstrated

| Area | Tools & Technologies |
|---|---|
| Manual Testing | Test planning, test case design, exploratory testing |
| Test Automation | Python, Selenium WebDriver, pytest |
| API Testing | requests, pytest, JSON schema validation |
| Performance Testing | Locust |
| CI/CD | GitHub Actions |
| Bug Tracking | Detailed defect reporting, severity/priority classification |

---

## 🚀 Getting Started

### Prerequisites

- Python 3.9+
- Google Chrome + ChromeDriver (for Selenium tests)

### Install dependencies

```bash
pip install -r requirements.txt
```

### Run automated tests

```bash
# Run API tests
pytest automated-testing/api-tests/ -v

# Run Selenium tests
pytest automated-testing/selenium-tests/ -v

# Run performance tests
locust -f performance-testing/locust_config.py --headless -u 10 -r 2 --run-time 30s
```

---

## 📊 Test Coverage Summary

| Module | Manual Test Cases | Automated Tests |
|---|---|---|
| Authentication | 12 | 6 |
| Product Search | 8 | 4 |
| Checkout Flow | 15 | 7 |
| User API | — | 10 |
| Products API | — | 8 |

---

## 📝 About Me

QA Engineer with experience in both manual and automated testing. Passionate about software quality, test-driven processes, and continuous delivery. Skilled at identifying edge cases, designing robust test suites, and integrating quality gates into CI/CD pipelines.

- 🔗 GitHub: [ElasraouiAzelarab](https://github.com/ElasraouiAzelarab)
