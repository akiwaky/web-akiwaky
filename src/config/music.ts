export const MUSIC_CONFIG = {
    // WhatsApp click-to-chat setup
    contact: {
        whatsappNumber: "52XXXXXXXXXX", // [TBD] Arlet's number
        defaultMessage: "Me contacto desde la página web, me gustaría información sobre:",
    },

    // Text configuration for the Landing Page
    pricing: {
        trialPriceAnchor: null as number | null, // [TBD]
        regularPriceAnchor: null as number | null, // [TBD]
        rangeDisclaimer: "Los precios varían según modalidad y horario. Contáctame para una cotización personalizada.",
    },

    // Zone Information
    zones: {
        primary: "Zona por confirmar",
        surchargeLogic: "",
    },

    // Policies variables
    policies: {
        cancellationHours: 24,
        lateFee: 200, // $200 MXN late payment fee
        paymentDeadlineDay: 6, // Day of month for payment deadline
    },

    // Teacher info (centralized)
    teacher: {
        name: "Arlet",
        fullName: "Arlet", // [TBD: last name]
        yearsExperience: 17,
        school: "Escuela Superior de Música",
    },

    // n8n Integrations
    integrations: {
        n8nWebhookUrl: "https://n8n.akiwaky.cloud/webhook-test/music/test-lead",
    }
}
