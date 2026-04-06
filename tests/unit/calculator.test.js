'use strict';

const Calculator = require('../../src/calculator');

describe('Calculator', () => {
  let calc;

  beforeEach(() => {
    calc = new Calculator();
  });

  // ──────────────────────────────────────────
  // add()
  // ──────────────────────────────────────────
  describe('add()', () => {
    test('adds two positive integers', () => {
      expect(calc.add(3, 4)).toBe(7);
    });

    test('adds a positive and a negative number', () => {
      expect(calc.add(10, -3)).toBe(7);
    });

    test('adds two negative numbers', () => {
      expect(calc.add(-5, -3)).toBe(-8);
    });

    test('adds floating-point numbers', () => {
      expect(calc.add(0.1, 0.2)).toBeCloseTo(0.3);
    });

    test('adding zero returns the same number', () => {
      expect(calc.add(42, 0)).toBe(42);
    });

    test('throws TypeError for non-numeric input', () => {
      expect(() => calc.add('a', 2)).toThrow(TypeError);
      expect(() => calc.add(1, null)).toThrow(TypeError);
    });
  });

  // ──────────────────────────────────────────
  // subtract()
  // ──────────────────────────────────────────
  describe('subtract()', () => {
    test('subtracts two positive integers', () => {
      expect(calc.subtract(10, 4)).toBe(6);
    });

    test('subtracting a larger number gives a negative result', () => {
      expect(calc.subtract(3, 7)).toBe(-4);
    });

    test('subtracting zero returns the same number', () => {
      expect(calc.subtract(5, 0)).toBe(5);
    });

    test('subtracts floating-point numbers', () => {
      expect(calc.subtract(5.5, 2.2)).toBeCloseTo(3.3);
    });

    test('throws TypeError for non-numeric input', () => {
      expect(() => calc.subtract('x', 2)).toThrow(TypeError);
    });
  });

  // ──────────────────────────────────────────
  // multiply()
  // ──────────────────────────────────────────
  describe('multiply()', () => {
    test('multiplies two positive integers', () => {
      expect(calc.multiply(3, 4)).toBe(12);
    });

    test('multiplying by zero returns zero', () => {
      expect(calc.multiply(99, 0)).toBe(0);
    });

    test('multiplying two negative numbers returns a positive', () => {
      expect(calc.multiply(-3, -4)).toBe(12);
    });

    test('multiplies a negative and a positive number', () => {
      expect(calc.multiply(-3, 4)).toBe(-12);
    });

    test('multiplies floating-point numbers', () => {
      expect(calc.multiply(0.5, 0.5)).toBeCloseTo(0.25);
    });

    test('throws TypeError for non-numeric input', () => {
      expect(() => calc.multiply(true, 2)).toThrow(TypeError);
    });
  });

  // ──────────────────────────────────────────
  // divide()
  // ──────────────────────────────────────────
  describe('divide()', () => {
    test('divides two positive integers', () => {
      expect(calc.divide(10, 2)).toBe(5);
    });

    test('divides producing a decimal result', () => {
      expect(calc.divide(1, 3)).toBeCloseTo(0.333, 3);
    });

    test('divides a negative by a positive', () => {
      expect(calc.divide(-10, 2)).toBe(-5);
    });

    test('throws Error when dividing by zero', () => {
      expect(() => calc.divide(5, 0)).toThrow('Division by zero is not allowed');
    });

    test('dividing zero returns zero', () => {
      expect(calc.divide(0, 5)).toBe(0);
    });

    test('throws TypeError for non-numeric input', () => {
      expect(() => calc.divide('a', 2)).toThrow(TypeError);
    });
  });

  // ──────────────────────────────────────────
  // power()
  // ──────────────────────────────────────────
  describe('power()', () => {
    test('raises a positive base to a positive exponent', () => {
      expect(calc.power(2, 10)).toBe(1024);
    });

    test('any number to the power of 0 is 1', () => {
      expect(calc.power(999, 0)).toBe(1);
    });

    test('any number to the power of 1 is itself', () => {
      expect(calc.power(7, 1)).toBe(7);
    });

    test('negative base with even exponent yields positive result', () => {
      expect(calc.power(-2, 4)).toBe(16);
    });

    test('negative base with odd exponent yields negative result', () => {
      expect(calc.power(-2, 3)).toBe(-8);
    });

    test('fractional exponent (square root via power)', () => {
      expect(calc.power(9, 0.5)).toBeCloseTo(3);
    });

    test('throws TypeError for non-numeric input', () => {
      expect(() => calc.power('2', 3)).toThrow(TypeError);
    });
  });

  // ──────────────────────────────────────────
  // sqrt()
  // ──────────────────────────────────────────
  describe('sqrt()', () => {
    test('returns the square root of a perfect square', () => {
      expect(calc.sqrt(9)).toBe(3);
      expect(calc.sqrt(144)).toBe(12);
    });

    test('returns the square root of zero', () => {
      expect(calc.sqrt(0)).toBe(0);
    });

    test('returns approximate square root of a non-perfect square', () => {
      expect(calc.sqrt(2)).toBeCloseTo(1.414, 3);
    });

    test('throws Error for negative input', () => {
      expect(() => calc.sqrt(-1)).toThrow('Square root of a negative number is not real');
    });

    test('throws TypeError for non-numeric input', () => {
      expect(() => calc.sqrt('nine')).toThrow(TypeError);
      expect(() => calc.sqrt(NaN)).toThrow(TypeError);
    });
  });

  // ──────────────────────────────────────────
  // modulo()
  // ──────────────────────────────────────────
  describe('modulo()', () => {
    test('returns the remainder of division', () => {
      expect(calc.modulo(10, 3)).toBe(1);
    });

    test('returns zero when evenly divisible', () => {
      expect(calc.modulo(10, 5)).toBe(0);
    });

    test('handles negative dividend', () => {
      expect(calc.modulo(-10, 3)).toBe(-1);
    });

    test('throws Error for modulo by zero', () => {
      expect(() => calc.modulo(5, 0)).toThrow('Modulo by zero is not allowed');
    });

    test('throws TypeError for non-numeric input', () => {
      expect(() => calc.modulo('a', 3)).toThrow(TypeError);
    });
  });

  // ──────────────────────────────────────────
  // History
  // ──────────────────────────────────────────
  describe('history', () => {
    test('records each operation in history', () => {
      calc.add(2, 3);
      calc.multiply(4, 5);
      expect(calc.history).toHaveLength(2);
    });

    test('history entry contains expected fields', () => {
      calc.add(1, 2);
      const entry = calc.history[0];
      expect(entry).toMatchObject({ operation: 'add', a: 1, b: 2, result: 3 });
      expect(entry.timestamp).toBeDefined();
    });

    test('clearHistory() empties the history array', () => {
      calc.add(1, 1);
      calc.add(2, 2);
      calc.clearHistory();
      expect(calc.history).toHaveLength(0);
    });

    test('sqrt records a single-operand history entry', () => {
      calc.sqrt(25);
      const entry = calc.history[0];
      expect(entry).toMatchObject({ operation: 'sqrt', a: 25, result: 5 });
      expect(entry.b).toBeUndefined();
    });
  });
});
