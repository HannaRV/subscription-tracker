| Namn | Förklaring | Reflektion och regler från Clean Code |
|------|------------|---------------------------------------|
| `SubscriptionCollection`| Klassnamn för att hantera samling av prenumerationer | **Class Names:** Använder substantiv som Clean Code rekommenderar för klasser. **Use Intention-Revealing Names:** Namnet kommunicerar både vad den innehåller (Subscriptions) och hur den organiseras (Collection). Namnet ändrades från 'Manager' till 'Collection' under den här processen för att uppnå just detta.|

| `calculateMonthlyCost(subscription)` | Metodnamn för att beräkna månadskostnad för en prenumeration | **Use Intention-Revealing Names:** Namnet avslöjar exakt vad metoden gör, både operationen (calculate) och resultatet (MonthlyCost). **Method Names:** Verbet 'calculate' används här för att markera att det är en beräkning, till skillnad från 'get' som vanligtvis används för att hämta ett lagrat värde. **Pick One Word per Concept:** Konsekvent användning av 'calculate' för alla kostnadsberäkningar i klassen CostCalculator. **Use Pronounceable Names:** Lätt att uttala och diskutera. |

| `isActive()` | Metodnamn som returnerar boolean för aktiv status på en subscription| **Method Names:** 'is' markerar att returvärdet är boolean. **Make Meaningful Distinctions:** Skiljer sig från `activate()` som ändrar status, medan `isActive()` bara returnerar den. **Avoid Mental Mapping:** Ingen översättning behövs, namnet talar om vad det returnerar. |

| `searchSubscriptionsByName(name)` | Metodnamn för att söka prenumerationer | **Pick One Word per Concept:** Konsekvent användning av "search" för sökoperationer och "get" för direkthämtning. **Avoid Disinformation:** "search" indikerar sökning tills skillnad från "get" som skulle implicera en exakt matchning. **Add Meaningful Context:** "ByName" förtydligar sökkriteriet men namnet misslyckas med att kommunicera case-insensitive partial matching. JSDoc krävs här för att kompensera för namnets begränsningar. |

| `findUnderutilizedSubscriptions()` | Metodnamn som hittar underutnyttjade prenumerationer | **Use Intention-Revealing Names:** Beskrivande namn med god understandability men längden riskerar att ge sämre readability (modulens längsta namn). Alternativa namn övervägdes men hade lett till förlorad precision. **Use Problem Domain Names:** "Underutilized" använder problemdomänens språk för att beskriva prenumerationer som kostar mycket relativt till användning. |





## Tabell 2: Funktioner (Kapitel 3)

De 5 längsta metoderna ur totalt 29 publika metoder. 

| Metodnamn | Länk eller kod | Antal rader (ej ws) | Reflektion |
|-----------|----------------|---------------------|------------|
| `findUnderutilizedSubscriptions()` | | 18 | **Do One Thing:** Metoden bryter mot denna regel genom att validera, filtrera och beräkna. Kunde delas upp i privata hjälpmetoder för att följa principen strikt men for-loopen gör den komplexa logiken tydligare än vad en uppdelning hade gjort. **Small Functions:** Med 18 rader är metoden nära Clean Code's gräns på max 20 rader, men ändå inom gränsen för vad som är acceptabelt. **Function Arguments:** Triadic vilket är problematiskt enligt Clean Code. **Command Query Separation:** Är en ren query utan sidoeffekter. Designvalet prioriterar läsbarhet över 'Do One Thing'. |

| `calculateHourlyCost()`, `calculateMonthlyCost()`, `calculateYearlyCost()`, `calculateWeeklyCost()` | | 15, 12, 12, 12 | **Do One Thing:** Varje metod har ett tydligt ansvar - konvertera till specifik tidsfrekvens. **Function Arguments:** Monadic vilket är idealt. **Structured Programming:** Tidiga returns i if-satser bryter mot en exit point men undviker djup nästling av if/else-block vilket gör koden mer läsbar. **Don't Repeat Yourself:** Duplicerad struktur mellan metoderna men med olika konverteringskunskap. Att extrahera till en generisk metod skulle göra koden mer komplex utan att tillföra värde. |

| `constructor (Subscription)` | | 11 | **Do One Thing:** Konstruktorn initialiserar och validerar. **Function Arguments:** Polyadic (4 parametrar varav en med default) vilket inte är optimalt. **Prefer Exceptions to Returning Error Codes:** Följer 'fail fast' genom att validera alla inputs och kastar exceptions före initialisering, vilket säkerställer att systemet endast innehåller giltiga Subscription-objekt. |

| `analyzeCostPerHour()` | | 6 | **Do One Thing:** Gör en sak - analyserar kostnad per timme. **Function Arguments:** Dyadic vilket är acceptabelt. Designvalet att ta costCalculator som parameter istället för via konstruktor gör beroenden synliga i metodsignaturen. **Prefer Exceptions to Returning Error Codes:** Kastar exception vid division med noll istället för att returnera felkod. **Command Query Separation:** Ren query utan sidoeffekter. |

| `addUsageHours()` | | 6 | **Do One Thing:** Gör en sak - lägger till timmar med validering. **Function Arguments:** Monadic vilket är idealt. **Command Query Separation:** Är ett command som ändrar state utan att returnera värde, vilket följer CQS korrekt. **Have No Side Effects:** Tack vare det tydliga namnet (`add`) räknas state-förändringen inte som sidoeffekt eftersom metoden gör vad namnet lovar. **Prefer Exceptions to Returning Error Codes:** Kastar exception vid negativa värden istället för att returnera felkod. |


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