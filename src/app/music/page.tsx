import type { Metadata } from "next"
import Link from "next/link"
import {
    Music,
    Star,
    Clock,
    MapPin,
    MessageCircle,
    CheckCircle,
    ArrowRight,
    Users,
    Award,
    TrendingUp,
    Calendar,
    Shield,
    Phone,
} from "lucide-react"

export const metadata: Metadata = {
    title: "Clases de Música — Alejandro AG | Santa Fe / Huixquilucan",
    description:
        "Clases de música personalizadas en zona Santa Fe y Huixquilucan. +10 años de experiencia. Agenda tu clase de prueba por WhatsApp.",
}

// TODO: Replace with your real WhatsApp number (country code + number, no spaces/dashes)
const WA_NUMBER = "521XXXXXXXXXX"
const WA_TEXT = encodeURIComponent(
    "Hola, me interesa una clase de prueba. ¿Hay disponibilidad esta semana? (Zona: Santa Fe/Huixquilucan)"
)
const WA_LINK = `https://wa.me/${WA_NUMBER}?text=${WA_TEXT}`

/* ─────────────────────── Data ─────────────────────── */

const TRUST_CHIPS = [
    { icon: Award, label: "+10 años enseñando" },
    { icon: MapPin, label: "Zona Santa Fe / Huixquilucan" },
    { icon: Users, label: "Alumnos de 6 a 60 años" },
    { icon: Star, label: "Método práctico desde la primera clase" },
]

const TESTIMONIALS = [
    {
        quote: "En dos meses ya estaba tocando mis canciones favoritas. El método es súper práctico.",
        author: "– Alumno placeholder",
    },
    {
        quote: "Mi hijo esperaba la clase toda la semana. Nunca había visto tanta motivación.",
        author: "– Padre placeholder",
    },
    {
        quote: "Flexible, profesional y con mucha paciencia. 100% recomendado.",
        author: "– Alumna placeholder",
    },
]

const OUTCOMES = [
    {
        icon: Music,
        title: "Tocas desde el día 1",
        description:
            "Nada de semanas de teoría aburrida. Empiezas haciendo música real, con canciones que te gustan.",
    },
    {
        icon: TrendingUp,
        title: "Progreso visible cada mes",
        description:
            "Plan personalizado con metas claras. Siempre sabes qué estás aprendiendo y por qué.",
    },
    {
        icon: Users,
        title: "Para todas las edades",
        description:
            "Niños, adolescentes o adultos — el método se adapta a tu ritmo, horario y objetivos.",
    },
]

const STEPS = [
    {
        step: "01",
        title: "Agenda tu clase de prueba",
        description: "Escríbeme por WhatsApp. Platicamos sobre tus objetivos y agendamos una sesión.",
    },
    {
        step: "02",
        title: "Primera clase: diagnóstico + acción",
        description:
            "Evalúo tu nivel, definimos un plan y… ya empezamos a tocar. Sin vueltas.",
    },
    {
        step: "03",
        title: "Plan semanal personalizado",
        description:
            "Clases regulares con material adaptado. Seguimiento de tu progreso y ajustes continuos.",
    },
]

const PACKAGES = [
    {
        title: "Clase individual",
        subtitle: "Para probar o sesiones puntuales",
        features: [
            "1 sesión de 60 min",
            "Material incluido",
            "Flexible: presencial u online",
        ],
        cta: "Consultar disponibilidad",
    },
    {
        title: "Plan mensual",
        subtitle: "4 clases/mes — el más popular",
        features: [
            "4 sesiones de 60 min",
            "Plan de estudio personalizado",
            "Seguimiento entre clases",
            "Grabaciones de práctica",
        ],
        cta: "Solicitar disponibilidad",
        highlighted: true,
    },
    {
        title: "Plan intensivo",
        subtitle: "8 clases/mes para avance rápido",
        features: [
            "8 sesiones de 60 min",
            "Práctica guiada semanal",
            "Repertorio personalizado",
            "Preparación para audiciones o proyectos",
        ],
        cta: "Solicitar disponibilidad",
    },
]

const POLICIES = [
    "Cancelación con 24h de anticipación sin cargo",
    "Las clases no tomadas se pueden reprogramar (1 vez por mes)",
    "Materiales digitales incluidos en todos los planes",
    "Pago mensual por transferencia o efectivo",
]

/* ─────────────────────── Components ─────────────────────── */

function WhatsAppButton({
    children,
    variant = "primary",
    className = "",
}: {
    children: React.ReactNode
    variant?: "primary" | "secondary"
    className?: string
}) {
    const base =
        "inline-flex items-center justify-center gap-2 rounded-full font-semibold transition-all duration-200 hover:-translate-y-0.5"
    const styles =
        variant === "primary"
            ? "bg-green-500 text-white px-8 py-4 text-base shadow-lg shadow-green-500/25 hover:bg-green-400"
            : "border border-border bg-background text-foreground px-6 py-3 text-sm hover:bg-accent"

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
    )
}

/* ─────────────────────── Page ─────────────────────── */

export default function MusicPage() {
    return (
        <div className="min-h-screen bg-background text-foreground selection:bg-yellow-400/30">
            {/* ── Minimal header ── */}
            <header className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-border/40">
                <div className="max-w-5xl mx-auto px-6 py-4 flex items-center justify-between">
                    <Link href="/" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
                        ← akiwaky.cloud
                    </Link>
                    <WhatsAppButton variant="secondary">WhatsApp</WhatsAppButton>
                </div>
            </header>

            <main className="pt-20">
                {/* ════════════ HERO ════════════ */}
                <section className="py-20 md:py-32 px-6">
                    <div className="max-w-3xl mx-auto text-center">
                        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-yellow-400/10 text-yellow-700 dark:text-yellow-400 text-sm font-medium mb-8">
                            <Music className="w-4 h-4" />
                            Clases de música personalizadas
                        </div>

                        <h1 className="text-4xl md:text-6xl font-bold leading-tight mb-6">
                            Aprende música
                            <span className="block text-yellow-500">a tu ritmo.</span>
                        </h1>

                        <p className="text-lg md:text-xl text-muted-foreground leading-relaxed max-w-2xl mx-auto mb-10">
                            Clases presenciales y online en zona Santa Fe / Huixquilucan.
                            Método práctico: tocas desde la primera sesión, con un plan hecho a tu medida.
                        </p>

                        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                            <WhatsAppButton variant="primary">Agendar clase de prueba</WhatsAppButton>
                            <a
                                href="#como-funciona"
                                className="inline-flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
                            >
                                ¿Cómo funciona?
                                <ArrowRight className="w-4 h-4" />
                            </a>
                        </div>
                    </div>
                </section>

                {/* ════════════ TRUST CHIPS ════════════ */}
                <section className="py-12 px-6 border-y border-border/40 bg-secondary/30">
                    <div className="max-w-4xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-6">
                        {TRUST_CHIPS.map((chip) => (
                            <div
                                key={chip.label}
                                className="flex items-center gap-3 text-sm text-foreground/80"
                            >
                                <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-yellow-400/10 text-yellow-600 dark:text-yellow-400 shrink-0">
                                    <chip.icon className="w-5 h-5" />
                                </div>
                                <span className="font-medium">{chip.label}</span>
                            </div>
                        ))}
                    </div>
                </section>

                {/* ════════════ SOCIAL PROOF ════════════ */}
                <section className="py-20 md:py-28 px-6">
                    <div className="max-w-5xl mx-auto">
                        <p className="text-sm font-semibold text-yellow-600 dark:text-yellow-400 uppercase tracking-wider text-center mb-12">
                            Lo que dicen los alumnos
                        </p>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            {TESTIMONIALS.map((t, i) => (
                                <div
                                    key={i}
                                    className="bg-card border border-border/50 rounded-2xl p-6"
                                >
                                    <div className="flex gap-1 mb-4">
                                        {[...Array(5)].map((_, j) => (
                                            <Star key={j} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                                        ))}
                                    </div>
                                    <p className="text-sm text-foreground/80 leading-relaxed mb-4 italic">
                                        &ldquo;{t.quote}&rdquo;
                                    </p>
                                    <p className="text-xs text-muted-foreground font-medium">{t.author}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* ════════════ OUTCOMES ════════════ */}
                <section className="py-20 md:py-28 px-6 bg-secondary/30">
                    <div className="max-w-5xl mx-auto">
                        <div className="text-center mb-14">
                            <p className="text-sm font-semibold text-yellow-600 dark:text-yellow-400 uppercase tracking-wider mb-4">
                                ¿Por qué elegirme?
                            </p>
                            <h2 className="text-3xl md:text-4xl font-bold">Resultados reales, no promesas.</h2>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                            {OUTCOMES.map((o) => (
                                <div
                                    key={o.title}
                                    className="bg-card border border-border/50 rounded-2xl p-8 hover:shadow-lg hover:shadow-yellow-400/5 hover:-translate-y-1 transition-all duration-300"
                                >
                                    <div className="flex items-center justify-center w-12 h-12 rounded-xl bg-yellow-400/10 text-yellow-600 dark:text-yellow-400 mb-5">
                                        <o.icon className="w-6 h-6" />
                                    </div>
                                    <h3 className="text-lg font-bold mb-2">{o.title}</h3>
                                    <p className="text-sm text-muted-foreground leading-relaxed">{o.description}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* ════════════ HOW IT WORKS ════════════ */}
                <section id="como-funciona" className="py-20 md:py-28 px-6">
                    <div className="max-w-3xl mx-auto">
                        <div className="text-center mb-14">
                            <p className="text-sm font-semibold text-yellow-600 dark:text-yellow-400 uppercase tracking-wider mb-4">
                                ¿Cómo funciona?
                            </p>
                            <h2 className="text-3xl md:text-4xl font-bold">3 pasos para empezar</h2>
                        </div>
                        <div className="space-y-8">
                            {STEPS.map((s, i) => (
                                <div key={s.step} className="flex gap-6">
                                    {/* Timeline line */}
                                    <div className="flex flex-col items-center">
                                        <span className="flex items-center justify-center w-12 h-12 rounded-full bg-yellow-400/10 text-yellow-600 dark:text-yellow-400 font-bold text-sm border-2 border-yellow-400/20 shrink-0">
                                            {s.step}
                                        </span>
                                        {i < STEPS.length - 1 && (
                                            <div className="w-px flex-1 bg-border/60 mt-2" />
                                        )}
                                    </div>
                                    {/* Content */}
                                    <div className="pb-8">
                                        <h3 className="text-lg font-bold mb-1">{s.title}</h3>
                                        <p className="text-sm text-muted-foreground leading-relaxed">
                                            {s.description}
                                        </p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* ════════════ PACKAGES ════════════ */}
                <section className="py-20 md:py-28 px-6 bg-secondary/30">
                    <div className="max-w-5xl mx-auto">
                        <div className="text-center mb-14">
                            <p className="text-sm font-semibold text-yellow-600 dark:text-yellow-400 uppercase tracking-wider mb-4">
                                Paquetes
                            </p>
                            <h2 className="text-3xl md:text-4xl font-bold mb-3">Elige tu formato</h2>
                            <p className="text-muted-foreground">Todos los paquetes incluyen material y seguimiento.</p>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            {PACKAGES.map((pkg) => (
                                <div
                                    key={pkg.title}
                                    className={`relative bg-card border rounded-2xl p-8 flex flex-col transition-all duration-300 hover:-translate-y-1 ${pkg.highlighted
                                            ? "border-yellow-400/40 shadow-lg shadow-yellow-400/5"
                                            : "border-border/50"
                                        }`}
                                >
                                    {pkg.highlighted && (
                                        <span className="absolute -top-3 left-8 px-3 py-1 rounded-full bg-yellow-400 text-yellow-950 text-xs font-bold uppercase tracking-wider">
                                            Popular
                                        </span>
                                    )}
                                    <h3 className="text-lg font-bold mb-1">{pkg.title}</h3>
                                    <p className="text-sm text-muted-foreground mb-6">{pkg.subtitle}</p>
                                    <ul className="space-y-3 mb-8 flex-1">
                                        {pkg.features.map((f) => (
                                            <li key={f} className="flex items-start gap-3 text-sm text-foreground/80">
                                                <CheckCircle className="w-4 h-4 mt-0.5 text-yellow-500 shrink-0" />
                                                {f}
                                            </li>
                                        ))}
                                    </ul>
                                    <a
                                        href={WA_LINK}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className={`inline-flex items-center justify-center gap-2 rounded-full px-6 py-3 text-sm font-medium transition-all duration-200 ${pkg.highlighted
                                                ? "bg-green-500 text-white hover:bg-green-400 shadow-md shadow-green-500/20"
                                                : "border border-border bg-background hover:bg-accent text-foreground"
                                            }`}
                                    >
                                        <MessageCircle className="w-4 h-4" />
                                        {pkg.cta}
                                    </a>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* ════════════ POLICIES ════════════ */}
                <section className="py-16 px-6">
                    <div className="max-w-3xl mx-auto">
                        <div className="flex items-center gap-3 mb-6">
                            <Shield className="w-5 h-5 text-muted-foreground" />
                            <h2 className="text-lg font-bold">Políticas</h2>
                        </div>
                        <ul className="space-y-3">
                            {POLICIES.map((p) => (
                                <li key={p} className="flex items-start gap-3 text-sm text-muted-foreground">
                                    <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-yellow-400 shrink-0" />
                                    {p}
                                </li>
                            ))}
                        </ul>
                    </div>
                </section>

                {/* ════════════ LOCATION / SCHEDULE ════════════ */}
                <section className="py-16 px-6 bg-secondary/30">
                    <div className="max-w-3xl mx-auto grid grid-cols-1 sm:grid-cols-2 gap-8">
                        <div>
                            <div className="flex items-center gap-3 mb-4">
                                <MapPin className="w-5 h-5 text-yellow-500" />
                                <h2 className="text-lg font-bold">Ubicación</h2>
                            </div>
                            <p className="text-sm text-muted-foreground leading-relaxed">
                                Clases presenciales en zona Santa Fe y Huixquilucan, Estado de México.
                                <br />
                                También disponible online por Zoom/Google Meet.
                            </p>
                        </div>
                        <div>
                            <div className="flex items-center gap-3 mb-4">
                                <Calendar className="w-5 h-5 text-yellow-500" />
                                <h2 className="text-lg font-bold">Horarios</h2>
                            </div>
                            <p className="text-sm text-muted-foreground leading-relaxed">
                                Lunes a viernes: 9:00 – 20:00
                                <br />
                                Sábados: 9:00 – 14:00
                                <br />
                                <span className="italic">Horarios sujetos a disponibilidad.</span>
                            </p>
                        </div>
                    </div>
                </section>

                {/* ════════════ CONTACT CTA ════════════ */}
                <section className="py-20 md:py-28 px-6">
                    <div className="max-w-2xl mx-auto text-center">
                        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-green-500/10 text-green-500 mb-6">
                            <Phone className="w-7 h-7" />
                        </div>
                        <h2 className="text-3xl md:text-4xl font-bold mb-4">¿Listo para empezar?</h2>
                        <p className="text-muted-foreground text-lg mb-8 leading-relaxed">
                            Escríbeme por WhatsApp y agenda tu clase de prueba.
                            <br />
                            Respondo en menos de 24 horas.
                        </p>
                        <WhatsAppButton variant="primary">Agendar clase de prueba</WhatsAppButton>
                    </div>
                </section>
            </main>

            {/* ── Footer ── */}
            <footer className="py-8 border-t border-border/40 px-6">
                <div className="max-w-5xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-muted-foreground">
                    <p>&copy; {new Date().getFullYear()} Alejandro AG. Todos los derechos reservados.</p>
                    <Link href="/" className="hover:text-foreground transition-colors">
                        akiwaky.cloud
                    </Link>
                </div>
            </footer>
        </div>
    )
}
