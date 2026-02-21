import { SubsiteHeader } from "@/components/layout/subsite-header";
import { SubsiteFooter } from "@/components/layout/subsite-footer";

export default function SubsiteLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <div
            className="min-h-screen bg-background text-foreground selection:bg-accent/30"
            style={{
                '--background': '#131515', // Onyx
                '--foreground': '#fecee9', // Pastel Petal
                '--primary': '#eb9fef', // Plum (Switched to Primary)
                '--primary-foreground': '#131515',
                '--secondary': '#339989', // Verdigris (Switched to Secondary)
                '--secondary-foreground': '#131515',
                '--muted': '#2b2c28', // Graphite
                '--muted-foreground': '#D4AF37', // Champagne Gold for elegant muted text
                '--accent': '#D4AF37', // Champagne Gold
                '--accent-foreground': '#131515',
                '--border': '#2b2c28', // Graphite
                '--input': '#2b2c28',
                '--ring': '#D4AF37', // Champagne Gold
                '--card': '#0a0b0b', // Midnight Obsidian for deeper 3D depth
                '--card-foreground': '#fecee9',
                '--radius': '0.5rem',
            } as React.CSSProperties}
        >
            <SubsiteHeader />
            <main className="pt-20">{children}</main>
            <SubsiteFooter />
        </div>
    );
}
