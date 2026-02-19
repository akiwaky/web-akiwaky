"use client"

import * as React from "react"
import { cn } from "@/lib/utils"
import { Send, Calendar } from "lucide-react"

// TODO: Replace with your actual email address
const CONTACT_EMAIL = "tu@email.com"
// TODO: Replace with your scheduling link (Calendly, Cal.com, etc.)
const SCHEDULING_LINK = "#"

const COMPANY_SIZES = ["< 20", "20–50", "50–100", "100–500", "500+"]
const BUDGET_RANGES = ["< $10k", "$10k–$50k", "$50k–$100k", "$100k+"]
const SERVICE_OPTIONS = [
    { id: "audit", label: "Audit" },
    { id: "build-sprint", label: "Build Sprint" },
    { id: "retainer", label: "Retainer" },
]

export function ContactForm() {
    const [formData, setFormData] = React.useState({
        name: "",
        email: "",
        company: "",
        companySize: "",
        budget: "",
        services: [] as string[],
        message: "",
    })

    const handleServiceToggle = (serviceId: string) => {
        setFormData((prev) => ({
            ...prev,
            services: prev.services.includes(serviceId)
                ? prev.services.filter((s) => s !== serviceId)
                : [...prev.services, serviceId],
        }))
    }

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()

        // TODO: Replace mailto fallback with Formspree, Resend, or serverless endpoint
        const subject = encodeURIComponent(
            `Consulta de ${formData.name} — ${formData.services.join(", ") || "General"}`
        )
        const body = encodeURIComponent(
            [
                `Nombre: ${formData.name}`,
                `Email: ${formData.email}`,
                `Empresa: ${formData.company || "N/A"}`,
                `Tamaño: ${formData.companySize || "N/A"}`,
                `Presupuesto: ${formData.budget || "N/A"}`,
                `Servicios: ${formData.services.join(", ") || "N/A"}`,
                ``,
                `Mensaje:`,
                formData.message,
            ].join("\n")
        )
        window.location.href = `mailto:${CONTACT_EMAIL}?subject=${subject}&body=${body}`
    }

    const inputClasses =
        "w-full rounded-xl border border-border/60 bg-background px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground/60 focus:border-yellow-400/50 focus:ring-2 focus:ring-yellow-400/20 focus:outline-none transition-all duration-200"
    const labelClasses = "block text-sm font-medium text-foreground/80 mb-1.5"

    return (
        <form onSubmit={handleSubmit} className="space-y-5">
            {/* Name & Email row */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                    <label htmlFor="contact-name" className={labelClasses}>
                        Nombre *
                    </label>
                    <input
                        id="contact-name"
                        type="text"
                        required
                        placeholder="Tu nombre"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className={inputClasses}
                    />
                </div>
                <div>
                    <label htmlFor="contact-email" className={labelClasses}>
                        Email *
                    </label>
                    <input
                        id="contact-email"
                        type="email"
                        required
                        placeholder="tu@empresa.com"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className={inputClasses}
                    />
                </div>
            </div>

            {/* Company & Size */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                    <label htmlFor="contact-company" className={labelClasses}>
                        Empresa <span className="text-muted-foreground">(opcional)</span>
                    </label>
                    <input
                        id="contact-company"
                        type="text"
                        placeholder="Nombre de tu empresa"
                        value={formData.company}
                        onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                        className={inputClasses}
                    />
                </div>
                <div>
                    <label htmlFor="contact-size" className={labelClasses}>
                        Tamaño de empresa
                    </label>
                    <select
                        id="contact-size"
                        value={formData.companySize}
                        onChange={(e) => setFormData({ ...formData, companySize: e.target.value })}
                        className={cn(inputClasses, "appearance-none cursor-pointer")}
                    >
                        <option value="">Seleccionar...</option>
                        {COMPANY_SIZES.map((size) => (
                            <option key={size} value={size}>{size} empleados</option>
                        ))}
                    </select>
                </div>
            </div>

            {/* Budget */}
            <div>
                <label htmlFor="contact-budget" className={labelClasses}>
                    Rango de presupuesto
                </label>
                <select
                    id="contact-budget"
                    value={formData.budget}
                    onChange={(e) => setFormData({ ...formData, budget: e.target.value })}
                    className={cn(inputClasses, "appearance-none cursor-pointer")}
                >
                    <option value="">Seleccionar...</option>
                    {BUDGET_RANGES.map((range) => (
                        <option key={range} value={range}>{range}</option>
                    ))}
                </select>
            </div>

            {/* Services checkboxes */}
            <div>
                <p className={labelClasses}>Servicios de interés</p>
                <div className="flex flex-wrap gap-3">
                    {SERVICE_OPTIONS.map((service) => (
                        <label
                            key={service.id}
                            className={cn(
                                "inline-flex items-center gap-2 px-4 py-2.5 rounded-xl border cursor-pointer text-sm transition-all duration-200",
                                formData.services.includes(service.id)
                                    ? "border-yellow-400/50 bg-yellow-400/10 text-yellow-600 dark:text-yellow-400"
                                    : "border-border/50 bg-background text-muted-foreground hover:border-border"
                            )}
                        >
                            <input
                                type="checkbox"
                                checked={formData.services.includes(service.id)}
                                onChange={() => handleServiceToggle(service.id)}
                                className="sr-only"
                            />
                            {service.label}
                        </label>
                    ))}
                </div>
            </div>

            {/* Message */}
            <div>
                <label htmlFor="contact-message" className={labelClasses}>
                    Describe tu problema o workflow *
                </label>
                <textarea
                    id="contact-message"
                    required
                    rows={4}
                    placeholder="¿Qué procesos quieres automatizar? ¿Qué herramientas usas hoy?"
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className={cn(inputClasses, "resize-none")}
                />
            </div>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row gap-3 pt-2">
                <button
                    type="submit"
                    className="inline-flex items-center justify-center gap-2 rounded-full bg-yellow-400 px-8 py-3.5 text-sm font-semibold text-yellow-950 hover:bg-yellow-300 shadow-lg shadow-yellow-400/20 transition-all duration-200 hover:-translate-y-0.5"
                >
                    <Send className="w-4 h-4" />
                    Enviar
                </button>
                <a
                    href={SCHEDULING_LINK}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-2 rounded-full border border-border px-8 py-3.5 text-sm font-medium text-foreground hover:bg-accent transition-all duration-200"
                >
                    <Calendar className="w-4 h-4" />
                    Agendar llamada
                </a>
            </div>
        </form>
    )
}
