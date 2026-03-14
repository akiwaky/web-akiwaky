// Aki WhatsApp Hub — multi-assistant config
// All assistants share one WhatsApp number; hashtags route to the right bot.
// Main n8n workflow: MyWAtest

export const chatyConfig = {
    // --- Shared WhatsApp ---
    whatsappNumber: "15551943682", // Meta Test Number
    whatsappDisplay: "+1 (555) 194-3682",

    // --- Hub identity ---
    hubName: "Aki WhatsApp Hub",
    tagline: "Three AI assistants. One WhatsApp number.",
    heroHeadline: "Your WhatsApp-native AI assistants.",
    heroSubheadline:
        "Text one number, pick an assistant with a hashtag. No apps, no noise.",

    // --- Assistants ---
    assistants: [
        {
            id: "aki-chaty",
            name: "Aki-Chaty",
            hashtag: null, // default — no hashtag needed
            tagline: "Your CDMX place guide",
            description:
                "Curated picks for coffee, brunch, dinner, and drinks. Grounded in a real knowledge base — no made-up facts.",
            color: "#FF5733",
            icon: "MapPin",
            prefilledMessage: "Hola Aki-Chaty, recomiéndame un lugar en CDMX",
            examplePrompts: [
                { label: "Coffee right now", text: "Recomiéndame un café ahorita" },
                { label: "Chill brunch spot", text: "Dame un brunch tranquilo" },
                { label: "Dinner in Roma", text: "Quiero cenar en Roma" },
                { label: "About Café Nin", text: "Dime sobre Café Nin" },
            ],
            image: null,
        },
        {
            id: "minerva",
            name: "Minerva",
            hashtag: "#Minerva",
            tagline: "Music admin assistant",
            description:
                "Helps with piano lesson scheduling, student inquiries, and music teaching logistics. Your backstage admin for music operations.",
            color: "#8B5CF6",
            icon: "Music",
            prefilledMessage: "#Minerva Hola, necesito ayuda con una clase",
            examplePrompts: [
                { label: "Schedule a lesson", text: "#Minerva Quiero agendar una clase de prueba" },
                { label: "Check availability", text: "#Minerva ¿Hay disponibilidad esta semana?" },
            ],
            image: "/music-assets/hands-on-keys.png",
        },
        {
            id: "norte",
            name: "CompaBot",
            hashtag: "#Norte",
            tagline: "Pal Norte festival companion",
            description:
                "AI assistant for Pal Norte festival activities — group meetups, VIP benefits, lost & found. Text-only, low bandwidth.",
            color: "#25D366",
            icon: "Ticket",
            prefilledMessage: "#Norte help",
            examplePrompts: [
                { label: "VIP benefits", text: "#Norte benefits" },
                { label: "Find my group", text: "#Norte status" },
            ],
            image: null,
        },
    ],

    // --- Notion DB IDs ---
    // These are consumed by n8n at runtime; stored here for reference only.
    // Override via NEXT_PUBLIC_CHATY_NOTION_PLACES_DB_ID / NEXT_PUBLIC_CHATY_NOTION_LOG_DB_ID in .env.local
    notionPlacesDbId: process.env.NEXT_PUBLIC_CHATY_NOTION_PLACES_DB_ID ?? "31cf1ccf-f3d3-8191-9b49-c03faa9864dc",
    notionLogDbId: process.env.NEXT_PUBLIC_CHATY_NOTION_LOG_DB_ID ?? "31cf1ccf-f3d3-81e4-ad0b-fa852f3d7cbd",

    // --- How It Works steps ---
    steps: [
        {
            number: "01",
            title: "Open WhatsApp",
            description: "Tap the button to open a chat with our shared number.",
        },
        {
            number: "02",
            title: "Pick your assistant",
            description:
                "Start with a hashtag (#Minerva, #Norte) or just chat for Aki-Chaty — the default.",
        },
        {
            number: "03",
            title: "Get a reply",
            description:
                "Each assistant draws from its own curated knowledge base. No hallucinations.",
        },
    ],

    // --- Design colors ---
    colors: {
        primary: "#FF5733",
        secondary: "#C70039",
        accent: "#FFC300",
        waGreen: "#25D366",
    },

    // --- Trust / scope ---
    scope: [
        "All assistants run on the same WhatsApp number",
        "Each has a separate knowledge base — no cross-contamination",
        "Use a hashtag to switch. No hashtag = Aki-Chaty (CDMX guide)",
    ],

    // --- FAQ ---
    faqs: [
        {
            q: "How do I switch between assistants?",
            a: "Start your message with a hashtag: #Minerva for music admin, #Norte for Pal Norte. Without a hashtag, you talk to Aki-Chaty (CDMX guide).",
        },
        {
            q: "Is this the same phone number for all three?",
            a: "Yes — one number, three assistants. The hashtag routes your message to the right one.",
        },
        {
            q: "What can Aki-Chaty do?",
            a: 'Two things: recommend a place ("recommend me coffee right now") or tell you about a specific place ("tell me about Rosetta Bakery"). CDMX only.',
        },
        {
            q: "Does it use live internet search?",
            a: "Never. All answers come from curated knowledge bases. That keeps it reliable and hallucination-free.",
        },
    ],

    // --- Disclaimer ---
    disclaimer:
        "All assistants use curated knowledge bases. Information may not reflect the latest real-world changes.",
};
