/**
 * @file Subscription class for representing individual subscriptions.
 * @module src/Subscription
 * @author Hanna Rubio Vretby <hr222sy@student.lnu.se>
 * @version 1.0.0
 */

export class Subscription {
  constructor(name, price, frequency) {
    this.validateName(name)
    this.validatePrice(price)
    this.validateFrequency(frequency)

    this.name = name
    this.price = price
    this.frequency = frequency
  }

  validateName(name) {
    if (!name || typeof name !== 'string') {
      throw new Error('Name must be a non-empty string')
    }
  }

  validatePrice(price) {
    if (!price || price <= 0) {
      throw new Error('Price must be a positive number')
    }
  }

  validateFrequency(frequency) {
    const validFrequencies = ['weekly', 'monthly', 'yearly']
    if (!validFrequencies.includes(frequency)) {
      throw new Error('Frequency must be weekly, monthly, or yearly')
    }
  }

  getMonthlyPrice() {
    if (this.frequency === 'weekly') {
      return this.price * 4.33
    }
    if (this.frequency === 'yearly') {
      return this.price / 12
    }
    return this.price
  }
}