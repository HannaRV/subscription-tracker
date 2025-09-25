# Subscription Tracker

A JavaScript module for managing and analyzing personal subscriptions.

## Installation

```bash
# Installation will be available when published to npm
git clone https://github.com/username/subscription-tracker
```

## Quick Start

```javascript
import { Subscription, SubscriptionCollection } from 'subscription-tracker'

const netflix = new Subscription("Netflix", 139, "monthly", "streaming")
const manager = new SubscriptionCollection()
manager.addSubscription(netflix)
```

## Features

- Subscription data management with validation
- Frequency conversion (weekly/monthly/yearly) (via Cost Calculator, coming soon)
- Category support
- Active/inactive status tracking
- Usage tracking
- Subscription collection management
- Cost analysis and reporting (coming soon)
- Usage efficiency analysis (via UsageAnalyzer, coming soon)
- Subscription optimization recommendations (via SubscriptionOptimizer, coming soon)

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
import { Subscription, SubscriptionCollection } from 'subscription-tracker'

// Create subscriptions
const netflix = new Subscription("Netflix", 139, "monthly", "streaming")
const spotify = new Subscription("Spotify", 1200, "yearly", "music")

// Manage collection
const manager = new SubscriptionCollection()
manager.addSubscription(netflix)
manager.addSubscription(spotify)

// Track usage
netflix.addUsageHours(15);
console.log(netflix.getUsageHours()) //15

// Manage status
netflix.deactivate();
console.log(netflix.isActive()); // false
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
manager.addSubscription(subscription)     // Add subscription to collection
manager.removeSubscription(subscription)  // Remove subscription, returns true/false, Requires exact object reference
manager.getAllSubscriptions()             // Returns copy of all subscriptions
```

**Filtering and Search**
```javascript
manager.getActiveSubscriptions()              // Returns active subscriptions
manager.getInactiveSubscriptions()            // Returns inactive subscriptions
manager.getSubscriptionsByCategory(category)  // Filter by category
manager.searchSubscriptionsByName(name)       // Case-insensitive partial name search
```

### CostCalculator Class (Coming Soon)

Calculate and analyze subscription costs across different frequencies.

### UsageAnalyzer Class (Coming Soon)

Analyze subscription usage efficiency and cost-per-hour metrics.


## Requirements

- Node: >=14.0.0
- ES6 module support

## License

MIT

## Contributing

This project is part of a university course (1dv610-L2). Contributions are welcome but please note the academic context.

## Author

Hanna Rubio Vretby <hr222sy@student.lnu.se>