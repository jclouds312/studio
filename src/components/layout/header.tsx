
'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { Menu, Briefcase, UserPlus, Shield, User, LogIn, LogOut, MessageSquare, Building, Settings, Star, Gem, LifeBuoy } from 'lucide-react';
import { SidebarTrigger } from '../ui/sidebar';
import { usePathname } from 'next/navigation';
import React, { useState } from 'react';
import { ChatPanel } from '../chat/chat-panel';
import { useSession } from '@/hooks/use-session';
import { Separator } from '../ui/separator';

export function Header() {
  const { session, logout } = useSession();
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  
  const pathname = usePathname();
  const isAdminPage = pathname.startsWith('/admin');

  const isAdmin = session.isLoggedIn && session.user?.role === 'admin';
  const isCompany = session.isLoggedIn && session.user?.role === 'company';
  const isWorker = session.isLoggedIn && session.user?.role === 'user';

  if (!session.isMounted) {
    return (
        <header className="bg-background/80 backdrop-blur-sm border-b sticky top-0 z-40">
            <div className="container mx-auto px-4">
                <div className="flex items-center justify-between h-16">
                    <div className='flex items-center gap-2'>
                        <Link href="/" className="flex items-center gap-2 hover:opacity-80 transition-opacity">
                            <Briefcase className="h-6 w-6 text-primary" />
                            <span className="font-bold text-xl text-amber-400">LaburoYA</span>
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

  const menuButtonClass = "justify-start gap-4 text-base h-12 hover:bg-primary/10 hover:text-foreground transition-all duration-200 ease-in-out";
  const menuIconClass = "h-5 w-5 text-primary";

  return (
    <>
    <ChatPanel isOpen={isChatOpen} setIsOpen={setIsChatOpen} />
    <header className="bg-background/60 backdrop-blur-lg border-b sticky top-0 z-40">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
            <div className='flex items-center gap-2'>
                {isAdminPage && session.isLoggedIn && <SidebarTrigger className="md:hidden"/>}
                <Link href="/" className="flex items-center gap-2 hover:opacity-80 transition-opacity">
                    <Briefcase className="h-6 w-6 text-primary" />
                     <span className="font-bold text-xl text-amber-400">LaburoYA</span>
                </Link>
            </div>
          
          <div className="flex items-center gap-2">
            {session.isLoggedIn ? (
              <div className="hidden md:flex items-center gap-2">
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="flex items-center gap-2">
                            <Avatar className='h-9 w-9 border-2 border-primary/50'>
                                <AvatarImage src={session.user?.avatar || "https://placehold.co/40x40.png"} data-ai-hint="person user" />
                                <AvatarFallback>{session.user?.name?.charAt(0) || 'U'}</AvatarFallback>
                            </Avatar>
                            <span className="hidden lg:inline">{session.user?.name}</span>
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="w-56">
                        <DropdownMenuLabel>Mi Cuenta</DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        {isWorker && (
                            <>
                                <DropdownMenuItem asChild>
                                    <Link href="/profile"><User className="mr-2 h-4 w-4" />Mi Perfil</Link>
                                </DropdownMenuItem>
                                <DropdownMenuItem asChild>
                                    <Link href="/profile"><Briefcase className="mr-2 h-4 w-4" />Mis Postulaciones</Link>
                                </DropdownMenuItem>
                                <DropdownMenuItem onClick={() => setIsChatOpen(true)}>
                                    <MessageSquare className="mr-2 h-4 w-4" />Mensajes
                                </DropdownMenuItem>
                            </>
                        )}
                        {isCompany && (
                            <DropdownMenuItem asChild>
                                <Link href="/company/dashboard"><Building className="mr-2 h-4 w-4" />Panel de Empresa</Link>
                            </DropdownMenuItem>
                        )}
                         {isAdmin && (
                            <DropdownMenuItem asChild>
                                <Link href="/admin"><Shield className="mr-2 h-4 w-4" />Panel de Admin</Link>
                            </DropdownMenuItem>
                        )}
                        <DropdownMenuItem>
                            <Settings className="mr-2 h-4 w-4" />Configuración
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem onClick={logout}>
                            <LogOut className="mr-2 h-4 w-4" />Cerrar Sesión
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
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
                <SheetContent side="right" className="p-0 bg-card/80 backdrop-blur-lg w-full max-w-[300px]">
                   <SheetHeader className="p-4 border-b border-white/10">
                     <SheetTitle>
                       <Link href="/" className="flex items-center gap-2 hover:opacity-80 transition-opacity" onClick={handleLinkClick}>
                          <Briefcase className="h-6 w-6 text-primary" />
                          <span className="font-bold text-lg text-amber-400">LaburoYA</span>
                        </Link>
                      </SheetTitle>
                  </SheetHeader>
                  <div className="flex flex-col h-full">
                    <div className="flex flex-col gap-2 p-4 flex-grow">
                      {session.isLoggedIn ? (
                        <>
                          <Button variant="ghost" asChild size="lg" className={menuButtonClass} onClick={handleLinkClick}>
                              <Link href="/profile">
                                  <Avatar className="w-8 h-8 mr-1 border-2 border-primary/50">
                                      <AvatarImage src={session.user?.avatar || "https://placehold.co/40x40.png"} data-ai-hint="person user" />
                                      <AvatarFallback>{session.user?.name?.charAt(0) || 'U'}</AvatarFallback>
                                  </Avatar>
                                  Mi Perfil
                              </Link>
                          </Button>
                          {isWorker && (
                              <>
                                  <Button variant="ghost" asChild size="lg" className={menuButtonClass} onClick={handleLinkClick}>
                                      <Link href="/profile"><Briefcase className={menuIconClass} />Mis Postulaciones</Link>
                                  </Button>
                                  <Button variant="ghost" asChild size="lg" className={menuButtonClass} onClick={handleChatClick}>
                                  <div className='flex items-center gap-4'>
                                      <MessageSquare className={menuIconClass} />Mensajes
                                  </div>
                                  </Button>
                            </>
                          )}
                          {isAdmin && (
                            <Button variant="ghost" asChild size="lg" className={menuButtonClass} onClick={handleLinkClick}>
                              <Link href="/admin"><Shield className={menuIconClass} />Panel de Admin</Link>
                            </Button>
                          )}
                          {isCompany && (
                            <Button variant="ghost" asChild size="lg" className={menuButtonClass} onClick={handleLinkClick}>
                              <Link href="/company/dashboard"><Building className={menuIconClass} />Panel de Empresa</Link>
                            </Button>
                          )}
                          <Separator className="my-2 bg-white/10" />
                          <Button variant="ghost" asChild size="lg" className={menuButtonClass} onClick={handleLinkClick}>
                            <Link href={isCompany ? "/premium-post" : "/subscriptions"}>
                                <Star className={menuIconClass}/>
                                {isCompany ? 'Publicación Premium' : 'Postulación Premium'}
                            </Link>
                          </Button>
                          <Button variant="ghost" asChild size="lg" className={menuButtonClass} onClick={handleLinkClick}>
                              <Link href="/subscriptions"><Gem className={menuIconClass}/>Planes Premium</Link>
                          </Button>
                        </>
                      ) : (
                        <>
                          <Button variant="ghost" asChild size="lg" className={menuButtonClass} onClick={handleLinkClick}>
                            <Link href="/login"><LogIn className={menuIconClass} />Iniciar Sesión</Link>
                          </Button>
                          <Button variant="ghost" asChild size="lg" className={menuButtonClass} onClick={handleLinkClick}>
                            <Link href="/register"><UserPlus className={menuIconClass} />Registrarse</Link>
                          </Button>
                        </>
                      )}
                    </div>
                    <div className="p-4 border-t border-white/10 mt-auto">
                      <Button variant="ghost" size="lg" className={menuButtonClass} onClick={handleChatClick}>
                          <LifeBuoy className={menuIconClass} />Contactar Soporte
                      </Button>
                      {session.isLoggedIn && (
                        <Button variant="destructive" size="lg" className="justify-center w-full mt-2 h-12 text-base" onClick={handleLogoutClick}>
                          <LogOut className="mr-2 h-5 w-5" />Cerrar Sesión
                        </Button>
                      )}
                    </div>
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
