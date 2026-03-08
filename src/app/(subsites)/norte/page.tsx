import { norteConfig } from '@/config/norte';
import { ArrowRight, Smartphone, Zap, MessageSquare, Info } from 'lucide-react';
import Link from 'next/link';

export default function NortePage() {
    const waLink = `https://wa.me/${norteConfig.whatsappNumber}?text=${norteConfig.whatsappDefaultMessage}`;

    return (
        <main className="max-w-2xl mx-auto px-6 py-16 md:py-24 space-y-24">
            {/* Hero Header */}
            <header className="space-y-6">
                <h1 className="text-4xl md:text-5xl font-semibold tracking-tighter text-zinc-900 leading-tight">
                    Pal Norte, <br />
                    without the noise.
                </h1>
                <p className="text-lg text-zinc-600 leading-relaxed max-w-lg">
                    {norteConfig.description} A lightweight WhatsApp companion designed for festival environments.
                </p>

                <div className="pt-4">
                    <Link
                        href={waLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center justify-center bg-[#25D366] hover:bg-[#20bd5a] text-white px-6 py-3.5 rounded-full font-medium transition-colors text-sm tracking-wide"
                    >
                        Start on WhatsApp
                        <ArrowRight className="ml-2 w-4 h-4" />
                    </Link>
                </div>
            </header>

            {/* Why it works */}
            <section className="space-y-8">
                <h2 className="text-sm font-semibold text-zinc-400 uppercase tracking-widest">Why it works</h2>
                <div className="grid gap-6 text-zinc-800">
                    <div className="flex gap-4">
                        <Smartphone className="w-5 h-5 text-zinc-400 shrink-0 mt-0.5" />
                        <div>
                            <h3 className="font-medium text-zinc-900">No app required</h3>
                            <p className="text-sm text-zinc-600 mt-1 leading-relaxed">Runs entirely via text. Saves your battery and storage passing entirely outside of bloated browsers.</p>
                        </div>
                    </div>
                    <div className="flex gap-4">
                        <Zap className="w-5 h-5 text-zinc-400 shrink-0 mt-0.5" />
                        <div>
                            <h3 className="font-medium text-zinc-900">Low bandwidth</h3>
                            <p className="text-sm text-zinc-600 mt-1 leading-relaxed">WhatsApp texts require minimal data. They'll queue and deliver the second you get a sliver of signal amidst the crowd.</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Commands Overview */}
            <section className="space-y-8">
                <h2 className="text-sm font-semibold text-zinc-400 uppercase tracking-widest">Commands (Sprint 1)</h2>
                <div className="space-y-6 border-l border-zinc-200 pl-6 ml-2">
                    {norteConfig.commands.map((cmd) => (
                        <div key={cmd.cmd} className="space-y-2 group">
                            <div className="flex items-baseline gap-3">
                                <span className="font-mono text-sm tracking-tight font-medium bg-zinc-100 text-zinc-800 px-2 py-0.5 rounded">
                                    {cmd.cmd}
                                </span>
                                <span className="text-zinc-600 text-sm">{cmd.desc}</span>
                            </div>
                            <p className="text-xs text-zinc-400 italic">Try: "{cmd.example}"</p>
                        </div>
                    ))}
                </div>
            </section>

            {/* Upcoming & Caveats */}
            <section className="grid sm:grid-cols-2 gap-12 pt-8 border-t border-zinc-200">
                <div className="space-y-4">
                    <div className="flex items-center gap-2 text-zinc-900">
                        <MessageSquare className="w-4 h-4" />
                        <h3 className="font-medium text-sm">More coming soon</h3>
                    </div>
                    <p className="text-sm text-zinc-500 leading-relaxed">
                        Lineup notifications, stage schedules, and real-time custom map routing are currently in development.
                    </p>
                </div>

                <div className="space-y-4">
                    <div className="flex items-center gap-2 text-zinc-900">
                        <Info className="w-4 h-4" />
                        <h3 className="font-medium text-sm">Disclaimer</h3>
                    </div>
                    <p className="text-sm text-zinc-500 leading-relaxed">
                        {norteConfig.disclaimer} Always follow staff instructions on-site.
                    </p>
                </div>
            </section>

            {/* Footer CTA */}
            <footer className="pt-24 pb-8 flex flex-col items-center text-center space-y-6">
                <p className="text-zinc-500 text-sm">Ready to hook up your festival flow?</p>
                <Link
                    href={waLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[#25D366] font-medium hover:underline hover:underline-offset-4"
                >
                    Message the Bot
                </Link>
            </footer>
        </main>
    );
}
