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