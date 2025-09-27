/**
 * @file Subscription class for representing individual subscriptions.
 * @module src/Subscription
 * @author Hanna Rubio Vretby <hr222sy@student.lnu.se>
 * @version 1.0.0
 */

export class Subscription {
  //Private fields
  #name
  #price
  #frequency
  #category
  #activeStatus
  #usageHours

  //Class constants
  static VALID_FREQUENCIES = ['weekly', 'monthly', 'yearly']

  /**
   * @param {string} name
   * @param {number} price
   * @param {string} frequency
   * @param {string} [category='other']
   * @throws {Error} When name is empty, price is negative, or frequency is invalid
   */
  constructor(name, price, frequency, category = 'other') {

    //Validate inputs
    this.#validateName(name)
    this.#validatePrice(price)
    this.#validateFrequency(frequency)

    //Initialize properties
    this.#name = name
    this.#price = price
    this.#frequency = frequency
    this.#category = category
    this.#activeStatus = true
    this.#usageHours = 0
  }

  //Private validation methods
  #validateName(name) {
    if (!name || typeof name !== 'string') {
      throw new Error('Name must be a non-empty string')
    }
  }

  #validatePrice(price) {
    if (price === null || price === undefined || price < 0) {
      throw new Error('Price must be 0 or higher')
    }
  }

  #validateFrequency(frequency) {
    if (!Subscription.VALID_FREQUENCIES.includes(frequency)) {
      throw new Error('Frequency must be weekly, monthly, or yearly')
    }
  }

  //Public getter methods
  /**
   * @returns {string}
   */
  getName() {
    return this.#name
  }

  /**
   * @returns {number}
   */
  getPrice() {
    return this.#price
  }

  /**
   * @returns {string}
   */
  getFrequency() {
    return this.#frequency
  }

  /**
   * @returns {string}
   */
  getCategory() {
    return this.#category
  }

  //Status management methods
  /**
   * @returns {boolean}
   */
  isActive() {
    return this.#activeStatus
  }

  deactivate() {
    this.#activeStatus = false
  }

  activate() {
    this.#activeStatus = true
  }

  //Usage tracking methods
  /**
   * @param {number} hours
   * @throws {Error}
   */
  addUsageHours(hours) {
    if (hours <= 0) {
      throw new Error('Usage hours must be positive')
    }
    this.#usageHours += hours
  }

  /**
   * @returns {number}
   */
  getUsageHours() {
    return this.#usageHours
  }
}