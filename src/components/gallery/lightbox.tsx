"use client";

import { useEffect, useCallback } from "react";
import Image from "next/image";
import { X, ChevronLeft, ChevronRight, Info, Camera, Aperture, Timer, Zap } from "lucide-react";
import { type GalleryItem } from "@/lib/mock-gallery-data";

interface LightboxProps {
    item: GalleryItem;
    isOpen: boolean;
    onClose: () => void;
    onNext: () => void;
    onPrev: () => void;
}

export function Lightbox({ item, isOpen, onClose, onNext, onPrev }: LightboxProps) {
    const handleKeyDown = useCallback(
        (e: KeyboardEvent) => {
            if (!isOpen) return;
            if (e.key === "Escape") onClose();
            if (e.key === "ArrowRight") onNext();
            if (e.key === "ArrowLeft") onPrev();
        },
        [isOpen, onClose, onNext, onPrev]
    );

    useEffect(() => {
        window.addEventListener("keydown", handleKeyDown);
        return () => window.removeEventListener("keydown", handleKeyDown);
    }, [handleKeyDown]);

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/95 backdrop-blur-sm animate-in fade-in duration-200">
            {/* Controls */}
            <button
                onClick={onClose}
                className="absolute top-6 right-6 p-2 text-white/50 hover:text-white transition-colors z-50"
            >
                <X className="w-8 h-8" />
            </button>

            <button
                onClick={onPrev}
                className="absolute left-6 top-1/2 -translate-y-1/2 p-2 text-white/50 hover:text-white transition-colors z-50 hidden md:block"
            >
                <ChevronLeft className="w-10 h-10" />
            </button>

            <button
                onClick={onNext}
                className="absolute right-6 top-1/2 -translate-y-1/2 p-2 text-white/50 hover:text-white transition-colors z-50 hidden md:block"
            >
                <ChevronRight className="w-10 h-10" />
            </button>

            {/* Image Container */}
            <div className="relative w-full h-full p-4 md:p-12 flex items-center justify-center">
                <Image
                    src={item.src}
                    alt={item.meta.artist}
                    width={item.width}
                    height={item.height}
                    className="max-w-full max-h-[85vh] w-auto h-auto object-contain shadow-2xl"
                    priority
                />

                {/* Info Overlay */}
                <div className="absolute bottom-0 left-0 w-full p-6 md:p-8 bg-gradient-to-t from-black via-black/80 to-transparent text-white">
                    <div className="max-w-4xl mx-auto flex flex-col md:flex-row md:items-end justify-between gap-6">
                        <div>
                            <h2 className="text-2xl md:text-3xl font-bold uppercase tracking-tight mb-2">{item.meta.artist}</h2>
                            <p className="text-sm md:text-base text-white/70 flex items-center gap-2">
                                <span className="uppercase tracking-widest">{item.meta.venue}</span>
                                <span className="w-1 h-1 bg-white/50 rounded-full" />
                                <span>{item.meta.date}</span>
                            </p>
                        </div>

                        <div className="flex gap-6 text-xs md:text-sm text-white/60 font-mono">
                            <div className="flex flex-col gap-1">
                                <Camera className="w-4 h-4 mb-1" />
                                <span>{item.meta.exif.model}</span>
                            </div>
                            <div className="flex flex-col gap-1">
                                <Aperture className="w-4 h-4 mb-1" />
                                <span>{item.meta.exif.aperture}</span>
                            </div>
                            <div className="flex flex-col gap-1">
                                <Timer className="w-4 h-4 mb-1" />
                                <span>{item.meta.exif.shutter}</span>
                            </div>
                            <div className="flex flex-col gap-1">
                                <Zap className="w-4 h-4 mb-1" />
                                <span>ISO {item.meta.exif.iso}</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
