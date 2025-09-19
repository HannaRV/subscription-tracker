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
  #renewalDate


  //Class constants
  static WEEKS_PER_MONTH = 4.33 // Approximation: Average weeks per month
  static MONTHS_PER_YEAR = 12
  static VALID_FREQUENCIES = ['weekly', 'monthly', 'yearly']

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
    this.#renewalDate = null
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

  getName() {
    return this.#name
  }

  getPrice() {
    return this.#price
  }

  getFrequency() {
    return this.#frequency
  }

  getCategory() {
    return this.#category
  }



  //Status management methods
  deactivate() {
    this.#activeStatus = false
  }

  activate() {
    this.#activeStatus = true
  }

  isActive() {
    return this.#activeStatus
  }

  //Usage tracking methods
  addUsageHours(hours) {
    if (hours <= 0) {
      throw new Error('Usage hours must be positive')
    }
    this.#usageHours += hours
  }

  getUsageHours() {
    return this.#usageHours
  }

  //Renewal date methods
  setRenewalDate(date) {
    if (!date) {
      throw new Error('Renewal date can not be empty')
    }
    this.#renewalDate = new Date(date)
  }

  getRenewalDate() {
    return this.#renewalDate
  }
}