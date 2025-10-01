| Namn | Förklaring | Reflektion och regler från Clean Code |
|------|------------|---------------------------------------|
| `SubscriptionCollection`| Klassnamn för att hantera samling av prenumerationer | **Class Names:** Använder substantiv som Clean Code rekommenderar för klasser. **Use Intention-Revealing Names:** Namnet kommunicerar både vad den innehåller (Subscriptions) och hur den organiseras (Collection). Namnet ändrades från 'Manager' till 'Collection' under den här processen för att uppnå just detta.|
| `calculateMonthlyCost(subscription)` | Metodnamn för att beräkna månadskostnad för en prenumeration | **Use Intention-Revealing Names:** Namnet talar om exakt vad metoden gör, både operationen (calculate) och resultatet (MonthlyCost). **Method Names:** Verbet 'calculate' används här för att markera att det är en beräkning, till skillnad från 'get' som vanligtvis används för att hämta ett lagrat värde. **Pick One Word per Concept:** Konsekvent användning av 'calculate' för alla kostnadsberäkningar i klassen CostCalculator. **Use Pronounceable Names:** Lätt att uttala och diskutera. |
| `isActive()` | Metodnamn som returnerar boolean för aktiv status på en subscription| **Method Names:** 'is' markerar att returvärdet är boolean. **Make Meaningful Distinctions:** Skiljer sig från `activate()` som ändrar status, medan `isActive()` bara returnerar den. **Avoid Mental Mapping:** Ingen översättning behövs, namnet talar om vad det returnerar. |
| `searchSubscriptionsByName(name)` | Metodnamn för att söka prenumerationer | **Pick One Word per Concept:** Konsekvent användning av "search" för sökoperationer och "get" för direkthämtning. **Avoid Disinformation:** "search" indikerar sökning tills skillnad från "get" som skulle implicera en exakt matchning. **Add Meaningful Context:** "ByName" förtydligar sökkriteriet men namnet misslyckas med att kommunicera case-insensitive partial matching. JSDoc krävs här för att kompensera för namnets begränsningar. |
| `findUnderutilizedSubscriptions()` | Metodnamn som hittar underutnyttjade prenumerationer | **Use Intention-Revealing Names:** Beskrivande namn med god understandability men längden riskerar att ge sämre readability (modulens längsta namn). Alternativa namn övervägdes men hade lett till förlorad precision. **Use Problem Domain Names:** "Underutilized" använder problemdomänens språk för att beskriva prenumerationer som kostar mycket relativt till användning. |


## Reflektion Kapitel 2: Namngivning
Under utvecklingen av min modul insåg jag tidigt hur viktigt det är att balansera beskrivande namn med läsbarhet. Mitt längsta metodnamn, ’findUnderutilizedSubscriptions()’, är tydligt men med 31 tecken blir det så pass lång att det kan påverka kodflödet negativt. Clean Code betonar att längre namn är bättre än otydliga, men jag inser att det finns en gräns där längden blir kontraproduktiv. Trots längden valde jag att behålla namnet då andra alternativ som ’findExpensiveByUsage()’, förlorade precision i vad metoden faktiskt gör.

Jag har tillämpat ’Use Intention-Revealing Names’ genom hela modulen, vilket gjorde koden överlag självdokumenterande. Jag har även sett till att namn är pronounceable och undviker mental mapping. Namn som ’calculateMonthlyCost()’ är lätt att uttala, förstå och diskutera med kollegor, till skillnad från förkortningar som ’calcMoCost()’. Användaren ska inte behöva översätta eller mappa namn mentalt för att förstå vad de gör. Målet är att hålla koden mer tillgänglig och minska kognitiv belastning.

Ett exempel på namnbyte är klassnamnet ’SubscriptionManager’ som jag ändrade till ’SubscriptionCollection’ då ’Manager’ är för generiskt. ’Collection’ beskriver vad klassen faktiskt gör, hanterar en samling objekt snarare än att ’hantera’ dem i bredare bemärkelse.

En viktig designreflektion var valet mellan getMonthlyCost() och calculateMonthlyCost(). Jag valde ’calculate’ då metoden utför beräkningar och transformationer snarare än att bara returnera ett lagrat värde. Detta följer ’Make Meaningful Distinctions’ där get/calculate indikerar olika typer av operationer för användaren. I Subscription-klassen använder jag begreppet ’Price’ (ex. getPrice() ) för att hänvisa till det faktiska pris som användaren angett, medan CostCalculator använder calculate-metoder för att konvertera detta pris mellan olika tidsfrekvenser (weekly/monthly/yearly). På samma sätt skiljer jag mellan ’search’ (partial matching) och ’get’ (direkt hämtning) i SubscriptionCollection. Jag har varit konsekvent med dessa verb-distinktioner genom hela modulen och undvikit ordlekar eller dubbelmeningar.

Jag har även varit medveten om att balansera problem domain names och solution domain names, begrepp som var helt nya för mig. "Underutilized" i ’findUnderutilizedSubscriptions()’ kommer från problemdomänen och beskriver prenumerationer som kostar mycket relativt till användning. Detta gör metoden begriplig för den som förstår affärsproblemet, medan tekniska namn som ’Collection’ och ’Calculator’ kommer från solution domain och är välkända programmeringskoncept.

Gällande kontext i namn övervägde jag om ’getSubscriptionsByCategory()’ innehåller onödig upprepning av ’Subscriptions’ när metoden redan finns i klassen SubscriptionCollection. Men jag anser att det är en viktig kontext eftersom metoden returnerar Subscription-objekt. Jag undviker däremot gratuitous context genom att inte prefixa metoder med klassnamnet.

Användningen av konstanter som VALID_FREQUENCIES och HOURS_PER_WEEK undviker magiska strängar och nummer enligt ’Use Searchable Names’. Dessa namn är lätta att söka efter i koden och gör den mer underhållbar. Jag använder även JavaScript's moderna # för privata fält istället för äldre konventioner, vilket följer ’Avoid Encodings’ genom att låta språket självt hantera synlighet.

Ett viktigt koncept från föreläsningen är painted types. I min Subscription-klass är ’category’ en painted type, en string utan validering, till skillnad från exempelvis frequency som valideras mot VALID_FREQUENCIES. Detta är ett medvetet designval där jag i modulen prioriterar användaren/utvecklarens flexibilitet att kunna skapa egna kategorier efter sina önskemål och överlåter till användaren att implementera riktiga typer vid behov.



## Tabell 2: Funktioner (Kapitel 3)

De 5 längsta metoderna ur totalt 29 publika metoder. 

| Metodnamn | Länk eller kod | Antal rader (ej ws) | Reflektion |
|-----------|----------------|---------------------|------------|
| `findUnderutilizedSubscriptions()` | | 18 | **Do One Thing:** Metoden bryter mot regeln genom att filtrera, beräkna och bygga resultat. **Förslag:** Dela upp i 3 privata metoder (`#filterUsable`, `#calculateCosts`, `#buildResults`). **Valt:** Behålla for-loop för tydligare flöde av komplex logik.  **Small Functions:** Metoden är nära Clean Code's gräns på max 20 rader, men ändå inom gränsen för vad som är acceptabelt. **Function Arguments:** Triadic vilket är problematiskt enligt Clean Code. Designvalet att inte injicera costCalculator via konstruktorn beror på att inte alla metoder i UsageAnalyzer behöver den och skulle få onödigt beroende. Trade-offen är att denna metod blir triadic, men varje metod är explicit om sina beroenden. **Command Query Separation:** Är en ren query utan sidoeffekter. |
| `calculateHourlyCost()`, `calculateMonthlyCost()`, `calculateYearlyCost()`, `calculateWeeklyCost()` | | 15, 12, 12, 12 | **Do One Thing:** Varje metod har ett tydligt ansvar - konvertera till specifik tidsfrekvens. **Function Arguments:** Monadic vilket är idealt. **Structured Programming:** Använder flera returns istället för en exit point, vilket gör koden plattare och mer lättläst än djupt nästlade if/else-block. **Don't Repeat Yourself:** Duplicerad struktur mellan metoderna men med olika konverteringskunskap. **Förslag:** Extrahera till generisk metod `#convertCost(subscription, targetFrequency)`. **Valt:** Behålla separata metoder eftersom varje innehåller unik konverteringskunskap och en generisk lösning skulle skapa onödig komplexitet. |
| `constructor (Subscription)` | | 11 | **Do One Thing:** Konstruktorn initialiserar och validerar. **Function Arguments:** Polyadic (4 parametrar varav en med default) vilket inte är optimalt. **Förslag:** Configuration object `new Subscription({ name, price, frequency, category })` för att minska till 1 argument. **Valt:** Parameter-lista för enkelhet och tydlig ordning i denna modulstorlek. **Prefer Exceptions to Returning Error Codes:** Följer 'fail fast' genom att validera alla inputs och kastar exceptions före initialisering, vilket säkerställer att systemet endast innehåller giltiga Subscription-objekt. |
| `analyzeCostPerHour()` | | 6 | **Do One Thing:** Gör en sak - analyserar kostnad per timme. **Function Arguments:** Dyadic vilket är acceptabelt. **Förslag:** Injicera costCalculator via konstruktor. **Valt:** Parameter-passing för att hålla UsageAnalyzer oberoende av calculator för metoder som inte behöver den. **Prefer Exceptions to Returning Error Codes:** Kastar exception vid division med noll istället för att returnera felkod. **Command Query Separation:** Ren query utan sidoeffekter. |
| `addUsageHours()` | | 6 | **Do One Thing:** Gör en sak - lägger till timmar med validering. **Function Arguments:** Monadic vilket är idealt. **Command Query Separation:** Är ett command som ändrar state utan att returnera värde, vilket följer CQS korrekt. **Have No Side Effects:** Tack vare det tydliga namnet (`add`) räknas state-förändringen inte som sidoeffekt eftersom metoden gör vad namnet lovar. **Prefer Exceptions to Returning Error Codes:** Kastar exception vid negativa värden istället för att returnera felkod. |


Metoden getMonthlyPrice() kan tyckas bryta mot 'Do One Thing' eftersom den innehåller olika beräkningar. Men jag valde att behålla den eftersom metodens logiska ansvar är en sak: att returnera månadspriset. De olika if-satserna är implementationsdetaljer för att hantera olika frekvenser. Att dela upp metoden skulle göra koden svårare att läsa.


DRY/tydlighet

tests

calculateCosByCategory endast måndasberäkning

analyzeCostPerHour(subscription, costCalculator)  Explicit parameter passing

