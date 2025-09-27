# CostCalculator API

Calculate subscription costs across different time frequencies with automatic conversion between weekly, monthly, and yearly periods.

## Constructor

```javascript
new CostCalculator()
```

Creates a new cost calculator instance. No parameters required.

## Methods

### Individual Cost Calculations

#### calculateHourlyCost(subscription)
```javascript
calculator.calculateHourlyCost(subscription)  // Returns number
```
Converts subscription price to hourly cost regardless of original frequency.

**Parameters:**
- `subscription` (Subscription) - The subscription to calculate cost for

**Returns:** `number` - Cost per hour in same currency unit

**Throws:**
- `Error` - "Subscription cannot be null"

#### calculateWeeklyCost(subscription)
```javascript
calculator.calculateWeeklyCost(subscription)  // Returns number
```
Converts subscription price to weekly cost regardless of original frequency.

**Parameters:**
- `subscription` (Subscription) - The subscription to calculate cost for

**Returns:** `number` - Weekly cost in same currency unit

**Throws:**
- `Error` - "Subscription cannot be null"

#### calculateMonthlyCost(subscription)
```javascript
calculator.calculateMonthlyCost(subscription)  // Returns number
```
Converts subscription price to monthly cost regardless of original frequency.

**Parameters:**
- `subscription` (Subscription) - The subscription to calculate cost for

**Returns:** `number` - Monthly cost in same currency unit

**Throws:**
- `Error` - "Subscription cannot be null"

#### calculateYearlyCost(subscription)
```javascript
calculator.calculateYearlyCost(subscription)  // Returns number
```
Converts subscription price to yearly cost regardless of original frequency.

**Parameters:**
- `subscription` (Subscription) - The subscription to calculate cost for

**Returns:** `number` - Yearly cost in same currency unit

**Throws:**
- `Error` - "Subscription cannot be null"

### Collection Cost Calculations

#### calculateTotalWeeklyCost(subscriptions)
```javascript
calculator.calculateTotalWeeklyCost(subscriptions)  // Returns number
```
Calculates total weekly cost for all active subscriptions in the collection.

**Parameters:**
- `subscriptions` (Subscription[]) - Array of subscriptions to calculate total for

**Returns:** `number` - Sum of weekly costs for active subscriptions only

**Throws:**
- `Error` - "Subscriptions must be an array"

#### calculateTotalMonthlyCost(subscriptions)
```javascript
calculator.calculateTotalMonthlyCost(subscriptions)  // Returns number
```
Calculates total monthly cost for all active subscriptions in the collection.

**Parameters:**
- `subscriptions` (Subscription[]) - Array of subscriptions to calculate total for

**Returns:** `number` - Sum of monthly costs for active subscriptions only

**Throws:**
- `Error` - "Subscriptions must be an array"

#### calculateTotalYearlyCost(subscriptions)
```javascript
calculator.calculateTotalYearlyCost(subscriptions)  // Returns number
```
Calculates total yearly cost for all active subscriptions in the collection.

**Parameters:**
- `subscriptions` (Subscription[]) - Array of subscriptions to calculate total for

**Returns:** `number` - Sum of yearly costs for active subscriptions only

**Throws:**
- `Error` - "Subscriptions must be an array"

### Category Analysis

#### calculateCostByCategory(subscriptions)
```javascript
calculator.calculateCostByCategory(subscriptions)  // Returns object
```
Groups and sums monthly costs by subscription category for active subscriptions only.

**Parameters:**
- `subscriptions` (Subscription[]) - Array of subscriptions to analyze

**Returns:** `object` - Object with category names as keys and monthly costs as values

**Throws:**
- `Error` - "Subscriptions must be an array"

## Important Notes

- Calculations assume standard billing cycles, no handling of promotional periods or variable pricing
- Cost calculations preserve the original currency unit, no currency conversion is performed
- Uses average month lengths (30.44 days) and year lengths (365.25 days) for accurate conversions
- Frequency conversions may introduce minor precision differences due to averaging
- Only active subscriptions are included in total cost calculations, inactive subscriptions are automatically excluded
- Category grouping always returns monthly costs regardless of original subscription frequency
- Null or undefined subscriptions will throw errors, always validate input
- Empty subscription arrays return 0 for totals and empty objects for category breakdowns

## Example

```javascript
import { Subscription, SubscriptionCollection, CostCalculator } from 'subscription-tracker'

const calculator = new CostCalculator()

// Individual calculations
const netflix = new Subscription("Netflix", 139, "monthly", "streaming")
const spotify = new Subscription("Spotify", 1200, "yearly", "music")

console.log(calculator.calculateYearlyCost(netflix))    // 1668 (139 * 12)
console.log(calculator.calculateMonthlyCost(spotify))   // 100 (1200 / 12)

// Collection calculations
const collection = new SubscriptionCollection()
collection.addSubscription(netflix)
collection.addSubscription(spotify)

const subscriptions = collection.getAllSubscriptions()
console.log(calculator.calculateTotalMonthlyCost(subscriptions))  // 239 (139 + 100)

// Category analysis
const categoryBreakdown = calculator.calculateCostByCategory(subscriptions)
console.log(categoryBreakdown)  // { streaming: 139, music: 100 }

// Inactive subscriptions are excluded from totals
netflix.deactivate()
console.log(calculator.calculateTotalMonthlyCost(subscriptions))  // 100 (only Spotify)
```