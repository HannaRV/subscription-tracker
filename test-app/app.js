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

console.log('=== Testing SubscriptionManager Class ===')

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

// Re-add SATS for total cost calculations
manager.addSubscription(sats)

// Test monthly cost calculations
console.log(`Netflix monthly cost: ${costCalculator.calculateMonthlyCost(netflix)} kr`)
console.log(`Spotify monthly cost: ${costCalculator.calculateMonthlyCost(spotify)} kr`) 
console.log(`SATS monthly cost: ${costCalculator.calculateMonthlyCost(sats)} kr`)

// Test yearly cost calculations
console.log(`Netflix yearly cost: ${costCalculator.calculateYearlyCost(netflix)} kr`)
console.log(`Spotify yearly cost: ${costCalculator.calculateYearlyCost(spotify)} kr`)
console.log(`SATS yearly cost: ${costCalculator.calculateYearlyCost(sats)} kr`)

// Test weekly cost calculations
console.log(`Netflix weekly cost: ${costCalculator.calculateWeeklyCost(netflix)} kr`)
console.log(`Spotify weekly cost: ${costCalculator.calculateWeeklyCost(spotify)} kr`) 
console.log(`SATS weekly cost: ${costCalculator.calculateWeeklyCost(sats)} kr`)

// Test total cost calculations

const totalMonthlyCost = costCalculator.calculateTotalMonthlyCost(manager.getAllSubscriptions())
console.log(`Total monthly cost for all subscriptions: ${totalMonthlyCost} kr`)

const totalYearlyCost = costCalculator.calculateTotalYearlyCost(manager.getAllSubscriptions())
console.log(`Total yearly cost for all subscriptions: ${totalYearlyCost} kr`)

const totalWeeklyCost = costCalculator.calculateTotalWeeklyCost(manager.getAllSubscriptions())
console.log(`Total weekly cost for all subscriptions: ${totalWeeklyCost} kr`)

console.log('=== Testing UsageAnalyzer Class ===')


console.log('=== Testing SubscriptionOptimizer Class ===')