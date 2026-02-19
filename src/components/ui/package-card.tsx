"use client"

import { motion } from "framer-motion"
import { cn } from "@/lib/utils"
import { ArrowRight, Check } from "lucide-react"

interface PackageCardProps {
    title: string
    subtitle: string
    deliverables: string[]
    ctaText: string
    ctaHref: string
    highlighted?: boolean
    index?: number
}

export function PackageCard({
    title,
    subtitle,
    deliverables,
    ctaText,
    ctaHref,
    highlighted = false,
    index = 0,
}: PackageCardProps) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: index * 0.12 }}
            className={cn(
                "relative group",
                highlighted && "md:-mt-4 md:mb-4"
            )}
        >
            {/* Highlighted glow */}
            {highlighted && (
                <div className="absolute -inset-[2px] rounded-2xl bg-gradient-to-br from-yellow-400/30 via-yellow-400/10 to-yellow-400/30 blur-sm" />
            )}

            <div
                className={cn(
                    "relative h-full flex flex-col rounded-2xl border p-8",
                    "transition-all duration-300 hover:-translate-y-1",
                    highlighted
                        ? "border-yellow-400/40 bg-card shadow-lg shadow-yellow-400/5"
                        : "border-border/50 bg-card hover:shadow-lg hover:shadow-yellow-400/5"
                )}
            >
                {/* Recommended badge */}
                {highlighted && (
                    <span className="absolute -top-3 left-8 px-3 py-1 rounded-full bg-yellow-400 text-yellow-950 text-xs font-bold uppercase tracking-wider">
                        Recomendado
                    </span>
                )}

                {/* Title */}
                <h4 className="text-lg font-bold text-foreground mb-1">{title}</h4>
                <p className="text-sm text-muted-foreground mb-6">{subtitle}</p>

                {/* Deliverables */}
                <ul className="space-y-3 mb-8 flex-1">
                    {deliverables.map((item, i) => (
                        <li key={i} className="flex items-start gap-3 text-sm text-foreground/80">
                            <Check className="w-4 h-4 mt-0.5 text-yellow-500 shrink-0" />
                            {item}
                        </li>
                    ))}
                </ul>

                {/* CTA */}
                <a
                    href={ctaHref}
                    className={cn(
                        "inline-flex items-center justify-center gap-2 rounded-full px-6 py-3 text-sm font-medium transition-all duration-200",
                        highlighted
                            ? "bg-yellow-400 text-yellow-950 hover:bg-yellow-300 shadow-md shadow-yellow-400/20"
                            : "border border-border bg-background hover:bg-accent text-foreground"
                    )}
                >
                    {ctaText}
                    <ArrowRight className="w-4 h-4" />
                </a>
            </div>
        </motion.div>
    )
}
