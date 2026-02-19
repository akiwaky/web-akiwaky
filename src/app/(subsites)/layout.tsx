import { SubsiteHeader } from "@/components/layout/subsite-header";
import { SubsiteFooter } from "@/components/layout/subsite-footer";

export default function SubsiteLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <div
            className="min-h-screen bg-background text-foreground selection:bg-[#557373]/30"
            style={{
                '--background': '#F2F1EF',
                '--foreground': '#0D0D0D',
                '--primary': '#0D0D0D',
                '--primary-foreground': '#F2F1EF',
                '--secondary': '#D9D2CC',
                '--secondary-foreground': '#0D0D0D',
                '--muted': '#EBE9E6',
                '--muted-foreground': '#557373',
                '--accent': '#557373',
                '--accent-foreground': '#F2F1EF',
                '--border': '#D9D2CC',
                '--input': '#D9D2CC',
                '--ring': '#0D0D0D',
                '--card': '#F7F6F5',
                '--card-foreground': '#0D0D0D',
                '--radius': '0rem', // Editorial often uses sharp corners or very slight ones
            } as React.CSSProperties}
        >
            <SubsiteHeader />
            <main className="pt-20">{children}</main>
            <SubsiteFooter />
        </div>
    );
}
