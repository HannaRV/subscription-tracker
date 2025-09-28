# Test Report - Subscription Tracker

## Test Summary

The Subscription Tracker module has undergone comprehensive testing with **60 test cases achieving 100% success rate**. All core functionality works as expected according to the documented interface requirements: [API documentation](docs/API/).

**Key Results:**
- ✅ All 4 classes (Subscription, SubscriptionCollection, CostCalculator, UsageAnalyzer) fully functional
- ✅ Complete error handling with 9 validation scenarios tested
- ✅ Edge cases and boundary conditions covered
- ✅ No bugs or failed test cases identified

---

## Detailed Testing Documentation

### Testing Overview

The module has been tested through manual testing using a dedicated test application (`test-app/app.js`). Testing covers all public methods in the module's four classes as well as comprehensive error handling. Tests are executed by running `npm start` and observing console output.

**Test Method:** Manual testing with test application  
**Test Data:** Predetermined subscriptions with varied parameters  
**Verification:** Manual observation of console output against expected results  
**Test Execution:** Run `npm start` to execute the complete test suite  
**Test Application:** See [test-app/app.js](test-app/app.js) for complete test implementation

## Test Results

| What was tested | How it was tested | Test result |
|---|---|---|
| **Subscription Class** | | |
| Subscription name property | Verify `netflix.getName()` displays "Netflix" | PASS - Name: Netflix |
| Subscription category property | Verify `netflix.getCategory()` displays "streaming" | PASS - Category: streaming |
| Subscription price property | Verify `netflix.getPrice()` displays 139 kr | PASS - Price: 139 kr |
| Subscription frequency property | Verify `netflix.getFrequency()` displays "monthly" | PASS - Frequency: monthly |
| Monthly subscription creation | Create and display Netflix properties | PASS - Netflix: 139 kr per monthly |
| Yearly subscription creation | Create and display Spotify properties | PASS - Spotify: 1200 kr per yearly |
| Weekly subscription creation | Create and display SATS properties | PASS - SATS: 150 kr per weekly |
| Initial active status | Verify `netflix.isActive()` returns true | PASS - Netflix initial active status is: true |
| Deactivate subscription | Call `netflix.deactivate()` and verify status | PASS - Netflix is now deactivated |
| Activate subscription | Call `netflix.activate()` and verify status | PASS - Netflix is now active |
| Initial usage hours | Verify `netflix.getUsageHours()` returns 0 | PASS - Netflix initial usage: 0 hours |
| Add usage hours | Add 15 hours and verify total | PASS - Netflix after adding 15 hours: 15 hours |
| **SubscriptionCollection Class** | | |
| Add multiple subscriptions | Add 3 subscriptions and verify count | PASS - Total subscriptions: 3 |
| Name search functionality | Search for "netfl" to find Netflix | PASS - Found: Netflix |
| Category filtering | Filter by "streaming" category | PASS - Streaming services: 1 |
| Active subscriptions count | Count active subscriptions | PASS - Active subscriptions: 3 |
| Inactive subscriptions count | Deactivate Spotify and count inactive | PASS - Inactive subscriptions: 1 |
| Inactive subscription identification | Verify which subscription is inactive | PASS - Inactive subscription name: Spotify |
| Remove subscription (before) | Count subscriptions before removal | PASS - Before removal: 3 subscriptions |
| Remove subscription operation | Remove SATS from collection | PASS - Removal successful: true |
| Remove subscription (after) | Count subscriptions after removal | PASS - After removal: 2 subscriptions |
| **CostCalculator Class** | | |
| Netflix hourly cost | Calculate `netflix` hourly cost | PASS - Netflix hourly cost: 0.19026500219010073 kr |
| Spotify hourly cost | Calculate `spotify` hourly cost | PASS - Spotify hourly cost: 0.13689253935660506 kr |
| SATS hourly cost | Calculate `sats` hourly cost | PASS - SATS hourly cost: 0.8928571428571429 kr |
| Netflix weekly cost | Calculate `netflix` weekly cost | PASS - Netflix weekly cost: 32.10161662817552 kr |
| Spotify weekly cost | Calculate `spotify` weekly cost | PASS - Spotify weekly cost: 22.997316979685703 kr |
| SATS weekly cost | Calculate `sats` weekly cost | PASS - SATS weekly cost: 150 kr |
| Netflix monthly cost | Calculate `netflix` monthly cost | PASS - Netflix monthly cost: 139 kr |
| Spotify monthly cost | Calculate `spotify` monthly cost | PASS - Spotify monthly cost: 100 kr |
| SATS monthly cost | Calculate `sats` monthly cost | PASS - SATS monthly cost: 649.5 kr |
| Netflix yearly cost | Calculate `netflix` yearly cost | PASS - Netflix yearly cost: 1668 kr |
| Spotify yearly cost | Calculate `spotify` yearly cost | PASS - Spotify yearly cost: 1200 kr |
| SATS yearly cost | Calculate `sats` yearly cost | PASS - SATS yearly cost: 7827 kr |
| Total weekly cost | Sum all subscriptions weekly costs | PASS - Total weekly cost: 205.09893360786123 kr |
| Total monthly cost | Sum all subscriptions monthly costs | PASS - Total monthly cost: 888.5 kr |
| Total yearly cost | Sum all subscriptions yearly costs | PASS - Total yearly cost: 10695 kr |
| Category cost breakdown | Group costs by category | PASS - { streaming: 307, music: 209, fitness: 1515.5 } |
| Streaming category total | Verify streaming costs calculation | PASS - Streaming costs: 307 kr/month |
| Music category total | Verify music costs calculation | PASS - Music costs: 209 kr/month |
| Fitness category total | Verify fitness costs calculation | PASS - Fitness costs: 1515.5 kr/month |
| Category costs after deactivation | Deactivate Apple Music and recalculate | PASS - Music costs after deactivation: 100 kr/month |
| **UsageAnalyzer Class** | | |
| Spotify cost per hour | Calculate cost per hour for Spotify (20h usage) | PASS - Spotify cost per hour: 5.00 kr/hour |
| SATS cost per hour | Calculate cost per hour for SATS (8h usage) | PASS - SATS cost per hour: 81.19 kr/hour |
| HBO Max cost per hour | Calculate cost per hour for HBO Max (25h usage) | PASS - HBO Max cost per hour: 4.36 kr/hour |
| Find underutilized subscriptions | Search for subscriptions > 15 kr/hour limit | PASS - Found 1 underutilized subscriptions |
| Identify specific underutilized | Verify which subscription is underutilized | PASS - SATS: 81.19 kr/hour |
| Count total subscriptions | Count all subscriptions before unused test | PASS - Total subscriptions: 9 |
| Find unused subscriptions count | Count subscriptions with 0 usage | PASS - Found 4 completely unused subscriptions |
| Apple TV+ unused verification | Verify Apple TV+ has 0 usage | PASS - Apple TV+: 0 hours usage |
| Yoga Pass unused verification | Verify Yoga Pass has 0 usage | PASS - Yoga Pass: 0 hours usage |
| Disney+ unused verification | Verify Disney+ has 0 usage | PASS - Disney+: 0 hours usage |
| Audible unused verification | Verify Audible has 0 usage | PASS - Audible: 0 hours usage |
| Used subscription exclusion | Verify Netflix (15h) not in unused list | PASS - Netflix (15 hours) should NOT be in unused list |
| Netflix exclusion verification | Confirm Netflix not flagged as unused | PASS - Netflix in unused list: false |
| **Error Handling** | | |
| Empty subscription name | Create subscription with empty string name | PASS - Error caught: "Name must be a non-empty string" |
| Negative price | Create subscription with price -50 | PASS - Error caught: "Price must be 0 or higher" |
| Invalid frequency | Create subscription with frequency "daily" | PASS - Error caught: "Frequency must be weekly, monthly, or yearly" |
| Negative usage hours | Add -5 hours to subscription | PASS - Error caught: "Usage hours must be positive" |
| Null subscription in collection | Add null to collection | PASS - Error caught: "Subscription cannot be null" |
| Null subscription in calculator | Calculate cost with null subscription | PASS - Error caught: "Subscription cannot be null" |
| Invalid array in calculator | Pass string instead of array to total cost calculation | PASS - Error caught: "Subscriptions must be an array" |
| Invalid maxCostPerHour | Use -5 as max cost per hour limit | PASS - Error caught: "Maximum cost per hour must be positive" |
| Zero usage analysis | Analyze cost per hour for subscription with 0 hours | PASS - Error caught: "Cannot analyze cost per hour: no usage recorded." |
| **Edge Cases** | | |
| Search for non-existent service | Search collection for "nonexistentservice" | PASS - Search results: 0 results |
| Remove non-existent subscription | Remove subscription not in collection | PASS - Remove result: false |
| Empty collection size | Create empty collection and test size | PASS - Empty collection size: 0 |
| Empty collection active count | Test getActiveSubscriptions() on empty collection | PASS - Active in empty collection: 0 |
| Empty collection cost calculation | Calculate total monthly cost for empty collection | PASS - Total monthly cost: 0 kr |