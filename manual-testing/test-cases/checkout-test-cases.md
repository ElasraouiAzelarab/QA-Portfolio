# Test Cases — Checkout Flow

**Feature:** E-Commerce Checkout & Payment  
**Author:** Azelarab Elasraoui  
**Last Updated:** 2026-04-06

---

## Test Case Summary

| TC ID | Title | Priority | Status |
|---|---|---|---|
| TC-CHK-001 | Successful checkout with valid card | High | Pass |
| TC-CHK-002 | Add single item to cart and verify totals | High | Pass |
| TC-CHK-003 | Add multiple items and verify totals | High | Pass |
| TC-CHK-004 | Remove item from cart | Medium | Pass |
| TC-CHK-005 | Checkout with empty cart | Medium | Pass |
| TC-CHK-006 | Apply valid discount code | Medium | Pass |
| TC-CHK-007 | Apply invalid/expired discount code | Medium | Pass |
| TC-CHK-008 | Checkout with expired credit card | High | Pass |
| TC-CHK-009 | Checkout with declined card | High | Pass |
| TC-CHK-010 | Shipping address validation — missing fields | High | Pass |
| TC-CHK-011 | Order confirmation email is sent | Medium | Pass |
| TC-CHK-012 | Order appears in order history after purchase | High | Pass |
| TC-CHK-013 | Stock quantity decreases after purchase | High | Pass |
| TC-CHK-014 | Guest checkout flow | Low | Pass |
| TC-CHK-015 | Checkout with out-of-stock item | High | Pass |

---

## Detailed Test Cases

### TC-CHK-001 — Successful checkout with valid card

**Priority:** High  
**Type:** Functional (End-to-End)  
**Preconditions:** User is logged in; at least one product is in stock.

| Step | Action | Expected Result |
|---|---|---|
| 1 | Navigate to product page | Product details are displayed |
| 2 | Click **Add to Cart** | Item is added; cart badge shows count 1 |
| 3 | Navigate to `/cart` | Cart shows correct item, quantity, and price |
| 4 | Click **Proceed to Checkout** | Checkout page is displayed |
| 5 | Enter valid shipping address | Address is accepted |
| 6 | Select shipping method "Standard" | Shipping cost is applied to total |
| 7 | Enter card `4111 1111 1111 1111`, expiry `12/28`, CVV `123` | Card details accepted |
| 8 | Click **Place Order** | Order confirmation page shown with order number |
| 9 | Verify order total = item price + shipping | Totals are correct |

**Pass Criteria:** Order is created; confirmation page and email received.

---

### TC-CHK-005 — Checkout with empty cart

**Priority:** Medium  
**Type:** Negative

| Step | Action | Expected Result |
|---|---|---|
| 1 | Navigate to `/cart` without adding items | Cart shows "Your cart is empty" message |
| 2 | Verify **Proceed to Checkout** button | Button is disabled or not visible |

**Pass Criteria:** User cannot initiate checkout with an empty cart.

---

### TC-CHK-006 — Apply valid discount code

**Priority:** Medium  
**Type:** Functional

| Step | Action | Expected Result |
|---|---|---|
| 1 | Add item to cart and navigate to checkout | Checkout page displayed |
| 2 | Enter discount code `SAVE10` in coupon field | 10% discount applied; order total updated |
| 3 | Verify breakdown shows discount line | Discount amount shown as negative value |

**Pass Criteria:** Correct discount applied; total is recalculated accurately.

---

### TC-CHK-008 — Checkout with expired credit card

**Priority:** High  
**Type:** Negative / Validation

| Step | Action | Expected Result |
|---|---|---|
| 1 | Add item to cart and proceed to checkout | Checkout page displayed |
| 2 | Enter card `4111 1111 1111 1111`, expiry `01/20`, CVV `123` | — |
| 3 | Click **Place Order** | Error: "Your card has expired" |
| 4 | Verify no order is created | Order history is unchanged |

**Pass Criteria:** Payment is rejected; user informed with clear message.

---

### TC-CHK-015 — Checkout with out-of-stock item

**Priority:** High  
**Type:** Negative

| Step | Action | Expected Result |
|---|---|---|
| 1 | Add out-of-stock item to cart (via direct URL) | Warning banner "Item no longer available" shown |
| 2 | Attempt to proceed to checkout | User is blocked; directed to remove out-of-stock items |

**Pass Criteria:** Out-of-stock items cannot be purchased.
