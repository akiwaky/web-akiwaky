"use client"

import { motion } from "framer-motion"
import { BackgroundBlob } from "@/components/ui/background-blob"

export function Hero() {
    return (
        <section className="relative flex min-h-screen items-center justify-center overflow-hidden pt-16">
            {/* Background Abstract Shape */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                <BackgroundBlob className="w-[800px] h-[800px] text-yellow-400/20 md:text-yellow-400/15 animate-pulse-slow" />
            </div>

            <div className="container relative z-10 px-6 md:px-12 flex flex-col items-start max-w-5xl mx-auto">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                    className="space-y-6"
                >
                    <h1 className="text-6xl md:text-8xl font-bold tracking-tight text-foreground">
                        Alejandro AG
                    </h1>

                    <div className="max-w-2xl">
                        <h2 className="text-2xl md:text-4xl font-light leading-tight text-muted-foreground">
                            <span className="text-foreground font-medium">Hola, Encantado !</span>{" "}
                            Conoce a tu partner para integraciones y automatizaciones.
                        </h2>
                    </div>
                </motion.div>
            </div>
        </section>
    )
}
