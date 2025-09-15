/**
 * @file Subscription class for representing individual subscriptions.
 * @module src/Subscription
 * @author Hanna Rubio Vretby <hr222sy@student.lnu.se>
 * @version 1.0.0
 */

export class Subscription {
  constructor(name, price, frequency) {
    this.name = name
    this.price = price
    this.frequency = frequency
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