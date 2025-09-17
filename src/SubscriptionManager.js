/**
 * @file SubscriptionManager class for managing multiple subscriptions.
 * @module src/SubscriptionManager
 * @author Hanna Rubio Vretby <hr222sy@student.lnu.se>
 * @version 1.0.0
 */

export class SubscriptionManager {
    constructor() {
        this.subscriptions = []
    }

    addSubscription(subscription) {
        this.subscriptions.push(subscription)
    }

    getSubscriptions() {
        return this.subscriptions
    }

    getActiveSubscriptions() {
        return this.subscriptions.filter(sub => sub.getActiveStatus())
    }

    findSubscriptionByName(name) {
        return this.subscriptions.find(subscription => subscription.name === name)
    }

    getSubscriptionsByCategory(category) {
        return this.subscriptions.filter(subscription => subscription.category === category)
    }

}