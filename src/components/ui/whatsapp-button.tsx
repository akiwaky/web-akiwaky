import { MessageCircle } from "lucide-react";

// TODO: Replace with your real WhatsApp number
const WA_NUMBER = "521XXXXXXXXXX";
const WA_TEXT = encodeURIComponent(
    "Hola, me interesa una clase de prueba. ¿Hay disponibilidad esta semana? (Zona: Santa Fe/Huixquilucan)"
);
export const WA_LINK = `https://wa.me/${WA_NUMBER}?text=${WA_TEXT}`;

export function WhatsAppButton({
    children,
    variant = "primary",
    className = "",
}: {
    children: React.ReactNode;
    variant?: "primary" | "secondary";
    className?: string;
}) {
    const base =
        "inline-flex items-center justify-center gap-2 rounded-full font-semibold transition-all duration-200 hover:-translate-y-0.5";
    const styles =
        variant === "primary"
            ? "bg-green-500 text-white px-8 py-4 text-base shadow-lg shadow-green-500/25 hover:bg-green-400"
            : "border border-border bg-background text-foreground px-6 py-3 text-sm hover:bg-accent";

    return (
        <a
            href={WA_LINK}
            target="_blank"
            rel="noopener noreferrer"
            className={`${base} ${styles} ${className}`}
        >
            <MessageCircle className="w-5 h-5" />
            {children}
        </a>
    );
}
