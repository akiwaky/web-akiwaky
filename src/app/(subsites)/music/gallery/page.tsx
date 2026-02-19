import type { Metadata } from "next";
import { GalleryManager } from "@/components/gallery/gallery-manager";
import { Camera } from "lucide-react";

export const metadata: Metadata = {
    title: "Music Photography Gallery — Alejandro AG",
    description: "A curation of live music moments captured on tour and in the pit.",
};

export default function GalleryPage() {
    return (
        <div className="min-h-screen bg-background text-foreground selection:bg-accent/30">
            {/* ════════════ HERO BANNER ════════════ */}
            <section className="relative h-[40vh] md:h-[50vh] flex items-center justify-center overflow-hidden">
                {/* Placeholder for Hero Image */}
                <div className="absolute inset-0 bg-stone-900 z-0">
                    <div className="absolute inset-0 bg-gradient-to-t from-background to-transparent opacity-90" />
                    {/* Texture/Noise overlay would go here */}
                </div>

                <div className="relative z-10 text-center px-6">
                    <div className="inline-flex items-center gap-2 mb-4 text-accent/80 uppercase tracking-[0.2em] text-xs font-bold">
                        <Camera className="w-4 h-4" />
                        <span>Portfolio</span>
                    </div>
                    <h1 className="text-5xl md:text-8xl font-bold tracking-tighter mb-4 text-white">
                        Live <span className="text-accent italic font-serif">Frames</span>
                    </h1>
                    <p className="text-white/60 max-w-md mx-auto font-light text-lg">
                        Capturing the raw energy of sound in low light.
                    </p>
                </div>
            </section>

            {/* ════════════ GALLERY MANAGER ════════════ */}
            <GalleryManager />

        </div>
    );
}
