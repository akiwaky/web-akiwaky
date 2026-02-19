export const MUSIC_CONFIG = {
    // WhatsApp click-to-chat setup
    contact: {
        whatsappNumber: "525500000000", // E.164 without '+'
        defaultMessage: "Hola, me interesa una clase de prueba. Zona: ___. ¿Hay disponibilidad esta semana?",
    },

    // Text configuration for the Landing Page
    pricing: {
        trialPriceAnchor: 500, // MXN
        regularPriceAnchor: 800, // MXN
        rangeDisclaimer: "Varía por duración, zona y horario (te confirmo antes de reservar).",
    },

    // Zone Information
    zones: {
        primary: "Santa Fe y Huixquilucan",
        surchargeLogic: "Aplican cargos por distancia fuera de la zona primaria.",
    },

    // Policies variables
    policies: {
        cancellationHours: 24, // 24 or 48 based on preference
        reschedulingLimit: "1 por mes",
    },

    // n8n Integrations (MVP Placeholders)
    integrations: {
        n8nWebhookUrl: "https://hook.us1.make.com/placeholder-webhook-url",
    }
}
