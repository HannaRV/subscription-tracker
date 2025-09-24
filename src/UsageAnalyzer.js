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
}