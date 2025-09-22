/**
 * @file Test application for subscription-tracker module.
 * @module test-app/app
 * @author Hanna Rubio Vretby <hr222sy@student.lnu.se>
 * @version 1.0.0
 * @description Demonstrates and tests the functionality of the subscription tracker module.
 */

import { Subscription, SubscriptionManager, CostCalculator, UsageAnalyzer } from '../src/index.js'

console.log('=== Testing Subscription Class ===')

//Test basic functionality
const netflix = new Subscription('Netflix', 139, 'monthly', 'streaming')
console.log(`Name: ${netflix.getName()}`)
console.log(`Category: ${netflix.getCategory()}`)
console.log(`Price: ${netflix.getPrice()} kr`)
console.log(`Frequency: ${netflix.getFrequency()}`)

//Test create yearly subscription
const spotify = new Subscription('Spotify', 1200, 'yearly', 'music')
console.log(`${spotify.getName()}: ${spotify.getPrice()} kr per ${spotify.getFrequency()}`)

//Test create weekly subscription
const sats = new Subscription('SATS', 150, 'weekly', 'fitness')
console.log(`${sats.getName()}: ${sats.getPrice()} kr per ${sats.getFrequency()}`)

// Test active/inactive functionality
console.log(`Netflix initial active status is: ${netflix.isActive()}`)

netflix.deactivate()
console.log(`Netflix is now ${netflix.isActive() ? 'active' : 'deactivated'}`)

netflix.activate()
console.log(`Netflix is now ${netflix.isActive() ? 'active' : 'deactivated'}`)

// Test usage tracking
console.log(`Netflix initial usage: ${netflix.getUsageHours()} hours`)

netflix.addUsageHours(15)
console.log(`Netflix after adding 15 hours: ${netflix.getUsageHours()} hours`)

//Test multiple subscriptions
const manager = new SubscriptionManager()
manager.addSubscription(netflix)
manager.addSubscription(spotify)
manager.addSubscription(sats)

console.log(`Total subscriptions: ${manager.getAllSubscriptions().length}`)

//Test search subscriptions by name (partial, case-insensitive)
const searchSubscriptions = manager.searchSubscriptionsByName('netfl')
if (searchSubscriptions.length > 0) {
  console.log(`Found: ${searchSubscriptions[0].getName()}`)
} else {
  console.log('Subscription not found')
}

//Test filtering subscriptions by category
const streamingServices = manager.getSubscriptionsByCategory('streaming')
console.log(`Streaming services: ${streamingServices.length}`)

//Test active subscriptions
console.log(`Active subscriptions: ${manager.getActiveSubscriptions().length}`)

//Test removing subscriptions
console.log(`Before removal: ${manager.getAllSubscriptions().length} subscriptions`)
const removed = manager.removeSubscription(sats)
console.log(`Removal successful: ${removed}`)
console.log(`After removal: ${manager.getAllSubscriptions().length} subscriptions`)


console.log('=== Testing CostCalculator Class ===')
//Test frequency conversions
const costCalculator = new CostCalculator()

// Test monthly price calculations
console.log(`Netflix monthly cost: ${costCalculator.calculateMonthlyPrice(netflix)} kr`)
console.log(`Spotify monthly cost: ${costCalculator.calculateMonthlyPrice(spotify)} kr`) 
console.log(`SATS monthly cost: ${costCalculator.calculateMonthlyPrice(sats)} kr`)

// Test yearly price calculations
console.log(`Netflix yearly cost: ${costCalculator.calculateYearlyPrice(netflix)} kr`)
console.log(`Spotify yearly cost: ${costCalculator.calculateYearlyPrice(spotify)} kr`)
console.log(`SATS yearly cost: ${costCalculator.calculateYearlyPrice(sats)} kr`)

console.log('=== Testing UsageAnalyzer Class ===')


console.log('=== Testing SubscriptionOptimizer Class ===')