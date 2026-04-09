import type { Metadata } from "next";
import { SubsiteHeader } from "@/components/layout/subsite-header";
import { SubsiteFooter } from "@/components/layout/subsite-footer";

export const metadata: Metadata = {
    robots: { index: false, follow: false }
};

export default function SubsiteLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <div
            className="min-h-screen bg-background text-foreground selection:bg-accent/30"
            style={{
                '--background': '#FAF5F0', // Off-White Linen (desaturated F7E1D7)
                '--foreground': '#4A5759', // Feldgrau / Dark Slate
                '--primary': '#EDAFB8', // Dusty Rose / Cameo Pink
                '--primary-foreground': '#4A5759',
                '--secondary': '#B0C4B1', // Sage / Ash Gray
                '--secondary-foreground': '#4A5759',
                '--muted': '#DEDBD2', // Timberwolf / Greige
                '--muted-foreground': '#7A8285', // Mid-slate neutral
                '--accent': '#EDAFB8', // Dusty Rose (matches primary)
                '--accent-foreground': '#4A5759',
                '--border': '#DEDBD2', // Timberwolf
                '--input': '#DEDBD2',
                '--ring': '#EDAFB8', // Dusty Rose
                '--card': '#FFFFFF', // White cards on cream bg
                '--card-foreground': '#4A5759',
                '--radius': '0.625rem',
            } as React.CSSProperties}
        >
            <SubsiteHeader />
            <main className="pt-20">{children}</main>
            <SubsiteFooter name="Arlet" />
        </div>
    );
}
