/**
 * @file CostCalculator class for calculating subscription costs and analytics.
 * @module src/CostCalculator.js
 * @author Hanna Rubio Vretby <hr222sy@student.lnu.se>
 * @version 1.0.0
 */

export class CostCalculator {
    //Class constants
    /** @type {number} */
    static HOURS_PER_DAY = 24

    /** @type {number} */
    static HOURS_PER_WEEK = 7 * 24

    /** @type {number} */
    static HOURS_PER_MONTH = 30.44 * 24 // Average month length

    /** @type {number} */
    static HOURS_PER_YEAR = 365.25 * 24 // Approximation including leap years

    /** @type {number} */
    static DAYS_PER_WEEK = 7

    /** @type {number} */
    static WEEKS_PER_MONTH = 4.33 // Average weeks per month

    /** @type {number} */
    static WEEKS_PER_YEAR = 52.18 // Average weeks per year including leap years
    
    /** @type {number} */
    static MONTHS_PER_YEAR = 12

    //Private validation method for individual subscriptions
    #validateSubscription(subscription) {
        if (!subscription) {
            throw new Error('Subscription cannot be null')
        }
    }

    //Calculate cost for individual subscriptions per frequency (weekly, monthly, yearly) and hourly rate
    /**
     * @param {Subscription} subscription
     * @returns {number} Cost per hour (calculated from subscription's actual frequency)
     */
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

    /**
     * @param {Subscription} subscription
     * @returns {number}
     */
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

    /**
     * @param {Subscription} subscription
     * @returns {number}
     */
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

    /**
     * @param {Subscription} subscription
     * @returns {number}
     */
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
    /**
     * @param {Subscription[]} subscriptions
     * @returns {number}
     */
    calculateTotalWeeklyCost(subscriptions) {
        this.#validateSubscriptionArray(subscriptions)

        return subscriptions
            .filter(subscription => subscription.isActive())
            .reduce((total, subscription) => total + this.calculateWeeklyCost(subscription), 0)
    }

    /**
     * @param {Subscription[]} subscriptions
     * @returns {number}
     */
    calculateTotalMonthlyCost(subscriptions) {
        this.#validateSubscriptionArray(subscriptions)

        return subscriptions
            .filter(subscription => subscription.isActive())
            .reduce((total, subscription) => total + this.calculateMonthlyCost(subscription), 0)
    }

    /**
     * @param {Subscription[]} subscriptions
     * @returns {number}
     */
    calculateTotalYearlyCost(subscriptions) {
        this.#validateSubscriptionArray(subscriptions)

        return subscriptions
            .filter(subscription => subscription.isActive())
            .reduce((total, subscription) => total + this.calculateYearlyCost(subscription), 0)
    }

    /**
     * @param {Subscription[]} subscriptions
     * @returns {Object} Category names as keys with monthly costs as values
     */
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