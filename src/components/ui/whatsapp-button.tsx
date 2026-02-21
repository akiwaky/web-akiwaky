import { MessageCircle } from "lucide-react"
import { MUSIC_CONFIG } from "@/config/music"
import { cn } from "@/lib/utils"

export function WhatsAppButton({
    children,
    variant = "primary",
    className = "",
    prefillMessage = MUSIC_CONFIG.contact.defaultMessage,
}: {
    children: React.ReactNode
    variant?: "primary" | "secondary" | "outline" | "ghost" | "accent"
    className?: string
    prefillMessage?: string
}) {
    const waLink = `https://wa.me/${MUSIC_CONFIG.contact.whatsappNumber}?text=${encodeURIComponent(prefillMessage)}`

    const base =
        "inline-flex items-center justify-center gap-2 rounded-full font-semibold transition-all duration-200"

    const variants = {
        primary: "bg-primary text-primary-foreground shadow-lg shadow-primary/25 hover:opacity-90 hover:-translate-y-0.5",
        accent: "bg-accent text-accent-foreground shadow-lg shadow-accent/25 hover:opacity-90 hover:-translate-y-0.5",
        secondary: "bg-foreground text-background shadow-lg hover:bg-foreground/90 hover:-translate-y-0.5",
        outline: "border border-border bg-background text-foreground hover:bg-accent hover:text-accent-foreground",
        ghost: "bg-transparent text-foreground hover:bg-accent/50",
    }

    return (
        <a
            href={waLink}
            target="_blank"
            rel="noopener noreferrer"
            className={cn(base, variants[variant], className)}
        >
            <MessageCircle className="w-5 h-5" />
            {children}
        </a>
    )
}

