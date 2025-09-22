/**
 * @file CostCalculator class for calculating subscription costs and analytics.
 * @module src/CostCalculator.js
 * @author Hanna Rubio Vretby <hr222sy@student.lnu.se>
 * @version 1.0.0
 */

export class CostCalculator {
    //Class constants
    static WEEKS_PER_MONTH = 4.33 // Approximation
    static MONTHS_PER_YEAR = 12
    static WEEKS_PER_YEAR = 52

    //Private validation method for individual subscriptions
    #validateSubscription(subscription) {
        if (!subscription) {
            throw new Error('Subscription cannot be null')
        }
    }

    //Calculate cost for individual subscriptions
    calculateMonthlyCost(subscription) {
        this.#validateSubscription(subscription)

        const frequency = subscription.getFrequency()
        const price = subscription.getPrice()

        if (frequency === 'weekly') {
            return price * CostCalculator.WEEKS_PER_MONTH
        }

        if (frequency === 'yearly') {
            return price / CostCalculator.MONTHS_PER_YEAR
        }
        return price
    }

    calculateYearlyCost(subscription) {
        this.#validateSubscription(subscription)

        const frequency = subscription.getFrequency()
        const price = subscription.getPrice()

        if (frequency === 'weekly') {
            return price * CostCalculator.WEEKS_PER_YEAR
        }

        if (frequency === 'monthly') {
            return price * CostCalculator.MONTHS_PER_YEAR
        }
        return price
    }

    calculateWeeklyCost(subscription) {
        this.#validateSubscription(subscription)

        const frequency = subscription.getFrequency()
        const price = subscription.getPrice()

        if (frequency === 'monthly') {
            return price / CostCalculator.WEEKS_PER_MONTH
        }

        
        if (frequency === 'yearly') {
            return price / CostCalculator.WEEKS_PER_YEAR
        }
        return price
    }

    //Private validation method for multiple subscriptions (array)
    #validateSubscriptionArray(subscriptions) {
        if (!Array.isArray(subscriptions)) {
            throw new Error('Subscriptions must be an array')
        }
    }

    //Calculate total cost for multiple subscriptions
    calculateTotalMonthlyCost(subscriptions) {
        this.#validateSubscriptionArray(subscriptions)

        return subscriptions
            .filter(subscription => subscription.isActive())
            .reduce((total, subscription) => total + this.calculateMonthlyCost(subscription), 0)
    }

    calculateTotalYearlyCost(subscriptions) {
        this.#validateSubscriptionArray(subscriptions)

        return subscriptions
            .filter(subscription => subscription.isActive())
            .reduce((total, subscription) => total + this.calculateYearlyCost(subscription), 0)
    }

    calculateTotalWeeklyCost(subscriptions) {
        this.#validateSubscriptionArray(subscriptions)

        return subscriptions
            .filter(subscription => subscription.isActive())
            .reduce((total, subscription) => total + this.calculateWeeklyCost(subscription), 0)
    }

    calculateCostByCategory(subscriptions) {
        this.#validateSubscriptionArray(subscriptions)
        const cost = {}
        for (let subscription of subscriptions) {
            if (subscription.isActive()) {
                const category = subscription.getCategory()
                if (!cost[category]) {
                    cost[category] = 0
                }
                cost[category] += this.calculateMonthlyCost(subscription)
            }
        }
        return cost
    }
// SE ÖVER PRICE/COST, DRY SAMT LÄGG TILL TEST
}