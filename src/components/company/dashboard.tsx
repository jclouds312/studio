
'use client';

import React, { useEffect, useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { PlusCircle, Edit, Trash2, Eye, MessageSquare, Star, KeyRound, DollarSign, Loader2, Sparkles, CreditCard, Crown, Settings } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import Link from 'next/link';
import { useSession } from '@/hooks/use-session';
import { allUsers } from '@/data';
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
import type { Candidate, Job } from '@/lib/types';
import { CandidateProfileModal } from './modals/candidate-profile-modal';
import { ChatPanel } from '../chat/chat-panel';
import { getAllJobs, createJob, updateJob, deleteJob } from '@/services/jobService';
import { JobFormModal } from '../admin/modals/job-form-modal';
import { cn } from '@/lib/utils';
import { UserProfileContext } from '@/context/user-profile-context';

const companyApplicants: Candidate[] = allUsers
    .filter(u => u.role === 'user' && ['trabajador@test.com', 'ana.garcia@example.com'].includes(u.email))
    .map((user, index) => ({
        ...user,
        id: user.id!,
        appliedFor: index === 0 ? 'Frontend Developer (React)' : 'Diseñador/a UX/UI Sr.',
        customAnswers: index === 0 ? [
            { question: '¿Cuál es tu experiencia con Next.js App Router?', answer: 'Tengo más de 1 año de experiencia trabajando con el App Router en proyectos profesionales.' },
            { question: 'Describe un proyecto complejo en el que hayas trabajado.', answer: 'Desarrollé una plataforma de e-commerce con un dashboard de analíticas en tiempo real.' }
        ] : [
            { question: 'Por favor, comparte un enlace a tu portafolio.', answer: 'Claro, mi portafolio está en mi.sitio.com/portfolio' },
            { question: '¿Cuál es tu proceso de diseño habitual?', answer: 'Comienzo con investigación de usuario, luego wireframing, prototipado en Figma y finalmente pruebas de usabilidad.' }
        ]
    }));

function FeatureJobModal({ job, onFeatured }: { job: Job, onFeatured: (jobId: string) => void }) {
    const { toast } = useToast();
    const [isPaying, setIsPaying] = useState(false);
    const [paymentSuccess, setPaymentSuccess] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const handlePayment = async () => {
        setIsPaying(true);
        try {
            const adminToken = localStorage.getItem('mp_access_token');
            if (!adminToken) {
                throw new Error('El Access Token de Mercado Pago no está configurado por el administrador.');
            }

            const response = await fetch('/api/mercadopago/create-preference', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    title: `Destacar: ${job.title}`,
                    unit_price: 500,
                    accessToken: adminToken,
                }),
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.error || 'No se pudo crear la preferencia de pago.');
            }

            const preference = await response.json();
            console.log('Preferencia de pago creada:', preference.id);
            toast({
                title: "Redirigiendo a Mercado Pago...",
                description: `ID de Preferencia: ${preference.id}. En una app real, serías redirigido.`,
            });

            setTimeout(async () => {
                await updateJob(job.id, { isFeatured: true });
                onFeatured(job.id);
                setIsPaying(false);
                setPaymentSuccess(true);
            }, 2000);

        } catch (error) {
            console.error(error);
            const errorMessage = error instanceof Error ? error.message : "Error desconocido";
            toast({
                title: "Error al procesar el pago",
                description: errorMessage,
                variant: "destructive"
            });
            setIsPaying(false);
        }
    };

    const handleOpenChange = (open: boolean) => {
        setIsModalOpen(open);
        if (!open) {
            setPaymentSuccess(false);
        }
    }

    return (
        <AlertDialog open={isModalOpen} onOpenChange={handleOpenChange}>
            <AlertDialogTrigger asChild>
                <Button variant="outline" size="icon" disabled={job.isFeatured}>
                    <Star className={cn("h-4 w-4", job.isFeatured ? "text-amber-400 fill-amber-400" : "text-amber-400")} />
                </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
                <AlertDialogHeader>
                    {paymentSuccess ? (
                        <div className="text-center py-4">
                            <Sparkles className="h-12 w-12 text-green-500 mx-auto mb-2" />
                            <AlertDialogTitle>¡Publicación Destacada!</AlertDialogTitle>
                            <AlertDialogDescription>Tu oferta ahora tiene máxima visibilidad.</AlertDialogDescription>
                        </div>
                    ) : (
                        <>
                            <AlertDialogTitle>Destacar Publicación</AlertDialogTitle>
                            <AlertDialogDescription>
                                Estás a punto de pagar <span className="font-bold text-foreground">ARS $500.00</span> para destacar esta publicación.
                                Aparecerá en la página principal y en la parte superior de los resultados de búsqueda.
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
                                    <><Loader2 className="mr-2 h-4 w-4 animate-spin" /> Procesando...</>
                                ) : (
                                    <><CreditCard className="mr-2 h-4 w-4" /> Pagar ahora</>
                                )}
                            </Button>
                        </>
                    )}
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    );
}


export function CompanyDashboard() {
  const { session } = useSession();
  const { hasActiveSubscription, activePlan, subscriptionEndDate } = React.useContext(UserProfileContext);
  const { toast } = useToast();
  const [isMpConnected, setIsMpConnected] = React.useState(false);
  const [isPaying, setIsPaying] = React.useState(false);
  const [paymentSuccess, setPaymentSuccess] = React.useState(false);
  const [selectedCandidate, setSelectedCandidate] = React.useState<Candidate | null>(null);
  const [isProfileModalOpen, setIsProfileModalOpen] = React.useState(false);
  const [isChatOpen, setIsChatOpen] = React.useState(false);
  const [companyJobs, setCompanyJobs] = useState<Job[]>([]);
  const [isJobModalOpen, setIsJobModalOpen] = useState(false);
  const [selectedJob, setSelectedJob] = useState<Job | null>(null);

  const fetchCompanyJobs = async () => {
    if (session.user?.companyProfileId) {
      const allJobs = await getAllJobs();
      const jobs = allJobs.filter(job => job.companyProfileId === session.user?.companyProfileId);
      setCompanyJobs(jobs);
    }
  };

  useEffect(() => {
    if (session.isMounted) {
      fetchCompanyJobs();
    }
  }, [session.isMounted, session.user]);

  const handleViewProfile = (candidate: Candidate) => {
    setSelectedCandidate(candidate);
    setIsProfileModalOpen(true);
  };
  
  const handleContact = () => {
    setIsProfileModalOpen(false);
    setIsChatOpen(true);
  };

  const handleOpenJobModal = (job: Job | null = null) => {
    setSelectedJob(job);
    setIsJobModalOpen(true);
  };

  const handleSaveJob = async (jobData: Job) => {
    if (!session.user?.companyProfileId) {
        toast({ title: "Error", description: "No se encontró el perfil de la empresa.", variant: "destructive" });
        return;
    }
    
    const dataToSave = {
        ...jobData,
        companyProfileId: session.user.companyProfileId,
        company: session.user.name,
    };

    if (selectedJob) {
        await updateJob(selectedJob.id, dataToSave);
        toast({ title: "Publicación actualizada" });
    } else {
        await createJob(dataToSave);
        toast({ title: "Publicación creada" });
    }
    fetchCompanyJobs();
  };

  const handleDeleteJob = async (jobId: string) => {
    await deleteJob(jobId);
    toast({ title: 'Publicación Eliminada', variant: 'destructive' });
    fetchCompanyJobs();
  };
  
  const handleJobFeatured = (jobId: string) => {
      setCompanyJobs(prevJobs => prevJobs.map(j => j.id === jobId ? { ...j, isFeatured: true } : j));
  };


  const handleConnectMp = () => {
    toast({
        title: "Conexión Simulada",
        description: "Tu Access Token ha sido guardado (simulado).",
    });
    setIsMpConnected(true);
  }

  if (!session.isMounted) {
    return <div className="flex justify-center items-center h-64"><Loader2 className="h-8 w-8 animate-spin" /></div>;
  }
  
  if (!session.user || session.user.role !== 'company') {
    return <div className="text-center py-12">Acceso denegado. Esta sección es solo para empresas.</div>;
  }
  
  return (
    <>
    <ChatPanel isOpen={isChatOpen} setIsOpen={setIsChatOpen} />
    <CandidateProfileModal 
      isOpen={isProfileModalOpen} 
      setIsOpen={setIsProfileModalOpen} 
      candidate={selectedCandidate}
      onContact={handleContact}
    />
    <JobFormModal 
        isOpen={isJobModalOpen}
        setIsOpen={setIsJobModalOpen}
        job={selectedJob}
        onSave={handleSaveJob}
    />
    <div className="company-dashboard-theme max-w-7xl mx-auto space-y-8">
      <div className="space-y-2">
        <h1 className="text-4xl font-bold tracking-tight">Panel de Empresa</h1>
        <p className="text-lg text-muted-foreground">Gestiona tus publicaciones, candidatos y suscripciones.</p>
      </div>
      
       {hasActiveSubscription ? (
             <Card className="theme-premium text-center p-6 rounded-lg shadow-lg">
                <CardHeader className="p-0 mb-2">
                    <div className="flex justify-center items-center gap-2 text-amber-300">
                        <Crown className="h-6 w-6"/>
                        <CardTitle className="text-2xl text-white">Miembro Premium</CardTitle>
                    </div>
                </CardHeader>
                <CardContent className="p-0">
                    <p className="text-lg font-semibold text-white">Plan Actual: {activePlan}</p>
                    {subscriptionEndDate && <p className="text-sm text-amber-100/80 mt-1">Vence el: {subscriptionEndDate}</p>}
                    <Button asChild variant="link" className="text-amber-200 hover:text-white mt-1">
                        <Link href="/subscriptions"><Settings className="mr-2 h-4 w-4" />Administrar mi suscripción</Link>
                    </Button>
                </CardContent>
            </Card>
        ) : (
            <Card className="bg-gradient-to-r from-primary/80 to-primary/60 text-primary-foreground text-center p-6 rounded-lg shadow-lg">
                <CardHeader className="p-0 mb-2">
                <CardTitle>¡Potencia tu Empresa!</CardTitle>
                <CardDescription className="text-primary-foreground/80">
                    Publica más ofertas y accede a herramientas avanzadas con nuestros planes premium.
                </CardDescription>
                </CardHeader>
                <CardContent className="p-0">
                <Button asChild className="bg-primary-foreground text-primary hover:bg-primary-foreground/90">
                    <Link href="/subscriptions">
                        <Star className="mr-2 h-4 w-4" />
                        Ver Planes Premium
                    </Link>
                </Button>
                </CardContent>
            </Card>
        )}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-8">
            <Card>
                <CardHeader className="flex flex-row items-center justify-between">
                    <div>
                        <CardTitle>Mis Publicaciones de Trabajo</CardTitle>
                        <CardDescription>Aquí puedes ver y gestionar todas tus ofertas de empleo.</CardDescription>
                    </div>
                    <Button size="sm" className="gap-1" onClick={() => handleOpenJobModal()}>
                        <PlusCircle className="h-4 w-4" />
                        <span>Nueva Publicación</span>
                    </Button>
                </CardHeader>
                <CardContent>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead className='w-[80px]'>Imagen</TableHead>
                                <TableHead>Título</TableHead>
                                <TableHead>Estado</TableHead>
                                <TableHead>Candidatos</TableHead>
                                <TableHead className="text-right">Acciones</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {companyJobs.length > 0 ? companyJobs.map((job) => (
                                <TableRow key={job.id}>
                                    <TableCell>
                                        <Image src={job.imageUrl || 'https://placehold.co/100x100.png'} alt={job.title} width={64} height={64} className="rounded-md object-cover aspect-square" data-ai-hint="job vacancy"/>
                                    </TableCell>
                                    <TableCell className="font-medium">
                                        <Link href={`/jobs/${job.id}`} className="hover:underline">{job.title}</Link>
                                         {job.isFeatured && <Badge className="ml-2 bg-amber-400 text-amber-900">Destacado</Badge>}
                                    </TableCell>
                                    <TableCell>
                                        <Badge>Activa</Badge>
                                    </TableCell>
                                    <TableCell>
                                        <Badge variant="secondary">3</Badge>
                                    </TableCell>
                                    <TableCell className="text-right">
                                        <div className="flex gap-2 justify-end">
                                            <FeatureJobModal job={job} onFeatured={handleJobFeatured} />
                                            <Button variant="outline" size="icon" onClick={() => handleOpenJobModal(job)}>
                                                <Edit className="h-4 w-4" />
                                            </Button>
                                            <Button variant="destructive" size="icon" onClick={() => handleDeleteJob(job.id)}>
                                                <Trash2 className="h-4 w-4" />
                                            </Button>
                                        </div>
                                    </TableCell>
                                </TableRow>
                            )) : (
                                <TableRow>
                                    <TableCell colSpan={5} className="text-center text-muted-foreground py-8">
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
                                <p className="text-lg font-semibold text-foreground">{activePlan || 'Plan Básico'}</p>
                                <p className="text-sm text-muted-foreground">{subscriptionEndDate ? `Vence el: ${subscriptionEndDate}`: 'Suscripción inactiva'}</p>
                            </div>
                            <Badge variant="default" className={cn(hasActiveSubscription ? "bg-green-500/80" : "bg-muted-foreground")}>{hasActiveSubscription ? 'Activo' : 'Inactivo'}</Badge>
                        </div>
                        <p className="text-xs text-muted-foreground">
                            {hasActiveSubscription 
                                ? 'Tu plan te permite publicar más ofertas y acceder a funciones avanzadas.'
                                : 'Mejora tu plan para publicar más y mejores ofertas.'
                            }
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
                                    <AvatarImage src={applicant.avatar!} data-ai-hint="person user"/>
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
