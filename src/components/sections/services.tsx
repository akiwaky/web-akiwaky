"use client"

import { motion } from "framer-motion"
import { ServiceCard } from "@/components/ui/service-card"
import { Search, Cog, Users, ArrowRight } from "lucide-react"

const PILLARS = [
    {
        stepNumber: 1,
        icon: Search,
        title: "Identify",
        subtitle: "Diagnóstico + Caso de negocio (ROI)",
        positioning:
            "Encuentro dónde tu operación pierde horas y dinero — y lo convierto en un plan accionable con retorno estimado.",
        deliverables: [
            "Mapa “as-is” (2 procesos) + tiempos/costos (dónde se van las horas)",
            "Pain points priorizados por impacto y facilidad (80/20)",
            "1–2 iniciativas propuestas con estimación de ROI (ahorro, riesgo, calidad, velocidad)",
            "Benchmark vs. buenas prácticas del sector (lo mínimo que “debería existir”)",
            "Reporte ejecutivo + próximos pasos (qué hacer primero, con quién, y cuándo)",
        ],
        bestFor: "Equipos que saben que hay oportunidad, pero necesitan claridad y números para decidir.",
        ctaText: "Agenda un diagnóstico",
        ctaHref: "#contacto",
    },
    {
        stepNumber: 2,
        icon: Cog,
        title: "Deploy",
        subtitle: "Quick wins no-code + AI (sin proyectos pesados)",
        positioning:
            "Activo automatizaciones ligeras con herramientas listas para usar (no-code) y AI out-of-the-box para que el equipo vea valor rápido.",
        deliverables: [
            "Stack mínimo viable: una “fuente de verdad” + reglas básicas de datos",
            "3–6 automatizaciones no-code con triggers, notificaciones y manejo de errores básico",
            "Captura de demanda: landing + formulario + agenda + follow-ups (si aplica)",
            "Triage con AI: clasificación, resumen y routing de leads/tickets (sin custom code)",
            "Documentación operativa + ownership (quién opera qué)",
        ],
        tools: [
            "Zapier / Make",
            "Typeform / Tally",
            "Calendly",
            "HubSpot / Pipedrive",
            "Airtable / Notion",
            "Mailchimp / Brevo",
            "Webflow / Framer",
            "Google Workspace"
        ],
        bestFor: "Equipos que quieren resultados rápidos y medibles sin meter ingeniería pesada.",
        ctaText: "Ver quick wins",
        ctaHref: "#paquetes",
    },
    {
        stepNumber: 3,
        icon: Users,
        title: "Scale",
        subtitle: "Orquestación custom + IA conversacional",
        positioning:
            "Cuando ya hay señal de ROI y volumen, escalamos con orquestación robusta e integraciones a medida — y, si aplica, un AI agent en web/WhatsApp/helpdesk con handoff humano.",
        deliverables: [
            "Workflows multi-paso con lógica avanzada (webhooks/APIs cuando aplique)",
            "Conectores custom donde no existe integración estándar",
            "Confiabilidad + seguridad: roles, secretos, backups, alertas, hardening y control de accesos",
            "AI Agent / Chatbot (Helpdesk o Web/WhatsApp conectado a tu base de conocimiento y CRM)",
            "Retainer: mejoras mensuales + soporte + governance (roadmap trimestral)",
        ],
        bestFor: "Organizaciones que ya validaron valor con no-code y quieren escalar confiabilidad, canales y personalización.",
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
