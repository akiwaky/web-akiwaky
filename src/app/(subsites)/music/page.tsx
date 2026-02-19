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
            <section className="relative pt-32 pb-20 md:pt-48 md:pb-32 overflow-hidden">
                {/* Abstract Background Elements */}
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-full -z-10 pointer-events-none">
                    <div className="absolute top-[10%] right-[10%] w-[500px] h-[500px] bg-yellow-500/5 rounded-full blur-3xl rounded-full mix-blend-multiply dark:mix-blend-screen animate-pulse-slow" />
                    <div className="absolute bottom-[10%] left-[10%] w-[400px] h-[400px] bg-purple-500/5 rounded-full blur-3xl mix-blend-multiply dark:mix-blend-screen animate-pulse-slow animation-delay-200" />
                </div>

                <div className="max-w-4xl mx-auto px-6 text-center">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-border/60 bg-secondary/50 backdrop-blur-sm text-xs font-medium text-muted-foreground mb-8">
                        <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                        Cupo limitado para nuevos alumnos
                    </div>

                    <h1 className="text-5xl md:text-7xl font-bold tracking-tight mb-8 bg-clip-text text-transparent bg-gradient-to-b from-foreground to-foreground/70">
                        La música no se estudia, <br className="hidden md:block" />
                        <span className="text-foreground">se toca.</span>
                    </h1>

                    <p className="text-xl md:text-2xl text-muted-foreground leading-relaxed max-w-2xl mx-auto mb-12">
                        Olvída la teoría aburrida. Aprende con un método diseñado
                        para que toques tus canciones favoritas desde la primera sesión.
                    </p>

                    <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                        <WhatsAppButton variant="primary" className="w-full sm:w-auto text-lg px-8 py-4 shadow-xl shadow-green-500/20 hover:shadow-green-500/30">
                            Agendar Clase de Prueba
                        </WhatsAppButton>
                        <a
                            href="#metodo"
                            className="inline-flex items-center justify-center w-full sm:w-auto px-8 py-4 rounded-full border border-border bg-background hover:bg-muted/50 transition-colors font-medium"
                        >
                            Conocer el método
                        </a>
                    </div>
                </div>
            </section>

            {/* ════════════ STATS / TRUST ════════════ */}
            <section className="border-y border-border/40 bg-secondary/20">
                <div className="max-w-6xl mx-auto px-6 py-12">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                        {TRUST_CHIPS.map((chip) => (
                            <div key={chip.label} className="flex flex-col items-center text-center gap-3">
                                <div className="p-3 rounded-2xl bg-background border border-border/50 shadow-sm">
                                    <chip.icon className="w-6 h-6 text-yellow-500" />
                                </div>
                                <span className="text-sm font-medium text-foreground/80">{chip.label}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ════════════ METHOD ════════════ */}
            <section id="metodo" className="py-24 md:py-32 px-6">
                <div className="max-w-6xl mx-auto">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
                        <div className="relative">
                            <div className="absolute -inset-4 bg-gradient-to-tr from-yellow-500/10 to-purple-500/10 rounded-3xl blur-2xl -z-10" />
                            <div className="aspect-square rounded-3xl overflow-hidden bg-muted relative border border-border/50 shadow-2xl">
                                <div className="absolute inset-0 flex items-center justify-center bg-secondary/50">
                                    <Music className="w-32 h-32 text-muted-foreground/20" />
                                </div>
                                {/* Placeholder for actual image */}
                                <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent" />
                                <div className="absolute bottom-6 left-6 right-6">
                                    <div className="bg-background/90 backdrop-blur-md p-4 rounded-xl border border-border/50 shadow-lg">
                                        <p className="font-medium text-sm">&quot;En 2 meses logré lo que no pude en 2 años de tutoriales.&quot;</p>
                                        <p className="text-xs text-muted-foreground mt-2">— Alumno actual</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div>
                            <h2 className="text-3xl md:text-5xl font-bold mb-6">Menos ejercicios,<br />más música real.</h2>
                            <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
                                Mi enfoque es 100% práctico. No pasaremos meses leyendo partituras antes de tocar tu instrumento.
                                Desde el día uno, el objetivo es hacer música.
                            </p>

                            <ul className="space-y-6">
                                {[
                                    { title: "Personalización Total", desc: "No hay dos alumnos iguales. Tu plan se adapta a tus gustos." },
                                    { title: "Feedback Inmediato", desc: "Corregimos técnica al momento para evitar vicios futuros." },
                                    { title: "Progreso Visible", desc: "Grabamos tus avances para que escuches tu propia evolución." },
                                ].map((item, i) => (
                                    <li key={i} className="flex gap-4">
                                        <div className="mt-1">
                                            <CheckCircle className="w-6 h-6 text-green-500" />
                                        </div>
                                        <div>
                                            <h3 className="font-bold text-lg">{item.title}</h3>
                                            <p className="text-muted-foreground text-sm">{item.desc}</p>
                                        </div>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </div>
            </section>

            {/* ════════════ STEPS ════════════ */}
            <section className="py-24 bg-card border-y border-border/50">
                <div className="max-w-6xl mx-auto px-6">
                    <div className="text-center max-w-2xl mx-auto mb-16">
                        <h2 className="text-3xl md:text-4xl font-bold mb-4">¿Cómo empezamos?</h2>
                        <p className="text-muted-foreground">Proceso simple, sin matrículas ni contratos forzosos.</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {STEPS.map((step, i) => (
                            <div key={i} className="relative group">
                                <div className="absolute top-0 left-6 -translate-y-1/2 text-8xl font-bold text-foreground/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 select-none">
                                    {step.step}
                                </div>
                                <div className="bg-background border border-border/50 p-8 rounded-2xl h-full shadow-sm hover:shadow-md transition-shadow">
                                    <div className="w-12 h-12 rounded-full bg-secondary flex items-center justify-center font-bold text-lg mb-6 group-hover:bg-yellow-400 group-hover:text-yellow-950 transition-colors duration-300">
                                        {step.step}
                                    </div>
                                    <h3 className="text-xl font-bold mb-3">{step.title}</h3>
                                    <p className="text-muted-foreground text-sm leading-relaxed">{step.description}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ════════════ PRICING ════════════ */}
            <section className="py-24 px-6">
                <div className="max-w-6xl mx-auto">
                    <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
                        <div>
                            <h2 className="text-3xl md:text-5xl font-bold mb-4">Planes Simples</h2>
                            <p className="text-lg text-muted-foreground">Invierte en ti mismo.</p>
                        </div>
                        <div className="flex items-center gap-2 text-sm text-yellow-600 bg-yellow-400/10 px-4 py-2 rounded-full">
                            <Shield className="w-4 h-4" />
                            Garantía de satisfacción en tu primera clase
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {PACKAGES.map((pkg, i) => (
                            <div
                                key={i}
                                className={`relative p-8 rounded-3xl flex flex-col ${pkg.highlighted
                                    ? "bg-foreground text-background shadow-2xl scale-100 md:scale-105 z-10"
                                    : "bg-card border border-border/50 text-foreground"
                                    }`}
                            >
                                {pkg.highlighted && (
                                    <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1 bg-gradient-to-r from-yellow-400 to-orange-400 text-white text-xs font-bold uppercase tracking-wider rounded-full shadow-lg">
                                        Recomendado
                                    </div>
                                )}

                                <div className="mb-8">
                                    <h3 className="text-2xl font-bold mb-2">{pkg.title}</h3>
                                    <p className={`text-sm ${pkg.highlighted ? "text-background/70" : "text-muted-foreground"}`}>
                                        {pkg.subtitle}
                                    </p>
                                </div>

                                <ul className="space-y-4 mb-8 flex-1">
                                    {pkg.features.map((feat, j) => (
                                        <li key={j} className="flex items-start gap-3 text-sm">
                                            <CheckCircle className={`w-5 h-5 shrink-0 ${pkg.highlighted ? "text-green-400" : "text-green-500"}`} />
                                            <span>{feat}</span>
                                        </li>
                                    ))}
                                </ul>

                                <a
                                    href={pkg.highlighted ? WA_LINK : "#contact"}
                                    className={`w-full py-4 rounded-xl font-bold text-center transition-transform active:scale-95 ${pkg.highlighted
                                        ? "bg-background text-foreground hover:bg-background/90"
                                        : "bg-secondary hover:bg-secondary/80 text-foreground"
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
            <section className="py-24 px-6 text-center">
                <div className="max-w-3xl mx-auto bg-gradient-to-b from-card to-background border border-border/50 rounded-3xl p-12 shadow-2xl">
                    <h2 className="text-3xl md:text-4xl font-bold mb-6">¿Aún tienes dudas?</h2>
                    <p className="text-lg text-muted-foreground mb-8">
                        Escríbeme sin compromiso. Cuéntame qué música te gusta y te diré cómo podemos lograrlo.
                    </p>
                    <div className="flex flex-col items-center gap-4">
                        <WhatsAppButton variant="primary" className="px-10 py-4 text-lg">
                            Hablar por WhatsApp
                        </WhatsAppButton>
                        <p className="text-xs text-muted-foreground mt-4">
                            Respuesta promedio: &lt; 2 horas
                        </p>
                    </div>
                </div>
            </section>
        </div>
    )
}
