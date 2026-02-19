"use client"

import { useState } from "react"
import type { Metadata } from "next"
import Image from "next"
import { WhatsAppButton } from "@/components/ui/whatsapp-button"
import { MUSIC_CONFIG } from "@/config/music"
import {
    Music,
    Star,
    MapPin,
    ArrowRight,
    Users,
    Award,
    CheckCircle,
    Clock,
    Calendar,
    ChevronDown
} from "lucide-react"

/* ─────────────────────── Data ─────────────────────── */

const TRUST_CHIPS = [
    { icon: Award, label: "+10 años" },
    { icon: MapPin, label: "Santa Fe/Huixqui" },
    { icon: Users, label: "Todas las edades" },
    { icon: Star, label: "Método práctico" },
]

const TESTIMONIALS = [
    {
        quote: "Las clases son súper dinámicas. Empecé a tocar canciones que me gustan desde el primer mes, nada de meses leyendo teoría sin tocar.",
        name: "María Fernanda R.",
        role: "Adulta Principiante",
        zone: "Santa Fe"
    },
    {
        quote: "Mi hijo de 8 años está feliz. La paciencia y el método práctico mantienen su atención toda la clase.",
        name: "Carlos T.",
        role: "Papá de alumno",
        zone: "Huixquilucan"
    }
]

const STEPS = [
    {
        step: "01",
        title: "WhatsApp",
        icon: <MessageCircle className="w-8 h-8 text-accent mb-4" />,
        description: "Envía un mensaje. Responderé para confirmar edad, nivel, zona y horarios disponibles.",
    },
    {
        step: "02",
        title: "Clase de Prueba",
        icon: <Calendar className="w-8 h-8 text-accent mb-4" />,
        description: "Te propongo 2–3 horarios. Agendamos tu prueba y te envío política resumida.",
    },
    {
        step: "03",
        title: "Pago y Rutina",
        icon: <CheckCircle className="w-8 h-8 text-accent mb-4" />,
        description: "Confirmamos pago semanal/mensual. Recibes recordatorios y material a medida.",
    },
]

const MODALIDADES = [
    {
        title: "Clase de Prueba",
        duration: "60 min",
        desc: "Evaluación inicial, expectativas y primeros acordes.",
        price: MUSIC_CONFIG.pricing.trialPriceAnchor ? `$${MUSIC_CONFIG.pricing.trialPriceAnchor} MXN` : "Consultar"
    },
    {
        title: "Clase Regular",
        duration: "60 / 90 / 120 min",
        desc: "Sesiones semanales prácticas con repertorio personalizado.",
        price: `Desde $${MUSIC_CONFIG.pricing.regularPriceAnchor} MXN`
    },
    {
        title: "Coaching Avanzado",
        duration: "Bajo diseño",
        desc: "Preparación de repertorio profesional o grabación.",
        price: "Consultar"
    }
]

const POLICIES_SNAPSHOT = [
    `Cancelación con ${MUSIC_CONFIG.policies.cancellationHours}h de anticipación.`,
    `Reprogramaciones: ${MUSIC_CONFIG.policies.reschedulingLimit}.`,
    "Pagos: Transferencia/Efectivo, requeridos antes de la sesión.",
    "Tolerancia de 15 min de retraso (se descuentan del tiempo de clase)."
]

const FAQS = [
    {
        q: "¿Aceptas niños y adultos?",
        a: "Sí, el método se adapta. Trabajo con niños desde los 6 años hasta adultos de cualquier edad."
    },
    {
        q: "¿Necesito tener instrumento en casa?",
        a: "Lo ideal es tener uno (aunque sea un teclado básico) para practicar, pero para la primera clase de prueba no es estrictamente necesario."
    },
    {
        q: "¿Cómo agendamos los horarios?",
        a: "Al contactarme por WhatsApp te diré qué huecos tengo disponibles en tu zona. Normalmente fijamos un día y hora fijo a la semana."
    },
    {
        q: "¿Puedo cancelar una clase?",
        a: `Sí, avisando con ${MUSIC_CONFIG.policies.cancellationHours}h de anticipación para poder reponerla, de lo contrario la clase se cobra.`
    },
    {
        q: "¿Vas a otras zonas además de Santa Fe/Huixquilucan?",
        a: "Principalmente cubro esas áreas. Si estás cerca, escríbeme y revisamos si es viable con un ajuste en el costo de traslado."
    }
]

// Local specific import just for the fallback form icon
import { MessageCircle } from "lucide-react"

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
            name: formData.get("name"),
            whatsapp: formData.get("whatsapp"),
            zone: formData.get("zone"),
            times: formData.get("times"),
            timestamp: new Date().toISOString(),
            source: window.location.href
        }

        try {
            // MVP POST logic to n8n Webhook Placeholder
            const res = await fetch(MUSIC_CONFIG.integrations.n8nWebhookUrl, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(data)
            })

            // For MVP placeholder, we just mock success if URL is placeholder
            if (MUSIC_CONFIG.integrations.n8nWebhookUrl.includes("placeholder")) {
                await new Promise(r => setTimeout(r, 1000))
                setStatus("success")
                window.location.href = "/music/gracias"
                return
            }

            if (!res.ok) throw new Error("Network response was not ok")
            setStatus("success")
            window.location.href = "/music/gracias"
        } catch (error) {
            console.error(error)
            setStatus("error")
        }
    }

    if (status === "success") {
        return (
            <div className="p-8 text-center bg-green-50 rounded-xl border border-green-200">
                <CheckCircle className="w-12 h-12 text-green-500 mx-auto mb-4" />
                <h3 className="text-xl font-bold text-green-900 mb-2">¡Gracias!</h3>
                <p className="text-green-800">Tus datos han sido enviados. Te contactaré a la brevedad por WhatsApp.</p>
            </div>
        )
    }

    return (
        <form onSubmit={handleSubmit} className="bg-white p-6 md:p-8 rounded-2xl shadow-xl border border-border/50 max-w-md mx-auto mt-12 text-left">
            <h3 className="text-xl font-bold mb-6 text-center">O déjame tus datos y yo te escribo</h3>

            {/* Honeypot */}
            <input type="text" name="subject" className="hidden" tabIndex={-1} autoComplete="off" />

            <div className="space-y-4">
                <div>
                    <label htmlFor="name" className="block text-sm font-medium text-foreground/80 mb-1">Nombre</label>
                    <input required id="name" name="name" type="text" className="w-full px-4 py-3 rounded-lg border border-border focus:border-accent outline-none transition-colors" placeholder="Tu nombre" />
                </div>

                <div>
                    <label htmlFor="whatsapp" className="block text-sm font-medium text-foreground/80 mb-1">WhatsApp</label>
                    <input required id="whatsapp" name="whatsapp" type="tel" className="w-full px-4 py-3 rounded-lg border border-border focus:border-accent outline-none transition-colors" placeholder="10 dígitos" />
                </div>

                <div>
                    <label htmlFor="zone" className="block text-sm font-medium text-foreground/80 mb-1">Zona</label>
                    <select required id="zone" name="zone" className="w-full px-4 py-3 rounded-lg border border-border focus:border-accent outline-none bg-white">
                        <option value="">Selecciona tu zona...</option>
                        <option value="Santa Fe">Santa Fe</option>
                        <option value="Huixquilucan">Huixquilucan</option>
                        <option value="Otra">Otra (escribir abajo)</option>
                    </select>
                </div>

                <div>
                    <label htmlFor="times" className="block text-sm font-medium text-foreground/80 mb-1">Horarios de interés</label>
                    <input required id="times" name="times" type="text" className="w-full px-4 py-3 rounded-lg border border-border focus:border-accent outline-none transition-colors" placeholder="Ej: Martes por la tarde" />
                </div>

                <div className="flex items-start gap-2 pt-2">
                    <input required type="checkbox" id="consent" className="mt-1" />
                    <label htmlFor="consent" className="text-xs text-muted-foreground">
                        Acepto compartir estos datos para ser contactado. <a href="/music/aviso-privacidad" className="underline">Aviso de Privacidad</a>.
                    </label>
                </div>

                {status === "error" && <p className="text-red-500 text-sm">Hubo un error. Por favor intenta por WhatsApp directamente.</p>}

                <button
                    disabled={status === "loading"}
                    type="submit"
                    className="w-full bg-foreground text-background py-4 rounded-xl font-bold hover:bg-foreground/90 transition-colors disabled:opacity-50"
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
            {open && <div className="mt-4 text-muted-foreground font-light leading-relaxed">{a}</div>}
        </div>
    )
}


/* ─────────────────────── Page ─────────────────────── */

export default function MusicPage() {
    return (
        <div className="font-sans antialiased text-foreground bg-background">

            {/* ════════════ HERO SECTION ════════════ */}
            <section className="relative pt-32 pb-20 md:pt-48 md:pb-32 overflow-hidden border-b border-border/40">
                <div className="max-w-4xl mx-auto px-6 text-center">
                    <div className="inline-flex items-center gap-2 px-3 py-1 text-xs font-semibold tracking-widest uppercase mb-8 border border-foreground/20 text-foreground/60">
                        <span className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse" />
                        Cupo limitado
                    </div>

                    <h1 className="text-5xl md:text-7xl font-bold tracking-tighter mb-6 text-foreground">
                        Clases de piano/música a domicilio <br className="hidden md:block" />
                        <span className="italic font-serif font-light text-accent text-4xl md:text-6xl">Santa Fe & Huixquilucan</span>
                    </h1>

                    <p className="text-xl text-muted-foreground leading-relaxed max-w-2xl mx-auto mb-10 font-light">
                        Método práctico para niños y adultos. Aprende a tocar tus canciones favoritas desde el primer día, sin aburrirte con teoría infinita.
                    </p>

                    <div className="flex flex-col items-center justify-center gap-4">
                        <WhatsAppButton variant="primary" className="w-full sm:w-auto px-10 py-5 text-lg shadow-xl shadow-green-500/20">
                            Agendar clase de prueba
                        </WhatsAppButton>
                        <p className="text-sm text-muted-foreground/80 mt-2 max-w-sm shrink-0">
                            Respondo por WhatsApp. Te propongo 2–3 horarios y confirmamos en minutos.
                        </p>
                        <a
                            href="#precios"
                            className="mt-4 text-sm font-medium underline underline-offset-4 text-foreground/80 hover:text-foreground transition-colors"
                        >
                            Ver precios
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
                                <span className="text-sm font-semibold tracking-wide text-foreground">{chip.label}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ════════════ SOCIAL PROOF ════════════ */}
            <section className="py-24 px-6">
                <div className="max-w-6xl mx-auto">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl md:text-5xl font-bold tracking-tight mb-4">Lo que dicen los alumnos</h2>
                        <p className="text-muted-foreground font-light text-lg">Progreso medible. Resultados reales.</p>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
                        {TESTIMONIALS.map((t, i) => (
                            <div key={i} className="bg-secondary/20 p-8 rounded-2xl border border-border/40">
                                <p className="text-lg font-serif italic mb-6 leading-relaxed">"{t.quote}"</p>
                                <div className="flex items-center gap-4">
                                    <div className="w-12 h-12 bg-foreground/10 rounded-full flex items-center justify-center text-foreground font-bold">
                                        {t.name.charAt(0)}
                                    </div>
                                    <div>
                                        <p className="font-bold">{t.name}</p>
                                        <p className="text-sm text-muted-foreground">{t.role} • {t.zone}</p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ════════════ METHOD ════════════ */}
            <section id="metodo" className="py-24 md:py-32 px-6 bg-foreground text-background">
                <div className="max-w-6xl mx-auto">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-20 items-center">
                        <div className="order-2 md:order-1">
                            <h2 className="text-4xl md:text-6xl font-bold mb-8 tracking-tight">Menos teoría.<br /><span className="text-accent font-serif italic font-light">Más música.</span></h2>
                            <p className="text-lg text-background/70 mb-12 leading-relaxed font-light">
                                Mi enfoque es 100% práctico. No pasaremos meses leyendo partituras antes de tocar.
                                Desde el día uno, el objetivo es hacer música real.
                            </p>

                            <ul className="space-y-10">
                                {[
                                    { icon: Star, title: "Personalización Total", desc: "No hay dos alumnos iguales. Tu plan se adapta a tus gustos musicales (pop, rock, clásica, etc)." },
                                    { icon: Award, title: "Feedback Inmediato", desc: "Corregimos técnica, postura y ritmo al momento para evitar vicios futuros." },
                                    { icon: Music, title: "Progreso Visible", desc: "Grabamos tus avances periódicamente para que escuches tu propia evolución." },
                                ].map((item, i) => (
                                    <li key={i} className="flex gap-6">
                                        <div className="w-12 h-12 shrink-0 bg-background/10 rounded-full flex items-center justify-center text-accent">
                                            <item.icon className="w-6 h-6" />
                                        </div>
                                        <div>
                                            <h3 className="font-bold text-xl mb-2">{item.title}</h3>
                                            <p className="text-background/60 font-light leading-relaxed">{item.desc}</p>
                                        </div>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        <div className="order-1 md:order-2 relative aspect-[4/5] bg-background/5 rounded-2xl overflow-hidden shadow-2xl border border-background/20">
                            {/* PLACEHOLDER: hands-on-keys.webp */}
                            <div className="absolute inset-0 flex items-center justify-center flex-col text-background/30 p-8 text-center border-2 border-dashed border-background/20 m-4 rounded-xl">
                                <Music className="w-16 h-16 mb-4" />
                                <span className="font-mono text-sm">[PLACEHOLDER: /assets/img/hands-on-keys.webp]</span>
                                <span className="text-xs mt-2">Editorial close-up of hands playing piano</span>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* ════════════ HOW IT WORKS ════════════ */}
            <section className="py-24 bg-secondary/10 border-y border-border/40">
                <div className="max-w-6xl mx-auto px-6">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl md:text-5xl font-bold tracking-tight mb-4">Cómo funciona</h2>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-12 relative">
                        {/* Connecting line for desktop */}
                        <div className="hidden md:block absolute top-[60px] left-[15%] right-[15%] h-px bg-border/60 z-0"></div>

                        {STEPS.map((step, i) => (
                            <div key={i} className="relative z-10 flex flex-col items-center text-center bg-background p-8 rounded-2xl border border-border shadow-sm">
                                <div className="w-16 h-16 bg-secondary rounded-full flex items-center justify-center mb-6 text-foreground font-bold border border-border">
                                    {step.step}
                                </div>
                                <h3 className="text-xl font-bold mb-4">{step.title}</h3>
                                <p className="text-muted-foreground leading-relaxed font-light">{step.description}</p>
                            </div>
                        ))}
                    </div>

                    <div className="mt-16 text-center">
                        <WhatsAppButton variant="outline" className="px-8 py-4">
                            Agendar clase de prueba
                        </WhatsAppButton>
                    </div>
                </div>
            </section>

            {/* ════════════ PRICING & OFFER ════════════ */}
            <section id="precios" className="py-24 px-6 border-b border-border/40">
                <div className="max-w-5xl mx-auto">
                    <div className="text-center mb-16">
                        <h2 className="text-4xl md:text-6xl font-bold mb-6 tracking-tight">Modalidades y Costos</h2>
                        <p className="text-lg text-muted-foreground">Opciones flexibles para todos los niveles y objetivos.</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
                        {MODALIDADES.map((mod, i) => (
                            <div key={i} className="bg-card p-8 rounded-2xl border border-border flex flex-col hover:border-accent/50 transition-colors">
                                <h3 className="text-2xl font-bold mb-2">{mod.title}</h3>
                                <div className="inline-flex items-center gap-1 text-sm font-medium text-accent bg-accent/10 px-3 py-1 rounded-full mb-6 w-fit">
                                    <Clock className="w-4 h-4" /> {mod.duration}
                                </div>
                                <p className="text-muted-foreground font-light text-sm mb-8 flex-1">{mod.desc}</p>
                                <div className="pt-6 border-t border-border">
                                    <p className="text-xl font-bold">{mod.price}</p>
                                </div>
                            </div>
                        ))}
                    </div>

                    <p className="text-center text-sm text-muted-foreground bg-secondary/30 p-4 rounded-lg">
                        <span className="font-semibold text-foreground">Importante sobre precios: </span>
                        {MUSIC_CONFIG.pricing.rangeDisclaimer}
                    </p>
                </div>
            </section>

            {/* ════════════ MAP & ZONES ════════════ */}
            <section className="py-24 px-6 bg-secondary/10">
                <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
                    <div>
                        <h2 className="text-3xl md:text-5xl font-bold mb-6 tracking-tight">A domicilio en<br />Santa Fe y Huixquilucan</h2>
                        <p className="text-lg text-muted-foreground mb-8">
                            Disfruta de la comodidad de aprender música en tu propia casa. Llevo el método y la didáctica directamente a tu espacio.
                        </p>
                        <p className="text-sm bg-background p-4 border border-border rounded-lg inline-flex items-center gap-3">
                            <MapPin className="text-accent shrink-0" />
                            <span>{MUSIC_CONFIG.zones.surchargeLogic} Escríbeme para cotizar tu ubicación exacta.</span>
                        </p>
                    </div>
                    <div className="relative aspect-video bg-background rounded-2xl overflow-hidden shadow-sm border border-border">
                        {/* PLACEHOLDER: zone-map.webp */}
                        <div className="absolute inset-0 flex items-center justify-center flex-col text-muted-foreground p-8 text-center border-2 border-dashed border-border m-4 rounded-xl">
                            <MapPin className="w-12 h-12 mb-4" />
                            <span className="font-mono text-sm">[PLACEHOLDER: /assets/img/zone-map.webp]</span>
                            <span className="text-xs mt-2">Static image map highlighting Santa Fe / Huixquilucan</span>
                        </div>
                    </div>
                </div>
            </section>

            {/* ════════════ TEACHER BIO ════════════ */}
            <section className="py-24 px-6">
                <div className="max-w-5xl mx-auto flex flex-col md:flex-row gap-16 items-center">
                    <div className="w-full md:w-1/3 relative aspect-[3/4] bg-secondary/30 rounded-2xl overflow-hidden shadow-sm border border-border shrink-0">
                        {/* PLACEHOLDER: hero-portrait.webp */}
                        <div className="absolute inset-0 flex items-center justify-center flex-col text-muted-foreground p-6 text-center border-2 border-dashed border-border m-4 rounded-xl">
                            <Users className="w-12 h-12 mb-4" />
                            <span className="font-mono text-sm">[PLACEHOLDER: /assets/img/hero-portrait.webp]</span>
                            <span className="text-xs mt-2">Clean, friendly professional teacher portrait</span>
                        </div>
                    </div>
                    <div>
                        <h2 className="text-3xl md:text-5xl font-bold mb-6">Tu Maestro</h2>
                        <h3 className="text-xl font-serif italic text-accent mb-8">Alejandro AG</h3>
                        <div className="space-y-6 text-lg text-muted-foreground font-light leading-relaxed">
                            <p>
                                Con más de 10 años de experiencia tocando y enseñando, he desarrollado un método donde
                                la frustración musical desaparece. Mi filosofía es simple: la teoría debe estar al servicio de la práctica, no al revés.
                            </p>
                            <p>
                                Si alguna vez tomaste clases abstractas y terminaste abandonando el instrumento, mi objetivo
                                es reconectar esa pasión enseñándote a hacer música desde la sesión uno.
                            </p>
                        </div>
                        <ul className="mt-8 space-y-3 font-medium text-foreground">
                            <li className="flex gap-2 items-center"><CheckCircle className="w-5 h-5 text-accent" /> Especialista en enseñanza práctica</li>
                            <li className="flex gap-2 items-center"><CheckCircle className="w-5 h-5 text-accent" /> Pianista y multi-instrumentista</li>
                            <li className="flex gap-2 items-center"><CheckCircle className="w-5 h-5 text-accent" /> Experiencia en pedagogía infantil y adulta</li>
                        </ul>
                    </div>
                </div>
            </section>

            {/* ════════════ POLICIES SUMMARY ════════════ */}
            <section className="py-16 px-6 bg-foreground text-background text-center">
                <div className="max-w-4xl mx-auto">
                    <h2 className="text-2xl font-bold mb-8">Nuestras Políticas (Resumen)</h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-left max-w-3xl mx-auto mb-8">
                        {POLICIES_SNAPSHOT.map((p, i) => (
                            <div key={i} className="bg-background/10 p-4 rounded-lg flex items-start gap-3">
                                <span className="text-accent shrink-0 mt-0.5">•</span>
                                <span className="text-sm font-light text-background/90">{p}</span>
                            </div>
                        ))}
                    </div>
                    <a href="/music/politicas" className="text-sm font-medium underline underline-offset-4 hover:text-accent transition-colors">
                        Ver Políticas Completas
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
                    <h2 className="text-4xl md:text-6xl font-bold mb-8 tracking-tighter">¿Listo para hacer música?</h2>

                    <WhatsAppButton variant="primary" className="!bg-accent !text-white hover:!bg-accent/90 px-12 py-6 text-xl shadow-xl shadow-accent/20 mb-16">
                        Agendar clase de prueba
                    </WhatsAppButton>

                    <div className="w-full max-w-4xl mx-auto border-t border-border/60 pt-16">
                        <LeadForm />
                    </div>
                </div>
            </section>
        </div>
    )
}
