/**
 * @file Test application for subscription-tracker module.
 * @module test-app/app
 * @author Hanna Rubio Vretby <hr222sy@student.lnu.se>
 * @version 1.0.0
 * @description Demonstrates and tests the functionality of the subscription tracker module.
 */

import { Subscription, SubscriptionManager } from "../src/index.js"

console.log ('=== Testing Subscription Class ===')

//Test basic functionality
const netflix = new Subscription("Netflix", 139, "monthly", "streaming")
console.log(`${netflix.name} (${netflix.category}): ${netflix.getMonthlyPrice()} kr/month`)

//Test yearly conversion
const spotify = new Subscription("Spotify", 1200, "yearly", "music")
console.log(`${spotify.name} (${spotify.category}): ${spotify.getMonthlyPrice()} kr/month`)

//Test weekly conversion
const sats = new Subscription("SATS", 150, "weekly", "fitness")
console.log(`${sats.name} (${sats.category}): ${sats.getMonthlyPrice()} kr/month`)

// Test active/inactive functionality
console.log(`Netflix active status: ${netflix.getActiveStatus()}`)

netflix.deactivate()
console.log(`Netflix active status: ${netflix.getActiveStatus()}`)

netflix.activate()
console.log(`Netflix active status: ${netflix.getActiveStatus()}`)

// Test usage tracking
console.log(`Netflix initial usage: ${netflix.getUsageHours()} hours`)

netflix.addUsageHours(15)
console.log(`Netflix after adding 15 hours: ${netflix.getUsageHours()} hours`)

const costPerHour = netflix.getCostPerHour()
if (costPerHour) {
  console.log(`Netflix cost per hour: ${costPerHour.toFixed(2)} kr/hour`)
} else {
  console.log('Netflix cost per hour: No usage recorded')
}

//Test multiple subscriptions
const manager = new SubscriptionManager()
manager.addSubscription(netflix)
manager.addSubscription(spotify)

console.log(`Total subscriptions: ${manager.getSubscriptions().length}`)