# Test Cases — Calculator Application

**Module:** Calculator  
**Version:** 1.0  
**Test Type:** Functional + Boundary + Negative

---

## Conventions

| Priority | Definition |
|----------|------------|
| P1 | Must pass — blocking if failed |
| P2 | Should pass — high confidence release requirement |
| P3 | Nice to have — low-risk edge case |

**Status** values: `Pass` · `Fail` · `Blocked` · `Not Run`

---

## TC-001 — Basic Addition

| Field | Value |
|-------|-------|
| **ID** | TC-001 |
| **Priority** | P1 |
| **Pre-condition** | Calculator is open, display shows `0` |
| **Steps** | 1. Press `3` · 2. Press `+` · 3. Press `4` · 4. Press `=` |
| **Expected Result** | Display shows `7` |
| **Actual Result** | — |
| **Status** | Not Run |

---

## TC-002 — Basic Subtraction

| Field | Value |
|-------|-------|
| **ID** | TC-002 |
| **Priority** | P1 |
| **Pre-condition** | Calculator is open |
| **Steps** | 1. Press `1`, `0` · 2. Press `−` · 3. Press `4` · 4. Press `=` |
| **Expected Result** | Display shows `6` |
| **Status** | Not Run |

---

## TC-003 — Basic Multiplication

| Field | Value |
|-------|-------|
| **ID** | TC-003 |
| **Priority** | P1 |
| **Steps** | 1. Press `6` · 2. Press `×` · 3. Press `7` · 4. Press `=` |
| **Expected Result** | Display shows `42` |
| **Status** | Not Run |

---

## TC-004 — Basic Division

| Field | Value |
|-------|-------|
| **ID** | TC-004 |
| **Priority** | P1 |
| **Steps** | 1. Press `8` · 2. Press `÷` · 3. Press `2` · 4. Press `=` |
| **Expected Result** | Display shows `4` |
| **Status** | Not Run |

---

## TC-005 — Division by Zero

| Field | Value |
|-------|-------|
| **ID** | TC-005 |
| **Priority** | P1 |
| **Steps** | 1. Press `5` · 2. Press `÷` · 3. Press `0` · 4. Press `=` |
| **Expected Result** | Display shows `Error: ÷0` |
| **Notes** | Error message should clear automatically after 1.5 s |
| **Status** | Not Run |

---

## TC-006 — Decimal Input

| Field | Value |
|-------|-------|
| **ID** | TC-006 |
| **Priority** | P1 |
| **Steps** | 1. Press `3` · 2. Press `.` · 3. Press `1`, `4` |
| **Expected Result** | Display shows `3.14` |
| **Status** | Not Run |

---

## TC-007 — Double Decimal Prevention

| Field | Value |
|-------|-------|
| **ID** | TC-007 |
| **Priority** | P2 |
| **Steps** | 1. Press `1` · 2. Press `.` twice · 3. Press `5` |
| **Expected Result** | Display shows `1.5` (second decimal press ignored) |
| **Status** | Not Run |

---

## TC-008 — Percentage Conversion

| Field | Value |
|-------|-------|
| **ID** | TC-008 |
| **Priority** | P2 |
| **Steps** | 1. Press `5`, `0` · 2. Press `%` |
| **Expected Result** | Display shows `0.5` |
| **Status** | Not Run |

---

## TC-009 — Sign Toggle

| Field | Value |
|-------|-------|
| **ID** | TC-009 |
| **Priority** | P2 |
| **Steps** | 1. Press `7` · 2. Press `+/−` |
| **Expected Result** | Display shows `-7` |
| **Status** | Not Run |

---

## TC-010 — Clear (AC) Button

| Field | Value |
|-------|-------|
| **ID** | TC-010 |
| **Priority** | P1 |
| **Steps** | 1. Press `9`, `9` · 2. Press `AC` |
| **Expected Result** | Display resets to `0`, expression area is empty |
| **Status** | Not Run |

---

## TC-011 — Chained Operations (Left-to-Right)

| Field | Value |
|-------|-------|
| **ID** | TC-011 |
| **Priority** | P2 |
| **Steps** | 1. Press `2` · 2. Press `+` · 3. Press `3` · 4. Press `×` · 5. Press `4` · 6. Press `=` |
| **Expected Result** | Display shows `20` (evaluated as `(2+3)×4`) |
| **Notes** | Calculator uses left-to-right evaluation, not algebraic precedence |
| **Status** | Not Run |

---

## TC-012 — Keyboard: Numeric Input

| Field | Value |
|-------|-------|
| **ID** | TC-012 |
| **Priority** | P2 |
| **Steps** | 1. Focus page · 2. Type `5`, `+`, `3`, `Enter` |
| **Expected Result** | Display shows `8` |
| **Status** | Not Run |

---

## TC-013 — Keyboard: Escape Clears

| Field | Value |
|-------|-------|
| **ID** | TC-013 |
| **Priority** | P2 |
| **Steps** | 1. Type `99` · 2. Press `Escape` |
| **Expected Result** | Display shows `0` |
| **Status** | Not Run |

---

## TC-014 — Keyboard: Backspace Deletes Last Digit

| Field | Value |
|-------|-------|
| **ID** | TC-014 |
| **Priority** | P2 |
| **Steps** | 1. Type `123` · 2. Press `Backspace` |
| **Expected Result** | Display shows `12` |
| **Status** | Not Run |

---

## TC-015 — History: Entry Recorded

| Field | Value |
|-------|-------|
| **ID** | TC-015 |
| **Priority** | P2 |
| **Steps** | 1. Perform any calculation to completion · 2. Inspect history panel |
| **Expected Result** | History panel shows the expression and its result |
| **Status** | Not Run |

---

## TC-016 — History: Clear History

| Field | Value |
|-------|-------|
| **ID** | TC-016 |
| **Priority** | P2 |
| **Steps** | 1. Perform a calculation · 2. Click "Clear History" |
| **Expected Result** | History panel shows "No calculations yet." |
| **Status** | Not Run |

---

## TC-017 — Responsive Layout at 375 px

| Field | Value |
|-------|-------|
| **ID** | TC-017 |
| **Priority** | P2 |
| **Steps** | 1. Open browser DevTools · 2. Set viewport to 375 × 667 · 3. Interact with calculator |
| **Expected Result** | All buttons are visible and usable; no overflow |
| **Status** | Not Run |

---

## TC-018 — ARIA: Display has `role="status"` and `aria-live="polite"`

| Field | Value |
|-------|-------|
| **ID** | TC-018 |
| **Priority** | P3 |
| **Steps** | 1. Inspect `#display` element in DevTools |
| **Expected Result** | Element has `role="status"` and `aria-live="polite"` |
| **Status** | Not Run |

---

## TC-019 — Large Number Formatting

| Field | Value |
|-------|-------|
| **ID** | TC-019 |
| **Priority** | P3 |
| **Steps** | 1. Enter `999999999999` (12 nines) · 2. Observe display |
| **Expected Result** | Number is formatted with commas or scientific notation; no UI overflow |
| **Status** | Not Run |

---

## TC-020 — Digit Input Limit

| Field | Value |
|-------|-------|
| **ID** | TC-020 |
| **Priority** | P3 |
| **Steps** | 1. Press digit buttons more than 12 times without an operator |
| **Expected Result** | Display stops accepting digits after the 12th; no crash |
| **Status** | Not Run |
