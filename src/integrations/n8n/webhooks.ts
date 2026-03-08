import { MUSIC_CONFIG } from "@/config/music";
import { DAILY_CONFIG } from "@/config/daily";

/**
 * n8n Webhook: Captures leads from the /music landing page
 */
export async function submitMusicLead(data: {
    name: string | null;
    whatsapp: string | null;
    zone: string | null;
    times: string | null;
    timestamp: string;
    source: string;
}): Promise<boolean> {

    // For MVP placeholder, we just mock success if URL is placeholder
    if (MUSIC_CONFIG.integrations.n8nWebhookUrl.includes("placeholder")) {
        await new Promise(r => setTimeout(r, 1000));
        return true;
    }

    const res = await fetch(MUSIC_CONFIG.integrations.n8nWebhookUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data)
    });

    if (!res.ok) throw new Error("Network response was not ok");

    return true;
}

/**
 * n8n Webhook: Generates the daily briefing HTML
 */
export async function getDailyBriefing(signal: AbortSignal) {
    const response = await fetch(DAILY_CONFIG.n8nWebhookUrl, {
        method: "GET",
        signal: signal,
    });

    if (!response.ok) {
        if (response.status === 404) throw new Error("Webhook not found (Workflow may be inactive).");
        if (response.status === 522 || response.status === 502) throw new Error("n8n Server is currently offline or unreachable.");
        throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    const html = data.html || data[0]?.html || '';

    return html;
}
