import { MUSIC_CONFIG } from "@/config/music";

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
