"use client"

import { motion } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowUpRight } from "lucide-react"

const projects = [
    {
        title: "Identify",
        subtitle: "Consulting & Strategy",
        description: "Analyzing infrastructure to pinpoint automation opportunities and integration gaps.",
    },
    {
        title: "Develop",
        subtitle: "Integration Implementation",
        description: "Building robust connections between your data silos using modern API standards.",
    },
    {
        title: "Adopt",
        subtitle: "Training & Handoff",
        description: "Ensuring your team is empowered to manage and scale the new automated workflows.",
    },
]

export function Work() {
    return (
        <section id="work" className="py-24 md:py-32 bg-secondary/30">
            <div className="container px-6 md:px-12 max-w-6xl mx-auto">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="mb-16"
                >
                    <h2 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-2">
                        Work Themes
                    </h2>
                    <h3 className="text-3xl md:text-4xl font-bold">Services & Expertise</h3>
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {projects.map((project, index) => (
                        <motion.div
                            key={project.title}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                        >
                            <Card className="h-full group hover:shadow-lg transition-all duration-300 border-border/50 bg-background/50 hover:bg-background">
                                <CardHeader className="flex flex-row items-center justify-between pb-2">
                                    <CardTitle className="text-xl font-bold">{project.title}</CardTitle>
                                    <ArrowUpRight className="w-5 h-5 text-muted-foreground group-hover:text-yellow-500 transition-colors" />
                                </CardHeader>
                                <CardContent>
                                    <p className="text-sm font-medium text-foreground/80 mb-2">{project.subtitle}</p>
                                    <p className="text-sm text-muted-foreground leading-relaxed">
                                        {project.description}
                                    </p>
                                </CardContent>
                            </Card>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    )
}
