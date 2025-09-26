# Subscription Tracker

A JavaScript module for managing and analyzing personal subscriptions.

## Table of Contents
- [Installation](#installation)
- [Quick Start](#quick-start)
- [Features](#features)
- [API Reference](#api-reference)
  - [Subscription Class](#subscription-class)
  - [SubscriptionCollection Class](#subscriptioncollection-class)
  - [CostCalculator Class](#costcalculator-class)
  - [UsageAnalyzer Class](#usageanalyzer-class)
- [Example Usage](#example-usage)
- [Requirements](#requirements)
- [License](#license)
- [Contributing](#contributing)
- [Author](#author)

## Installation

```bash
# Installation will be available when published to npm
git clone https://github.com/username/subscription-tracker
```

## Quick Start
```javascript
import { Subscription, SubscriptionCollection, CostCalculator, UsageAnalyzer } from 'subscription-tracker'

const netflix = new Subscription("Netflix", 139, "monthly", "streaming")
const collection = new SubscriptionCollection()
collection.addSubscription(netflix)

// Calculate costs
const calculator = new CostCalculator()
const yearlyCost = calculator.calculateYearlyCost(netflix)
console.log(`Netflix yearly cost: ${yearlyCost} kr`)

// Track usage and analyze efficiency
netflix.addUsageHours(25)
const analyzer = new UsageAnalyzer()
const costPerHour = analyzer.analyzeCostPerHour(netflix, calculator)
console.log(`Netflix cost per hour: ${costPerHour.toFixed(2)} kr`)
```

## Features

- ✅ Create and manage subscription data with validation
- ✅ Convert costs between weekly/monthly/yearly frequencies  
- ✅ Organize subscriptions in collections
- ✅ Track active/inactive status and usage hours
- ✅ Calculate individual and total costs
- ✅ Group costs by category
- ✅ Basic usage efficiency analysis (cost per hour)
- ✅ Identify subscriptions above specified cost-per-hour limit

## API Reference

### Subscription Class

Create and manage individual subscription data.

#### Constructor

```javascript
new Subscription(name, price, frequency, category)
```

**Parameters:**
- `name` (string) - Name of the subscription
- `price` (number) - Price amount (must be 0 or higher)
- `frequency` (string) - "weekly", "monthly", or "yearly"
- `category` (string, optional) - Category name, defaults to "other"

#### Methods

**Basic Properties**
```javascript
subscription.getName()       // Returns subscription name
subscription.getPrice()      // Returns price amount
subscription.getFrequency()  // Returns frequency string
subscription.getCategory()   // Returns category name
```

**Status Management**
```javascript
subscription.activate()      // Set subscription as active
subscription.deactivate()    // Set subscription as inactive
subscription.isActive()      // Returns true if active, false if inactive
```

**Usage Tracking**
```javascript
subscription.addUsageHours(hours)  // Add usage hours (must be positive)
subscription.getUsageHours()       // Returns total usage hours
```

## Example Usage
```javascript
import { Subscription, SubscriptionCollection, CostCalculator, UsageAnalyzer } from 'subscription-tracker'

// Create subscriptions
const netflix = new Subscription("Netflix", 139, "monthly", "streaming")
const spotify = new Subscription("Spotify", 1200, "yearly", "music")
const gym = new Subscription("SATS", 150, "weekly", "fitness")

// Organize in collection
const collection = new SubscriptionCollection()
collection.addSubscription(netflix)
collection.addSubscription(spotify)
collection.addSubscription(gym)

// Track usage
netflix.addUsageHours(25)
spotify.addUsageHours(50)
gym.addUsageHours(8)

// Calculate costs
const calculator = new CostCalculator()
const totalMonthly = calculator.calculateTotalMonthlyCost(collection.getAllSubscriptions())
const categoryBreakdown = calculator.calculateCostByCategory(collection.getAllSubscriptions())

// Analyze efficiency  
const analyzer = new UsageAnalyzer()
const inefficient = analyzer.findUnderutilizedSubscriptions(
    collection.getAllSubscriptions(), 
    calculator, 
    20 // 20 kr per hour limit
)

console.log(`Total monthly: ${totalMonthly} kr`)
console.log('Categories:', categoryBreakdown)
console.log(`Inefficient subscriptions: ${inefficient.length}`)
```

### SubscriptionCollection Class

Manage collections of subscriptions.

#### Constructor

```javascript
new SubscriptionCollection()
```

#### Methods

**Collection Management**
```javascript
collection.addSubscription(subscription)     // Add subscription to collection
collection.removeSubscription(subscription)  // Remove subscription, returns true/false, Requires exact object reference
collection.getAllSubscriptions()             // Returns copy of all subscriptions
```

**Filtering and Search**
```javascript
collection.getActiveSubscriptions()              // Returns active subscriptions
collection.getInactiveSubscriptions()            // Returns inactive subscriptions
collection.getSubscriptionsByCategory(category)  // Filter by category
collection.searchSubscriptionsByName(name)       // Case-insensitive partial name search
```

### CostCalculator Class
Calculate subscription costs across different time frequencies.

#### Constructor
```javascript
new CostCalculator()
```

#### Methods

**Individual Cost Calculations**
```javascript
calculator.calculateHourlyCost(subscription)   // Calculate hourly cost from subscription frequency
calculator.calculateWeeklyCost(subscription)   // Calculate weekly cost from subscription frequency
calculator.calculateMonthlyCost(subscription)  // Calculate monthly cost from subscription frequency
calculator.calculateYearlyCost(subscription)   // Calculate yearly cost from subscription frequency
```

**Collection Cost Calculations**
```javascript  
calculator.calculateTotalWeeklyCost(subscriptions)   // Calculate total weekly cost for all active subscriptions
calculator.calculateTotalMonthlyCost(subscriptions)  // Calculate total monthly cost for all active subscriptions
calculator.calculateTotalYearlyCost(subscriptions)   // Calculate total yearly cost for all active subscriptions
calculator.calculateCostByCategory(subscriptions)    // Returns object with monthly costs grouped by category
```

### UsageAnalyzer Class

Analyze subscription usage efficiency and identify cost-inefficient subscriptions.

#### Constructor
```javascript
new UsageAnalyzer()
```

#### Methods
```javascript
analyzer.analyzeCostPerHour(subscription, costCalculator)  // Calculate cost per usage hour
analyzer.findUnderutilizedSubscriptions(subscriptions, costCalculator, maxCostPerHour)  // Find subscriptions exceeding cost limit
```

**Parameters for findUnderutilizedSubscriptions:**
- `subscriptions` (array) - Array of subscription objects to analyze
- `costCalculator` (CostCalculator) - Calculator instance for cost conversions
- `maxCostPerHour` (number) - Maximum acceptable cost per hour limit

**Returns:** Array of objects with `subscription` and `costPerHour` properties


## Requirements

- Node: >=14.0.0
- ES6 module support

## License

MIT

## Contributing

This project is part of a university course (1dv610-L2). Contributions are welcome but please note the academic context.

## Author

Hanna Rubio Vretby <hr222sy@student.lnu.se>