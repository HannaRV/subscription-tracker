| Namn | Förklaring | Reflektion och regler från Clean Code |
|------|------------|---------------------------------------|
| `addUsageHours(hours)` | Metodnamn för att lägga till användningstimmar | **Use Intention-Revealing Names:** Namnet avslöjar exakt vad metoden gör. **Method Names:** Använder verb som Clean Code rekommenderar. **Use Searchable Names:** Lätt att söka efter i koden. **Use Pronounceable Names:** Namnet är uttalbart och lätt att diskutera med kollegor ("add usage hours" läses naturligt). |
| `isActive()` | Metodnamn som returnerar boolean för aktiv status | **Method Names:** "is" hintar tydligt att returvärdet är boolean. **Make Meaningful Distinctions:** Skiljer sig klart från `activate()` som är en action. **Avoid Mental Mapping:** Ingen översättning behövs - namnet säger direkt vad det returnerar. |
| `findUnderutilizedSubscriptions()` | Metodnamn som hittar underutnyttjade prenumerationer | **Use Intention-Revealing Names:** Mycket beskrivande men blir långt. **Don't Be Afraid of Long Names:** Längre namn är bättre än otydliga. Problem: Namnet är så långt att det kan påverka läsbarhet negativt. **Use Problem Domain Names:** "Underutilized" använder problemdomänens språk för att beskriva prenumerationer som kostar mycket relativt till användning. |
| `searchSubscriptionsByName(name)` | Metodnamn för att söka prenumerationer efter namn med partiell matchning | **Pick One Word per Concept:** Använder konsekvent "search" för sökoperationer och "get" för direkthämtning (som `getActiveSubscriptions`). **Avoid Disinformation:** "search" indikerar sökning medan "get" skulle implicera exakt matchning. **Add Meaningful Context:** JSDoc behövs för att förklara case-insensitive partial matching som inte framgår av namnet. |
| `VALID_FREQUENCIES` | Klasskonstant för giltiga frekvenser | **Use Intention-Revealing Names:** Tydligt vad konstanten innehåller. **Avoid Magic Numbers:** Ersätter magiska strängar med namngiven konstant. **Use Solution Domain Names:** "VALID" är välkänt i programmering för validering. **Use Pronounceable Names:** Lätt att uttala och diskutera. UPPERCASE följer konvention för konstanter. |




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