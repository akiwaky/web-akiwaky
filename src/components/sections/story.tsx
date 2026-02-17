"use client"

import { motion } from "framer-motion"


export function Story() {
    return (
        <section id="story" className="py-24 md:py-32">
            <div className="container px-6 md:px-12 max-w-5xl mx-auto">

                {/* Bio Section */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-24 items-center mb-32">
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                    >
                        <h2 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-6">
                            The Story
                        </h2>
                        <div className="prose prose-lg dark:prose-invert">
                            <p className="text-xl md:text-2xl leading-relaxed font-light text-foreground/90">
                                I'm a senior backend engineer specializing in
                                <span className="font-semibold text-foreground"> integrations and automation</span>.
                            </p>
                            <p className="text-muted-foreground mt-6">
                                With deep experience in APIs, webhooks, and tools like n8n, I bridge the gap between
                                industrial data systems (PI historians) and modern web applications. I've led global
                                projects that transform disjointed data into actionable insights.
                            </p>
                        </div>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        className="relative aspect-square md:aspect-[4/5] bg-muted rounded-2xl overflow-hidden"
                    >
                        {/* Placeholder for Portrait */}
                        <div className="absolute inset-0 flex items-center justify-center text-muted-foreground bg-secondary">
                            <span className="text-sm uppercase tracking-widest">Portrait Placeholder</span>
                        </div>
                    </motion.div>
                </div>

                {/* Mission Section (Spanish) */}
                <div className="relative">
                    <div className="absolute -left-4 -top-4 w-12 h-12 bg-yellow-400/20 rounded-full blur-xl" />

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                        className="bg-card border border-border/50 rounded-3xl p-8 md:p-12 shadow-sm"
                    >
                        <blockquote className="text-xl md:text-3xl font-medium leading-relaxed font-serif italic text-foreground/80 text-center">
                            “Me asocio con fundadores dinámicos que están reinventando el mañana:
                            desde startups de YC hasta empresas y equipos bootstrapped.
                            Mi misión: crear identidades únicas, consistentes y maduras para productos SaaS y Web3,
                            impulsando el engagement de usuarios, la confianza de inversionistas,
                            los ingresos y el respeto de la industria — un diseño que otros tomarán como referencia.”
                        </blockquote>
                    </motion.div>
                </div>

                {/* Photography Teasers */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-24">
                    {[1, 2].map((i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6, delay: 0.1 * i }}
                            className="aspect-video bg-muted rounded-xl overflow-hidden relative"
                        >
                            <div className="absolute inset-0 flex items-center justify-center text-muted-foreground bg-secondary">
                                <span className="text-xs uppercase tracking-widest">Image Placeholder {i}</span>
                            </div>
                        </motion.div>
                    ))}
                </div>

            </div>
        </section>
    )
}
