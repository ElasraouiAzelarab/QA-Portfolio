# QA Portfolio

A showcase of **Quality Assurance** skills across multiple testing disciplines: unit testing, API testing, end-to-end (E2E) UI testing, test documentation, and CI/CD automation.

![Calculator Demo](https://github.com/user-attachments/assets/0ce0568c-df2c-4a11-a63d-c1995f41bb56)

---

## 📁 Project Structure

```
QA-Portfolio/
├── src/                          # Demo web application ("app under test")
│   ├── calculator.js             # Calculator business logic (CommonJS module)
│   ├── index.html                # Calculator UI (HTML/CSS/JS — no build step)
│   └── styles.css                # Dark-theme responsive stylesheet
│
├── tests/
│   ├── unit/                     # Unit tests (Jest)
│   │   └── calculator.test.js    # 44 tests · 100% code coverage
│   ├── e2e/                      # E2E tests (Playwright)
│   │   └── calculator.spec.js    # 25 tests · UI, keyboard, accessibility
│   └── api/                      # API tests (Jest + axios)
│       └── api.test.js           # Tests against JSONPlaceholder REST API
│
├── docs/                         # QA documentation
│   ├── test-plan.md              # Scope, risks, schedule, entry/exit criteria
│   ├── test-cases.md             # 20 structured test cases (P1–P3)
│   └── bug-report-template.md   # Defect filing template with example
│
├── .github/
│   └── workflows/
│       └── tests.yml             # CI/CD: unit, API, and E2E jobs on push/PR
│
├── playwright.config.js
└── package.json
```

---

## 🧪 Test Suites

### Unit Tests — Jest (`tests/unit/`)

Tests for the `Calculator` class in isolation, covering happy paths, boundary values, and error cases.

| Metric | Value |
|--------|-------|
| Test count | 44 |
| Statement coverage | 100% |
| Branch coverage | 100% |
| Function coverage | 100% |
| Line coverage | 100% |

**Run:**
```bash
npm run test:unit
```

Operations covered: `add`, `subtract`, `multiply`, `divide`, `power`, `sqrt`, `modulo`, history management.

---

### API Tests — Jest + axios (`tests/api/`)

Integration tests against the [JSONPlaceholder](https://jsonplaceholder.typicode.com) REST API, demonstrating real-world HTTP testing patterns.

| Topic | What's tested |
|-------|---------------|
| `GET /posts` | Status 200, array schema, field types |
| `GET /posts/:id` | Single resource, 404 for missing ID |
| `POST /posts` | HTTP 201, response body reflects submitted data |
| `PUT /posts/:id` | Full resource replacement |
| `PATCH /posts/:id` | Partial update |
| `DELETE /posts/:id` | HTTP 200, empty object response |
| `GET /posts/:id/comments` | Relationship filter, email format validation |
| `GET /users` | Array length, unique IDs, nested geo coordinates |
| `GET /todos?completed=` | Query param filtering |

**Run:**
```bash
npm run test:api
```

---

### E2E Tests — Playwright (`tests/e2e/`)

Browser-level tests that drive the calculator UI in Chromium, verifying the full user experience.

| Category | Tests |
|----------|-------|
| Page load | 4 |
| Arithmetic operations | 5 |
| Special actions (AC, %, +/−, decimal, ÷0 error) | 6 |
| History panel | 4 |
| Keyboard input | 3 |
| Accessibility (ARIA roles, labels, live regions) | 3 |
| **Total** | **25** |

**Run:**
```bash
# Install browsers once
npx playwright install --with-deps chromium

# Run tests
npm run test:e2e
```

---

### Run Everything

```bash
npm run test:all
```

---

## 🖥️ Demo Application

The **Calculator** (`src/index.html`) is a self-contained, zero-dependency web app — the *app under test* for this portfolio.

**Features:**
- Addition, subtraction, multiplication, division
- Percentage and sign-toggle utilities
- Decimal input with duplicate-dot prevention
- Division-by-zero error handling with auto-dismiss
- Left-to-right chained operation evaluation
- Calculation history panel with clear function
- Full keyboard support (digits, operators, `Enter`, `Escape`, `Backspace`)
- ARIA roles, `aria-label`, and `aria-live` for screen-reader compatibility
- Responsive layout (works down to 320 px viewport width)

**Open locally:**
```bash
open src/index.html        # macOS
xdg-open src/index.html    # Linux
```

---

## 📋 QA Documentation

| Document | Description |
|----------|-------------|
| [`docs/test-plan.md`](docs/test-plan.md) | Scope, objectives, risk analysis, entry/exit criteria, schedule |
| [`docs/test-cases.md`](docs/test-cases.md) | 20 structured test cases (P1–P3) with steps and expected results |
| [`docs/bug-report-template.md`](docs/bug-report-template.md) | Defect template with severity/priority fields and a completed example |

---

## ⚙️ CI/CD

GitHub Actions runs three parallel jobs on every push and pull request:

```
Unit Tests (Jest)  ──┐
API Tests (Jest)   ──┼──▶  All green = mergeable
E2E Tests (Playwright) ─┘
```

Workflow: [`.github/workflows/tests.yml`](.github/workflows/tests.yml)

Artifacts uploaded on every run:
- `coverage-report/` — Jest HTML coverage report
- `playwright-report/` — Playwright HTML trace report (including screenshots on failure)

---

## 🚀 Getting Started

```bash
# 1. Clone
git clone https://github.com/ElasraouiAzelarab/QA-Portfolio.git
cd QA-Portfolio

# 2. Install dependencies
npm install

# 3. Install Playwright browsers (for E2E)
npx playwright install --with-deps chromium

# 4. Run unit + API tests
npm test

# 5. Run E2E tests
npm run test:e2e

# 6. Open the demo app
open src/index.html
```

**Requirements:** Node.js ≥ 20

---

## 🛠️ Tech Stack

| Tool | Purpose |
|------|---------|
| [Jest](https://jestjs.io/) | Unit & API test runner |
| [Playwright](https://playwright.dev/) | E2E browser automation |
| [axios](https://axios-http.com/) | HTTP client for API tests |
| GitHub Actions | CI/CD pipeline |
