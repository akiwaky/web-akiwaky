"use client";

import { useState } from "react";
import { DAILY_CONFIG } from "@/config/daily";
import { Loader2, Sparkles, AlertCircle } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function DailyBriefingPage() {
    const [isLoading, setIsLoading] = useState(false);
    const [briefingHtml, setBriefingHtml] = useState<string | null>(null);
    const [error, setError] = useState<string | null>(null);
    const [generatedAt, setGeneratedAt] = useState<string | null>(null);

    const handleGenerate = async () => {
        setIsLoading(true);
        setError(null);
        setBriefingHtml(null);

        try {
            const controller = new AbortController();
            const timeoutId = setTimeout(() => controller.abort(), DAILY_CONFIG.fetchTimeoutMs);

            const response = await fetch(DAILY_CONFIG.n8nWebhookUrl, {
                method: "GET",
                signal: controller.signal,
            });

            clearTimeout(timeoutId);

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const data = await response.json();
            const html = data.html || data[0]?.html || '';
            setBriefingHtml(html);

            // Format time nicely
            const now = new Date();
            setGeneratedAt(now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }));

        } catch (err: unknown) {
            console.error("Failed to generate briefing:", err);
            // Check if it was an abort/timeout
            if (err instanceof Error && err.name === 'AbortError') {
                setError("Request timed out. The server might be busy.");
            } else {
                setError(DAILY_CONFIG.ui.errorFallback);
            }
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <main className="min-h-screen bg-[#0a0f18] text-slate-100 flex flex-col relative overflow-hidden font-sans selection:bg-blue-500/30">
            {/* Ambient Background Base */}
            <div className="absolute inset-0 z-0 bg-gradient-to-br from-[#0f172a] via-[#081b36] to-[#020617]" />

            {/* Ambient Crystal Refraction Orbs */}
            <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] rounded-full bg-blue-600/10 blur-[120px] pointer-events-none" />
            <div className="absolute bottom-[-20%] right-[-10%] w-[60%] h-[60%] rounded-full bg-cyan-500/10 blur-[150px] pointer-events-none" />

            <div className="relative z-10 max-w-2xl w-full mx-auto px-6 py-12 md:py-20 flex flex-col min-h-screen">

                {/* Header */}
                <header className="mb-10 text-center">
                    <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="inline-flex items-center justify-center space-x-2 bg-blue-500/10 border border-blue-500/20 rounded-full px-4 py-1.5 mb-6"
                    >
                        <Sparkles className="w-4 h-4 text-blue-400" />
                        <span className="text-sm font-medium text-blue-300 tracking-wide uppercase">AI Compiled</span>
                    </motion.div>

                    <motion.h1
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        className="text-4xl md:text-5xl font-semibold tracking-tight text-white mb-4"
                    >
                        {DAILY_CONFIG.ui.pageTitle}
                    </motion.h1>

                    <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.2 }}
                        className="text-slate-400 text-lg"
                    >
                        {generatedAt ? `Last updated today at ${generatedAt}` : `Your curated summary awaits.`}
                    </motion.p>
                </header>

                {/* Primary Action */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.3 }}
                    className="flex justify-center mb-12"
                >
                    <button
                        onClick={handleGenerate}
                        disabled={isLoading}
                        className="group relative px-8 py-4 bg-white/5 hover:bg-white/10 border border-white/10 rounded-2xl overflow-hidden transition-all duration-300 backdrop-blur-xl disabled:opacity-70 disabled:cursor-not-allowed hover:shadow-[0_0_40px_-10px_rgba(59,130,246,0.5)]"
                    >
                        <div className="absolute inset-0 bg-gradient-to-r from-blue-500/0 via-blue-400/10 to-blue-500/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000" />

                        <div className="relative flex items-center space-x-3">
                            {isLoading ? (
                                <>
                                    <Loader2 className="w-5 h-5 animate-spin text-blue-400" />
                                    <span className="font-medium text-white tracking-wide">{DAILY_CONFIG.ui.buttonLoading}</span>
                                </>
                            ) : (
                                <>
                                    <Sparkles className="w-5 h-5 text-blue-400" />
                                    <span className="font-medium text-white tracking-wide">{DAILY_CONFIG.ui.buttonInitial}</span>
                                </>
                            )}
                        </div>
                    </button>
                </motion.div>

                {/* Content Area */}
                <div className="flex-1 w-full relative">
                    <AnimatePresence mode="wait">

                        {/* Error State */}
                        {error && (
                            <motion.div
                                key="error"
                                initial={{ opacity: 0, scale: 0.98 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0 }}
                                className="flex items-center space-x-3 bg-red-500/10 border border-red-500/20 text-red-200 p-4 rounded-2xl backdrop-blur-md"
                            >
                                <AlertCircle className="w-5 h-5 flex-shrink-0" />
                                <p className="text-sm">{error}</p>
                            </motion.div>
                        )}

                        {/* Loading Skeletons */}
                        {isLoading && (
                            <motion.div
                                key="loading"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                className="space-y-6"
                            >
                                {/* Skeleton 1 (Weather) */}
                                <div className="h-24 w-full bg-white/5 border border-white/5 rounded-2xl animate-pulse backdrop-blur-md" />

                                {/* Skeleton 2 (News) */}
                                <div className="p-6 bg-white/5 border border-white/5 rounded-2xl backdrop-blur-md space-y-4">
                                    <div className="h-6 w-1/3 bg-white/10 rounded animate-pulse" />
                                    <div className="h-4 w-full bg-white/5 rounded animate-pulse" />
                                    <div className="h-4 w-5/6 bg-white/5 rounded animate-pulse" />
                                    <div className="h-4 w-4/6 bg-white/5 rounded animate-pulse" />
                                </div>

                                {/* Skeleton 3 (Sports) */}
                                <div className="p-6 bg-white/5 border border-white/5 rounded-2xl backdrop-blur-md space-y-4">
                                    <div className="h-6 w-1/4 bg-white/10 rounded animate-pulse" />
                                    <div className="h-12 w-full bg-white/5 rounded animate-pulse" />
                                </div>
                            </motion.div>
                        )}

                        {/* Empty State */}
                        {!isLoading && !briefingHtml && !error && (
                            <motion.div
                                key="empty"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                className="text-center py-20"
                            >
                                <div className="w-16 h-16 rounded-full bg-white/5 border border-white/10 flex items-center justify-center mx-auto mb-6">
                                    <Sparkles className="w-6 h-6 text-slate-500" />
                                </div>
                                <p className="text-slate-400">{DAILY_CONFIG.ui.emptyStateMessage}</p>
                            </motion.div>
                        )}

                        {/* Results State (Injected HTML) */}
                        {!isLoading && briefingHtml && (
                            <motion.div
                                key="results"
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="html-injection-wrapper glass-cards-container space-y-6"
                                dangerouslySetInnerHTML={{ __html: briefingHtml }}
                            />
                        )}

                    </AnimatePresence>
                </div>
            </div>

            {/* Global styles specifically targeting injected HTML to match aesthetic */}
            <style jsx global>{`
                .glass-cards-container .briefing-card {
                    background: rgba(255, 255, 255, 0.03);
                    border: 1px solid rgba(255, 255, 255, 0.05);
                    backdrop-filter: blur(16px);
                    border-radius: 1rem;
                    padding: 1.5rem;
                }
                .glass-cards-container h2 {
                    font-size: 1.25rem;
                    font-weight: 600;
                    color: rgba(255, 255, 255, 0.9);
                    margin-bottom: 1rem;
                    letter-spacing: -0.025em;
                }
                .glass-cards-container ul {
                    list-style: none;
                    padding: 0;
                    margin: 0;
                    display: flex;
                    flex-direction: column;
                    gap: 0.75rem;
                }
                .glass-cards-container li {
                    color: rgba(255, 255, 255, 0.7);
                    font-size: 0.95rem;
                    line-height: 1.5;
                    padding-bottom: 0.75rem;
                    border-bottom: 1px solid rgba(255, 255, 255, 0.05);
                }
                .glass-cards-container li:last-child {
                    border-bottom: none;
                    padding-bottom: 0;
                }
                .glass-cards-container .weather-text {
                    font-size: 1.5rem;
                    font-weight: 300;
                    color: white;
                }
                .glass-cards-container .sport-score {
                    display: flex;
                    justify-content: space-between;
                    font-variant-numeric: tabular-nums;
                }
                .glass-cards-container a {
                    color: rgba(255, 255, 255, 0.9);
                    text-decoration: none;
                    transition: color 0.2s;
                }
                .glass-cards-container a:hover {
                    color: #60a5fa;
                }
            `}</style>
        </main>
    );
}
