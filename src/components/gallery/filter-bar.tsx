"use client";

import { type Category } from "@/lib/mock-gallery-data";

interface FilterBarProps {
    categories: Category[];
    activeCategory: Category | "All";
    onFilterChange: (category: Category | "All") => void;
}

export function FilterBar({
    categories,
    activeCategory,
    onFilterChange,
}: FilterBarProps) {
    return (
        <div className="sticky top-20 z-40 bg-background/80 backdrop-blur-md border-b border-border/50 py-4 mb-8">
            <div className="max-w-7xl mx-auto px-4 overflow-x-auto no-scrollbar">
                <div className="flex gap-4 md:justify-center min-w-max">
                    <button
                        onClick={() => onFilterChange("All")}
                        className={`text-xs font-bold uppercase tracking-widest px-4 py-2 transition-colors rounded-full ${activeCategory === "All"
                                ? "bg-foreground text-background"
                                : "text-muted-foreground hover:text-foreground"
                            }`}
                    >
                        All
                    </button>
                    {categories.map((cat) => (
                        <button
                            key={cat}
                            onClick={() => onFilterChange(cat)}
                            className={`text-xs font-bold uppercase tracking-widest px-4 py-2 transition-colors rounded-full ${activeCategory === cat
                                    ? "bg-foreground text-background"
                                    : "text-muted-foreground hover:text-foreground"
                                }`}
                        >
                            {cat}
                        </button>
                    ))}
                </div>
            </div>
        </div>
    );
}
