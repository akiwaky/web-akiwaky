"use client"

import { useState } from "react"
import Image from "next/image"
import { WhatsAppButton } from "@/components/ui/whatsapp-button"
import { MUSIC_CONFIG } from "@/config/music"
import { submitMusicLead } from "@/integrations/n8n/webhooks"
import {
    Music,
    Star,
    MapPin,
    Award,
    CheckCircle,
    Clock,
    Calendar,
    ChevronDown,
    MessageCircle,
    BookOpen,
    ScrollText,
    Palette
} from "lucide-react"

/* ─────────────────────── Data ─────────────────────── */

const TRUST_CHIPS = [
    { icon: Award, label: `+${MUSIC_CONFIG.teacher.yearsExperience} años de experiencia` },
    { icon: MapPin, label: MUSIC_CONFIG.zones.primary },
    { icon: Music, label: "Formación integral" },
    { icon: Star, label: MUSIC_CONFIG.teacher.school },
]

/* [PENDIENTE: Testimonios reales de alumnas/os de Arlet] */
const TESTIMONIALS: { quote: string; name: string; role: string }[] = []

const STEPS = [
    {
        step: "01",
        title: "Escríbeme",
        icon: <MessageCircle className="w-8 h-8 text-accent mb-4" />,
        description: "Envía un mensaje por WhatsApp. Te responderé para conocer tu nivel, intereses y disponibilidad.",
    },
    {
        step: "02",
        title: "Clase de Prueba",
        icon: <Calendar className="w-8 h-8 text-accent mb-4" />,
        description: "Agendamos tu primera sesión. Te envío el reglamento completo antes de comenzar.",
    },
    {
        step: "03",
        title: "Plan Mensual",
        icon: <CheckCircle className="w-8 h-8 text-accent mb-4" />,
        description: "Definimos horario fijo y plan de pago mensual. Recibes seguimiento y material personalizado.",
    },
]

const MODALIDADES = [
    {
        title: "Clase de Prueba",
        duration: "Por confirmar",
        desc: "Evaluación inicial, conocemos tus intereses musicales y definimos un plan de trabajo.",
        price: "Consultar"
    },
    {
        title: "Clase Regular",
        duration: "Por confirmar",
        desc: "Sesiones semanales con técnica, lectura de partitura, historia de la música y exploración creativa.",
        price: "Consultar"
    },
    {
        title: "Plan Mensual",
        duration: "4 clases / mes",
        desc: "Pago mensual con clases semanales. Continuidad ideal para un progreso sólido y constante.",
        price: "Consultar"
    }
]

const POLICIES_SNAPSHOT = [
    `Mensualidad: pago antes del día ${MUSIC_CONFIG.policies.paymentDeadlineDay} de cada mes.`,
    `Cancelaciones: aviso con ${MUSIC_CONFIG.policies.cancellationHours}h de anticipación.`,
    "Clases no asistidas: se reprograman dentro del mismo mes, nunca se descuentan.",
    "Días feriados: las clases se agendan previamente por acuerdo mutuo.",
    "Enfermedad: avisar con anticipación, especialmente si es contagiosa.",
]

const FAQS = [
    {
        q: "¿Qué incluyen las clases?",
        a: "Técnica pianística, lectura de partitura paso a paso, historia de la música, y exploración de distintas formas de hacer música — desde lo tradicional hasta lo experimental. Es una formación integral."
    },
    {
        q: "¿Cómo es el pago?",
        a: `Mensual, antes del día ${MUSIC_CONFIG.policies.paymentDeadlineDay} de cada mes o en la primera clase. Si el pago no se realiza en tiempo, se aplica un cargo de $${MUSIC_CONFIG.policies.lateFee} MXN.`
    },
    {
        q: "¿Puedo cancelar una clase?",
        a: `Sí, avisando con al menos ${MUSIC_CONFIG.policies.cancellationHours} horas de anticipación. La clase se reprograma dentro del mismo mes. Si una clase reprogramada se cancela nuevamente, se considera como impartida.`
    },
    {
        q: "¿Qué pasa en meses con cinco semanas?",
        a: "Si cumpliste con las 4 clases del mes, puedes tomar la quinta con costo adicional o usarla como descanso. Si cancelaste alguna, la quinta semana sirve para reponerla."
    },
    {
        q: "¿Qué sucede si estoy enfermo(a)?",
        a: "Debes avisar con anticipación para reprogramar, especialmente si es enfermedad contagiosa. Si la maestra llega y encuentras enfermo(a) al alumno(a), la clase se cancela sin reposición."
    },
]

/* ─────────────────────── Component Hooks ─────────────────────── */

function LeadForm() {
    const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle")

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        setStatus("loading")
        const formData = new FormData(e.currentTarget)

        // Honeypot check
        if (formData.get("subject")) {
            setStatus("success") // silently fail for bots
            return
        }

        const data = {
            name: formData.get("name") as string | null,
            whatsapp: formData.get("whatsapp") as string | null,
            zone: formData.get("zone") as string | null,
            times: formData.get("times") as string | null,
            timestamp: new Date().toISOString(),
            source: typeof window !== 'undefined' ? window.location.href : '/music'
        }

        try {
            await submitMusicLead(data)
            setStatus("success")
            if (typeof window !== 'undefined') window.location.href = "/music/gracias"
        } catch (error) {
            console.error(error)
            setStatus("error")
        }
    }

    if (status === "success") {
        return (
            <div className="p-8 text-center bg-green-50 rounded-xl border border-green-200">
                <CheckCircle className="w-12 h-12 text-green-600 mx-auto mb-4" />
                <h3 className="text-xl font-bold text-green-700 mb-2">¡Gracias!</h3>
                <p className="text-green-600">Tus datos han sido enviados. Te contactaré a la brevedad por WhatsApp.</p>
            </div>
        )
    }

    return (
        <form onSubmit={handleSubmit} className="bg-card p-6 md:p-8 rounded-2xl shadow-xl border border-border/50 max-w-md mx-auto mt-12 text-left">
            <h3 className="text-xl font-bold mb-6 text-center">O déjame tus datos y yo te escribo</h3>

            {/* Honeypot */}
            <input type="text" name="subject" className="hidden" tabIndex={-1} autoComplete="off" />

            <div className="space-y-4">
                <div>
                    <label htmlFor="name" className="block text-sm font-medium text-foreground/80 mb-1">Nombre</label>
                    <input required id="name" name="name" type="text" className="w-full px-4 py-3 rounded-lg border border-border bg-background focus:border-accent outline-none transition-colors font-sans" placeholder="Tu nombre" />
                </div>

                <div>
                    <label htmlFor="whatsapp" className="block text-sm font-medium text-foreground/80 mb-1">WhatsApp</label>
                    <input required id="whatsapp" name="whatsapp" type="tel" className="w-full px-4 py-3 rounded-lg border border-border bg-background focus:border-accent outline-none transition-colors font-sans" placeholder="10 dígitos" />
                </div>

                <div>
                    <label htmlFor="zone" className="block text-sm font-medium text-foreground/80 mb-1">Zona</label>
                    <select required id="zone" name="zone" className="w-full px-4 py-3 rounded-lg border border-border bg-background focus:border-accent outline-none font-sans">
                        <option value="">Selecciona tu zona...</option>
                        <option value="Tecamachalco">Tecamachalco</option>
                        <option value="La Herradura">La Herradura</option>
                        <option value="Bosques">Bosques</option>
                        <option value="Interlomas">Interlomas</option>
                        <option value="Santa Fe">Santa Fe</option>
                        <option value="Otra">Otra (escribir abajo)</option>
                    </select>
                </div>

                <div>
                    <label htmlFor="times" className="block text-sm font-medium text-foreground/80 mb-1">Horarios de interés</label>
                    <input required id="times" name="times" type="text" className="w-full px-4 py-3 rounded-lg border border-border bg-background focus:border-accent outline-none transition-colors font-sans" placeholder="Ej: Martes por la tarde" />
                </div>

                <div className="flex items-start gap-2 pt-2">
                    <input required type="checkbox" id="consent" className="mt-1" />
                    <label htmlFor="consent" className="text-xs text-muted-foreground font-sans">
                        Acepto compartir estos datos para ser contactada(o). <a href="/music/aviso-privacidad" className="underline">Aviso de Privacidad</a>.
                    </label>
                </div>

                {status === "error" && <p className="text-red-600 text-sm font-sans">Hubo un error. Por favor intenta por WhatsApp directamente.</p>}

                <button
                    disabled={status === "loading"}
                    type="submit"
                    className="w-full bg-foreground text-background py-4 rounded-xl font-bold hover:bg-foreground/90 transition-colors disabled:opacity-50 font-sans"
                >
                    {status === "loading" ? "Enviando..." : "Enviar datos"}
                </button>
            </div>
        </form>
    )
}

function FaqItem({ q, a }: { q: string, a: string }) {
    const [open, setOpen] = useState(false)
    return (
        <div className="border-b border-border/40 py-4 cursor-pointer" onClick={() => setOpen(!open)}>
            <div className="flex justify-between items-center text-left">
                <span className="font-bold text-lg">{q}</span>
                <ChevronDown className={`w-5 h-5 text-accent transition-transform ${open ? "rotate-180" : ""}`} />
            </div>
            {open && <div className="mt-4 text-muted-foreground font-light leading-relaxed font-sans">{a}</div>}
        </div>
    )
}


/* ─────────────────────── Page ─────────────────────── */

export default function MusicPage() {
    return (
        <div className="font-sans antialiased text-foreground bg-background">

            {/* ════════════ HERO SECTION ════════════ */}
            <section className="relative pt-32 pb-20 md:pt-48 md:pb-32 overflow-hidden border-b border-border/40">
                <div className="absolute inset-0 z-0 opacity-10">
                    <Image
                        src="/music-assets/piano-strings.png"
                        alt="Piano Strings Background"
                        fill
                        className="object-cover"
                    />
                </div>
                <div className="max-w-4xl mx-auto px-6 text-center relative z-10">
                    <div className="inline-flex items-center gap-2 px-3 py-1 text-xs font-semibold tracking-widest uppercase mb-8 border border-foreground/20 text-foreground/60">
                        <span className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse" />
                        {MUSIC_CONFIG.teacher.yearsExperience} años de experiencia
                    </div>

                    <h1 className="text-5xl md:text-7xl font-bold tracking-tighter mb-6 text-foreground">
                        Clases de piano <br className="hidden md:block" />
                        <span className="italic font-serif font-light text-accent text-4xl md:text-6xl">formales y completas</span>
                    </h1>

                    <p className="text-xl text-muted-foreground leading-relaxed max-w-2xl mx-auto mb-10 font-light font-sans">
                        Descubre un espacio de aprendizaje diseñado para crecer en serio —y disfrutarlo.
                        Clases estructuradas y profundamente completas: no solo aprendemos música, sino todo lo que la enriquece.
                    </p>

                    <div className="flex flex-col items-center justify-center gap-4">
                        <WhatsAppButton variant="primary" className="w-full sm:w-auto px-10 py-5 text-lg shadow-xl shadow-primary/20 font-sans">
                            Agendar clase de prueba
                        </WhatsAppButton>
                        <p className="text-sm text-muted-foreground mt-2 max-w-sm shrink-0 font-sans">
                            Escríbeme por WhatsApp y te cuento cómo funcionan las clases.
                        </p>
                        <a
                            href="#precios"
                            className="mt-4 text-sm font-medium underline underline-offset-4 text-foreground/80 hover:text-foreground transition-colors font-sans"
                        >
                            Ver modalidades
                        </a>
                    </div>
                </div>
            </section>

            {/* ════════════ STATS / TRUST (HERO FOOTER) ════════════ */}
            <section className="border-b border-border/40 bg-secondary/10">
                <div className="max-w-5xl mx-auto px-6 py-8">
                    <div className="flex flex-wrap justify-center md:justify-between gap-8 md:gap-4">
                        {TRUST_CHIPS.map((chip) => (
                            <div key={chip.label} className="flex items-center gap-3">
                                <chip.icon className="w-6 h-6 text-accent" />
                                <span className="text-sm font-semibold tracking-wide text-foreground font-sans">{chip.label}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ════════════ SOCIAL PROOF ════════════ */}
            {TESTIMONIALS.length > 0 && (
                <section className="py-24 px-6">
                    <div className="max-w-6xl mx-auto">
                        <div className="text-center mb-16">
                            <h2 className="text-3xl md:text-5xl font-bold tracking-tight mb-4">Lo que dicen los alumnos</h2>
                            <p className="text-muted-foreground font-light text-lg font-sans">Voces de quienes ya recorren este camino.</p>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
                            {TESTIMONIALS.map((t, i) => (
                                <div key={i} className="bg-secondary/20 p-8 rounded-2xl border border-border/40">
                                    <p className="text-lg font-serif italic mb-6 leading-relaxed">&quot;{t.quote}&quot;</p>
                                    <div className="flex items-center gap-4">
                                        <div className="w-12 h-12 bg-foreground/10 rounded-full flex items-center justify-center text-foreground font-bold">
                                            {t.name.charAt(0)}
                                        </div>
                                        <div>
                                            <p className="font-bold">{t.name}</p>
                                            <p className="text-sm text-muted-foreground font-sans">{t.role}</p>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>
            )}

            {/* ════════════ METHOD ════════════ */}
            <section id="metodo" className="py-24 md:py-32 px-6 bg-foreground text-background">
                <div className="max-w-6xl mx-auto">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-20 items-center">
                        <div className="order-2 md:order-1">
                            <h2 className="text-4xl md:text-6xl font-bold mb-8 tracking-tight">Enseñanza consciente.<br /><span className="text-primary font-serif italic font-light">Música completa.</span></h2>
                            <p className="text-lg text-background/70 mb-12 leading-relaxed font-light font-sans">
                                Exploraremos historia de la música, comprenderemos el contexto de cada obra y cultivaremos una mirada más amplia y sensible.
                                Leeremos partituras paso a paso, hasta que te sientas con la fluidez y seguridad de quien realmente entiende lo que interpreta.
                            </p>

                            <ul className="space-y-10">
                                {[
                                    { icon: BookOpen, title: "Historia de la Música", desc: "Contextualizamos cada pieza: su época, su compositor, su significado. Entender la música es parte de tocarla." },
                                    { icon: ScrollText, title: "Lectura de Partitura", desc: "Paso a paso hasta lograr fluidez. La partitura es tu mapa: aprenderás a leerlo con claridad y confianza." },
                                    { icon: Palette, title: "Tu Lenguaje Musical", desc: "Desde lo tradicional hasta lo experimental, construyes tu propia voz musical con bases sólidas y libertad creativa." },
                                ].map((item, i) => (
                                    <li key={i} className="flex gap-6">
                                        <div className="w-12 h-12 shrink-0 bg-background/10 rounded-full flex items-center justify-center text-primary">
                                            <item.icon className="w-6 h-6" />
                                        </div>
                                        <div>
                                            <h3 className="font-bold text-xl mb-2">{item.title}</h3>
                                            <p className="text-background/70 font-light leading-relaxed font-sans">{item.desc}</p>
                                        </div>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        <div className="order-1 md:order-2 relative aspect-[4/5] bg-background/5 rounded-2xl overflow-hidden shadow-2xl border border-background/20">
                            <Image
                                src="/music-assets/hands-on-keys.png"
                                alt="Piano keys close-up"
                                fill
                                className="object-cover"
                            />
                        </div>
                    </div>
                </div>
            </section>

            {/* ════════════ HOW IT WORKS ════════════ */}
            <section className="py-24 bg-secondary/10 border-y border-border/40 relative overflow-hidden">
                <div className="absolute -right-20 -bottom-20 w-80 h-80 opacity-5 rotate-12 z-0 hidden md:block">
                    <Image
                        src="/music-assets/piano-keys-geo.png"
                        alt=""
                        fill
                        className="object-contain"
                    />
                </div>
                <div className="max-w-6xl mx-auto px-6 relative z-10">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl md:text-5xl font-bold tracking-tight mb-4">Cómo funciona</h2>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-12 relative">
                        {/* Connecting line for desktop */}
                        <div className="hidden md:block absolute top-[60px] left-[15%] right-[15%] h-px bg-border/60 z-0"></div>

                        {STEPS.map((step, i) => (
                            <div key={i} className="relative z-10 flex flex-col items-center text-center bg-card p-8 rounded-2xl border border-border shadow-sm">
                                <div className="w-16 h-16 bg-secondary rounded-full flex items-center justify-center mb-6 text-foreground font-bold border border-border">
                                    {step.step}
                                </div>
                                <h3 className="text-xl font-bold mb-4">{step.title}</h3>
                                <p className="text-muted-foreground leading-relaxed font-light font-sans">{step.description}</p>
                            </div>
                        ))}
                    </div>

                    <div className="mt-16 text-center">
                        <WhatsAppButton variant="outline" className="px-8 py-4 font-sans">
                            Agendar clase de prueba
                        </WhatsAppButton>
                    </div>
                </div>
            </section>

            {/* ════════════ PRICING & OFFER ════════════ */}
            <section id="precios" className="py-24 px-6 border-b border-border/40">
                <div className="max-w-5xl mx-auto">
                    <div className="text-center mb-16">
                        <h2 className="text-4xl md:text-6xl font-bold mb-6 tracking-tight">Modalidades</h2>
                        <p className="text-lg text-muted-foreground font-sans">Opciones flexibles para todos los niveles y objetivos.</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
                        {MODALIDADES.map((mod, i) => (
                            <div key={i} className="bg-card p-8 rounded-2xl border border-border flex flex-col hover:border-accent/50 transition-colors">
                                <h3 className="text-2xl font-bold mb-2">{mod.title}</h3>
                                <div className="inline-flex items-center gap-1 text-sm font-medium text-accent bg-accent/10 px-3 py-1 rounded-full mb-6 w-fit font-sans">
                                    <Clock className="w-4 h-4" /> {mod.duration}
                                </div>
                                <p className="text-muted-foreground font-light text-sm mb-8 flex-1 font-sans">{mod.desc}</p>
                                <div className="pt-6 border-t border-border font-sans">
                                    <p className="text-xl font-bold">{mod.price}</p>
                                </div>
                            </div>
                        ))}
                    </div>

                    <p className="text-center text-sm text-muted-foreground bg-secondary/30 p-4 rounded-lg font-sans">
                        <span className="font-semibold text-foreground">Sobre precios: </span>
                        {MUSIC_CONFIG.pricing.rangeDisclaimer}
                    </p>
                </div>
            </section>

            {/* ════════════ TEACHER BIO ════════════ */}
            <section className="py-24 px-6">
                <div className="max-w-5xl mx-auto flex flex-col md:flex-row gap-16 items-center">
                    <div className="w-full md:w-1/3 relative aspect-[3/4] bg-secondary/30 rounded-2xl overflow-hidden shadow-sm border border-border shrink-0">
                        <Image
                            src="/music-assets/hero-portrait.png"
                            alt={`${MUSIC_CONFIG.teacher.name} — Maestra de Piano`}
                            fill
                            className="object-cover"
                        />
                    </div>
                    <div>
                        <h2 className="text-3xl md:text-5xl font-bold mb-6 tracking-tight">Tu Maestra</h2>
                        <h3 className="text-xl font-serif italic text-accent mb-8">{MUSIC_CONFIG.teacher.name}</h3>
                        <div className="space-y-6 text-lg text-muted-foreground font-light leading-relaxed font-sans">
                            <p>
                                Soy profesora de piano con {MUSIC_CONFIG.teacher.yearsExperience} años de experiencia, dedicada a formar músicos
                                que no solo tocan, sino que comprenden, sienten y piensan la música. Mi formación académica
                                comenzó en la {MUSIC_CONFIG.teacher.school}, donde desarrollé una base sólida en interpretación y teoría.
                            </p>
                            <p>
                                A lo largo de mi trayectoria he tomado múltiples cursos de pedagogía, historia de la música y
                                especializaciones musicales que enriquecen cada clase. Creo en una enseñanza consciente,
                                bien estructurada y llena de sentido.
                            </p>
                        </div>
                        <ul className="mt-8 space-y-3 font-medium text-foreground font-sans text-sm">
                            <li className="flex gap-2 items-center"><CheckCircle className="w-5 h-5 text-accent" /> Formada en la {MUSIC_CONFIG.teacher.school}</li>
                            <li className="flex gap-2 items-center"><CheckCircle className="w-5 h-5 text-accent" /> Especialista en pedagogía e historia de la música</li>
                            <li className="flex gap-2 items-center"><CheckCircle className="w-5 h-5 text-accent" /> {MUSIC_CONFIG.teacher.yearsExperience} años de experiencia en enseñanza musical</li>
                        </ul>
                    </div>
                </div>
            </section>

            {/* ════════════ POLICIES SUMMARY ════════════ */}
            <section className="py-16 px-6 bg-foreground text-background text-center">
                <div className="max-w-4xl mx-auto">
                    <h2 className="text-2xl font-bold mb-8">Reglamento (Resumen)</h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-left max-w-3xl mx-auto mb-8">
                        {POLICIES_SNAPSHOT.map((p, i) => (
                            <div key={i} className="bg-background/10 p-4 rounded-lg flex items-start gap-3">
                                <span className="text-primary shrink-0 mt-0.5">•</span>
                                <span className="text-sm font-light text-background/90 font-sans">{p}</span>
                            </div>
                        ))}
                    </div>
                    <a href="/music/politicas" className="text-sm font-medium underline underline-offset-4 hover:text-primary transition-colors font-sans">
                        Ver Reglamento Completo
                    </a>
                </div>
            </section>

            {/* ════════════ FAQ ════════════ */}
            <section className="py-24 px-6 border-b border-border/40">
                <div className="max-w-3xl mx-auto">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl md:text-5xl font-bold tracking-tight mb-4">Preguntas Frecuentes</h2>
                    </div>
                    <div className="divide-y divide-border/40">
                        {FAQS.map((faq, i) => (
                            <FaqItem key={i} q={faq.q} a={faq.a} />
                        ))}
                    </div>
                </div>
            </section>

            {/* ════════════ FINAL CTA & FALLBACK FORM ════════════ */}
            <section className="py-32 px-6 bg-secondary/30 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-1/2 h-full bg-accent/5 blur-3xl rounded-full translate-x-1/2" />
                <div className="absolute bottom-0 left-0 w-1/2 h-full bg-accent/5 blur-3xl rounded-full -translate-x-1/2" />

                <div className="max-w-5xl mx-auto relative z-10 text-center">
                    <h2 className="text-4xl md:text-6xl font-bold mb-8 tracking-tighter">Descubre tu voz musical</h2>

                    <WhatsAppButton variant="accent" className="px-12 py-6 text-xl shadow-xl shadow-accent/20 mb-16 font-sans">
                        Escríbeme por WhatsApp
                    </WhatsAppButton>

                    <div className="w-full max-w-4xl mx-auto border-t border-border/60 pt-16">
                        <LeadForm />
                    </div>
                </div>
            </section>

            {/* ════════════ FOOTER ════════════ */}
            <footer className="py-12 px-6 border-t border-border/40 bg-background font-sans">
                <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
                    <p className="text-sm text-muted-foreground">
                        © {new Date().getFullYear()} {MUSIC_CONFIG.teacher.name}. Clases de piano.
                    </p>
                    <nav className="flex gap-6 text-sm font-medium text-foreground/80">
                        <a href="/music" className="hover:text-accent transition-colors">Inicio</a>
                        <a href="/music/politicas" className="hover:text-accent transition-colors">Reglamento</a>
                        <a href="/music/aviso-privacidad" className="hover:text-accent transition-colors">Aviso de Privacidad</a>
                    </nav>
                </div>
            </footer>
        </div>
    )
}
