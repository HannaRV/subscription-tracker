/**
 * @file CostCalculator class for calculating subscription costs and analytics.
 * @module src/CostCalculator.js
 * @author Hanna Rubio Vretby <hr222sy@student.lnu.se>
 * @version 1.0.0
 */

export class CostCalculator {
    //Class constants
    static WEEKS_PER_MONTH = 4.33 // Approximation: Average weeks per month
    static MONTHS_PER_YEAR = 12
    static WEEKS_PER_YEAR = 52

    // Single subscription calculations
    calculateMonthlyPrice(subscription) {
        if (!subscription) {
            throw new Error('Subscription cannot be null')
        }

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

    calculateYearlyPrice(subscription) {
        if (!subscription) {
            throw new Error('Subscription cannot be null')
        }

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
}