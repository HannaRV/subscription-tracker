/**
 * @file CostCalculator class for calculating subscription costs and analytics.
 * @module src/CostCalculator.js
 * @author Hanna Rubio Vretby <hr222sy@student.lnu.se>
 * @version 1.0.0
 */

export class CostCalculator {
    //Class constants
    static HOURS_PER_DAY = 24
    static HOURS_PER_WEEK = 7 * 24
    static HOURS_PER_MONTH = 30.44 * 24 // Average month length
    static HOURS_PER_YEAR = 365.25 * 24 // Approximation including leap years
    static DAYS_PER_WEEK = 7
    static WEEKS_PER_MONTH = 4.33 // Average weeks per month
    static WEEKS_PER_YEAR = 52.18 // Average weeks per year including leap years
    static MONTHS_PER_YEAR = 12

    //Private validation method for individual subscriptions
    #validateSubscription(subscription) {
        if (!subscription) {
            throw new Error('Subscription cannot be null')
        }
    }

    //Calculate cost for individual subscriptions per frequency (hourly, weekly, monthly, yearly)
    calculateHourlyCost(subscription) {
        this.#validateSubscription(subscription)

        const frequency = subscription.getFrequency()
        const price = subscription.getPrice()

        if (frequency === 'weekly') {
            return price / CostCalculator.HOURS_PER_WEEK
        }

        if (frequency === 'monthly') {
            return price / CostCalculator.HOURS_PER_MONTH
        }

        if (frequency === 'yearly') {
            return price / CostCalculator.HOURS_PER_YEAR
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

    //Private validation method for multiple subscriptions (array)
    #validateSubscriptionArray(subscriptions) {
        if (!Array.isArray(subscriptions)) {
            throw new Error('Subscriptions must be an array')
        }
    }

    //Calculate total cost for multiple subscriptions per frequency (weekly, monthly, yearly)
    calculateTotalWeeklyCost(subscriptions) {
        this.#validateSubscriptionArray(subscriptions)

        return subscriptions
            .filter(subscription => subscription.isActive())
            .reduce((total, subscription) => total + this.calculateWeeklyCost(subscription), 0)
    }

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

    calculateCostByCategory(subscriptions) {
        this.#validateSubscriptionArray(subscriptions)
        return this.#groupCostsByCategory(this.#filterActiveSubscriptions(subscriptions))
    }

    #filterActiveSubscriptions(subscriptions) {
        return subscriptions.filter(subscription => subscription.isActive())
    }

    #groupCostsByCategory(activeSubscriptions) {
        return activeSubscriptions.reduce((categoryTotals, subscription) => {
            const category = subscription.getCategory()
            categoryTotals[category] = (categoryTotals[category] || 0) + this.calculateMonthlyCost(subscription)
            return categoryTotals
        }, {})
    }
}