
'use client';

export function Footer() {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="bg-background/80 backdrop-blur-sm border-t mt-auto">
            <div className="container mx-auto px-4 py-4">
                <div className="flex items-center justify-center text-sm text-muted-foreground">
                    <p>&copy; {currentYear} LaburoYA - Argentina</p>
                </div>
            </div>
        </footer>
    );
}
