# Subscription Tracker
A JavaScript module for managing and analyzing personal subscriptions. Convert between billing frequencies, identify unused services, analyze cost efficiency and make calculated decisions about which subscriptions to keep or cancel.

## Table of Contents
- [Quick Start](#quick-start)
- [Installation](#installation)
- [Core Features](#core-features)
- [Purpose](#purpose)
- [Essential API](#essential-api)
  - Subscription
  - SubscriptionCollection
  - CostCalculator
  - UsageAnalyzer
- [Complete Example](#complete-example)
- [Requirements](#requirements)
- [License](#license)
- [Author](#author)

## Quick Start

```javascript
import { Subscription, SubscriptionCollection, CostCalculator, UsageAnalyzer } from 'subscription-tracker'

// Create and manage subscriptions
const netflix = new Subscription("Netflix", 139, "monthly", "streaming")
const collection = new SubscriptionCollection()
collection.addSubscription(netflix)

// Calculate costs
const calculator = new CostCalculator()
const yearlyCost = calculator.calculateYearlyCost(netflix)
console.log(`Netflix yearly cost: ${yearlyCost} kr`)

// Track and analyze usage
netflix.addUsageHours(25)
const analyzer = new UsageAnalyzer()
const costPerHour = analyzer.analyzeCostPerHour(netflix, calculator)
console.log(`Cost per hour: ${costPerHour.toFixed(2)} kr`)
```

## Installation

```bash
# Clone from GitHub
git clone https://github.com/HannaRV/subscription-tracker
```

## Core Features

- ✅ Manage subscription data with validation
- ✅ Convert costs between weekly/monthly/yearly frequencies  
- ✅ Track active/inactive status and usage hours
- ✅ Calculate individual and total costs by category
- ✅ Analyze usage efficiency (cost per hour)
- ✅ Identify completely unused subscriptions
- ✅ Identify underutilized subscriptions

## Purpose

Subscription Tracker helps individuals take control of their subscription expenses by providing clear insights into spending patterns. The module addresses common problems:

- Converting between different billing frequencies for fair cost comparison
- Identifying unused subscriptions costing you money
- Finding overpriced services relative to your usage
- Calculating total spending across categories
- Making calculated analysis of which subscriptions to keep or cancel

## Essential API

⚠️ **Note:** Each class has important usage considerations. See complete API documentation for detailed behavior notes and limitations.

### Subscription → [Complete Subscription API](docs/API/Subscription.md)
```javascript
const subscription = new Subscription(name, price, frequency, category)
subscription.activate() / subscription.deactivate()
subscription.addUsageHours(hours)
```

### SubscriptionCollection → [Complete SubscriptionCollection API](docs/API/SubscriptionCollection.md)
```javascript
const collection = new SubscriptionCollection()
collection.addSubscription(subscription)
collection.getActiveSubscriptions()
collection.searchSubscriptionsByName(name)
```

### CostCalculator → [Complete CostCalculator API](docs/API/CostCalculator.md)
```javascript
const calculator = new CostCalculator()
calculator.calculateMonthlyCost(subscription)
calculator.calculateTotalMonthlyCost(subscriptions)
calculator.calculateCostByCategory(subscriptions)
```

### UsageAnalyzer → [Complete UsageAnalyzer API](docs/API/UsageAnalyzer.md)
```javascript
const analyzer = new UsageAnalyzer()
analyzer.analyzeCostPerHour(subscription, calculator)
analyzer.findUnderutilizedSubscriptions(subscriptions, calculator, maxCostPerHour)
analyzer.findUnusedSubscriptions(subscriptions)
```

## Complete Example

```javascript
// Setup subscriptions
const netflix = new Subscription("Netflix", 139, "monthly", "streaming")
const spotify = new Subscription("Spotify", 1200, "yearly", "music")

const collection = new SubscriptionCollection()
collection.addSubscription(netflix)
collection.addSubscription(spotify)

// Add usage data
netflix.addUsageHours(25)
spotify.addUsageHours(50)

// Calculate and analyze
const calculator = new CostCalculator()
const analyzer = new UsageAnalyzer()

const totalMonthlyCost = calculator.calculateTotalMonthlyCost(collection.getAllSubscriptions())
const categoryBreakdown = calculator.calculateCostByCategory(collection.getAllSubscriptions())
const unusedSubs = analyzer.findUnusedSubscriptions(collection.getAllSubscriptions())
console.log(`Completely unused subscriptions: ${unusedSubs.length}`)
const inefficientSubs = analyzer.findUnderutilizedSubscriptions(
    collection.getAllSubscriptions(),
    calculator,
    20 // Max 20 kr/hour
)

console.log(`Total monthly cost: ${totalMonthlyCost} kr`)
console.log('By category:', categoryBreakdown)
console.log(`Inefficient subscriptions: ${inefficientSubs.length}`)
```

## Requirements

- Node.js >=20.6.0
- ES6 modules support

## License

MIT

## Versioning

This project uses [Semantic Versioning](https://semver.org/):
- **MAJOR** version for incompatible API changes
- **MINOR** version for new functionality
- **PATCH** version for bug fixes

Current version: **1.0.0**

## Author

Hanna Rubio Vretby <hr222sy@student.lnu.se>