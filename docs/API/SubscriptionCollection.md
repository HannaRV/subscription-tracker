# SubscriptionCollection API

Manage collections of subscriptions with filtering and search capabilities.

## Constructor

```javascript
new SubscriptionCollection()
```

Creates an empty collection of subscriptions.

## Methods

### Collection Management

#### addSubscription(subscription)
```javascript
collection.addSubscription(subscription)
```
Adds a subscription to the collection.

**Parameters:**
- `subscription` (Subscription) - The subscription to add

**Throws:**
- `Error` - "Subscription cannot be null"

#### removeSubscription(subscription)
```javascript
collection.removeSubscription(subscription)  // Returns boolean
```
Removes a subscription from the collection using object reference matching.

**Parameters:**
- `subscription` (Subscription) - The exact subscription object to remove

**Returns:** `boolean` - `true` if removed, `false` if not found

#### getAllSubscriptions()
```javascript
collection.getAllSubscriptions()  // Returns Subscription[]
```
**Returns:** `Subscription[]` - Copy of all subscriptions (protects internal array)

### Filtering

#### getActiveSubscriptions()
```javascript
collection.getActiveSubscriptions()  // Returns Subscription[]
```
**Returns:** `Subscription[]` - Active subscriptions only

#### getInactiveSubscriptions()
```javascript
collection.getInactiveSubscriptions()  // Returns Subscription[]
```
**Returns:** `Subscription[]` - Inactive subscriptions only

#### getSubscriptionsByCategory(category)
```javascript
collection.getSubscriptionsByCategory(category)  // Returns Subscription[]
```
**Parameters:**
- `category` (string) - Category to filter by (exact match)

**Returns:** `Subscription[]` - Subscriptions matching the category

### Search

#### searchSubscriptionsByName(name)
```javascript
collection.searchSubscriptionsByName(name)  // Returns Subscription[]
```
Performs case-insensitive partial name matching.

**Parameters:**
- `name` (string) - Name to search for (partial matches allowed)

**Returns:** `Subscription[]` - Subscriptions with names containing the search term

## Important Notes

- No duplicate prevention, same subscription can be added multiple times
- getAllSubscriptions() returns a copy of the internal array, modifications won't affect the collection
- removeSubscription() requires the exact object reference, creating a new Subscription with same parameters won't work
- Active/inactive filtering reflects current subscription status, deactivating a subscription immediately removes it from getActiveSubscriptions()
- Category filtering uses exact string matching, "Streaming" won't match "streaming"
- Name search is case-insensitive and matches partial strings, "net" will find "Netflix"
- Empty arrays are returned when no matches found, methods never return null

## Example

```javascript
import { Subscription, SubscriptionCollection } from 'subscription-tracker'

const collection = new SubscriptionCollection()
const netflix = new Subscription("Netflix", 139, "monthly", "streaming")
const spotify = new Subscription("Spotify", 1200, "yearly", "music")

// Add subscriptions
collection.addSubscription(netflix)
collection.addSubscription(spotify)

// Filtering
const active = collection.getActiveSubscriptions()        // [netflix, spotify]
const streaming = collection.getSubscriptionsByCategory("streaming")  // [netflix]

// Search (case-insensitive, partial matching)
const netServices = collection.searchSubscriptionsByName("net")        // [netflix]
const allServices = collection.searchSubscriptionsByName("i")          // [netflix, spotify]

// Remove (requires exact object reference)
const removed = collection.removeSubscription(netflix)    // true
const removedAgain = collection.removeSubscription(netflix)  // false (already removed)
```