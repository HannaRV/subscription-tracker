# UsageAnalyzer API

Analyze subscription usage efficiency and identify cost-inefficient subscriptions based on usage patterns.

## Constructor

```javascript
new UsageAnalyzer()
```

Creates a new usage analyzer instance. No parameters required.

## Methods

### Usage Efficiency Analysis

#### analyzeCostPerHour(subscription, costCalculator)
```javascript
analyzer.analyzeCostPerHour(subscription, costCalculator)  // Returns number
```
Calculates the cost per hour of actual usage for a subscription by dividing monthly cost by usage hours.

**Parameters:**
- `subscription` (Subscription) - The subscription to analyze
- `costCalculator` (CostCalculator) - Calculator instance for cost conversions

**Returns:** `number` - Cost per hour in same currency unit (lower = more efficient)

**Throws:**
- `Error` - "Cannot analyze cost per hour: no usage recorded." if usage hours = 0

#### findUnderutilizedSubscriptions(subscriptions, costCalculator, maxCostPerHour)
```javascript
analyzer.findUnderutilizedSubscriptions(subscriptions, costCalculator, maxCostPerHour)  // Returns object[]
```
Identifies subscriptions that exceed a specified maximum cost-per-hour limit, indicating poor usage efficiency.

**Parameters:**
- `subscriptions` (Subscription[]) - Array of subscriptions to analyze
- `costCalculator` (CostCalculator) - Calculator instance for cost conversions
- `maxCostPerHour` (number) - Maximum acceptable cost per hour limit

**Returns:** `object[]` - Array of objects with structure:
```javascript
{
  subscription: Subscription,  // The underutilized subscription
  costPerHour: number         // Its actual cost per hour
}
```

**Throws:**
- `Error` - "Maximum cost per hour must be positive" if maxCostPerHour ≤ 0

**Note:** Only analyzes active subscriptions with usage hours > 0. Inactive subscriptions and those with no recorded usage are automatically excluded.

## Example

```javascript
import { Subscription, SubscriptionCollection, CostCalculator, UsageAnalyzer } from 'subscription-tracker'

const analyzer = new UsageAnalyzer()
const calculator = new CostCalculator()

// Create subscriptions with different usage patterns
const netflix = new Subscription("Netflix", 139, "monthly", "streaming")
const gym = new Subscription("SATS", 150, "weekly", "fitness")

// Add usage data
netflix.addUsageHours(25)  // 25 hours of Netflix usage
gym.addUsageHours(8)       // 8 hours of gym usage

// Analyze individual efficiency
const netflixCost = analyzer.analyzeCostPerHour(netflix, calculator)
const gymCost = analyzer.analyzeCostPerHour(gym, calculator)

console.log(`Netflix: ${netflixCost.toFixed(2)} kr/hour`)  // 5.56 kr/hour (139 / 25)
console.log(`Gym: ${gymCost.toFixed(2)} kr/hour`)         // 81.19 kr/hour (649.5 / 8)

// Find inefficient subscriptions
const collection = new SubscriptionCollection()
collection.addSubscription(netflix)
collection.addSubscription(gym)

const inefficient = analyzer.findUnderutilizedSubscriptions(
    collection.getAllSubscriptions(),
    calculator,
    20  // 20 kr/hour maximum limit
)

console.log(`Found ${inefficient.length} inefficient subscriptions`)
inefficient.forEach(item => {
    console.log(`${item.subscription.getName()}: ${item.costPerHour.toFixed(2)} kr/hour`)
})
// Output: "SATS: 81.19 kr/hour" (exceeds 20 kr/hour threshold)

// Subscriptions without usage are ignored
const spotify = new Subscription("Spotify", 1200, "yearly", "music")
collection.addSubscription(spotify)  // No usage hours added

// This will still only return gym as inefficient (Spotify ignored due to 0 usage)
const stillOnlyGym = analyzer.findUnderutilizedSubscriptions(
    collection.getAllSubscriptions(),
    calculator,
    20
)
```

## Important Notes

- Only active subscriptions with recorded usage hours are analyzed
- Subscriptions with zero usage hours will throw an error when analyzed individually
- The `findUnderutilizedSubscriptions` method automatically filters out subscriptions without usage data
- Cost per hour is calculated using monthly cost divided by total recorded usage hours
- This analysis assumes usage is evenly distributed over time - it doesn't account for seasonal usage patterns