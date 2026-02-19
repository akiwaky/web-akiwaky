import { CheckCircle, ArrowLeft } from "lucide-react"
import { WhatsAppButton } from "@/components/ui/whatsapp-button"
import type { Metadata } from "next"

export const metadata: Metadata = {
    title: "¡Gracias! — Alejandro AG",
    description: "Tus datos han sido enviados correctamente.",
}

export default function GraciasPage() {
    return (
        <div className="font-sans antialiased text-foreground bg-background min-h-screen flex items-center justify-center p-6">
            <div className="max-w-md w-full text-center space-y-8">
                <div className="w-24 h-24 bg-green-50 rounded-full flex items-center justify-center mx-auto mb-8">
                    <CheckCircle className="w-12 h-12 text-green-500" />
                </div>

                <h1 className="text-4xl font-bold tracking-tight">¡Mensaje enviado!</h1>

                <p className="text-lg text-muted-foreground leading-relaxed">
                    He recibido tus datos. En breve te contactaré por WhatsApp para confirmar los detalles y agendar tu clase de prueba.
                </p>

                <div className="pt-8 border-t border-border/40">
                    <p className="text-sm text-muted-foreground mb-4">¿Prefieres no esperar?</p>
                    <WhatsAppButton variant="outline" className="w-full">
                        Escribirme directamente
                    </WhatsAppButton>
                </div>

                <div className="pt-8 w-full text-center">
                    <a href="/music" className="inline-flex items-center justify-center gap-2 text-sm font-medium text-foreground hover:translate-x-1 transition-transform">
                        <ArrowLeft className="w-4 h-4" /> Volver al inicio
                    </a>
                </div>
            </div>
        </div>
    )
}
