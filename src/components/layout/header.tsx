"use client"

import * as React from "react"
import Link from "next/link"
import { motion, useScroll, useMotionValueEvent } from "framer-motion"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Logo } from "@/components/ui/logo"

export function Header() {
    const { scrollY } = useScroll()
    const [isScrolled, setIsScrolled] = React.useState(false)

    useMotionValueEvent(scrollY, "change", (latest) => {
        setIsScrolled(latest > 50)
    })

    const navLinks = [
        { name: "Servicios", href: "#servicios" },
        { name: "Paquetes", href: "#paquetes" },
        { name: "Historia", href: "#story" },
        { name: "Contacto", href: "#contacto" },
    ]

    const secondaryLinks = [
        { name: "LinkedIn", href: "#" }, // TODO: Add your LinkedIn URL
        { name: "GitHub", href: "#" }, // TODO: Add your GitHub URL
    ]

    return (
        <motion.header
            className={cn(
                "fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 py-4 transition-all duration-300",
                isScrolled
                    ? "bg-background/80 backdrop-blur-md shadow-sm py-3"
                    : "bg-transparent py-6"
            )}
            initial={{ y: -100 }}
            animate={{ y: 0 }}
            transition={{ duration: 0.5 }}
        >
            <div className="flex items-center gap-8">
                <Link href="/" className="group">
                    <Logo className="h-10 w-10 transition-transform group-hover:scale-110" />
                    <span className="sr-only">Home</span>
                </Link>

                {/* Primary Nav */}
                <nav className="hidden md:flex items-center gap-6">
                    {navLinks.map((link) => (
                        <Link
                            key={link.name}
                            href={link.href}
                            className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
                        >
                            {link.name}
                        </Link>
                    ))}
                </nav>
            </div>

            <div className="flex items-center gap-8">
                {/* Secondary Nav */}
                <nav className="hidden md:flex items-center gap-6">
                    {secondaryLinks.map((link) => (
                        <Link
                            key={link.name}
                            href={link.href}
                            className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
                        >
                            {link.name}
                        </Link>
                    ))}
                </nav>

                <Button variant="default" className="rounded-full px-6 font-medium" asChild>
                    <Link href="#contacto">Hablemos</Link>
                </Button>
            </div>
        </motion.header>
    )
}
