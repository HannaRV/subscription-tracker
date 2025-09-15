/**
 * @file Test application for subscription-tracker module.
 * @module test-app/app
 * @author Hanna Rubio Vretby <hr222sy@student.lnu.se>
 * @version 1.0.0
 * @description Demonstrates and tests the functionality of the subscription tracker module.
 */

import { Subscription } from "../src/Subscription.js"

console.log ('=== Testing Subscription Class ===')

//Test basic functionality
const netflix = new Subscription("Netflix", 139, "monthly")
console.log(`${netflix.name}: ${netflix.getMonthlyPrice()} kr/month`)

//Test yearly conversion
const spotify = new Subscription("Spotify", 1200, "yearly")
console.log(`${spotify.name}: ${spotify.getMonthlyPrice()} kr/month`)