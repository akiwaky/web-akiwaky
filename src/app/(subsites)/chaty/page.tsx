'use client';

import { chatyConfig } from '@/config/chaty';
import { useState } from 'react';
import Link from 'next/link';
import {
    MessageCircle,
    ChevronDown,
    ArrowRight,
    Sparkles,
    MapPin,
    Clock,
} from 'lucide-react';

// ─────────────────────────────────────────────────────────────
// Analytics helper
// ─────────────────────────────────────────────────────────────
function trackEvent(name: string, data?: Record<string, string>) {
    if (typeof window !== 'undefined' && (window as unknown as { gtag?: Function }).gtag) {
        (window as unknown as { gtag: Function }).gtag('event', name, data ?? {});
    }
}

// ─────────────────────────────────────────────────────────────
// QR Code — desktop only, uses qrcode.react via CDN-safe approach
// ─────────────────────────────────────────────────────────────
function QRBlock({ url }: { url: string }) {
    const qrApiUrl = `https://api.qrserver.com/v1/create-qr-code/?size=180x180&data=${encodeURIComponent(url)}&color=1a1a2e&bgcolor=ffffff&margin=10`;
    return (
        <div className="hidden md:flex flex-col items-center gap-3">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
                src={qrApiUrl}
                alt="Scan to open Aki-Chaty in WhatsApp"
                width={160}
                height={160}
                className="rounded-2xl border border-white/10 shadow-xl"
                onLoad={() => trackEvent('qr_visible')}
            />
            <p className="text-xs text-slate-400 tracking-wide">Scan to open on desktop</p>
        </div>
    );
}

// ─────────────────────────────────────────────────────────────
// FAQ Accordion item
// ─────────────────────────────────────────────────────────────
function FAQItem({ q, a, index }: { q: string; a: string; index: number }) {
    const [open, setOpen] = useState(false);
    return (
        <div className="border-b border-white/10 last:border-0">
            <button
                onClick={() => {
                    setOpen((v) => !v);
                    if (!open) trackEvent('faq_expand', { question: q });
                }}
                className="w-full flex items-center justify-between py-4 text-left gap-4 group"
                aria-expanded={open}
                id={`faq-btn-${index}`}
                aria-controls={`faq-panel-${index}`}
            >
                <span className="text-sm font-medium text-white/90 group-hover:text-white transition-colors">
                    {q}
                </span>
                <ChevronDown
                    className={`w-4 h-4 text-slate-400 shrink-0 transition-transform duration-300 ${open ? 'rotate-180' : ''}`}
                />
            </button>
            {open && (
                <div
                    id={`faq-panel-${index}`}
                    role="region"
                    aria-labelledby={`faq-btn-${index}`}
                    className="pb-4 text-sm text-slate-300 leading-relaxed animate-in fade-in slide-in-from-top-1 duration-200"
                >
                    {a}
                </div>
            )}
        </div>
    );
}

// ─────────────────────────────────────────────────────────────
// Main Page
// ─────────────────────────────────────────────────────────────
export default function ChatyPage() {
    const waUrl = `https://wa.me/${chatyConfig.whatsappNumber}?text=${encodeURIComponent(chatyConfig.whatsappPrefilledMessage)}`;

    return (
        <div className="min-h-screen bg-[#0f0e17] text-white overflow-x-hidden">
            {/* ── Gradient blobs background ────────────────────────── */}
            <div aria-hidden="true" className="pointer-events-none fixed inset-0 overflow-hidden">
                <div className="absolute -top-32 -left-32 w-[600px] h-[600px] rounded-full bg-[#FF5733]/10 blur-[120px]" />
                <div className="absolute top-1/2 -right-40 w-[500px] h-[500px] rounded-full bg-[#C70039]/8 blur-[120px]" />
                <div className="absolute bottom-0 left-1/4 w-[400px] h-[400px] rounded-full bg-[#FFC300]/6 blur-[120px]" />
            </div>

            <main className="relative max-w-2xl mx-auto px-6 py-16 md:py-24 space-y-28">

                {/* ── HERO ─────────────────────────────────────────────── */}
                <header className="space-y-8">
                    {/* Badge */}
                    <div className="inline-flex items-center gap-2 rounded-full border border-[#FF5733]/30 bg-[#FF5733]/10 px-4 py-1.5 text-xs font-medium text-[#FF773D] tracking-wide">
                        <Sparkles className="w-3.5 h-3.5" />
                        CDMX Place Guide · WhatsApp
                    </div>

                    <div className="space-y-4">
                        <h1 className="text-5xl md:text-6xl font-bold tracking-tighter leading-[1.05]">
                            Ask where<br />
                            <span className="bg-gradient-to-r from-[#FF5733] via-[#FFC300] to-[#FF773D] bg-clip-text text-transparent">
                                to go in CDMX.
                            </span>
                        </h1>
                        <p className="text-lg text-slate-300 leading-relaxed max-w-md">
                            Curated picks for coffee, brunch, dinner, and drinks — sent straight
                            to your WhatsApp. Grounded in a real knowledge base. No made-up facts.
                        </p>
                    </div>

                    {/* CTA row */}
                    <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
                        <Link
                            href={waUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            onClick={() => trackEvent('wa_cta_click', { source: 'hero' })}
                            className="inline-flex items-center gap-2.5 bg-[#25D366] hover:bg-[#20be5a] active:scale-[0.97] text-white px-7 py-3.5 rounded-full font-semibold text-sm tracking-wide transition-all duration-200 shadow-lg shadow-[#25D366]/20"
                            id="hero-wa-cta"
                        >
                            <MessageCircle className="w-4 h-4" />
                            Open in WhatsApp
                        </Link>
                        <p className="text-xs text-slate-500">
                            Works best for coffee, brunch, dinner &amp; drinks
                        </p>
                    </div>

                    {/* Desktop QR */}
                    <QRBlock url={waUrl} />
                </header>

                {/* ── HOW IT WORKS ─────────────────────────────────────── */}
                <section aria-labelledby="how-it-works-heading" className="space-y-8">
                    <h2
                        id="how-it-works-heading"
                        className="text-xs font-semibold text-slate-500 uppercase tracking-widest"
                    >
                        How it works
                    </h2>
                    <div className="grid gap-6">
                        {chatyConfig.steps.map((step) => (
                            <div key={step.number} className="flex gap-5 group">
                                <div className="shrink-0 w-10 h-10 rounded-xl bg-gradient-to-br from-[#FF5733] to-[#C70039] flex items-center justify-center text-xs font-bold text-white shadow-md shadow-[#FF5733]/20">
                                    {step.number}
                                </div>
                                <div className="pt-1.5">
                                    <h3 className="font-semibold text-white text-sm mb-1">{step.title}</h3>
                                    <p className="text-sm text-slate-400 leading-relaxed">{step.description}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </section>

                {/* ── EXAMPLE PROMPTS ──────────────────────────────────── */}
                <section aria-labelledby="prompts-heading" className="space-y-6">
                    <h2
                        id="prompts-heading"
                        className="text-xs font-semibold text-slate-500 uppercase tracking-widest"
                    >
                        Try asking
                    </h2>
                    <div className="flex flex-wrap gap-2.5">
                        {chatyConfig.examplePrompts.map((prompt) => {
                            const promptUrl = `https://wa.me/${chatyConfig.whatsappNumber}?text=${encodeURIComponent(prompt.text)}`;
                            return (
                                <Link
                                    href={promptUrl}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    key={prompt.label}
                                    onClick={() => trackEvent('prompt_chip_click', { label: prompt.label })}
                                    className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 hover:bg-white/10 hover:border-[#FF5733]/40 px-4 py-2 text-sm text-slate-300 hover:text-white transition-all duration-200 cursor-pointer"
                                    id={`prompt-${prompt.label.replace(/\s+/g, '-').toLowerCase()}`}
                                >
                                    <ArrowRight className="w-3 h-3 text-[#FF5733]" />
                                    {prompt.label}
                                </Link>
                            );
                        })}
                    </div>
                    <p className="text-xs text-slate-600 italic pl-1">
                        Tapping a prompt opens WhatsApp with the message prefilled.
                    </p>
                </section>

                {/* ── TRUST / SCOPE ────────────────────────────────────── */}
                <section
                    aria-labelledby="scope-heading"
                    className="rounded-2xl border border-white/8 bg-white/3 p-6 space-y-4 backdrop-blur-sm"
                >
                    <h2
                        id="scope-heading"
                        className="text-xs font-semibold text-slate-500 uppercase tracking-widest"
                    >
                        Good to know
                    </h2>
                    <ul className="space-y-2.5">
                        {chatyConfig.scope.map((item, i) => (
                            <li key={i} className="text-sm text-slate-300 leading-relaxed">
                                {item}
                            </li>
                        ))}
                    </ul>
                </section>

                {/* ── FAQ ──────────────────────────────────────────────── */}
                <section aria-labelledby="faq-heading" className="space-y-2">
                    <h2
                        id="faq-heading"
                        className="text-xs font-semibold text-slate-500 uppercase tracking-widest mb-4"
                    >
                        FAQ
                    </h2>
                    <div className="rounded-2xl border border-white/8 bg-white/3 px-6 backdrop-blur-sm">
                        {chatyConfig.faqs.map((faq, i) => (
                            <FAQItem key={i} q={faq.q} a={faq.a} index={i} />
                        ))}
                    </div>
                </section>

                {/* ── FOOTER CTA ───────────────────────────────────────── */}
                <footer className="pb-8 flex flex-col items-center text-center space-y-6">
                    <div className="space-y-2">
                        <p className="text-slate-400 text-sm">Ready to find your next spot?</p>
                        <p className="text-xs text-slate-600">{chatyConfig.disclaimer}</p>
                    </div>
                    <Link
                        href={waUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={() => trackEvent('wa_cta_click', { source: 'footer' })}
                        className="inline-flex items-center gap-2 text-[#25D366] font-semibold hover:underline hover:underline-offset-4 text-sm transition-colors"
                        id="footer-wa-cta"
                    >
                        <MessageCircle className="w-4 h-4" />
                        Start chatting with Aki-Chaty
                        <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                </footer>
            </main>
        </div>
    );
}
