"use client"

import { motion } from "framer-motion"
import { ContactForm } from "@/components/ui/contact-form"
import { Mail, Linkedin, Github, ArrowUpRight } from "lucide-react"

// TODO: Replace these with your actual links
const CONTACT_LINKS = [
    {
        icon: Mail,
        label: "Email",
        value: "tu@email.com",
        href: "mailto:tu@email.com",
    },
    {
        icon: Linkedin,
        label: "LinkedIn",
        value: "linkedin.com/in/tuprofile",
        href: "#", // TODO: Add your LinkedIn URL
    },
    {
        icon: Github,
        label: "GitHub",
        value: "github.com/tuusuario",
        href: "#", // TODO: Add your GitHub URL
    },
]

export function Contact() {
    return (
        <section id="contacto" className="py-24 md:py-32 bg-secondary/40 relative overflow-hidden">
            {/* Background accents */}
            <div className="absolute top-0 left-1/4 w-80 h-80 bg-yellow-400/5 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute bottom-0 right-1/4 w-64 h-64 bg-yellow-400/3 rounded-full blur-3xl pointer-events-none" />

            <div className="container px-6 md:px-12 max-w-6xl mx-auto relative z-10">
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="mb-16 text-center"
                >
                    <p className="text-sm font-semibold text-yellow-600 dark:text-yellow-400 uppercase tracking-wider mb-4">
                        Contacto / Get in Touch
                    </p>
                    <h2 className="text-3xl md:text-5xl font-bold text-foreground">
                        Hablemos
                    </h2>
                </motion.div>

                {/* Two-column layout */}
                <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 lg:gap-16 mb-20">
                    {/* Left: pitch */}
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                        className="lg:col-span-2 flex flex-col justify-center"
                    >
                        <h3 className="text-2xl md:text-3xl font-bold text-foreground mb-4 leading-tight">
                            Cuéntame dónde estás hoy.
                        </h3>
                        <p className="text-muted-foreground text-lg leading-relaxed mb-6">
                            Ya sea que tengas procesos manuales que te están frenando, datos en silos, o un equipo que necesita las herramientas correctas — estoy aquí para ayudar.
                        </p>
                        <div className="flex items-center gap-3 bg-yellow-400/10 border border-yellow-400/20 rounded-xl px-5 py-3">
                            <div className="w-2 h-2 rounded-full bg-yellow-400 animate-pulse" />
                            <p className="text-sm font-medium text-foreground">
                                Respondo en 24–48h con 2–3 próximos pasos claros.
                            </p>
                        </div>
                    </motion.div>

                    {/* Right: form */}
                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: 0.15 }}
                        className="lg:col-span-3"
                    >
                        <div className="bg-card border border-border/50 rounded-2xl p-6 md:p-8 shadow-sm">
                            <ContactForm />
                        </div>
                    </motion.div>
                </div>

                {/* Contact Cards */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                    className="grid grid-cols-1 sm:grid-cols-3 gap-4"
                >
                    {CONTACT_LINKS.map((link) => (
                        <a
                            key={link.label}
                            href={link.href}
                            target={link.href.startsWith("mailto:") ? undefined : "_blank"}
                            rel={link.href.startsWith("mailto:") ? undefined : "noopener noreferrer"}
                            className="group flex items-center gap-4 bg-card border border-border/50 rounded-2xl p-5 hover:shadow-lg hover:shadow-yellow-400/5 hover:-translate-y-0.5 transition-all duration-300"
                        >
                            <div className="flex items-center justify-center w-12 h-12 rounded-xl bg-yellow-400/10 text-yellow-600 dark:text-yellow-400 group-hover:bg-yellow-400/20 transition-colors">
                                <link.icon className="w-5 h-5" />
                            </div>
                            <div className="flex-1 min-w-0">
                                <p className="text-sm font-semibold text-foreground">{link.label}</p>
                                <p className="text-sm text-muted-foreground truncate">{link.value}</p>
                            </div>
                            <ArrowUpRight className="w-4 h-4 text-muted-foreground group-hover:text-yellow-500 transition-colors shrink-0" />
                        </a>
                    ))}
                </motion.div>
            </div>
        </section>
    )
}
