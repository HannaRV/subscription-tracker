/**
 * @file UsageAnalyzer class for analyzing subscription usage and efficiency.
 * @module src/UsageAnalyzer.js
 * @author Hanna Rubio Vretby <hr222sy@student.lnu.se>
 * @version 1.0.0
 */

export class UsageAnalyzer {

    /**
     * Calculates how much each usage hour costs for a subscription.
     * @param {Subscription} subscription
     * @param {CostCalculator} costCalculator
     * @returns {number}
     * @throws {Error}
     */
    analyzeCostPerHour(subscription, costCalculator) {
        if (subscription.getUsageHours() === 0) {
            throw new Error('Cannot analyze cost per hour: no usage recorded.')
        }

        return costCalculator.calculateMonthlyCost(subscription) / subscription.getUsageHours()
    }

    /**
     * Finds subscriptions where cost per hour exceeds the specified maximum cost.
     * @param {Subscription[]} subscriptions
     * @param {CostCalculator} costCalculator
     * @param {number} maxCostPerHour
     * @returns {object[]} Objects with subscription and costPerHour properties
     * @throws {Error}
     */
    findUnderutilizedSubscriptions(subscriptions, costCalculator, maxCostPerHour) {
        if (maxCostPerHour <= 0) {
            throw new Error('Maximum cost per hour must be positive')
        }

        const underutilized = []

        for (const subscription of subscriptions) {
            if (subscription.isActive() && subscription.getUsageHours() > 0) {
                const costPerHour = this.analyzeCostPerHour(subscription, costCalculator)
                if (costPerHour > maxCostPerHour) {
                    underutilized.push({
                        subscription: subscription,
                        costPerHour: costPerHour
                    })
                }
            }
        }
        return underutilized
    }

    /**
     * Finds active subscriptions with zero recorded usage hours.
     * @param {Subscription[]} subscriptions
     * @returns {Subscription[]}
     */
    findUnusedSubscriptions(subscriptions) {
        return subscriptions.filter(subscription => subscription.isActive() && subscription.getUsageHours() === 0)
    }
}