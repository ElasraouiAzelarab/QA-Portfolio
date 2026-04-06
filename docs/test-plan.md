# Test Plan — Calculator Application

**Document version:** 1.0  
**Author:** QA Engineer  
**Date:** 2024  
**Status:** Active

---

## 1. Introduction

This test plan covers the quality assurance activities for the **Calculator** demo web application, which is the *app under test* in this QA Portfolio. The plan defines the scope, objectives, testing approach, environments, and schedule for all testing activities.

---

## 2. Objectives

| # | Objective |
|---|-----------|
| 1 | Verify that all arithmetic operations (add, subtract, multiply, divide, power, sqrt, modulo) produce correct results. |
| 2 | Verify that the UI correctly reflects the state of the underlying logic. |
| 3 | Validate error handling for edge cases (division by zero, negative sqrt, non-numeric input). |
| 4 | Confirm keyboard accessibility and ARIA attributes meet basic WCAG 2.1 Level AA criteria. |
| 5 | Ensure the application is functional in the latest versions of Chrome, Firefox, and Safari. |

---

## 3. Scope

### In Scope

- Calculator arithmetic operations (add, subtract, multiply, divide, percentage, sign toggle)
- Decimal number input
- Operation chaining (left-to-right evaluation)
- Calculation history (add, display, clear)
- Keyboard input support
- Division-by-zero error handling
- Responsive layout at ≥320 px viewport width
- Accessibility (ARIA roles, labels, live regions)

### Out of Scope

- Scientific/graphing operations beyond basic arithmetic
- Persistent storage (localStorage / backend sync)
- Multi-language / i18n support
- Mobile-native gesture input (pinch, swipe)
- Performance / load testing

---

## 4. Test Approach

| Layer | Tool | Coverage Target |
|-------|------|-----------------|
| Unit | Jest | ≥95% branch coverage of `calculator.js` |
| API | Jest + axios | All CRUD endpoints of the mock REST API |
| E2E (UI) | Playwright | All critical user flows |
| Manual Exploratory | Checklist | Edge cases not covered by automation |

### Entry Criteria

- Feature implementation is complete (PR merged to feature branch).
- Unit tests pass with ≥95% coverage.
- Application is accessible via `file://` or local server.

### Exit Criteria

- All automated tests pass in CI.
- No open Critical or High severity defects.
- Test coverage ≥95% for unit tests.
- All planned E2E scenarios executed.

---

## 5. Test Environment

| Attribute | Value |
|-----------|-------|
| OS | Ubuntu 22.04 (CI), macOS 14 (local) |
| Node.js | ≥20.x |
| Browser (E2E) | Chromium (via Playwright) |
| Test runner | Jest 29.x, Playwright 1.x |
| API target | https://jsonplaceholder.typicode.com |

---

## 6. Risk Analysis

| Risk | Likelihood | Impact | Mitigation |
|------|-----------|--------|------------|
| Floating-point precision issues | Medium | Medium | Use `toBeCloseTo` in assertions |
| External API (JSONPlaceholder) downtime | Low | Medium | Retry logic + CI timeout |
| Browser rendering differences | Low | Low | Run Playwright on Chromium in CI |
| Large number overflow / scientific notation | Medium | Low | Explicit display formatting tests |

---

## 7. Defect Management

Defects will be logged as GitHub Issues with the following labels:

| Label | Criteria |
|-------|----------|
| `severity: critical` | App crashes, data loss, security vulnerability |
| `severity: high` | Core feature broken for all users |
| `severity: medium` | Feature partially broken, workaround exists |
| `severity: low` | Cosmetic / UX issue |

All Critical and High defects must be resolved before release.

---

## 8. Test Schedule

| Phase | Activities | Duration |
|-------|-----------|----------|
| Planning | Test plan, test case authoring | 1 day |
| Unit & API testing | Write & run Jest tests | 1 day |
| E2E testing | Write & run Playwright tests | 1 day |
| Exploratory testing | Manual session | 2 hours |
| Regression | Re-run full suite after fixes | 1 day |

---

## 9. Deliverables

- ✅ Test Plan (this document)
- ✅ Test Cases (`docs/test-cases.md`)
- ✅ Bug Report Template (`docs/bug-report-template.md`)
- ✅ Automated unit tests (`tests/unit/`)
- ✅ Automated API tests (`tests/api/`)
- ✅ Automated E2E tests (`tests/e2e/`)
- ✅ CI/CD pipeline (`.github/workflows/tests.yml`)
