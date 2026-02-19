import Link from "next/link";
import { WhatsAppButton } from "@/components/ui/whatsapp-button";

export function SubsiteHeader() {
    return (
        <header className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-border/40">
            <div className="max-w-5xl mx-auto px-6 py-4 flex items-center justify-between">
                <Link
                    href="/"
                    className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
                >
                    ← akiwaky.cloud
                </Link>
                <WhatsAppButton variant="secondary">WhatsApp</WhatsAppButton>
            </div>
        </header>
    );
}
