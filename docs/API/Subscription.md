# Subscription API

Create and manage individual subscription data with validation and usage tracking.

## Constructor

```javascript
new Subscription(name, price, frequency, category = 'other')
```

**Parameters:**
- `name` (string) - Subscription name (required, non-empty)
- `price` (number) - Price amount (≥0)  
- `frequency` (string) - "weekly", "monthly", or "yearly"
- `category` (string) - Category name (optional, defaults to "other")

**Throws:**
- `Error` - "Name must be a non-empty string"
- `Error` - "Price must be 0 or higher" 
- `Error` - "Frequency must be weekly, monthly, or yearly"

## Methods

### Properties
```javascript
subscription.getName()        // Returns string - subscription name
subscription.getPrice()       // Returns number - price amount
subscription.getFrequency()   // Returns string - payment frequency
subscription.getCategory()    // Returns string - category name
```

### Status Management
```javascript
subscription.activate()       // Set as active
subscription.deactivate()     // Set as inactive  
subscription.isActive()       // Returns boolean - active status
```

### Usage Tracking
```javascript
subscription.addUsageHours(hours)  // Add usage hours (must be positive)
subscription.getUsageHours()       // Returns number - total usage hours
```

**Throws (addUsageHours):**
- `Error` - "Usage hours must be positive" if hours ≤ 0

## Example

```javascript
import { Subscription } from 'subscription-tracker'

// Create subscriptions
const netflix = new Subscription("Netflix", 139, "monthly", "streaming")
const spotify = new Subscription("Spotify", 1200, "yearly", "music")

// Manage status
netflix.deactivate()
console.log(netflix.isActive()) // false

// Track usage
netflix.addUsageHours(25)
spotify.addUsageHours(40)

console.log(`${netflix.getName()}: ${netflix.getUsageHours()} hours`)
console.log(`${spotify.getName()} costs ${spotify.getPrice()} kr per ${spotify.getFrequency()}`)
```
## Important Notes

- Category defaults to "other" if not specified - this affects filtering and grouping
- Name validation requires non-empty string - whitespace-only names will throw an error
- Price must be 0 or higher - negative values are not allowed
- Usage hours accumulate over time - there's no reset functionality
- Status changes (activate/deactivate) immediately affect collection filtering results
- Frequency validation is strict - only "weekly", "monthly", "yearly" are accepted