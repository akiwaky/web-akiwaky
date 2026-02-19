import type { Metadata } from "next"
import { WhatsAppButton, WA_LINK } from "@/components/ui/whatsapp-button"
import {
    Music,
    Star,
    MapPin,
    ArrowRight,
    Users,
    Award,
    TrendingUp,
    Shield,
    CheckCircle,
} from "lucide-react"

export const metadata: Metadata = {
    title: "Clases de Música — Alejandro AG | Santa Fe",
    description:
        "Clases de música personalizadas en zona Santa Fe y Huixquilucan. Método práctico, resultados reales. Agenda tu clase de prueba.",
}

/* ─────────────────────── Data ─────────────────────── */

const TRUST_CHIPS = [
    { icon: Award, label: "+10 años experiencia" },
    { icon: MapPin, label: "Santa Fe / Huixquilucan" },
    { icon: Users, label: "Todas las edades" },
    { icon: Star, label: "Método práctico" },
]

const STEPS = [
    {
        step: "01",
        title: "Agenda tu prueba",
        description: "Envía un WhatsApp. Platicamos tus metas y agendamos.",
    },
    {
        step: "02",
        title: "Diagnóstico inicial",
        description:
            "Evaluamos tu nivel y empezamos a tocar desde el primer día.",
    },
    {
        step: "03",
        title: "Plan personalizado",
        description:
            "Rutina adaptada a tu estilo, horario y canciones favoritas.",
    },
]

const PACKAGES = [
    {
        title: "Sesión Individual",
        subtitle: "Flexibilidad total",
        features: [
            "1h de clase",
            "Presencial u online",
            "Material incluido",
        ],
        cta: "Consultar",
        highlighted: false,
    },
    {
        title: "Plan Mensual",
        subtitle: "El más popular",
        features: [
            "4 clases al mes",
            "Soporte por WhatsApp",
            "Videos de repaso",
            "Repertorio a medida",
        ],
        cta: "Empezar ahora",
        highlighted: true,
    },
    {
        title: "Intensivo",
        subtitle: "Avance acelerado",
        features: [
            "8 clases al mes",
            "Mentoria artística",
            "Grabación de demo",
            "Preparación de show",
        ],
        cta: "Consultar",
        highlighted: false,
    },
]

/* ─────────────────────── Page ─────────────────────── */

export default function MusicPage() {
    return (
        <div className="font-sans antialiased text-foreground bg-background">

            {/* ════════════ HERO SECTION ════════════ */}
            {/* ════════════ HERO SECTION ════════════ */}
            <section className="relative pt-32 pb-20 md:pt-48 md:pb-32 overflow-hidden border-b border-border/40">
                <div className="max-w-4xl mx-auto px-6 text-center">
                    <div className="inline-flex items-center gap-2 px-3 py-1 text-xs font-semibold tracking-widest uppercase mb-8 border border-foreground/20 text-foreground/60">
                        <span className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse" />
                        Cupo limitado
                    </div>

                    <h1 className="text-5xl md:text-8xl font-bold tracking-tighter mb-8 text-foreground">
                        La música no se estudia, <br className="hidden md:block" />
                        <span className="italic font-serif font-light text-accent">se toca.</span>
                    </h1>

                    <p className="text-xl md:text-2xl text-muted-foreground leading-relaxed max-w-2xl mx-auto mb-12 font-light">
                        Olvída la teoría aburrida. Método práctico diseñado para que toques desde la primera sesión.
                    </p>

                    <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
                        <WhatsAppButton variant="primary" className="!bg-foreground !text-background !rounded-none hover:!bg-foreground/90 w-full sm:w-auto px-10 py-5 text-lg shadow-none">
                            Agendar Prueba
                        </WhatsAppButton>
                        <a
                            href="#metodo"
                            className="group inline-flex items-center justify-center gap-2 text-foreground font-medium border-b border-foreground/20 pb-1 hover:border-foreground transition-all"
                        >
                            Conocer el método <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                        </a>
                    </div>
                </div>
            </section>

            {/* ════════════ STATS / TRUST ════════════ */}
            <section className="border-b border-border/40 bg-secondary/20">
                <div className="max-w-6xl mx-auto px-6 py-16">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-12">
                        {TRUST_CHIPS.map((chip) => (
                            <div key={chip.label} className="flex flex-col items-center text-center gap-4">
                                <chip.icon className="w-8 h-8 text-accent stroke-1" />
                                <span className="text-sm uppercase tracking-widest text-foreground font-medium">{chip.label}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ════════════ METHOD ════════════ */}
            <section id="metodo" className="py-24 md:py-32 px-6">
                <div className="max-w-6xl mx-auto">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-20 items-center">
                        <div className="relative">
                            <div className="aspect-[4/5] bg-secondary relative overflow-hidden">
                                <div className="absolute inset-0 flex items-center justify-center">
                                    <Music className="w-40 h-40 text-background mix-blend-multiply opacity-20" />
                                </div>
                                <div className="absolute bottom-8 left-8 right-8 bg-background p-8 border border-border/20 shadow-2xl">
                                    <p className="text-xl font-serif italic mb-4 text-foreground">&quot;En 2 meses logré lo que no pude en 2 años de tutoriales.&quot;</p>
                                    <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">— Alumno actual</p>
                                </div>
                            </div>
                        </div>

                        <div>
                            <h2 className="text-4xl md:text-6xl font-bold mb-8 tracking-tight">Menos teoría.<br /><span className="text-accent font-serif italic font-light">Más práctica.</span></h2>
                            <p className="text-lg text-muted-foreground mb-12 leading-relaxed font-light">
                                Mi enfoque es 100% práctico. No pasaremos meses leyendo partituras antes de tocar.
                                Desde el día uno, el objetivo es hacer música real.
                            </p>

                            <ul className="space-y-8">
                                {[
                                    { title: "Personalización Total", desc: "No hay dos alumnos iguales. Tu plan se adapta a tus gustos." },
                                    { title: "Feedback Inmediato", desc: "Corregimos técnica al momento para evitar vicios futuros." },
                                    { title: "Progreso Visible", desc: "Grabamos tus avances para que escuches tu propia evolución." },
                                ].map((item, i) => (
                                    <li key={i} className="flex gap-6 border-l-2 border-accent/20 pl-6">
                                        <div>
                                            <h3 className="font-bold text-lg mb-1">{item.title}</h3>
                                            <p className="text-muted-foreground font-light">{item.desc}</p>
                                        </div>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </div>
            </section>

            {/* ════════════ STEPS ════════════ */}
            <section className="py-24 bg-card border-y border-border/40">
                <div className="max-w-6xl mx-auto px-6">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
                        {STEPS.map((step, i) => (
                            <div key={i} className="group">
                                <div className="text-6xl font-bold text-accent/20 mb-6 font-serif italic">
                                    {step.step}
                                </div>
                                <h3 className="text-xl font-bold mb-4 uppercase tracking-wide">{step.title}</h3>
                                <p className="text-muted-foreground leading-relaxed font-light">{step.description}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ════════════ PRICING ════════════ */}
            <section className="py-24 px-6">
                <div className="max-w-6xl mx-auto">
                    <div className="mb-20 text-center">
                        <h2 className="text-4xl md:text-6xl font-bold mb-6 tracking-tight">Planes</h2>
                        <div className="inline-flex items-center gap-2 text-sm text-accent uppercase tracking-widest border border-accent/30 px-4 py-2">
                            <Shield className="w-4 h-4" />
                            Garantía de satisfacción
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {PACKAGES.map((pkg, i) => (
                            <div
                                key={i}
                                className={`relative p-10 flex flex-col border transition-all duration-300 ${pkg.highlighted
                                        ? "bg-foreground text-background border-foreground shadow-2xl"
                                        : "bg-background border-border hover:border-foreground/50"
                                    }`}
                            >
                                <div className="mb-8">
                                    <h3 className="text-2xl font-bold mb-2">{pkg.title}</h3>
                                    <p className={`text-sm tracking-wide ${pkg.highlighted ? "text-background/70" : "text-muted-foreground"}`}>
                                        {pkg.subtitle}
                                    </p>
                                </div>

                                <ul className="space-y-4 mb-12 flex-1">
                                    {pkg.features.map((feat, j) => (
                                        <li key={j} className="flex items-start gap-4 text-sm">
                                            <span className={`w-1.5 h-1.5 mt-2 rounded-full shrink-0 ${pkg.highlighted ? "bg-accent" : "bg-foreground"}`} />
                                            <span className="font-light">{feat}</span>
                                        </li>
                                    ))}
                                </ul>

                                <a
                                    href={pkg.highlighted ? WA_LINK : "#contact"}
                                    className={`w-full py-5 text-center text-sm font-bold uppercase tracking-widest border transition-colors ${pkg.highlighted
                                            ? "bg-background text-foreground border-background hover:bg-background/90"
                                            : "bg-transparent text-foreground border-foreground hover:bg-foreground hover:text-background"
                                        }`}
                                >
                                    {pkg.cta}
                                </a>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ════════════ CTA ════════════ */}
            <section className="py-32 px-6 text-center bg-secondary/30">
                <div className="max-w-3xl mx-auto">
                    <h2 className="text-4xl md:text-6xl font-bold mb-8 tracking-tighter">¿Listo para empezar?</h2>
                    <p className="text-xl text-muted-foreground mb-12 font-light">
                        Escríbeme sin compromiso.
                    </p>
                    <WhatsAppButton variant="primary" className="!bg-accent !text-white !rounded-none hover:!bg-accent/90 px-12 py-5 text-lg shadow-none">
                        Hablar por WhatsApp
                    </WhatsAppButton>
                </div>
            </section>
        </div>
    )
}
