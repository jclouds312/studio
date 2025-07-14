
'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { Menu, Briefcase, UserPlus, Shield, User, LogIn, LogOut, MessageSquare, Building } from 'lucide-react';
import { SidebarTrigger } from '../ui/sidebar';
import { usePathname } from 'next/navigation';
import React, { useState } from 'react';
import { ChatPanel } from '../chat/chat-panel';
import { useSession } from '@/hooks/use-session';

export function Header() {
  const { session, logout } = useSession();
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  
  const pathname = usePathname();
  const isAdminPage = pathname.startsWith('/admin');

  const isAdmin = session.isLoggedIn && session.user?.role === 'admin';
  const isCompany = session.isLoggedIn && session.user?.role === 'company';


  if (!session.isMounted) {
    return (
        <header className="bg-card/80 backdrop-blur-sm border-b sticky top-0 z-40">
            <div className="container mx-auto px-4">
                <div className="flex items-center justify-between h-16">
                    <div className='flex items-center gap-2'>
                        <Link href="/" className="flex items-center gap-2 text-primary hover:opacity-80 transition-opacity">
                            <Briefcase className="h-6 w-6" />
                            <span className="font-bold text-xl">Conexión Laboral</span>
                        </Link>
                    </div>
                </div>
            </div>
        </header>
    );
  }

  const handleLinkClick = () => setIsMenuOpen(false);
  const handleChatClick = () => {
    setIsMenuOpen(false);
    setIsChatOpen(true);
  };
  const handleLogoutClick = () => {
    setIsMenuOpen(false);
    logout();
  }

  return (
    <>
    <ChatPanel isOpen={isChatOpen} setIsOpen={setIsChatOpen} />
    <header className="bg-card/60 backdrop-blur-lg border-b sticky top-0 z-40">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
            <div className='flex items-center gap-2'>
                {isAdminPage && session.isLoggedIn && <SidebarTrigger className="md:hidden"/>}
                <Link href="/" className="flex items-center gap-2 text-primary hover:opacity-80 transition-opacity">
                    <Briefcase className="h-6 w-6" />
                     <span className="font-bold text-xl text-foreground">Conexión Laboral</span>
                </Link>
            </div>
          
          <div className="flex items-center gap-2">
            {session.isLoggedIn ? (
               <div className="hidden md:flex items-center gap-4">
                {isAdmin && (
                  <Button variant="ghost" asChild>
                    <Link href="/admin" className="flex items-center gap-2">
                        <Shield />
                        <span>Panel Admin</span>
                    </Link>
                  </Button>
                )}
                {isCompany && (
                  <Button variant="ghost" asChild>
                    <Link href="/company/dashboard" className="flex items-center gap-2">
                        <Building />
                        <span>Panel Empresa</span>
                    </Link>
                  </Button>
                )}
                 <Button variant="ghost" size="icon" onClick={() => setIsChatOpen(true)}>
                    <MessageSquare />
                    <span className="sr-only">Abrir Chat</span>
                  </Button>
                <Link href="/profile">
                  <Avatar className='h-9 w-9 border-2 border-primary/50'>
                    <AvatarImage src={session.user?.avatar || "https://placehold.co/40x40.png"} data-ai-hint="person user" />
                    <AvatarFallback>{session.user?.name?.charAt(0) || 'U'}</AvatarFallback>
                  </Avatar>
                </Link>
                 <Button variant="ghost" onClick={logout}>
                    <LogOut className="mr-2"/>Cerrar Sesión
                 </Button>
               </div>
            ) : (
              <div className="hidden md:flex items-center gap-2">
                  <Button variant="ghost" asChild>
                    <Link href="/login" className="flex items-center gap-2"> <LogIn /> Iniciar Sesión</Link>
                  </Button>
                  <Button asChild>
                    <Link href="/register" className="flex items-center gap-2"><UserPlus/>Registrarse</Link>
                  </Button>
              </div>
            )}
           
            <div className="md:hidden">
              <Sheet open={isMenuOpen} onOpenChange={setIsMenuOpen}>
                <SheetTrigger asChild>
                  <Button variant="ghost" size="icon">
                    <Menu className="h-6 w-6" />
                    <span className="sr-only">Abrir menú</span>
                  </Button>
                </SheetTrigger>
                <SheetContent side="right" className="p-0 bg-background/95 backdrop-blur-sm">
                   <SheetHeader className="p-4 border-b">
                     <SheetTitle>
                       <Link href="/" className="flex items-center gap-2 text-primary hover:opacity-80 transition-opacity" onClick={handleLinkClick}>
                          <Briefcase className="h-6 w-6" />
                          <span className="font-bold text-lg text-foreground">Conexión Laboral</span>
                        </Link>
                      </SheetTitle>
                  </SheetHeader>
                  <div className="flex flex-col gap-2 p-4">
                    {session.isLoggedIn ? (
                      <>
                        <Button variant="ghost" asChild size="lg" className="justify-start gap-4" onClick={handleLinkClick}>
                            <Link href="/profile">
                                <Avatar className="w-8 h-8 mr-1">
                                    <AvatarImage src={session.user?.avatar || "https://placehold.co/40x40.png"} data-ai-hint="person user" />
                                    <AvatarFallback>{session.user?.name?.charAt(0) || 'U'}</AvatarFallback>
                                </Avatar>
                                Mi Perfil
                            </Link>
                        </Button>
                         <Button variant="ghost" asChild size="lg" className="justify-start gap-4" onClick={handleChatClick}>
                           <div className='flex items-center gap-3'>
                               <MessageSquare />Mensajes
                           </div>
                          </Button>
                       {isAdmin && (
                          <Button variant="ghost" asChild size="lg" className="justify-start gap-4" onClick={handleLinkClick}>
                            <Link href="/admin"><Shield />Panel de Admin</Link>
                          </Button>
                        )}
                        {isCompany && (
                          <Button variant="ghost" asChild size="lg" className="justify-start gap-4" onClick={handleLinkClick}>
                            <Link href="/company/dashboard"><Building />Panel de Empresa</Link>
                          </Button>
                        )}
                        <Button variant="destructive" size="lg" className="justify-start gap-4" onClick={handleLogoutClick}>
                          <LogOut />Cerrar Sesión
                        </Button>
                      </>
                    ) : (
                      <>
                        <Button variant="ghost" asChild size="lg" className="justify-start gap-4" onClick={handleLinkClick}>
                          <Link href="/login"><LogIn />Iniciar Sesión</Link>
                        </Button>
                        <Button variant="ghost" asChild size="lg" className="justify-start gap-4" onClick={handleLinkClick}>
                          <Link href="/register"><UserPlus />Registrarse</Link>
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
    </>
  );
}
