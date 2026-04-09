import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Aki WhatsApp Hub — AI Assistants on WhatsApp',
    description:
        'Three AI assistants on one WhatsApp number: Aki-Chaty (CDMX guide), Minerva (music admin), CompaBot (Pal Norte festival companion).',
    openGraph: {
        title: 'Aki WhatsApp Hub — AI Assistants on WhatsApp',
        description:
            'Three AI assistants on one WhatsApp number. Text a hashtag to pick your assistant.',
        type: 'website',
    },
};

export default function ChatyLayout({ children }: { children: React.ReactNode }) {
    return <>{children}</>;
}
