/**
 * @file Test application for subscription-tracker module.
 * @module test-app/app.js
 * @author Hanna Rubio Vretby <hr222sy@student.lnu.se>
 * @version 1.0.0

* TEST SECTIONS:
 * Line 32:  testSubscriptionClass() - Basic functionality, status management, usage tracking
 * Line 66:  testSubscriptionCollection() - Adding, removing, filtering, searching subscriptions  
 * Line 107:  testCostCalculator() - Cost calculations and conversions between frequencies
 * Line 168: testUsageAnalyzer() - Usage efficiency analysis and finding unused subscriptions
 * Line 223: testErrorHandling() - Input validation and error conditions
 * Line 286: testEdgeCases() - Boundary conditions and empty/invalid inputs
 * Line 324: Main execution - Comment out functions to run selective tests
 * 
 * Usage: Ctrl+G (VS Code/most editors) to jump to line number
 * To run selective tests: Comment out unwanted function calls at bottom of file
 */

import { Subscription, SubscriptionCollection, CostCalculator, UsageAnalyzer } from '../src/index.js'

// Shared test data
let netflix, spotify, sats, collection, costCalculator, analyzer

function setupTestData() {
    netflix = new Subscription('Netflix', 139, 'monthly', 'streaming')
    spotify = new Subscription('Spotify', 1200, 'yearly', 'music')
    sats = new Subscription('SATS', 150, 'weekly', 'fitness')
    collection = new SubscriptionCollection()
    costCalculator = new CostCalculator()
    analyzer = new UsageAnalyzer()
}

function testSubscriptionClass() {
    console.log('=== Testing Subscription Class ===')
    console.log('Tests basic subscription creation, getter methods, status management, and usage tracking.\n')
    console.log('EXPECTED BEHAVIOR:')
    console.log('  - Subscriptions can be created with name, category, price and frequency')
    console.log('  - All subscriptions are active by default')
    console.log('  - Status can be toggled between active/inactive')
    console.log('  - Usage tracking starts at 0 hours\n')


    //Test basic functionality
    console.log(`Name: ${netflix.getName()}`)
    console.log(`Category: ${netflix.getCategory()}`)
    console.log(`Price: ${netflix.getPrice()} kr`)
    console.log(`Frequency: ${netflix.getFrequency()}\n`)

    //Test create monthly subscription
    console.log(`${netflix.getName()}: ${netflix.getPrice()} kr per ${netflix.getFrequency()}`)

    //Test create yearly subscription
    console.log(`${spotify.getName()}: ${spotify.getPrice()} kr per ${spotify.getFrequency()}`)

    //Test create weekly subscription
    console.log(`${sats.getName()}: ${sats.getPrice()} kr per ${sats.getFrequency()}\n`)

    // Test active/inactive functionality
    console.log(`Netflix initial active status is: ${netflix.isActive()}`)

    netflix.deactivate()
    console.log(`Netflix is now ${netflix.isActive() ? 'active' : 'deactivated'}`)

    netflix.activate()
    console.log(`Netflix is now ${netflix.isActive() ? 'active' : 'deactivated'}\n`)

    // Test usage tracking
    console.log(`Netflix initial usage: ${netflix.getUsageHours()} hours`)

    netflix.addUsageHours(15)
    console.log(`Netflix after adding 15 hours: ${netflix.getUsageHours()} hours`)
}

function testSubscriptionCollection() {
    console.log('=== Testing SubscriptionCollection Class ===')
    console.log('Tests collection management: adding, removing, filtering, and searching subscriptions.\n')
    console.log('EXPECTED BEHAVIOR:')
    console.log('  - Multiple subscriptions can be added to a collection')
    console.log('  - Search by name is case-insensitive and supports partial matching ("netfl" finds "Netflix")')
    console.log('  - Subscriptions can be filtered by category (e.g., "streaming")')
    console.log('  - Active and inactive subscriptions can be filtered separately')
    console.log('  - Subscriptions can be removed from the collection\n')

    //Test multiple subscriptions
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

    //Test inactive subscriptions
    spotify.deactivate()
    const inactiveSubscriptions = collection.getInactiveSubscriptions()
    console.log(`Inactive subscriptions: ${inactiveSubscriptions.length}`)
    console.log(`Inactive subscription name: ${inactiveSubscriptions.length > 0 ? inactiveSubscriptions[0].getName() : 'None'}`)

    // Reactivate for other tests
    spotify.activate()

    //Test removing subscriptions
    console.log(`Before removal: ${collection.getAllSubscriptions().length} subscriptions`)
    const removed = collection.removeSubscription(sats)
    console.log(`Removal successful: ${removed}`)
    console.log(`After removal: ${collection.getAllSubscriptions().length} subscriptions`)
}

function testCostCalculator() {
    console.log('=== Testing CostCalculator Class ===')
    console.log('Tests cost calculations and conversions between different billing frequencies.\n')
    console.log('EXPECTED BEHAVIOR:')
    console.log('  - Hourly costs are calculated by dividing price by hours per period')
    console.log('  - Weekly costs: monthly/4.33, yearly/52.18, weekly stays same')
    console.log('  - Monthly costs: weekly*4.33, yearly/12, monthly stays same (Netflix=139, Spotify=100, SATS=649.5)')
    console.log('  - Yearly costs: weekly*52.18, monthly*12, yearly stays same')
    console.log('  - Total costs sum all active subscriptions only')
    console.log('  - Costs can be grouped by category (streaming, music, fitness)\n')

    // Re-add SATS for total cost calculations
    collection.addSubscription(sats)

    // Test hourly cost calculations
    console.log(`Netflix hourly cost: ${costCalculator.calculateHourlyCost(netflix)} kr`)
    console.log(`Spotify hourly cost: ${costCalculator.calculateHourlyCost(spotify)} kr`)
    console.log(`SATS hourly cost: ${costCalculator.calculateHourlyCost(sats)} kr\n`)

    // Test weekly cost calculations
    console.log(`Netflix weekly cost: ${costCalculator.calculateWeeklyCost(netflix)} kr`)
    console.log(`Spotify weekly cost: ${costCalculator.calculateWeeklyCost(spotify)} kr`)
    console.log(`SATS weekly cost: ${costCalculator.calculateWeeklyCost(sats)} kr\n`)

    // Test monthly cost calculations
    console.log(`Netflix monthly cost: ${costCalculator.calculateMonthlyCost(netflix)} kr`)
    console.log(`Spotify monthly cost: ${costCalculator.calculateMonthlyCost(spotify)} kr`)
    console.log(`SATS monthly cost: ${costCalculator.calculateMonthlyCost(sats)} kr\n`)

    // Test yearly cost calculations
    console.log(`Netflix yearly cost: ${costCalculator.calculateYearlyCost(netflix)} kr`)
    console.log(`Spotify yearly cost: ${costCalculator.calculateYearlyCost(spotify)} kr`)
    console.log(`SATS yearly cost: ${costCalculator.calculateYearlyCost(sats)} kr\n`)

    // Test total cost calculations
    const totalWeeklyCost = costCalculator.calculateTotalWeeklyCost(collection.getAllSubscriptions())
    console.log(`Total weekly cost for all subscriptions: ${totalWeeklyCost} kr`)

    const totalMonthlyCost = costCalculator.calculateTotalMonthlyCost(collection.getAllSubscriptions())
    console.log(`Total monthly cost for all subscriptions: ${totalMonthlyCost} kr`)

    const totalYearlyCost = costCalculator.calculateTotalYearlyCost(collection.getAllSubscriptions())
    console.log(`Total yearly cost for all subscriptions: ${totalYearlyCost} kr\n`)

    // Test cost by category
    const hboMax = new Subscription('HBO Max', 109, 'monthly', 'streaming')
    const appleTv = new Subscription('Apple TV+', 59, 'monthly', 'streaming')
    const appleMusic = new Subscription('Apple Music', 109, 'monthly', 'music')
    const yogaPass = new Subscription('Yoga Pass', 200, 'weekly', 'fitness')

    collection.addSubscription(hboMax)
    collection.addSubscription(appleTv)
    collection.addSubscription(appleMusic)
    collection.addSubscription(yogaPass)

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
}

function testUsageAnalyzer() {
    console.log('=== Testing UsageAnalyzer Class ===')
    console.log('Tests usage efficiency analysis and identifying unused or underutilized subscriptions.\n')
    console.log('EXPECTED BEHAVIOR:')
    console.log('  - Cost per hour = monthly cost ÷ usage hours')
    console.log('  - Underutilized subscriptions: cost per hour > specified maximum (e.g., SATS at 81.19 kr/hour > 15 limit)')
    console.log('  - Unused subscriptions: active subscriptions with 0 usage hours')
    console.log('  - Netflix with 15 hours usage should NOT appear in unused list\n')


    // Add usage data to existing subscriptions for testing
    spotify.addUsageHours(20)  // 20 hours of Spotify usage
    sats.addUsageHours(8)      // 8 hours of gym usage  

    // Find HBO Max from collection for usage test
    const hboMax = collection.getAllSubscriptions().find(sub => sub.getName() === 'HBO Max')
    if (hboMax) {
        hboMax.addUsageHours(25)   // 25 hours of HBO Max
    }

    console.log('--- Testing analyzeCostPerHour ---')
    console.log(`Spotify cost per hour: ${analyzer.analyzeCostPerHour(spotify, costCalculator).toFixed(2)} kr/hour`)
    console.log(`SATS cost per hour: ${analyzer.analyzeCostPerHour(sats, costCalculator).toFixed(2)} kr/hour`)
    if (hboMax) {
        console.log(`HBO Max cost per hour: ${analyzer.analyzeCostPerHour(hboMax, costCalculator).toFixed(2)} kr/hour\n`)
    }

    console.log('--- Testing findUnderutilizedSubscriptions ---')
    const maxCostPerHour = 15 // 15 kr per hour limit
    const underutilized = analyzer.findUnderutilizedSubscriptions(
        collection.getAllSubscriptions(),
        costCalculator,
        maxCostPerHour
    )

    console.log(`Found ${underutilized.length} underutilized subscriptions with cost > ${maxCostPerHour} kr/hour:`)
    underutilized.forEach(item => {
        console.log(`- ${item.subscription.getName()}: ${item.costPerHour.toFixed(2)} kr/hour\n`)
    })

    console.log('--- Testing findUnusedSubscriptions ---')

    // Create some subscriptions without usage
    const disneyPlus = new Subscription('Disney+', 89, 'monthly', 'streaming')
    const audible = new Subscription('Audible', 149, 'monthly', 'books')

    collection.addSubscription(disneyPlus)
    collection.addSubscription(audible)

    console.log(`Total subscriptions before unused test: ${collection.getAllSubscriptions().length}`)

    const unusedSubscriptions = analyzer.findUnusedSubscriptions(collection.getAllSubscriptions())

    console.log(`Found ${unusedSubscriptions.length} completely unused subscriptions:`)
    unusedSubscriptions.forEach(subscription => {
        console.log(`- ${subscription.getName()}: ${subscription.getUsageHours()} hours usage`)
    })

    console.log(`Netflix (${netflix.getUsageHours()} hours) should NOT be in unused list`)
    console.log(`Netflix in unused list: ${unusedSubscriptions.includes(netflix)}\n`)
}

function testErrorHandling() {
    console.log('=== Testing Error Handling ===')
    console.log('Tests that invalid inputs and operations throw appropriate errors.\n')
    console.log('EXPECTED BEHAVIOR:')
    console.log('  - Invalid inputs throw descriptive errors:')
    console.log('    • Empty names, negative prices, invalid frequencies')
    console.log('    • Negative usage hours')
    console.log('    • Null subscriptions or invalid arrays')
    console.log('    • Zero usage when analyzing cost per hour\n')

    // Test invalid subscription creation
    try {
        const invalidSub = new Subscription("", 139, "monthly") // Empty name
        console.log('ERROR: Should have thrown error for empty name')
    } catch (error) {
        console.log(`✓ Correctly caught error for empty name: ${error.message}`)
    }

    try {
        const invalidSub = new Subscription("Test", -50, "monthly") // Negative price
        console.log('ERROR: Should have thrown error for negative price')
    } catch (error) {
        console.log(`✓ Correctly caught error for negative price: ${error.message}`)
    }

    try {
        const invalidSub = new Subscription("Test", 100, "daily") // Invalid frequency
        console.log('ERROR: Should have thrown error for invalid frequency')
    } catch (error) {
        console.log(`✓ Correctly caught error for invalid frequency: ${error.message}`)
    }

    // Test invalid usage hours
    try {
        netflix.addUsageHours(-5) // Negative hours
        console.log('ERROR: Should have thrown error for negative usage hours')
    } catch (error) {
        console.log(`✓ Correctly caught error for negative usage: ${error.message}`)
    }

    // Test null subscription in collection
    try {
        collection.addSubscription(null)
        console.log('ERROR: Should have thrown error for null subscription')
    } catch (error) {
        console.log(`✓ Correctly caught error for null subscription: ${error.message}`)
    }

    // Test null subscription in calculator
    try {
        costCalculator.calculateMonthlyCost(null)
        console.log('ERROR: Should have thrown error for null subscription in calculator')
    } catch (error) {
        console.log(`✓ Correctly caught error for null subscription in calculator: ${error.message}`)
    }

    // Test invalid array in calculator
    try {
        costCalculator.calculateTotalMonthlyCost("not an array")
        console.log('ERROR: Should have thrown error for invalid array')
    } catch (error) {
        console.log(`✓ Correctly caught error for invalid array: ${error.message}`)
    }

    // Test negative maxCostPerHour in analyzer
    try {
        analyzer.findUnderutilizedSubscriptions([], costCalculator, -5)
        console.log('ERROR: Should have thrown error for non-positive max cost per hour')
    } catch (error) {
        console.log(`✓ Correctly caught error for non-positive max cost per hour: ${error.message}`)
    }

    // Test analyzeCostPerHour with zero usage
    const audible = collection.getAllSubscriptions().find(sub => sub.getName() === 'Audible')
    if (audible) {
        try {
            const zeroCost = analyzer.analyzeCostPerHour(audible, costCalculator) // Audible has 0 hours
            console.log('ERROR: Should have thrown error for zero usage analysis')
        } catch (error) {
            console.log(`✓ Correctly caught error for zero usage analysis: ${error.message}`)
        }
    }
}
// Test edge cases
function testEdgeCases() {
    console.log('=== Testing Edge Cases ===')
    console.log('Tests boundary conditions, empty collections, and operations on non-existent items.\n')
    console.log('EXPECTED BEHAVIOR:')
    console.log('  - Searches with no matches return empty array (0 results)')
    console.log('  - Removing non-existent subscriptions returns false')
    console.log('  - Empty collections return 0 for all counts and totals')
    console.log('  - Operations on empty collections do not throw errors\n')

    // Test search with no matches found
    const notFound = collection.searchSubscriptionsByName('nonexistentservice')
    console.log(`Search for non-existent service: ${notFound.length} results`)

    // Test remove non-existent subscription from collection
    const notInCollection = new Subscription('NonExistent', 100, 'monthly', 'test')
    const removeResult = collection.removeSubscription(notInCollection)
    console.log(`Remove non-existent subscription in collection: ${removeResult}`)

    // Test empty collection scenarios
    const emptyCollection = new SubscriptionCollection()
    console.log(`Empty collection size: ${emptyCollection.getAllSubscriptions().length}`)
    console.log(`Active in empty collection: ${emptyCollection.getActiveSubscriptions().length}`)

    // Test calculator with empty array
    const totalCostEmpty = costCalculator.calculateTotalMonthlyCost(emptyCollection.getAllSubscriptions())
    console.log(`Total monthly cost of empty collection: ${totalCostEmpty} kr`)
}

// Main execution - comment out any section you don't want to run
setupTestData()

testSubscriptionClass()
console.log('\n')

testSubscriptionCollection()
console.log('\n')

testCostCalculator()
console.log('\n')

testUsageAnalyzer()
console.log('\n')

testErrorHandling()
console.log('\n')

testEdgeCases() // Comment this out if you only want basic tests
console.log('\n=== All Tests Completed ===\n')