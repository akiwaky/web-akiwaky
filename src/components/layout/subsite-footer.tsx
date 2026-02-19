import Link from "next/link";

export function SubsiteFooter() {
    return (
        <footer className="py-8 border-t border-border/40 px-6">
            <div className="max-w-5xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-muted-foreground">
                <p>
                    &copy; {new Date().getFullYear()} Alejandro AG. Todos los derechos
                    reservados.
                </p>
                <Link href="/" className="hover:text-foreground transition-colors">
                    akiwaky.cloud
                </Link>
            </div>
        </footer>
    );
}
