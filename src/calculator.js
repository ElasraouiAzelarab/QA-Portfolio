'use strict';

/**
 * Calculator module — the "app under test" for this QA Portfolio.
 * Exposes a simple Calculator class with basic arithmetic operations.
 */
class Calculator {
  constructor() {
    this.result = 0;
    this.history = [];
  }

  /**
   * Add two numbers.
   * @param {number} a
   * @param {number} b
   * @returns {number}
   */
  add(a, b) {
    this._validateNumbers(a, b);
    const result = a + b;
    this._recordHistory('add', a, b, result);
    return result;
  }

  /**
   * Subtract b from a.
   * @param {number} a
   * @param {number} b
   * @returns {number}
   */
  subtract(a, b) {
    this._validateNumbers(a, b);
    const result = a - b;
    this._recordHistory('subtract', a, b, result);
    return result;
  }

  /**
   * Multiply two numbers.
   * @param {number} a
   * @param {number} b
   * @returns {number}
   */
  multiply(a, b) {
    this._validateNumbers(a, b);
    const result = a * b;
    this._recordHistory('multiply', a, b, result);
    return result;
  }

  /**
   * Divide a by b.
   * @param {number} a
   * @param {number} b
   * @returns {number}
   * @throws {Error} when b is zero
   */
  divide(a, b) {
    this._validateNumbers(a, b);
    if (b === 0) {
      throw new Error('Division by zero is not allowed');
    }
    const result = a / b;
    this._recordHistory('divide', a, b, result);
    return result;
  }

  /**
   * Raise a to the power of exponent.
   * @param {number} base
   * @param {number} exponent
   * @returns {number}
   */
  power(base, exponent) {
    this._validateNumbers(base, exponent);
    const result = Math.pow(base, exponent);
    this._recordHistory('power', base, exponent, result);
    return result;
  }

  /**
   * Return the square root of n.
   * @param {number} n
   * @returns {number}
   * @throws {Error} when n is negative
   */
  sqrt(n) {
    if (typeof n !== 'number' || isNaN(n)) {
      throw new TypeError('Input must be a valid number');
    }
    if (n < 0) {
      throw new Error('Square root of a negative number is not real');
    }
    const result = Math.sqrt(n);
    // Use undefined sentinel so _validateNumbers ignores the second slot
    this._recordHistory('sqrt', n, undefined, result);
    return result;
  }

  /**
   * Return the modulo of a divided by b.
   * @param {number} a
   * @param {number} b
   * @returns {number}
   * @throws {Error} when b is zero
   */
  modulo(a, b) {
    this._validateNumbers(a, b);
    if (b === 0) {
      throw new Error('Modulo by zero is not allowed');
    }
    const result = a % b;
    this._recordHistory('modulo', a, b, result);
    return result;
  }

  /**
   * Clear the history log.
   */
  clearHistory() {
    this.history = [];
  }

  /**
   * @private
   */
  _validateNumbers(...args) {
    for (const arg of args) {
      if (typeof arg !== 'number' || isNaN(arg)) {
        throw new TypeError('All arguments must be valid numbers');
      }
    }
  }

  /**
   * @private
   */
  _recordHistory(operation, a, b, result) {
    this.history.push({ operation, a, b, result, timestamp: new Date().toISOString() });
  }
}

module.exports = Calculator;
