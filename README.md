# Subscription Tracker

A JavaScript module for managing and analyzing personal subscriptions.

## Installation

```bash
npm install subscription-tracker
```

## Quick Start

```javascript
import { Subscription } from 'subscription-tracker';

const netflix = new Subscription("Netflix", 139, "monthly", "streaming");
console.log(netflix.getMonthlyPrice()); // 139
```

## Features

- Subscription management with validation
- Frequency conversion (weekly/monthly/yearly)  
- Category support
- Active/inactive status tracking
- Usage tracking with cost-per-hour analysis
- Subscription collection management (coming soon)
- Cost analysis and reporting (coming soon)

## API Reference

### Subscription Class

#### Constructor
```javascript
new Subscription(name, price, frequency, category)
```

**Parameters:**
- `name` (string) - Name of the subscription
- `price` (number) - Price amount
- `frequency` (string) - "weekly", "monthly", or "yearly"
- `category` (string, optional) - Category name, defaults to "other"

#### Methods

**getMonthlyPrice()**
```javascript
subscription.getMonthlyPrice() // Returns monthly cost
```

**Active/Inactive Status**
```javascript
subscription.activate()         // Set as active
subscription.deactivate()       // Set as inactive
subscription.getActiveStatus()  // Returns true/false
```

**Usage Tracking**
```javascript
subscription.addUsage(hours)        // Add usage hours
subscription.getUsageHours()        // Get total usage
subscription.getCostPerHour()       // Calculate cost per hour
```

## Example Usage

```javascript
import { Subscription } from 'subscription-tracker';

// Create subscriptions
const netflix = new Subscription("Netflix", 139, "monthly", "streaming");
const spotify = new Subscription("Spotify", 1200, "yearly", "music");
const gym = new Subscription("SATS", 150, "weekly", "fitness");

// Check monthly costs
console.log(netflix.getMonthlyPrice()); // 139
console.log(spotify.getMonthlyPrice()); // 100
console.log(gym.getMonthlyPrice());     // 649.5

// Track usage
netflix.addUsage(15);
console.log(netflix.getCostPerHour()); // 9.27

// Manage status
netflix.deactivate();
console.log(netflix.getActiveStatus()); // false
```

## License

MIT

## Contributing

This project is part of a university course (1dv610-L2). 

## Author

Hanna Rubio Vretby <hr222sy@student.lnu.se>