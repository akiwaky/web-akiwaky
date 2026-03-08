import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Aki-Chaty — CDMX Place Guide on WhatsApp',
    description:
        'Ask Aki-Chaty for curated CDMX place picks — coffee, brunch, dinner, drinks — straight in WhatsApp. No apps. No noise.',
    openGraph: {
        title: 'Aki-Chaty — CDMX Place Guide on WhatsApp',
        description: 'Curated CDMX place recommendations, straight to your WhatsApp.',
        type: 'website',
    },
};

export default function ChatyLayout({ children }: { children: React.ReactNode }) {
    return <>{children}</>;
}
