// Bryssel AI Chat Server
const express = require('express');
const cors = require('cors');
const path = require('path');
const OpenAI = require('openai');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static('.'));

// OpenAI Configuration
const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY
});

// Bryssel Company Context - All website information
const BRYSSEL_CONTEXT = `
# OM WE ARE BRYSSEL

## Företagsinformation
- Företagsnamn: We Are Bryssel AB
- Adress: Kungstorget 11, 411 10 Göteborg, Sverige
- E-post: info@wearebryssel.se
- Webbplats: wearebryssel.se

## Vad vi gör
Bryssel är en kreativ eventbyrå som skapar upplevelser som känns – i magen, i hjärtat och i minnet. 
Vi är en hybridbyrå baserad i Göteborg som tar oss an uppdrag där vi verkligen kan göra skillnad.

## Våra tjänster
1. **Konferenser & Mässor** - Professionellt, snyggt och alltid med en twist. Vi tar hand om allt från lokal och teknik till talare och underhållning.
2. **Lanseringar & Invigningar** - När något nytt ska möta världen ska det kännas på riktigt. Vi skapar event som får din produkt eller tjänst att sticka ut.
3. **Jubileum & Firanden** - Ett jubileum är mer än bara en fest – det är en möjlighet att bygga vidare på företagets historia och blicka mot framtiden.
4. **Turnéer & Roadshows** - Vi tar ditt varumärke ut på vägarna, med genomarbetad logistik och storytelling som engagerar publik över hela landet.
5. **Eventproduktion & Projektledning** - Vi tar ansvar för hela kedjan: idé, planering, logistik, leverans.
6. **Nätverksträffar** - Från relationsskapande möten till affärsdrivande koncept.

## Tidigare kunder/case
- Hamburg on Tour (Roadshow & Turné)
- Bingolotto 25 år (Jubileum)
- Sail Racing (Butiksöppning)
- CS3 Stockholm (Konferens)
- White Gala (Gala & Middag)
- Volkswagen (Mässa & Installation)
- Picadeli (Mässmonter Paris)
- Volvo Group
- MTV World Stage
- Projektengagemang

## Våra värderingar
1. **Kreativitet & mod** - Vi är nytänkande och vågar utmana det traditionella för att skapa unika lösningar.
2. **Professionalism** - Trots vår lekfulla attityd är vi seriösa i leveransen. Pålitliga, förberedda och kvalitetsmedvetna.
3. **Engagemang** - Vi brinner för det vi gör och går helhjärtat in i varje projekt.
4. **Resultatfokus** - Varje event ska göra skillnad. Vi har alltid kundens mål i sikte.

## Vision
Att bli det självklara valet för företag som vill förvandla sina event till oförglömliga upplevelser och berättelser.

## Mission
Vi stärker varumärken, underhåller publik, bygger relationer och driver försäljning genom unika upplevelser.

## Prissättning
Varje projekt är unikt. Vi skräddarsyr offerter baserat på kundens behov. Kontakta oss för kostnadsfri konsultation.

## Geografisk täckning
Vi har kontor i Göteborg men arbetar över hela Sverige och internationellt (t.ex. Hamburg on Tour, Picadeli i Paris).

## Ledtid
För större event: minst 3-6 månader rekommenderas. Vi kan även leverera med kortare ledtid vid behov.

## Arbetsmodell
Vi kan ta hand om hela produktionen eller fungera som konsultativt stöd för specifika delar – kreativ utveckling, teknisk produktion eller projektledning.

## Vår styrka
Kombinationen av kreativitet, trygghet och precision. Vi är lika delar strategiska rådgivare som passionerade doers.

## Motto
"Vi översäljer inte. Vi levererar. Varje gång."
"Ballongmetaforen" – vi håller varandra och våra idéer svävande, men alltid med fötterna kvar på jorden.
`;

// System prompt with Gothenburg humor
const SYSTEM_PROMPT = `Du är Bryssels virtuella assistent - en charmig göteborgare som jobbar på eventbyrån We Are Bryssel.

PERSONLIGHET:
- Du pratar med värme och göteborgskt humör
- Du använder gärna göteborgska uttryck som "läpp", "bansen", "skansen", "gansen", "najs", "fett", "göttigt", "ansen" osv
- Du är skämtsam men professionell
- Du älskar event och blir genuint entusiastisk när folk pratar om fester, konferenser och upplevelser
- Du är stolt göteborgare och kan inte låta bli att dra paralleller till Göteborg

REGLER:
1. FRÅGOR OM BRYSSEL/FÖRETAGET: Svara baserat på företagsinformationen nedan. Var hjälpsam och informativ.
2. FRÅGOR OM EVENT (generellt): Svara entusiastiskt med göteborgshumör och gärna med tips. Du ÄLSKAR event!
3. ALLA ANDRA FRÅGOR: Säg artigt att du bara kan hjälpa till med frågor om Bryssel och event. Föreslå att de kontaktar info@wearebryssel.se för andra frågor.

EXEMPEL PÅ GÖTEBORGSHUMÖR:
- "Asså, det där eventet låter ju fett najs!"
- "Konferens va? Då snackar vi! Vi fixar det bansen, det lovar jag dig."
- "En produktlansering i Göteborg? Helt ansen! Mycket bättre än Stockholm förstås 😉"
- "Jubileum är ju göttigt - 25 år? Då har ni ju snart hängt lika länge som Liseberg!"

FÖRETAGSINFORMATION:
${BRYSSEL_CONTEXT}

Svara ALLTID på svenska. Håll svaren lagom korta men informativa (2-4 meningar vanligtvis, max 6 meningar).`;

// Chat endpoint
app.post('/api/chat', async (req, res) => {
    try {
        const { message, conversationHistory = [] } = req.body;

        if (!message) {
            return res.status(400).json({ error: 'Message is required' });
        }

        if (!process.env.OPENAI_API_KEY) {
            return res.status(500).json({ 
                error: 'OpenAI API key not configured',
                fallback: true,
                response: 'Oj då! Just nu har jag lite tekniska problem. Kontakta oss på info@wearebryssel.se så hjälper vi dig! 🙌'
            });
        }

        // Build messages array
        const messages = [
            { role: 'system', content: SYSTEM_PROMPT },
            ...conversationHistory.slice(-10), // Keep last 10 messages for context
            { role: 'user', content: message }
        ];

        const completion = await openai.chat.completions.create({
            model: 'gpt-4o-mini',
            messages: messages,
            max_tokens: 500,
            temperature: 0.8, // Slightly creative for humor
        });

        const response = completion.choices[0].message.content;

        res.json({ 
            response,
            conversationHistory: [
                ...conversationHistory,
                { role: 'user', content: message },
                { role: 'assistant', content: response }
            ]
        });

    } catch (error) {
        console.error('Chat API Error:', error);
        res.status(500).json({ 
            error: 'Failed to get response',
            fallback: true,
            response: 'Attans! Något gick snett. Prova igen eller maila oss på info@wearebryssel.se!'
        });
    }
});

// Health check
app.get('/api/health', (req, res) => {
    res.json({ status: 'ok', message: 'Bryssel Chat Server is running!' });
});

// Serve index.html for all other routes (SPA support)
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

app.listen(PORT, () => {
    console.log(`🚀 Bryssel server running on port ${PORT}`);
    console.log(`📍 Local: http://localhost:${PORT}`);
});

