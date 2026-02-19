"use client"

import { motion } from "framer-motion"
import { cn } from "@/lib/utils"
import { ArrowRight } from "lucide-react"
import type { LucideIcon } from "lucide-react"

interface ServiceCardProps {
    stepNumber: number
    icon: LucideIcon
    title: string
    subtitle: string
    positioning: string
    deliverables: string[]
    bestFor: string
    ctaText: string
    ctaHref: string
    index?: number
}

export function ServiceCard({
    stepNumber,
    icon: Icon,
    title,
    subtitle,
    positioning,
    deliverables,
    bestFor,
    ctaText,
    ctaHref,
    index = 0,
}: ServiceCardProps) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: index * 0.15 }}
            className="group relative"
        >
            {/* Gradient border effect on hover */}
            <div className="absolute -inset-[1px] rounded-2xl bg-gradient-to-br from-yellow-400/0 via-yellow-400/0 to-yellow-400/0 group-hover:from-yellow-400/20 group-hover:via-yellow-400/5 group-hover:to-transparent transition-all duration-500 opacity-0 group-hover:opacity-100" />

            <div
                className={cn(
                    "relative h-full flex flex-col rounded-2xl border border-border/50 bg-card p-8",
                    "hover:shadow-xl hover:shadow-yellow-400/5 hover:-translate-y-1",
                    "transition-all duration-300"
                )}
            >
                {/* Step badge + icon */}
                <div className="flex items-center justify-between mb-6">
                    <span className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-yellow-400/10 text-yellow-600 dark:text-yellow-400 text-sm font-bold">
                        {String(stepNumber).padStart(2, "0")}
                    </span>
                    <Icon className="w-6 h-6 text-muted-foreground group-hover:text-yellow-500 transition-colors" />
                </div>

                {/* Title & subtitle */}
                <h4 className="text-xl font-bold text-foreground mb-1">{title}</h4>
                <p className="text-sm font-medium text-muted-foreground mb-4">{subtitle}</p>

                {/* Positioning sentence */}
                <p className="text-sm text-foreground/80 leading-relaxed mb-6">{positioning}</p>

                {/* Deliverables */}
                <div className="mb-6 flex-1">
                    <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-3">
                        Qué entrego
                    </p>
                    <ul className="space-y-2">
                        {deliverables.map((item, i) => (
                            <li key={i} className="flex items-start gap-2 text-sm text-foreground/80">
                                <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-yellow-400 shrink-0" />
                                {item}
                            </li>
                        ))}
                    </ul>
                </div>

                {/* Best for */}
                <p className="text-xs text-muted-foreground italic mb-6">
                    <span className="font-semibold not-italic">Best for:</span> {bestFor}
                </p>

                {/* CTA */}
                <a
                    href={ctaHref}
                    className="inline-flex items-center gap-2 text-sm font-medium text-yellow-600 dark:text-yellow-400 hover:text-yellow-500 transition-colors group/cta"
                >
                    {ctaText}
                    <ArrowRight className="w-4 h-4 group-hover/cta:translate-x-1 transition-transform" />
                </a>
            </div>
        </motion.div>
    )
}
