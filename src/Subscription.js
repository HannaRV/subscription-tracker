/**
 * @file Subscription class for representing individual subscriptions.
 * @module src/Subscription
 * @author Hanna Rubio Vretby <hr222sy@student.lnu.se>
 * @version 1.0.0
 */

export class Subscription {
  //Class constants
  static WEEKS_PER_MONTH = 4.33
  static MONTHS_PER_YEAR = 12
  static VALID_FREQUENCIES = ['weekly', 'monthly', 'yearly']

  constructor(name, price, frequency, category = 'other') {

    //Validate inputs
    this.validateName(name)
    this.validatePrice(price)
    this.validateFrequency(frequency)

    //Initialize properties
    this.name = name
    this.price = price
    this.frequency = frequency
    this.category = category
    this.isActive = true
    this.usageHours = 0
  }

  //Input validation methods
  validateName(name) {
    if (!name || typeof name !== 'string') {
      throw new Error('Name must be a non-empty string')
    }
  }

  validatePrice(price) {
    if (price === null || price === undefined || price < 0) {
      throw new Error('Price must be 0 or higher')
    }
  }

  validateFrequency(frequency) {
    if (!Subscription.VALID_FREQUENCIES.includes(frequency)) {
      throw new Error('Frequency must be weekly, monthly, or yearly')
    }
  }

  //Price calculation methods
  getMonthlyPrice() {
    if (this.frequency === 'weekly') {
      return this.price * Subscription.WEEKS_PER_MONTH
    }
    if (this.frequency === 'yearly') {
      return this.price / Subscription.MONTHS_PER_YEAR
    }
    return this.price
  }

  //Status management methods
  deactivate() {
    this.isActive = false
  }

  activate() {
    this.isActive = true
  }

  getActiveStatus() {
    return this.isActive
  }

  //Usage tracking methods
  addUsageHours(hours) {
    if (hours > 0) {
      this.usageHours += hours
    }
  }

  getUsageHours() {
    return this.usageHours
  }

  getCostPerHour() {
    if (this.usageHours === 0) {
      return null
    }
    return this.getMonthlyPrice() / this.usageHours
  }
}