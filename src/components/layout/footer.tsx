export function Footer() {
    return (
        <footer className="py-8 border-t border-border/40">
            <div className="container flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-muted-foreground px-6">
                <p>&copy; {new Date().getFullYear()} Alejandro AG. Todos los derechos reservados.</p>
                <div className="flex gap-6">
                    {/* TODO: Replace # with actual URLs */}
                    <a href="mailto:tu@email.com" className="hover:text-foreground transition-colors">Email</a>
                    <a href="#" className="hover:text-foreground transition-colors">LinkedIn</a>
                    <a href="#" className="hover:text-foreground transition-colors">GitHub</a>
                </div>
            </div>
        </footer>
    )
}
