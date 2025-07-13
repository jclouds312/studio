'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { Menu, Briefcase, UserPlus, Shield, User } from 'lucide-react';
import { SidebarTrigger } from '../ui/sidebar';
import { usePathname } from 'next/navigation';

export function Header() {
  const isLoggedIn = true; // Set to true for logged in user
  const isAdmin = true; // Set to true for logged in admin to see the panel
  
  const pathname = usePathname();
  const isAdminPage = pathname.startsWith('/admin');


  return (
    <header className="bg-card/80 backdrop-blur-sm border-b sticky top-0 z-40">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
            <div className='flex items-center gap-2'>
                {isAdminPage && <SidebarTrigger className="md:hidden"/>}
                <Link href="/" className="flex items-center gap-2 text-primary hover:opacity-80 transition-opacity">
                    <Briefcase className="h-6 w-6" />
                    <span className="font-bold text-xl text-primary-foreground bg-primary px-2 rounded-md">LaburoYa</span>
                </Link>
            </div>
          
          <div className="flex items-center gap-4">
            {isLoggedIn ? (
               <div className="flex items-center gap-4">
                {isAdmin && (
                  <Button variant="ghost" asChild>
                    <Link href="/admin"><Shield className="mr-2"/>Admin Panel</Link>
                  </Button>
                )}
                <Link href="/profile">
                  <Avatar>
                    <AvatarImage src="https://placehold.co/40x40.png" data-ai-hint="person user" />
                    <AvatarFallback>JV</AvatarFallback>
                  </Avatar>
                </Link>
               </div>
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
                     <SheetTitle>
                       <Link href="/" className="flex items-center gap-2 text-primary hover:opacity-80 transition-opacity">
                          <Briefcase className="h-6 w-6" />
                          <span className="font-bold text-lg text-primary-foreground bg-primary px-2 rounded-md">LaburoYa</span>
                        </Link>
                      </SheetTitle>
                  </SheetHeader>
                  <div className="flex flex-col gap-4 p-4">
                    {isLoggedIn ? (
                      <>
                        <Button variant="outline" asChild size="lg" className="justify-start gap-2">
                            <Link href="/profile">
                                <Avatar className="w-8 h-8">
                                    <AvatarImage src="https://placehold.co/40x40.png" data-ai-hint="person user" />
                                    <AvatarFallback>JV</AvatarFallback>
                                </Avatar>
                                Mi Perfil
                            </Link>
                        </Button>
                       {isAdmin && (
                          <Button variant="outline" asChild size="lg">
                            <Link href="/admin">Panel de Admin</Link>
                          </Button>
                        )}
                        <Button variant="destructive" asChild size="lg">
                          <Link href="/">Cerrar Sesión</Link>
                        </Button>
                      </>
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
