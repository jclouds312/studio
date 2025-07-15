
'use client';

import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { PlusCircle, Edit, Trash2, Eye, MessageSquare, Star, KeyRound, DollarSign, Loader2, Sparkles, CreditCard } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import Link from 'next/link';
import { useSession } from '@/hooks/use-session';
import { allJobs, allUsers } from '@/data';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import { Separator } from '../ui/separator';
import { Label } from '../ui/label';
import { Input } from '../ui/input';
import { useToast } from '../ui/use-toast';
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import Image from "next/image";
import type { Candidate } from '@/lib/types';
import { CandidateProfileModal } from './modals/candidate-profile-modal';
import { ChatPanel } from '../chat/chat-panel';

const companyApplicants: Candidate[] = allUsers
    .filter(u => u.role === 'user' && ['juan.perez@example.com', 'ana.garcia@example.com'].includes(u.email))
    .map((user, index) => ({
        ...user,
        appliedFor: index === 0 ? 'Frontend Developer (React)' : 'Diseñador/a UX/UI Sr.'
    }));

export function CompanyDashboard() {
  const { session } = useSession();
  const { toast } = useToast();
  const [isMpConnected, setIsMpConnected] = React.useState(false);
  const [isPaying, setIsPaying] = React.useState(false);
  const [paymentSuccess, setPaymentSuccess] = React.useState(false);
  const [selectedCandidate, setSelectedCandidate] = React.useState<Candidate | null>(null);
  const [isProfileModalOpen, setIsProfileModalOpen] = React.useState(false);
  const [isChatOpen, setIsChatOpen] = React.useState(false);

  const handleViewProfile = (candidate: Candidate) => {
    setSelectedCandidate(candidate);
    setIsProfileModalOpen(true);
  };
  
  const handleContact = () => {
    setIsProfileModalOpen(false);
    setIsChatOpen(true);
  };

  const handleConnectMp = () => {
    toast({
        title: "Conexión Simulada",
        description: "Tu Access Token ha sido guardado (simulado).",
    });
    setIsMpConnected(true);
  }

  const handlePayment = async () => {
    setIsPaying(true);
    try {
      const response = await fetch('/api/mercadopago/create-preference', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title: 'Publicación Destacada',
          unit_price: 500,
        }),
      });

      if (!response.ok) throw new Error('Failed to create payment preference');
      
      const preference = await response.json();
      console.log('Preferencia de pago creada:', preference.id);
      toast({
        title: "Redirigiendo a Mercado Pago...",
        description: `ID de Preferencia: ${preference.id}. En una app real, serías redirigido.`,
      });

      setTimeout(() => {
        setIsPaying(false);
        setPaymentSuccess(true);
      }, 2000);

    } catch (error) {
      console.error(error);
      toast({
        title: "Error al procesar el pago",
        description: "No se pudo crear la preferencia de pago. Intenta de nuevo.",
        variant: "destructive"
      })
      setIsPaying(false);
    }
  };

  if (!session.isMounted) {
    return <div className="flex justify-center items-center h-64"><Loader2 className="h-8 w-8 animate-spin" /></div>;
  }
  
  if (!session.user || session.user.role !== 'company') {
    return <div className="text-center py-12">Acceso denegado. Esta sección es solo para empresas.</div>;
  }
  
  const companyJobs = allJobs.filter(job => job.company === session.user?.name);

  return (
    <>
    <ChatPanel isOpen={isChatOpen} setIsOpen={setIsChatOpen} />
    <CandidateProfileModal 
      isOpen={isProfileModalOpen} 
      setIsOpen={setIsProfileModalOpen} 
      candidate={selectedCandidate}
      onContact={handleContact}
    />
    <div className="company-dashboard-theme max-w-7xl mx-auto space-y-8">
      <div className="space-y-2">
        <h1 className="text-4xl font-bold tracking-tight">Panel de Empresa</h1>
        <p className="text-lg text-muted-foreground">Gestiona tus publicaciones, candidatos y suscripciones.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-8">
            <Card>
                <CardHeader className="flex flex-row items-center justify-between">
                    <div>
                        <CardTitle>Mis Publicaciones de Trabajo</CardTitle>
                        <CardDescription>Aquí puedes ver y gestionar todas tus ofertas de empleo.</CardDescription>
                    </div>
                    <Button size="sm" className="gap-1">
                        <PlusCircle className="h-4 w-4" />
                        <span>Nueva Publicación</span>
                    </Button>
                </CardHeader>
                <CardContent>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Título</TableHead>
                                <TableHead>Estado</TableHead>
                                <TableHead>Candidatos</TableHead>
                                <TableHead><span className="sr-only">Acciones</span></TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {companyJobs.length > 0 ? companyJobs.map((job) => (
                                <TableRow key={job.id}>
                                    <TableCell className="font-medium">
                                        <Link href={`/jobs/${job.id}`} className="hover:underline">{job.title}</Link>
                                    </TableCell>
                                    <TableCell>
                                        <Badge>Activa</Badge>
                                    </TableCell>
                                    <TableCell>
                                        <Badge variant="secondary">3</Badge>
                                    </TableCell>
                                    <TableCell className="text-right">
                                        <div className="flex gap-2 justify-end">
                                            <Button variant="outline" size="icon">
                                                <Edit className="h-4 w-4" />
                                            </Button>
                                            <Button variant="destructive" size="icon">
                                                <Trash2 className="h-4 w-4" />
                                            </Button>
                                        </div>
                                    </TableCell>
                                </TableRow>
                            )) : (
                                <TableRow>
                                    <TableCell colSpan={4} className="text-center text-muted-foreground py-8">
                                        No tienes ninguna publicación de trabajo activa.
                                    </TableCell>
                                </TableRow>
                            )}
                        </TableBody>
                    </Table>
                </CardContent>
            </Card>

            <Card>
                 <CardHeader>
                    <CardTitle>Suscripción y Pagos</CardTitle>
                    <CardDescription>Gestiona tu plan y método de pago.</CardDescription>
                </CardHeader>
                <CardContent className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-4 p-4 border rounded-lg bg-secondary/30">
                        <h3 className="font-semibold">Mi Plan Actual</h3>
                        <div className="flex justify-between items-center">
                            <div>
                                <p className="text-lg font-semibold text-foreground">Plan Empresa</p>
                                <p className="text-sm text-muted-foreground">Próxima renovación: 19 de Agosto, 2024</p>
                            </div>
                            <Badge variant="default" className="bg-green-500/80">Activo</Badge>
                        </div>
                        <p className="text-xs text-muted-foreground">
                            Tu plan te permite publicar hasta 5 ofertas y acceder a la base de datos de candidatos.
                        </p>
                        <Button variant="outline" asChild className="w-full">
                            <Link href="/subscriptions">Administrar Suscripción</Link>
                        </Button>
                    </div>
                    
                    <div className="space-y-4 p-4 border rounded-lg">
                        <h3 className="font-semibold">Método de Pago</h3>
                        {isMpConnected ? (
                            <div className="flex flex-col items-center justify-center text-center p-2 bg-green-500/10 border border-green-500/20 rounded-lg">
                                <Sparkles className="h-8 w-8 text-green-400 mb-2"/>
                                <p className="font-semibold text-green-300">¡Mercado Pago Conectado!</p>
                                <Button variant="link" size="sm" className="mt-1 text-xs text-muted-foreground h-auto p-0" onClick={() => setIsMpConnected(false)}>Desconectar</Button>
                            </div>
                        ) : (
                             <div className="space-y-2">
                                <Label htmlFor="mp-token">Access Token de Mercado Pago</Label>
                                <div className="relative">
                                    <KeyRound className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground"/>
                                    <Input id="mp-token" type="password" placeholder="APP_USR-..." className="pl-10"/>
                                </div>
                                <Button onClick={handleConnectMp} className="w-full">
                                    <Star className="mr-2 h-4 w-4"/>
                                    Conectar Mercado Pago
                                </Button>
                            </div>
                        )}
                        <Separator />
                         <AlertDialog onOpenChange={() => { setIsPaying(false); setPaymentSuccess(false); }}>
                            <AlertDialogTrigger asChild>
                                <Button variant="outline" className="w-full" disabled={!isMpConnected}>
                                    <DollarSign className="mr-2 h-4 w-4"/>
                                    Simular Pago de Servicio
                                </Button>
                            </AlertDialogTrigger>
                             <AlertDialogContent>
                                <AlertDialogHeader>
                                {paymentSuccess ? (
                                    <div className="text-center py-4">
                                        <Sparkles className="h-12 w-12 text-green-500 mx-auto mb-2"/>
                                        <AlertDialogTitle>¡Pago exitoso!</AlertDialogTitle>
                                        <AlertDialogDescription>El servicio ha sido activado.</AlertDialogDescription>
                                    </div>
                                    ) : (
                                    <>
                                        <AlertDialogTitle className="flex items-center gap-2">
                                            <Image src="https://www.mercadopago.com.ar/static/logo-lila.svg" alt="Mercado Pago" width={120} height={28} data-ai-hint="company logo"/>
                                            Confirmar Pago
                                        </AlertDialogTitle>
                                        <AlertDialogDescription>
                                            Estás a punto de pagar <span className="font-bold text-foreground">ARS $500.00</span> por un servicio de publicación destacada.
                                        </AlertDialogDescription>
                                    </>
                                    )}
                                </AlertDialogHeader>
                                <AlertDialogFooter>
                                    {paymentSuccess ? (
                                        <AlertDialogCancel>Cerrar</AlertDialogCancel>
                                    ) : (
                                        <>
                                            <AlertDialogCancel disabled={isPaying}>Cancelar</AlertDialogCancel>
                                            <Button onClick={handlePayment} disabled={isPaying}>
                                            {isPaying ? (
                                                <>
                                                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                                Procesando...
                                                </>
                                            ) : (
                                                <>
                                                <CreditCard className="mr-2 h-4 w-4" />
                                                Pagar ahora
                                                </>
                                            )}
                                            </Button>
                                        </>
                                    )}
                                </AlertDialogFooter>
                            </AlertDialogContent>
                        </AlertDialog>
                    </div>
                </CardContent>
            </Card>
        </div>

        <div className="lg:col-span-1">
            <Card>
                <CardHeader>
                    <CardTitle>Candidatos Recientes</CardTitle>
                    <CardDescription>Últimos usuarios que aplicaron a tus ofertas.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-1">
                    {companyApplicants.map(applicant => (
                        <React.Fragment key={applicant.id}>
                            <div className="flex items-center gap-4 py-2 hover:bg-secondary/50 rounded-md px-2 -mx-2">
                                <Avatar>
                                    <AvatarImage src={applicant.avatar} data-ai-hint="person user"/>
                                    <AvatarFallback>{applicant.name.charAt(0)}</AvatarFallback>
                                </Avatar>
                                <div className="flex-1">
                                    <p className="font-semibold">{applicant.name}</p>
                                    <p className="text-xs text-muted-foreground">Aplicó a: {applicant.appliedFor}</p>
                                </div>
                                <div className="flex gap-1">
                                    <Button variant="ghost" size="icon" onClick={() => handleViewProfile(applicant)}>
                                        <Eye className="h-4 w-4" />
                                         <span className="sr-only">Ver Perfil</span>
                                    </Button>
                                     <Button variant="ghost" size="icon" onClick={handleContact}>
                                        <MessageSquare className="h-4 w-4" />
                                         <span className="sr-only">Contactar</span>
                                    </Button>
                                </div>
                            </div>
                            <Separator className="last:hidden" />
                        </React.Fragment>
                    ))}
                    <Button variant="secondary" className="w-full mt-2">Ver todos los candidatos</Button>
                </CardContent>
            </Card>
        </div>
      </div>
    </div>
    </>
  );
}
