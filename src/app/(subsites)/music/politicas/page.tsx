import { MUSIC_CONFIG } from "@/config/music"
import { ArrowLeft } from "lucide-react"
import type { Metadata } from "next"

export const metadata: Metadata = {
    title: "Políticas de Clase — Alejandro AG",
    description: "Términos, condiciones y lineamientos para las clases de música.",
}

export default function PoliticasPage() {
    return (
        <div className="font-sans antialiased text-foreground bg-background min-h-screen py-24 px-6 md:py-32">
            <div className="max-w-3xl mx-auto">
                <a href="/music" className="inline-flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors mb-12">
                    <ArrowLeft className="w-4 h-4" /> Volver a inicio
                </a>

                <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-12">Políticas y Lineamientos</h1>

                <div className="space-y-12">
                    <section>
                        <h2 className="text-2xl font-bold mb-4 flex items-center gap-3">
                            <span className="w-8 h-8 rounded-full bg-accent/10 text-accent flex items-center justify-center text-sm">1</span>
                            Pagos y Facturación
                        </h2>
                        <div className="prose prose-p:text-muted-foreground prose-p:leading-relaxed">
                            <p>Todos los pagos deben realizarse y confirmarse <strong>antes del inicio de la sesión</strong>. Sin confirmación de pago, la clase no se llevará a cabo.</p>
                            <p>Acepto transferencias interbancarias y pago en efectivo exacto al momento de la clase. Los planes mensuales deben cubrirse en los primeros 5 días del mes o al inicio de su ciclo de 4 semanas.</p>
                        </div>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold mb-4 flex items-center gap-3">
                            <span className="w-8 h-8 rounded-full bg-accent/10 text-accent flex items-center justify-center text-sm">2</span>
                            Cancelaciones y Reprogramaciones
                        </h2>
                        <div className="prose prose-p:text-muted-foreground prose-p:leading-relaxed">
                            <p>Para cancelar sin penalización, debes avisar con al menos <strong>{MUSIC_CONFIG.policies.cancellationHours} horas de anticipación</strong>. Si cancelas con menos tiempo, la clase se considerará impartida y se descontará de tu paquete.</p>
                            <p>Permito <strong>{MUSIC_CONFIG.policies.reschedulingLimit} reprogramaciones al mes</strong> dentro de la misma semana de la clase original, sujeta a mi disponibilidad de agenda.</p>
                        </div>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold mb-4 flex items-center gap-3">
                            <span className="w-8 h-8 rounded-full bg-accent/10 text-accent flex items-center justify-center text-sm">3</span>
                            Puntualidad
                        </h2>
                        <div className="prose prose-p:text-muted-foreground prose-p:leading-relaxed">
                            <p>El tiempo cuenta a partir de la hora agendada. Existe una tolerancia de espera de <strong>15 minutos</strong>. Si llegas (o estoy esperándote en domicilio) pasado ese tiempo sin previo aviso, la clase se cancela y se cobra con normalidad.</p>
                            <p>El tiempo de retraso por parte del alumno no se repone al final de la sesión por respeto a la agenda de los siguientes alumnos.</p>
                        </div>
                    </section>
                </div>
            </div>
        </div>
    )
}
