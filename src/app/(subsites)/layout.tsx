import { SubsiteHeader } from "@/components/layout/subsite-header";
import { SubsiteFooter } from "@/components/layout/subsite-footer";

export default function SubsiteLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <div className="min-h-screen bg-background text-foreground selection:bg-yellow-400/30">
            <SubsiteHeader />
            <main className="pt-20">{children}</main>
            <SubsiteFooter />
        </div>
    );
}
