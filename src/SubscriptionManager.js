/**
 * @file SubscriptionManager class for managing multiple subscriptions.
 * @module src/SubscriptionManager
 * @author Hanna Rubio Vretby <hr222sy@student.lnu.se>
 * @version 1.0.0
 */

export class SubscriptionManager {
    #subscriptions

    constructor() {
        this.#subscriptions = []
    }

    addSubscription(subscription) {
        if (!subscription) {
            throw new Error('Subscription cannot be null')
        }
        this.#subscriptions.push(subscription)
    }

    removeSubscription(subscription) {
        const index = this.#subscriptions.indexOf(subscription)
        if (index !== -1) {
            this.#subscriptions.splice(index, 1)
            return true
        }
        return false
    }

    getAllSubscriptions() {
        return this.#subscriptions
    }

    getActiveSubscriptions() {
        return this.#subscriptions.filter(sub => sub.isActive())
    }

    getInactiveSubscriptions() {
        return this.#subscriptions.filter(sub => !sub.isActive())
    }

    findSubscriptionByName(name) {
        return this.#subscriptions.find(subscription => subscription.getName() === name)
    }

    getSubscriptionsByCategory(category) {
        return this.#subscriptions.filter(subscription => subscription.getCategory() === category)
    }

}