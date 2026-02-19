"use client";

import { useState, useMemo } from "react";
import { type GalleryItem, type Category, GALLERY_ITEMS } from "@/lib/mock-gallery-data";
import { FilterBar } from "./filter-bar";
import { MasonryGrid } from "./masonry-grid";
import { Lightbox } from "./lightbox";

const CATEGORIES: Category[] = ["Live Concerts", "Festivals", "Acoustic", "Backstage"];

export function GalleryManager() {
    const [activeCategory, setActiveCategory] = useState<Category | "All">("All");
    const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

    const filteredItems = useMemo(() => {
        if (activeCategory === "All") return GALLERY_ITEMS;
        return GALLERY_ITEMS.filter((item) => item.category === activeCategory);
    }, [activeCategory]);

    const activeItem = lightboxIndex !== null ? filteredItems[lightboxIndex] : null;

    const handleNext = () => {
        if (lightboxIndex === null) return;
        setLightboxIndex((prev) => (prev !== null && prev < filteredItems.length - 1 ? prev + 1 : 0));
    };

    const handlePrev = () => {
        if (lightboxIndex === null) return;
        setLightboxIndex((prev) => (prev !== null && prev > 0 ? prev - 1 : filteredItems.length - 1));
    };

    return (
        <>
            <FilterBar
                categories={CATEGORIES}
                activeCategory={activeCategory}
                onFilterChange={setActiveCategory}
            />

            <div className="max-w-7xl mx-auto min-h-screen">
                <MasonryGrid
                    items={filteredItems}
                    onItemClick={(_, index) => setLightboxIndex(index)}
                />
            </div>

            {activeItem && (
                <Lightbox
                    item={activeItem}
                    isOpen={lightboxIndex !== null}
                    onClose={() => setLightboxIndex(null)}
                    onNext={handleNext}
                    onPrev={handlePrev}
                />
            )}
        </>
    );
}
