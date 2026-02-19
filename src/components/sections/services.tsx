"use client"

import { motion } from "framer-motion"
import { ServiceCard } from "@/components/ui/service-card"
import { Search, Cog, Users, ArrowRight } from "lucide-react"

const PILLARS = [
    {
        stepNumber: 1,
        icon: Search,
        title: "Identify",
        subtitle: "Diagnóstico & ROI",
        positioning:
            "Encuentro dónde tu operación pierde horas y dinero — y calculo exactamente cuánto puedes recuperar con automatización.",
        deliverables: [
            "Mapa de procesos actuales y pain points",
            "Backlog priorizado de oportunidades",
            "3 iniciativas con estimación de ROI",
            "Benchmark vs. mejores prácticas del sector",
            "Reporte ejecutivo con próximos pasos",
        ],
        bestFor: "Equipos que saben que hay oportunidad pero no saben por dónde empezar.",
        ctaText: "Agenda un diagnóstico",
        ctaHref: "#contacto",
    },
    {
        stepNumber: 2,
        icon: Cog,
        title: "Develop",
        subtitle: "Integraciones & Automatización",
        positioning:
            "Convierto tu backlog en integraciones funcionando — conectando APIs, automatizando flujos y eliminando trabajo manual.",
        deliverables: [
            "1–2 automatizaciones en producción (n8n + APIs)",
            "Conexión entre silos de datos",
            "Observabilidad básica: logs y alertas",
            "Tests y documentación técnica",
            "Handoff limpio a tu equipo",
        ],
        bestFor: "Empresas con procesos manuales listos para escalar.",
        ctaText: "Ver paquetes",
        ctaHref: "#paquetes",
    },
    {
        stepNumber: 3,
        icon: Users,
        title: "Adopt",
        subtitle: "Enablement & Mejora continua",
        positioning:
            "Me aseguro de que tu equipo adopte las herramientas, no solo las tenga. Entrenamiento, soporte y optimización mensual.",
        deliverables: [
            "Entrenamiento hands-on para tu equipo",
            "Documentación operativa paso a paso",
            "Roadmap trimestral de mejoras",
            "Soporte reactivo y proactivo",
            "Nuevas integraciones cada ciclo",
        ],
        bestFor: "Organizaciones que quieren un partner de automatización, no un proveedor one-shot.",
        ctaText: "Hablemos de un retainer",
        ctaHref: "#contacto",
    },
]

const PROCESS_STEPS = ["Descubrimiento", "Diseño", "Build", "Pilot", "Handoff"]

export function Services() {
    return (
        <section id="servicios" className="py-24 md:py-32 bg-secondary/30 relative overflow-hidden">
            {/* Subtle background accent */}
            <div className="absolute top-0 right-0 w-96 h-96 bg-yellow-400/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 pointer-events-none" />

            <div className="container px-6 md:px-12 max-w-6xl mx-auto relative z-10">
                {/* Section Header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="mb-16 max-w-3xl"
                >
                    <p className="text-sm font-semibold text-yellow-600 dark:text-yellow-400 uppercase tracking-wider mb-4">
                        Servicios / Services
                    </p>
                    <h2 className="text-3xl md:text-5xl font-bold text-foreground leading-tight mb-4">
                        De &lsquo;ideas de IA&rsquo; a sistemas que sí se usan.
                    </h2>
                    <p className="text-lg md:text-xl text-muted-foreground leading-relaxed">
                        Identifico oportunidades reales, construyo integraciones robustas, y dejo a tu equipo operando con confianza.
                    </p>
                </motion.div>

                {/* Pillar Cards */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 mb-16">
                    {PILLARS.map((pillar, index) => (
                        <ServiceCard key={pillar.title} {...pillar} index={index} />
                    ))}
                </div>

                {/* Process Strip */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.3 }}
                    className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-0 bg-card/80 backdrop-blur-sm border border-border/50 rounded-2xl px-6 py-5"
                >
                    <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mr-4 mb-2 sm:mb-0">
                        Proceso
                    </p>
                    {PROCESS_STEPS.map((step, i) => (
                        <div key={step} className="flex items-center">
                            <span className="text-sm font-medium text-foreground/80 px-3">{step}</span>
                            {i < PROCESS_STEPS.length - 1 && (
                                <ArrowRight className="w-4 h-4 text-yellow-500/60 hidden sm:block" />
                            )}
                        </div>
                    ))}
                </motion.div>
            </div>
        </section>
    )
}
