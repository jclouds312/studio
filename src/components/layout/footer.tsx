
'use client';

export function Footer() {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="bg-transparent border-t mt-auto">
            <div className="container mx-auto px-4 py-6">
                <div className="flex items-center justify-center text-sm text-muted-foreground">
                    <p>&copy; {currentYear} Conexión Laboral AR - Todos los derechos reservados.</p>
                </div>
            </div>
        </footer>
    );
}
