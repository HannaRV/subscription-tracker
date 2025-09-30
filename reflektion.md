| Namn | Förklaring | Reflektion och regler från Clean Code |
|------|------------|---------------------------------------|
| `SubscriptionCollection`| Klassnamn för att hantera samling av prenumerationer | **Class Names:** Använder substantiv som Clean Code rekommenderar för klasser. **Use Intention-Revealing Names:** Namnet kommunicerar både vad den innehåller (Subscriptions) och hur den organiseras (Collection). Namnet ändrades från 'Manager' till 'Collection' under den här processen för att uppnå just detta.|

| `calculateMonthlyCost(subscription)` | Metodnamn för att beräkna månadskostnad för en prenumeration | **Use Intention-Revealing Names:** Namnet avslöjar exakt vad metoden gör, både operationen (calculate) och resultatet (MonthlyCost). **Method Names:** Verbet 'calculate' används här för att markera att det är en beräkning, till skillnad från 'get' som vanligtvis används för att hämta ett lagrat värde. **Pick One Word per Concept:** Konsekvent användning av 'calculate' för alla kostnadsberäkningar i klassen CostCalculator. **Use Pronounceable Names:** Lätt att uttala och diskutera. |

| `isActive()` | Metodnamn som returnerar boolean för aktiv status på en subscription| **Method Names:** 'is' markerar att returvärdet är boolean. **Make Meaningful Distinctions:** Skiljer sig från `activate()` som ändrar status, medan `isActive()` bara returnerar den. **Avoid Mental Mapping:** Ingen översättning behövs, namnet talar om vad det returnerar. |

| `searchSubscriptionsByName(name)` | Metodnamn för att söka prenumerationer utifrån namn med partiell matchning | **Pick One Word per Concept:** Använder konsekvent "search" för sökoperationer och 'get' för direkthämtning (som `getActiveSubscriptions`). **Avoid Disinformation:** 'search' indikerar sökning medan 'get' skulle implicera exakt matchning. **Add Meaningful Context:** Tillgägget 'ByName' gör namnet mer specifikt, men JSDoc krävs ändå har för att förklara den case-insensitive partial matchingen som utförs och inte framgår av namnet. |

| `findUnderutilizedSubscriptions()` | Metodnamn som hittar underutnyttjade prenumerationer | **Use Intention-Revealing Names:** Beskrivande namn med god understandability men längden riskerar att ge sämre readability (modulens längsta namn). Alternativa namn övervägdes men hade lett till förlorad precision. **Use Problem Domain Names:** "Underutilized" använder problemdomänens språk för att beskriva prenumerationer som kostar mycket relativt till användning. |





Metoden getMonthlyPrice() kan tyckas bryta mot 'Do One Thing' eftersom den innehåller olika beräkningar. Men jag valde att behålla den eftersom metodens logiska ansvar är en sak: att returnera månadspriset. De olika if-satserna är implementationsdetaljer för att hantera olika frekvenser. Att dela upp metoden skulle göra koden svårare att läsa.

cost/price

DRY/tydlighet

tests

calculateCosByCategory endast måndasberäkning

analyzeCostPerHour(subscription, costCalculator)  Explicit parameter passing

alternativ Dependency injection via constructor
Nuvarande design följer "Explicit is better than implicit" där metoden tydligt visar vad den behöver för att fungera. Detta stödjer Command Query Separation genom att göra dependencies synliga i metodsignaturen.
Dependency injection skulle följa "Dependency Inversion Principle" men introducerar komplexitet för användaren som måste förstå och hantera objekt-dependencies.
För en modul av denna storlek prioriterar jag användarens enkelhet över arkitektonisk perfektionism. Den explicita approachen gör koden mer självdokumenterande och minskar risk för fel användning.
Detta är en trade-off mellan olika Clean Code-principer, vilken princip som är viktigast för det specifika användningsfallet.

Make meningful distinctions get/search


SubscriptionManager ändrat till Subscriptioncollection intention reveling names

I CostCalculator upprepas if/else-logik i flera beräkningsmetoder som byter mot DRY. Jag övervägde olika lösningar men samtliga kändes som over-engineering för den här modulen. Istället valde jag enkla lokala variabler för att undvika dubbelanrop av getter-metoder. Det är inte den mest eleganta lösningen, men den fungerar och är lätt att förstå för andra utvecklare. Här har jag valt pragmatisk kod framför perfekt clean code."