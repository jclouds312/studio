import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { Menu, Briefcase, UserPlus } from 'lucide-react';

export function Header() {
  const isLoggedIn = false; // Mock state

  return (
    <header className="bg-card/80 backdrop-blur-sm border-b sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="flex items-center gap-2 text-primary hover:opacity-80 transition-opacity">
            <Briefcase className="h-6 w-6" />
            <span className="font-bold text-xl text-primary-foreground bg-primary px-2 rounded-md">LaburoYa</span>
          </Link>
          
          <div className="flex items-center gap-4">
            {isLoggedIn ? (
               <Link href="/profile">
                <Avatar>
                  <AvatarImage src="https://placehold.co/40x40.png" data-ai-hint="person user" />
                  <AvatarFallback>U</AvatarFallback>
                </Avatar>
              </Link>
            ) : (
              <div className="hidden md:flex items-center gap-2">
                  <Button variant="ghost" asChild>
                    <Link href="/login">Iniciar Sesión</Link>
                  </Button>
                  <Button asChild>
                    <Link href="/register"><UserPlus className="mr-2"/>Registrarse</Link>
                  </Button>
              </div>
            )}
           
            <div className="md:hidden">
              <Sheet>
                <SheetTrigger asChild>
                  <Button variant="ghost" size="icon">
                    <Menu className="h-6 w-6" />
                    <span className="sr-only">Abrir menú</span>
                  </Button>
                </SheetTrigger>
                <SheetContent side="right">
                   <SheetHeader className="p-4 border-b">
                     <SheetTitle className="text-left">
                       <Link href="/" className="flex items-center gap-2 text-primary hover:opacity-80 transition-opacity">
                          <Briefcase className="h-6 w-6" />
                          <span className="font-bold text-lg text-primary-foreground bg-primary px-2 rounded-md">LaburoYa</span>
                        </Link>
                      </SheetTitle>
                  </SheetHeader>
                  <div className="flex flex-col gap-4 p-4">
                    {isLoggedIn ? (
                        <Link href="/profile" className="flex items-center gap-3 text-lg font-medium">
                         <Avatar>
                          <AvatarImage src="https://placehold.co/40x40.png" data-ai-hint="person user" />
                          <AvatarFallback>U</AvatarFallback>
                         </Avatar>
                         Mi Perfil
                       </Link>
                    ) : (
                      <>
                        <Button variant="outline" asChild size="lg">
                          <Link href="/login">Iniciar Sesión</Link>
                        </Button>
                        <Button asChild size="lg">
                          <Link href="/register">Registrarse</Link>
                        </Button>
                      </>
                    )}
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
