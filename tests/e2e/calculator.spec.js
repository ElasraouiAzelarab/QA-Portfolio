// @ts-check
'use strict';

const { test, expect } = require('@playwright/test');
const path = require('path');

const APP_URL = `file://${path.resolve(__dirname, '../../src/index.html')}`;

// ─────────────────────────────────────────────────────────
// Helpers
// ─────────────────────────────────────────────────────────
async function openCalc(page) {
  await page.goto(APP_URL);
  await expect(page.locator('#current-value')).toBeVisible();
}

async function pressKeys(page, ...keys) {
  for (const key of keys) {
    await page.locator(`[data-digit="${key}"], [data-action="${key}"]`).click();
  }
}

// ─────────────────────────────────────────────────────────
// Page load
// ─────────────────────────────────────────────────────────
test.describe('Page load', () => {
  test('calculator page loads and shows 0 on display', async ({ page }) => {
    await openCalc(page);
    await expect(page.locator('#current-value')).toHaveText('0');
  });

  test('page has correct title', async ({ page }) => {
    await openCalc(page);
    await expect(page).toHaveTitle(/QA Portfolio/i);
  });

  test('all digit buttons (0-9) are visible', async ({ page }) => {
    await openCalc(page);
    for (let i = 0; i <= 9; i++) {
      await expect(page.locator(`[data-digit="${i}"]`)).toBeVisible();
    }
  });

  test('operator buttons are visible', async ({ page }) => {
    await openCalc(page);
    const operators = ['add', 'subtract', 'multiply', 'divide'];
    for (const op of operators) {
      await expect(page.locator(`[data-action="${op}"]`)).toBeVisible();
    }
  });
});

// ─────────────────────────────────────────────────────────
// Basic arithmetic via button clicks
// ─────────────────────────────────────────────────────────
test.describe('Arithmetic operations', () => {
  test.beforeEach(async ({ page }) => {
    await openCalc(page);
  });

  test('2 + 3 = 5', async ({ page }) => {
    await pressKeys(page, '2');
    await page.locator('[data-action="add"]').click();
    await pressKeys(page, '3');
    await page.locator('[data-action="equals"]').click();
    await expect(page.locator('#current-value')).toHaveText('5');
  });

  test('10 - 4 = 6', async ({ page }) => {
    await pressKeys(page, '1', '0');
    await page.locator('[data-action="subtract"]').click();
    await pressKeys(page, '4');
    await page.locator('[data-action="equals"]').click();
    await expect(page.locator('#current-value')).toHaveText('6');
  });

  test('6 × 7 = 42', async ({ page }) => {
    await pressKeys(page, '6');
    await page.locator('[data-action="multiply"]').click();
    await pressKeys(page, '7');
    await page.locator('[data-action="equals"]').click();
    await expect(page.locator('#current-value')).toHaveText('42');
  });

  test('8 ÷ 2 = 4', async ({ page }) => {
    await pressKeys(page, '8');
    await page.locator('[data-action="divide"]').click();
    await pressKeys(page, '2');
    await page.locator('[data-action="equals"]').click();
    await expect(page.locator('#current-value')).toHaveText('4');
  });

  test('chaining operations: 2 + 3 × 4 (left-to-right) = 20', async ({ page }) => {
    // Calculator evaluates left-to-right (no precedence): (2 + 3) * 4 = 20
    await pressKeys(page, '2');
    await page.locator('[data-action="add"]').click();
    await pressKeys(page, '3');
    await page.locator('[data-action="multiply"]').click();
    await pressKeys(page, '4');
    await page.locator('[data-action="equals"]').click();
    await expect(page.locator('#current-value')).toHaveText('20');
  });
});

// ─────────────────────────────────────────────────────────
// Special actions
// ─────────────────────────────────────────────────────────
test.describe('Special actions', () => {
  test.beforeEach(async ({ page }) => {
    await openCalc(page);
  });

  test('AC clears the display to 0', async ({ page }) => {
    await pressKeys(page, '5');
    await page.locator('[data-action="clear"]').click();
    await expect(page.locator('#current-value')).toHaveText('0');
  });

  test('% converts number to percentage', async ({ page }) => {
    await pressKeys(page, '5', '0');
    await page.locator('[data-action="percent"]').click();
    await expect(page.locator('#current-value')).toHaveText('0.5');
  });

  test('+/− toggles sign of current value', async ({ page }) => {
    await pressKeys(page, '7');
    await page.locator('[data-action="sign"]').click();
    await expect(page.locator('#current-value')).toHaveText('-7');
  });

  test('decimal button appends a decimal point', async ({ page }) => {
    await pressKeys(page, '3');
    await page.locator('[data-action="decimal"]').click();
    await pressKeys(page, '1', '4');
    await expect(page.locator('#current-value')).toHaveText('3.14');
  });

  test('pressing decimal twice does not add two decimal points', async ({ page }) => {
    await pressKeys(page, '1');
    await page.locator('[data-action="decimal"]').click();
    await page.locator('[data-action="decimal"]').click();
    await pressKeys(page, '5');
    await expect(page.locator('#current-value')).toHaveText('1.5');
  });

  test('division by zero shows error message', async ({ page }) => {
    await pressKeys(page, '5');
    await page.locator('[data-action="divide"]').click();
    await pressKeys(page, '0');
    await page.locator('[data-action="equals"]').click();
    await expect(page.locator('#current-value')).toHaveText('Error: ÷0');
  });
});

// ─────────────────────────────────────────────────────────
// History panel
// ─────────────────────────────────────────────────────────
test.describe('History panel', () => {
  test.beforeEach(async ({ page }) => {
    await openCalc(page);
  });

  test('shows "No calculations yet" initially', async ({ page }) => {
    await expect(page.locator('.history-empty')).toBeVisible();
  });

  test('records a completed calculation', async ({ page }) => {
    await pressKeys(page, '4');
    await page.locator('[data-action="add"]').click();
    await pressKeys(page, '4');
    await page.locator('[data-action="equals"]').click();
    await expect(page.locator('.history-item')).toHaveCount(1);
    await expect(page.locator('.hist-result')).toHaveText('= 8');
  });

  test('records multiple calculations', async ({ page }) => {
    // Calculation 1
    await pressKeys(page, '2');
    await page.locator('[data-action="add"]').click();
    await pressKeys(page, '2');
    await page.locator('[data-action="equals"]').click();

    // Calculation 2
    await page.locator('[data-action="clear"]').click();
    await pressKeys(page, '3');
    await page.locator('[data-action="multiply"]').click();
    await pressKeys(page, '3');
    await page.locator('[data-action="equals"]').click();

    await expect(page.locator('.history-item')).toHaveCount(2);
  });

  test('Clear History button removes all history entries', async ({ page }) => {
    await pressKeys(page, '1');
    await page.locator('[data-action="add"]').click();
    await pressKeys(page, '1');
    await page.locator('[data-action="equals"]').click();

    await page.locator('#clear-history').click();
    await expect(page.locator('.history-empty')).toBeVisible();
    await expect(page.locator('.history-item')).toHaveCount(0);
  });
});

// ─────────────────────────────────────────────────────────
// Keyboard support
// ─────────────────────────────────────────────────────────
test.describe('Keyboard input', () => {
  test.beforeEach(async ({ page }) => {
    await openCalc(page);
  });

  test('typing "5+3=" via keyboard yields 8', async ({ page }) => {
    await page.keyboard.type('5');
    await page.keyboard.press('+');
    await page.keyboard.type('3');
    await page.keyboard.press('Enter');
    await expect(page.locator('#current-value')).toHaveText('8');
  });

  test('Escape key clears the display', async ({ page }) => {
    await page.keyboard.type('99');
    await page.keyboard.press('Escape');
    await expect(page.locator('#current-value')).toHaveText('0');
  });

  test('Backspace deletes the last digit', async ({ page }) => {
    await page.keyboard.type('123');
    await page.keyboard.press('Backspace');
    await expect(page.locator('#current-value')).toHaveText('12');
  });
});

// ─────────────────────────────────────────────────────────
// Accessibility
// ─────────────────────────────────────────────────────────
test.describe('Accessibility', () => {
  test('display has role="status" and aria-live', async ({ page }) => {
    await openCalc(page);
    const display = page.locator('#display');
    await expect(display).toHaveAttribute('role', 'status');
    await expect(display).toHaveAttribute('aria-live', 'polite');
  });

  test('all digit buttons have aria-label', async ({ page }) => {
    await openCalc(page);
    for (let i = 0; i <= 9; i++) {
      const btn = page.locator(`[data-digit="${i}"]`);
      await expect(btn).toHaveAttribute('aria-label', String(i));
    }
  });

  test('calculator section has aria-label', async ({ page }) => {
    await openCalc(page);
    await expect(page.locator('.calculator')).toHaveAttribute('aria-label', 'Calculator');
  });
});
