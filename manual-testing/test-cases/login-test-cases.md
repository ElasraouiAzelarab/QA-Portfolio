# Test Cases — User Login Feature

**Feature:** User Authentication — Login  
**Author:** Azelarab Elasraoui  
**Last Updated:** 2026-04-06

---

## Test Case Summary

| TC ID | Title | Priority | Status |
|---|---|---|---|
| TC-LOGIN-001 | Successful login with valid credentials | High | Pass |
| TC-LOGIN-002 | Login with invalid password | High | Pass |
| TC-LOGIN-003 | Login with unregistered email | High | Pass |
| TC-LOGIN-004 | Login with empty email field | High | Pass |
| TC-LOGIN-005 | Login with empty password field | High | Pass |
| TC-LOGIN-006 | Login with both fields empty | Medium | Pass |
| TC-LOGIN-007 | Login with SQL injection in email field | High | Pass |
| TC-LOGIN-008 | Remember Me functionality | Medium | Pass |
| TC-LOGIN-009 | Forgot Password link navigation | Medium | Pass |
| TC-LOGIN-010 | Account lockout after 5 failed attempts | High | Pass |
| TC-LOGIN-011 | Session persistence after browser refresh | Medium | Pass |
| TC-LOGIN-012 | Logout clears session | High | Pass |

---

## Detailed Test Cases

### TC-LOGIN-001 — Successful login with valid credentials

**Priority:** High  
**Type:** Functional  
**Preconditions:** User account exists with email `testuser@example.com` / password `Test@1234`

| Step | Action | Expected Result |
|---|---|---|
| 1 | Navigate to `/login` | Login page is displayed with email and password fields |
| 2 | Enter `testuser@example.com` in email field | Email is accepted |
| 3 | Enter `Test@1234` in password field | Password is masked |
| 4 | Click **Login** button | User is redirected to `/dashboard` |
| 5 | Verify user name displayed in header | Correct user name is shown |

**Pass Criteria:** User lands on dashboard; session cookie is set.

---

### TC-LOGIN-002 — Login with invalid password

**Priority:** High  
**Type:** Negative / Functional  
**Preconditions:** User account exists with email `testuser@example.com`

| Step | Action | Expected Result |
|---|---|---|
| 1 | Navigate to `/login` | Login page is displayed |
| 2 | Enter `testuser@example.com` in email field | — |
| 3 | Enter `WrongPassword1` in password field | — |
| 4 | Click **Login** button | Error message "Invalid email or password" is displayed |
| 5 | Verify user remains on login page | Page URL is still `/login` |

**Pass Criteria:** No session is created; error message is visible.

---

### TC-LOGIN-003 — Login with unregistered email

**Priority:** High  
**Type:** Negative / Functional

| Step | Action | Expected Result |
|---|---|---|
| 1 | Navigate to `/login` | Login page is displayed |
| 2 | Enter `nouser@example.com` in email field | — |
| 3 | Enter any password | — |
| 4 | Click **Login** button | Error message "Invalid email or password" is displayed |

**Pass Criteria:** Generic error (does not reveal whether email exists).

---

### TC-LOGIN-004 — Login with empty email field

**Priority:** High  
**Type:** Validation

| Step | Action | Expected Result |
|---|---|---|
| 1 | Navigate to `/login` | Login page is displayed |
| 2 | Leave email field empty | — |
| 3 | Enter any password | — |
| 4 | Click **Login** button | Inline validation "Email is required" appears under email field |

**Pass Criteria:** Form submission is prevented; validation message is shown.

---

### TC-LOGIN-005 — Login with empty password field

**Priority:** High  
**Type:** Validation

| Step | Action | Expected Result |
|---|---|---|
| 1 | Navigate to `/login` | Login page is displayed |
| 2 | Enter valid email | — |
| 3 | Leave password field empty | — |
| 4 | Click **Login** button | Inline validation "Password is required" appears |

**Pass Criteria:** Form submission is prevented.

---

### TC-LOGIN-006 — Login with both fields empty

**Priority:** Medium  
**Type:** Validation

| Step | Action | Expected Result |
|---|---|---|
| 1 | Navigate to `/login` | Login page is displayed |
| 2 | Click **Login** button without entering any data | Both inline validation messages appear |

**Pass Criteria:** Two validation messages are shown; no API call is made.

---

### TC-LOGIN-007 — SQL injection in email field

**Priority:** High  
**Type:** Security

| Step | Action | Expected Result |
|---|---|---|
| 1 | Navigate to `/login` | Login page is displayed |
| 2 | Enter `' OR '1'='1` in email field | — |
| 3 | Enter any password | — |
| 4 | Click **Login** button | Error message shown; no unauthorised access granted |

**Pass Criteria:** Application handles injection safely; no DB error exposed.

---

### TC-LOGIN-010 — Account lockout after 5 failed attempts

**Priority:** High  
**Type:** Security

| Step | Action | Expected Result |
|---|---|---|
| 1 | Attempt login with wrong password 5 times | After 5th attempt, account is locked |
| 2 | Try to login with correct credentials | Error: "Account locked. Try again in 15 minutes." |

**Pass Criteria:** Account is locked; lockout message displayed.

---

### TC-LOGIN-012 — Logout clears session

**Priority:** High  
**Type:** Security / Functional

| Step | Action | Expected Result |
|---|---|---|
| 1 | Login with valid credentials | User is on dashboard |
| 2 | Click **Logout** | User is redirected to `/login` |
| 3 | Press browser back button | User is NOT returned to dashboard; redirected to `/login` |
| 4 | Check cookies | Session cookie is deleted |

**Pass Criteria:** Session is fully invalidated on logout.
