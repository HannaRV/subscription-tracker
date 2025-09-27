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
    /**
     * @throws {Error}
     */
    addSubscription(subscription) {
        if (!subscription) {
            throw new Error('Subscription cannot be null')
        }
        this.#subscriptions.push(subscription)
    }

    /**
    * @returns {boolean} True if removed, false if not found
     */
    removeSubscription(subscription) {
        const index = this.#subscriptions.indexOf(subscription)
        if (index !== -1) {
            this.#subscriptions.splice(index, 1)
            return true
        }
        return false
    }

    // Retrieval - all
    /**
     * @returns {Subscription[]}
     */
    getAllSubscriptions() {
        return [...this.#subscriptions]
    }

    // Retrieval - filtered
    /**
     * @returns {Subscription[]}
     */
    getActiveSubscriptions() {
        return this.#subscriptions.filter(subscription => subscription.isActive())
    }

    /**
     * @returns {Subscription[]}
     */
    getInactiveSubscriptions() {
        return this.#subscriptions.filter(subscription => !subscription.isActive())
    }

    /**
     * @returns {Subscription[]}
     */
    getSubscriptionsByCategory(category) {
        return this.#subscriptions.filter(subscription => subscription.getCategory() === category)
    }

    /**
     * @returns {Subscription[]}
     */
    searchSubscriptionsByName(name) {
        return this.#subscriptions.filter(subscription => subscription.getName().toLowerCase().includes(name.toLowerCase()))
    }
}
