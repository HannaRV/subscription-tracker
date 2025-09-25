/**
 * @file Test application for subscription-tracker module.
 * @module test-app/app
 * @author Hanna Rubio Vretby <hr222sy@student.lnu.se>
 * @version 1.0.0
 * @description Demonstrates and tests the functionality of the subscription tracker module.
 */

import { Subscription, SubscriptionCollection, CostCalculator, UsageAnalyzer } from '../src/index.js'

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

console.log('=== Testing SubscriptionCollection Class ===')

//Test multiple subscriptions
const collection = new SubscriptionCollection()
collection.addSubscription(netflix)
collection.addSubscription(spotify)
collection.addSubscription(sats)

console.log(`Total subscriptions: ${collection.getAllSubscriptions().length}`)

//Test search subscriptions by name (partial, case-insensitive)
const searchSubscriptions = collection.searchSubscriptionsByName('netfl')
if (searchSubscriptions.length > 0) {
  console.log(`Found: ${searchSubscriptions[0].getName()}`)
} else {
  console.log('Subscription not found')
}

//Test filtering subscriptions by category
const streamingServices = collection.getSubscriptionsByCategory('streaming')
console.log(`Streaming services: ${streamingServices.length}`)

//Test active subscriptions
console.log(`Active subscriptions: ${collection.getActiveSubscriptions().length}`)

//Test removing subscriptions
console.log(`Before removal: ${collection.getAllSubscriptions().length} subscriptions`)
const removed = collection.removeSubscription(sats)
console.log(`Removal successful: ${removed}`)
console.log(`After removal: ${collection.getAllSubscriptions().length} subscriptions`)


console.log('=== Testing CostCalculator Class ===')
//Test frequency conversions
const costCalculator = new CostCalculator()

// Re-add SATS for total cost calculations
collection.addSubscription(sats)

// Test hourly cost calculations
console.log(`Netflix hourly cost: ${costCalculator.calculateHourlyCost(netflix)} kr`)
console.log(`Spotify hourly cost: ${costCalculator.calculateHourlyCost(spotify)} kr`)
console.log(`SATS hourly cost: ${costCalculator.calculateHourlyCost(sats)} kr`)

// Test weekly cost calculations
console.log(`Netflix weekly cost: ${costCalculator.calculateWeeklyCost(netflix)} kr`)
console.log(`Spotify weekly cost: ${costCalculator.calculateWeeklyCost(spotify)} kr`) 
console.log(`SATS weekly cost: ${costCalculator.calculateWeeklyCost(sats)} kr`)

// Test monthly cost calculations
console.log(`Netflix monthly cost: ${costCalculator.calculateMonthlyCost(netflix)} kr`)
console.log(`Spotify monthly cost: ${costCalculator.calculateMonthlyCost(spotify)} kr`) 
console.log(`SATS monthly cost: ${costCalculator.calculateMonthlyCost(sats)} kr`)

// Test yearly cost calculations
console.log(`Netflix yearly cost: ${costCalculator.calculateYearlyCost(netflix)} kr`)
console.log(`Spotify yearly cost: ${costCalculator.calculateYearlyCost(spotify)} kr`)
console.log(`SATS yearly cost: ${costCalculator.calculateYearlyCost(sats)} kr`)

// Test total cost calculations
const totalWeeklyCost = costCalculator.calculateTotalWeeklyCost(collection.getAllSubscriptions())
console.log(`Total weekly cost for all subscriptions: ${totalWeeklyCost} kr`)

const totalMonthlyCost = costCalculator.calculateTotalMonthlyCost(collection.getAllSubscriptions())
console.log(`Total monthly cost for all subscriptions: ${totalMonthlyCost} kr`)

const totalYearlyCost = costCalculator.calculateTotalYearlyCost(collection.getAllSubscriptions())
console.log(`Total yearly cost for all subscriptions: ${totalYearlyCost} kr`)

// Test cost by category
const hboMax = new Subscription('HBO Max', 109, 'monthly', 'streaming')
const appleTv = new Subscription('Apple TV+', 59, 'monthly', 'streaming')
const appleMusic = new Subscription('Apple Music', 109, 'monthly', 'music')
const yogaPass = new Subscription('Yoga Pass', 200, 'weekly', 'fitness')

collection.addSubscription(hboMax)
collection.addSubscription(appleTv)
collection.addSubscription(appleMusic)
collection.addSubscription(yogaPass) // Add more subscriptions for category testing

const categoryTotals = costCalculator.calculateCostByCategory(collection.getAllSubscriptions())
console.log('Category cost breakdown:')
console.log(categoryTotals)

console.log(`Streaming costs (Netflix + HBO + Apple TV): ${categoryTotals.streaming || 0} kr/month`)
console.log(`Music costs (Spotify + Apple Music): ${categoryTotals.music || 0} kr/month`)  
console.log(`Fitness costs (SATS + Yoga): ${categoryTotals.fitness || 0} kr/month`)

appleMusic.deactivate()
console.log('After deactivating Apple Music:')
const updatedTotals = costCalculator.calculateCostByCategory(collection.getAllSubscriptions())
console.log(`Music costs after deactivation: ${updatedTotals.music || 0} kr/month`)

console.log('=== Testing UsageAnalyzer Class ===')