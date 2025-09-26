/**
 * @file UsageAnalyzer class for analyzing subscription usage and efficiency.
 * @module src/UsageAnalyzer.js
 * @author Hanna Rubio Vretby <hr222sy@student.lnu.se>
 * @version 1.0.0
 */

export class UsageAnalyzer {

    analyzeCostPerHour(subscription, costCalculator) {
        if (subscription.getUsageHours() === 0) {
            throw new Error('Cannot analyze cost per hour: no usage recorded.')
        }

        return costCalculator.calculateMonthlyCost(subscription) / subscription.getUsageHours()
    }

    // Find subscriptions with poor usage efficiency
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

    findUnusedSubscriptions(subscriptions) {
        const unused = []
        for (const subscription of subscriptions) {
            if (subscription.isActive() && subscription.getUsageHours() === 0) {
                unused.push(subscription)
            }
        }
        return unused
    }
}