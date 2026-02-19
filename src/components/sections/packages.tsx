"use client"

import { motion } from "framer-motion"
import { PackageCard } from "@/components/ui/package-card"
import { AlertCircle } from "lucide-react"

const PACKAGES = [
    {
        title: "AI & Automation Audit",
        subtitle: "1 semana · Entry",
        deliverables: [
            "Mapa de procesos + backlog priorizado",
            "3 iniciativas con estimación de ROI",
            "Plan de 2 semanas para Quick Wins",
            "Reporte ejecutivo listo para presentar",
        ],
        ctaText: "Empezar con un Audit",
        ctaHref: "#contacto",
        highlighted: false,
    },
    {
        title: "Build Sprint",
        subtitle: "2–4 semanas · Core",
        deliverables: [
            "1–2 automatizaciones en producción (n8n + APIs)",
            "Observabilidad básica (logs, alertas)",
            "Documentación técnica completa",
            "Handoff y sesión de entrenamiento",
        ],
        ctaText: "Cotizar un Sprint",
        ctaHref: "#contacto",
        highlighted: true,
    },
    {
        title: "Fractional Automation Partner",
        subtitle: "Mensual · Premium",
        deliverables: [
            "Roadmap continuo + optimización",
            "Nuevas integraciones cada mes",
            "Entrenamiento y soporte dedicado",
            "Reportes de impacto y métricas",
        ],
        ctaText: "Explorar Retainer",
        ctaHref: "#contacto",
        highlighted: false,
    },
]

export function Packages() {
    return (
        <section id="paquetes" className="py-24 md:py-32 relative overflow-hidden">
            {/* Background accent */}
            <div className="absolute bottom-0 left-0 w-96 h-96 bg-yellow-400/5 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2 pointer-events-none" />

            <div className="container px-6 md:px-12 max-w-6xl mx-auto relative z-10">
                {/* Section Header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="mb-16 text-center max-w-2xl mx-auto"
                >
                    <p className="text-sm font-semibold text-yellow-600 dark:text-yellow-400 uppercase tracking-wider mb-4">
                        Paquetes / Ways to work together
                    </p>
                    <h2 className="text-3xl md:text-5xl font-bold text-foreground mb-4">
                        Elige tu punto de entrada
                    </h2>
                    <p className="text-lg text-muted-foreground">
                        Cada paquete está diseñado para entregar resultados tangibles, no slides.
                    </p>
                </motion.div>

                {/* Package Cards */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 mb-12">
                    {PACKAGES.map((pkg, index) => (
                        <PackageCard key={pkg.title} {...pkg} index={index} />
                    ))}
                </div>

                {/* Microcopy */}
                <motion.div
                    initial={{ opacity: 0, y: 16 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.3 }}
                    className="text-center space-y-6"
                >
                    <p className="text-base md:text-lg font-medium text-foreground/80 italic max-w-2xl mx-auto">
                        &ldquo;No vendo &lsquo;IA por IA&rsquo;. Vendo horas recuperadas, errores reducidos y decisiones más rápidas.&rdquo;
                    </p>

                    {/* "Not a fit" box */}
                    <div className="inline-flex items-start gap-3 bg-muted/50 border border-border/50 rounded-xl px-6 py-4 text-left max-w-lg mx-auto">
                        <AlertCircle className="w-5 h-5 text-muted-foreground mt-0.5 shrink-0" />
                        <div>
                            <p className="text-sm font-semibold text-foreground mb-1">¿Quizás no soy la mejor opción?</p>
                            <p className="text-sm text-muted-foreground">
                                Si solo quieres un demo rápido sin adopción real, o si no hay un owner interno que lidere el cambio — probablemente no soy tu mejor fit.
                            </p>
                        </div>
                    </div>
                </motion.div>
            </div>
        </section>
    )
}
