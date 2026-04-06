# Bug Report Template

Use this template when filing a new defect in the issue tracker.  
Copy the markdown below into a new GitHub Issue.

---

```
**Summary:** [One-sentence description of the defect]

## Environment

| Field | Value |
|-------|-------|
| **Build / Version** |  |
| **Browser** |  |
| **OS** |  |
| **Viewport / Device** |  |
| **Test Type** | Manual / Automated |

## Severity & Priority

| Field | Value |
|-------|-------|
| **Severity** | Critical / High / Medium / Low |
| **Priority** | P1 / P2 / P3 |
| **Component** | e.g. Calculator UI / API / Unit logic |

## Steps to Reproduce

1. 
2. 
3. 

## Expected Result

_What should happen._

## Actual Result

_What actually happens._

## Evidence

<!-- Attach screenshots, screen recordings, or logs -->

## Root Cause (optional — developer fills in)

_To be completed during investigation._

## Fix / Workaround (optional)

_Known workaround, if any._
```

---

## Example — Completed Bug Report

**Summary:** Division by zero displays raw `NaN` instead of a user-friendly error message.

### Environment

| Field | Value |
|-------|-------|
| **Build / Version** | v1.0.0 |
| **Browser** | Chrome 122 |
| **OS** | macOS 14.3 |
| **Viewport** | 1440 × 900 |
| **Test Type** | Manual + Automated (Playwright) |

### Severity & Priority

| Field | Value |
|-------|-------|
| **Severity** | High |
| **Priority** | P1 |
| **Component** | Calculator UI |

### Steps to Reproduce

1. Open `src/index.html` in a browser.
2. Press `5`, then `÷`, then `0`, then `=`.

### Expected Result

The display should show a user-friendly error, e.g. `Error: ÷0`, and reset automatically.

### Actual Result

The display shows `NaN`, which is confusing to non-technical users.

### Evidence

_(Screenshot attached)_

### Root Cause

`calculate()` returned `NaN` when `b === 0` was not explicitly checked.

### Fix

Added a `b === 0` guard inside `calculate()` that calls `showError('Error: ÷0')` and returns `null`.
