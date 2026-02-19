"use client";

import { useState } from "react";
import Image from "next/image";
import { type GalleryItem } from "@/lib/mock-gallery-data";

interface MasonryGridProps {
    items: GalleryItem[];
    onItemClick: (item: GalleryItem, index: number) => void;
}

export function MasonryGrid({ items, onItemClick }: MasonryGridProps) {
    return (
        <div className="columns-1 sm:columns-2 md:columns-3 gap-4 space-y-4 px-4 pb-20">
            {items.map((item, index) => (
                <div
                    key={item.id}
                    className="break-inside-avoid relative group cursor-pointer overflow-hidden rounded-sm"
                    onClick={() => onItemClick(item, index)}
                >
                    <Image
                        src={item.src}
                        alt={`${item.category} - ${item.meta.artist}`}
                        width={item.width}
                        height={item.height}
                        className="w-full h-auto object-cover transition-transform duration-500 group-hover:scale-105"
                        placeholder="blur"
                        blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk+P+/HgAFhAJ/wlseKgAAAABJRU5ErkJggg=="
                    />
                    <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-4">
                        <p className="text-white text-xs font-bold uppercase tracking-widest">
                            {item.meta.artist}
                        </p>
                        <p className="text-white/70 text-[10px] uppercase tracking-wide">
                            {item.meta.venue}
                        </p>
                    </div>
                </div>
            ))}
        </div>
    );
}
