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

//Test yearly conversion
const spotify = new Subscription('Spotify', 1200, 'yearly', 'music')
console.log(`${spotify.getName()}: ${spotify.getPrice()} kr per ${spotify.getFrequency()}`)

//Test weekly conversion
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

// Test renewal date
netflix.setRenewalDate('2025-01-15')
console.log(`Netflix renewal date: ${netflix.getRenewalDate()}`)

console.log('=== Testing SubscriptionManager Class ===')

//Test multiple subscriptions
const manager = new SubscriptionManager()
manager.addSubscription(netflix)
manager.addSubscription(spotify)
manager.addSubscription(sats)

console.log(`Total subscriptions: ${manager.getAllSubscriptions().length}`)

//Test filter subscriptions by name
const foundSubscriptions = manager.getSubscriptionsByName('Netflix')
if (foundSubscriptions.length > 0) {
  console.log(`Found: ${foundSubscriptions[0].getName()}`)
} else {
  console.log('Subscription not found')
}

//Test partial name search and case-insensitivity
const netflixSubscriptions = manager.getSubscriptionsByName('NET')
console.log(`Subscriptions containing 'NET': ${netflixSubscriptions.length}`)

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


console.log('=== Testing UsageAnalyzer Class ===')


console.log('=== Testing SubsrciptionOptimizer Class ===')


console.log('=== Testing RenewalTracker Class ===')