/**
 * @file SubscriptionCollection class for managing collections of subscriptions.
 * @module src/SubscriptionCollection.js
 * @author Hanna Rubio Vretby <hr222sy@student.lnu.se>
 * @version 1.0.0
 */

export class SubscriptionCollection {
    //Private fields
    #subscriptions

    constructor() {
        this.#subscriptions = []
    }

    // Collection management
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

    // Retrieval - all
    getAllSubscriptions() {
        return [...this.#subscriptions]
    }

    // Retrieval - filtered 
    getActiveSubscriptions() {
        return this.#subscriptions.filter(subscription => subscription.isActive())
    }

    getInactiveSubscriptions() {
        return this.#subscriptions.filter(subscription => !subscription.isActive())
    }

    getSubscriptionsByCategory(category) {
        return this.#subscriptions.filter(subscription => subscription.getCategory() === category)
    }

    searchSubscriptionsByName(name) {
        return this.#subscriptions.filter(subscription => subscription.getName().toLowerCase().includes(name.toLowerCase()))
    }
}
