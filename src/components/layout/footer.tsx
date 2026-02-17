export function Footer() {
    return (
        <footer className="py-8 border-t border-border/40">
            <div className="container flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-muted-foreground">
                <p>&copy; {new Date().getFullYear()} Alejandro AG. All rights reserved.</p>
                <div className="flex gap-6">
                    <a href="#" className="hover:text-foreground transition-colors">Twitter</a>
                    <a href="#" className="hover:text-foreground transition-colors">LinkedIn</a>
                    <a href="#" className="hover:text-foreground transition-colors">Email</a>
                </div>
            </div>
        </footer>
    )
}
