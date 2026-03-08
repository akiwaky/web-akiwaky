// Aki-Chaty configuration — CDMX place discovery bot
// DB IDs are read by n8n workflows at runtime — also kept here for reference

export const chatyConfig = {
    // --- WhatsApp ---
    whatsappNumber: "15551943682", // Meta Test Number (shared with PalNorte for MVP)
    whatsappDisplay: "+1 (555) 194-3682",
    whatsappPrefilledMessage: "Hola Aki-Chaty, recomiéndame un lugar en CDMX",

    // --- Bot Identity ---
    botName: "Aki-Chaty",
    tagline: "Your CDMX place guide, straight in WhatsApp.",
    heroHeadline: "Ask where to go in CDMX.",
    heroSubheadline:
        "Curated picks for coffee, brunch, dinner, and drinks — sent straight to your WhatsApp. No apps, no noise.",

    // --- Notion DB IDs ---
    notionPlacesDbId: "31cf1ccf-f3d3-8191-9b49-c03faa9864dc",
    notionLogDbId: "31cf1ccf-f3d3-81e4-ad0b-fa852f3d7cbd",

    // --- Example prompts shown on landing page ---
    examplePrompts: [
        { label: "Coffee right now", text: "Recomiéndame un café ahorita" },
        { label: "Chill brunch spot", text: "Dame un brunch tranquilo" },
        { label: "Dinner in Roma", text: "Quiero cenar en Roma" },
        { label: "About Café Nin", text: "Dime sobre Café Nin" },
    ],

    // --- How It Works steps ---
    steps: [
        {
            number: "01",
            title: "Open chat",
            description: "Tap the button below to open WhatsApp with Aki-Chaty.",
        },
        {
            number: "02",
            title: "Ask anything",
            description: 'Ask for a vibe, a plan, or "tell me about [place name]".',
        },
        {
            number: "03",
            title: "Get a curated pick",
            description:
                "One grounded recommendation from a hand-curated CDMX knowledge base.",
        },
    ],

    // --- Design colors (Aki-Chaty palette) ---
    colors: {
        primary: "#FF5733",   // Coral-orange — energy, CDMX warmth
        secondary: "#C70039", // Deep red — richness
        accent: "#FFC300",    // Amber-gold — warmth
        waGreen: "#25D366",   // WhatsApp canonical green
    },

    // --- Trust / scope block ---
    scope: [
        "🗺️ CDMX only — no other cities",
        "📚 Curated KB — not real-time internet",
        "🤔 Place not in the list? The bot says so and logs it",
    ],

    // --- FAQ ---
    faqs: [
        {
            q: "What can I ask?",
            a: 'Two things: ask for a place recommendation ("recommend me coffee right now") or ask about a specific place ("tell me about Rosetta Bakery").',
        },
        {
            q: "Does it know all places in CDMX?",
            a: "No — it draws from a curated knowledge base. We add places regularly, but it's not exhaustive.",
        },
        {
            q: "Does it use live internet search?",
            a: "Never. All answers come from the curated KB. That's what keeps it reliable and hallucination-free.",
        },
        {
            q: "What if my place isn't in there?",
            a: "The bot will tell you clearly that it doesn't have that place yet, and the request gets logged so we can add it.",
        },
    ],

    // --- Disclaimer ---
    disclaimer:
        "Aki-Chaty only covers CDMX and uses a curated knowledge base. Info may not reflect the latest changes at each venue.",
};
