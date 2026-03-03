export const DAILY_CONFIG = {
    // The n8n webhook endpoint for the Daily Briefing
    n8nWebhookUrl: 'https://webhooks.akiwaky.cloud/webhook/daily-briefing',

    // Optional timeout in milliseconds for the fetch request
    fetchTimeoutMs: 15000,

    // UI text elements
    ui: {
        pageTitle: 'Daily Briefing',
        buttonInitial: 'Generate',
        buttonLoading: 'Generating...',
        errorFallback: 'There was an issue generating your briefing. Please try again.',
        emptyStateMessage: 'Your custom daily briefing is ready to be compiled.',
    }
};
