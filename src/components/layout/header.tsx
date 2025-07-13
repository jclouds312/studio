import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Menu, Briefcase, Shield } from 'lucide-react';

export function Header() {
  const navLinks = [
    { href: '#', label: 'Empleos' },
    { href: '#', label: 'Empresas' },
    { href: '#', label: 'Mensajes' },
  ];

  return (
    <header className="bg-card/80 backdrop-blur-sm border-b sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="flex items-center gap-2 text-foreground hover:text-primary transition-colors">
            <Briefcase className="h-6 w-6 text-primary" />
            <span className="font-bold text-xl">LaburoYa</span>
          </Link>
          <nav className="hidden md:flex items-center gap-6">
            {navLinks.map((link, index) => (
              <Link key={`${link.label}-${index}`} href={link.href} className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors">
                {link.label}
              </Link>
            ))}
             <Link href="/admin" className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors flex items-center gap-1">
                <Shield className="h-4 w-4" />
                Admin
              </Link>
          </nav>
          <div className="flex items-center gap-4">
            <div className="hidden md:block">
              <Avatar>
                <AvatarImage src="https://placehold.co/40x40.png" data-ai-hint="person user" />
                <AvatarFallback>U</AvatarFallback>
              </Avatar>
            </div>
            <div className="md:hidden">
              <Sheet>
                <SheetTrigger asChild>
                  <Button variant="ghost" size="icon">
                    <Menu className="h-6 w-6" />
                    <span className="sr-only">Abrir menú</span>
                  </Button>
                </SheetTrigger>
                <SheetContent side="right">
                  <div className="flex flex-col gap-6 p-6">
                    <Link href="/" className="flex items-center gap-2 mb-4">
                       <Briefcase className="h-6 w-6 text-primary" />
                       <span className="font-bold text-lg">LaburoYa</span>
                    </Link>
                    {navLinks.map((link, index) => (
                      <Link key={`${link.label}-${index}-mobile`} href={link.href} className="text-lg font-medium hover:text-primary transition-colors">
                        {link.label}
                      </Link>
                    ))}
                     <Link href="/admin" className="text-lg font-medium hover:text-primary transition-colors flex items-center gap-2">
                        <Shield className="h-5 w-5" />
                        Admin
                      </Link>
                    <div className="border-t pt-6">
                       <Avatar>
                        <AvatarImage src="https://placehold.co/40x40.png" data-ai-hint="person user" />
                        <AvatarFallback>U</AvatarFallback>
                       </Avatar>
                    </div>
                  </div>
                </SheetContent>
              </Sheet>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
