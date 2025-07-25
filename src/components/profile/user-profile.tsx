
'use client';

import React, { useContext, useEffect, useState } from 'react';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Upload, Edit, Loader2, User, Phone, FileText, Briefcase, Eye, Calendar, Bookmark, Shield, MapPin, MessageSquare, Trash2, Link as LinkIcon, Star, Settings, Building, Mail, Globe, Search, UserCircle, Key, Crown } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import { Separator } from '../ui/separator';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from '../ui/badge';
import { Textarea } from '../ui/textarea';
import { ChatPanel } from '../chat/chat-panel';
import type { CompanyProfile, User as AppUser } from '@/lib/types';
import Link from 'next/link';
import { useSession } from '@/hooks/use-session';
import { UserProfileContext } from '@/context/user-profile-context';
import { cn } from '@/lib/utils';
import { JobListings } from '../job-listings';
import { getAllJobs } from '@/services/jobService';
import { updateUser, getCompanyProfileByUserId } from '@/services/userService';
import type { Job as PrismaJob, Application as PrismaApplication } from '@prisma/client';


const roleDisplayMap = {
    TRABAJADOR: 'Trabajador',
    EMPRESA: 'Empresa',
    ADMIN: 'Administrador',
};

function CompanyProfileView({ company }: { company: CompanyProfile | null }) {
    const { toast } = useToast();
    const [isSubmitting, setIsSubmitting] = React.useState(false);
    
    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setIsSubmitting(true);

        setTimeout(() => {
          setIsSubmitting(false);
          toast({
            title: "Perfil de Empresa Actualizado",
            description: "Los cambios se han guardado correctamente.",
          });
        }, 1500);
    };

    if (!company) return <Loader2 className="animate-spin" />;

    return (
         <Card>
            <CardHeader>
                <CardTitle>Perfil de la Empresa</CardTitle>
                <CardDescription>Gestiona la información pública y los datos de contacto de tu empresa.</CardDescription>
            </CardHeader>
            <CardContent>
                <form className="space-y-6" onSubmit={handleSubmit}>
                    <div className="grid md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                            <Label htmlFor="companyName">Nombre de la Empresa</Label>
                            <Input id="companyName" defaultValue={company.name} />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="cuit">CUIT</Label>
                            <Input id="cuit" defaultValue={company.cuit} />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="phone">Teléfono de Contacto</Label>
                            <Input id="phone" type="tel" defaultValue={company.phone || ''} />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="address">Dirección</Label>
                            <Input id="address" defaultValue={company.address || ''} />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="city">Ciudad</Label>
                            <Input id="city" defaultValue={company.city || ''} />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="province">Provincia</Label>
                            <Input id="province" defaultValue={company.province || ''} />
                        </div>
                    </div>
                     <div className="flex justify-end pt-2">
                        <Button type="submit" size="lg" disabled={isSubmitting}>
                            {isSubmitting ? (
                            <>
                                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                Guardando...
                            </>
                            ) : (
                            <>
                                <Edit className="mr-2 h-4 w-4" />
                                Guardar Cambios
                            </>
                            )}
                        </Button>
                    </div>
                </form>
            </CardContent>
        </Card>
    )
}

function EditProfileTab() {
  const { toast } = useToast();
  const { session } = useSession();
  const { profileData, setProfileData } = useContext(UserProfileContext);
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const fileInputRef = React.useRef<HTMLInputElement>(null);
  const [fileName, setFileName] = React.useState<string | null>(null);
  const isAdmin = session.user?.role === 'ADMIN';
  const isWorker = session.user?.role === 'TRABAJADOR';

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!session.user || !profileData) return;
    setIsSubmitting(true);

    const formData = new FormData(event.currentTarget);
    const updatedData: Partial<AppUser> = {
        name: formData.get('name') as string,
    };

    if (isWorker) {
        updatedData.phone = formData.get('phone') as string;
        updatedData.location = formData.get('location') as string;
        updatedData.professionalSummary = formData.get('summary') as string;
        updatedData.experience = formData.get('experience') as string;
    }
    
    try {
        const updatedUser = await updateUser(session.user.id, updatedData);
        if (updatedUser) {
            setProfileData(updatedUser);
            toast({
                title: "Perfil Actualizado",
                description: "Tus cambios se han guardado correctamente.",
            });
        }
    } catch (error) {
        toast({ title: "Error al actualizar", variant: "destructive" });
    } finally {
        setIsSubmitting(false);
    }
  };

   const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setFileName(file.name);
      toast({
        title: "Archivo Cargado",
        description: `Se ha cargado el archivo: ${file.name}`,
      });
    }
  };

  if (!profileData) return <Loader2 className="animate-spin" />;

  return (
      <Card>
        <CardHeader>
            <CardTitle>{isAdmin ? 'Configuración de Cuenta' : 'Información Personal y Profesional'}</CardTitle>
            <CardDescription>{isAdmin ? 'Gestiona los datos de tu cuenta de administrador.' : 'Actualiza tus datos, sube tu CV y detalla tu experiencia.'}</CardDescription>
        </CardHeader>
        <CardContent>
            <form className="space-y-6" onSubmit={handleSubmit}>
                 {isWorker && (
                  <div className="rounded-lg border-2 border-green-400 bg-secondary/30 shadow-[0_0_15px_rgba(74,222,128,0.4)]">
                    <div className="p-6 flex flex-col md:flex-row items-center justify-between gap-4">
                        <div className="text-center md:text-left">
                            <h3 className="text-xl font-bold text-green-300 flex items-center gap-2"><Star className="h-5 w-5"/> Potencia tu Perfil</h3>
                            <p className="text-muted-foreground mt-1">Destaca tu postulación para que los reclutadores te vean primero.</p>
                        </div>
                        <Button asChild size="lg" className="bg-primary hover:bg-primary/90 shrink-0">
                            <Link href="/subscriptions">
                                Comprar Postulación Premium
                            </Link>
                        </Button>
                    </div>
                   </div>
                )}
                <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-4">
                        <Label htmlFor="name">Nombre completo</Label>
                        <div className="relative">
                            <User className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground h-5 w-5" />
                            <Input name="name" id="name" type="text" className="pl-10" defaultValue={session.user?.name || ''} placeholder="Tu nombre completo"/>
                        </div>
                    </div>
                     <div className="space-y-4">
                        <Label htmlFor="email">Email</Label>
                        <div className="relative">
                            <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground h-5 w-5" />
                            <Input id="email" type="email" className="pl-10" defaultValue={session.user?.email || ''} disabled/>
                        </div>
                    </div>
                    {isWorker && (
                        <>
                             <div className="space-y-4">
                                <Label htmlFor="phone">Número de WhatsApp</Label>
                                <div className="relative">
                                    <Phone className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground h-5 w-5" />
                                    <Input name="phone" id="phone" type="tel" className="pl-10" defaultValue={profileData.phone || ''} placeholder="+54 9 11 ...."/>
                                </div>
                            </div>
                            <div className="space-y-4">
                                <Label htmlFor="location">Localidad</Label>
                                <div className="relative">
                                    <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground h-5 w-5" />
                                    <Input name="location" id="location" type="text" className="pl-10" defaultValue={profileData.location || ''} placeholder="Ej: Buenos Aires, CABA"/>
                                </div>
                            </div>
                             <div className="space-y-4 md:col-span-2">
                                <Label htmlFor="cv">Curriculum Vitae (PDF)</Label>
                                <div className="relative">
                                    <Input
                                        id="cv-upload"
                                        type="file"
                                        className="hidden"
                                        ref={fileInputRef}
                                        onChange={handleFileChange}
                                        accept=".pdf"
                                    />
                                    <Button
                                        type="button"
                                        variant="outline"
                                        className="w-full justify-start text-left font-normal"
                                        onClick={() => fileInputRef.current?.click()}
                                    >
                                        <FileText className="mr-2 h-4 w-4" />
                                        {fileName || 'Subir archivo PDF'}
                                    </Button>
                                </div>
                                {fileName && (
                                    <p className="text-xs text-muted-foreground mt-1">Archivo seleccionado: {fileName}</p>
                                )}
                            </div>
                        </>
                    )}
                </div>

                {isWorker && (
                    <>
                        <Separator />
                        
                        <div className="space-y-4">
                            <div>
                                <Label htmlFor="summary">Resumen Profesional</Label>
                                <Textarea name="summary" id="summary" rows={4} defaultValue={profileData.professionalSummary || ''} placeholder="Un breve resumen sobre tu perfil profesional..."/>
                            </div>
                            <div>
                                <Label htmlFor="experience">Experiencia Laboral</Label>
                                <Textarea name="experience" id="experience" rows={6} defaultValue={profileData.experience || ''} placeholder="Detalla tus trabajos anteriores, roles y responsabilidades..."/>
                            </div>
                        </div>
                    </>
                )}
                
                <div className="flex justify-end pt-2">
                    <Button type="submit" size="lg" disabled={isSubmitting}>
                        {isSubmitting ? (
                        <>
                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                            Guardando...
                        </>
                        ) : (
                        <>
                            <Edit className="mr-2 h-4 w-4" />
                            Guardar Cambios
                        </>
                        )}
                    </Button>
                </div>
            </form>
        </CardContent>
      </Card>
  )
}

function ApplicationsTab({ onChatOpen }: { onChatOpen: () => void }) {
    const { applications } = useContext(UserProfileContext);
    if (!applications) return null;

    return (
        <Card>
            <CardHeader>
                <CardTitle>Mis Postulaciones</CardTitle>
                <CardDescription>Un historial de todas tus postulaciones.</CardDescription>
            </CardHeader>
            <CardContent>
                 {applications.length === 0 ? (
                    <div className="text-center py-8 text-muted-foreground">
                        <Briefcase className="mx-auto h-12 w-12 mb-4" />
                        <p>Aún no te has postulado a ninguna oferta.</p>
                        <p className="text-sm">¡Empieza a buscar tu próximo trabajo ahora!</p>
                    </div>
                ) : (
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Puesto</TableHead>
                            <TableHead>Empresa</TableHead>
                            <TableHead>Fecha</TableHead>
                            <TableHead>Estado</TableHead>
                            <TableHead>Acciones</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {applications.map(app => (
                            <TableRow key={app.id}>
                                <TableCell className="font-medium">{app.job.title}</TableCell>
                                <TableCell>{app.job.company}</TableCell>
                                <TableCell>{new Date(app.createdAt).toLocaleDateString()}</TableCell>
                                <TableCell>
                                    <Badge variant={app.status === 'CONTACTADO' ? 'default' : (app.status === 'RECHAZADO' ? 'destructive' : 'secondary')}>
                                        {app.status}
                                    </Badge>
                                </TableCell>
                                <TableCell>
                                    <Button variant="outline" size="sm" onClick={onChatOpen} disabled={app.status !== 'CONTACTADO'}>
                                        <MessageSquare className="mr-2 h-4 w-4"/>
                                        Chatear
                                    </Button>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
                )}
            </CardContent>
        </Card>
    )
}

function SavedJobsTab() {
  const { savedJobs, handleSaveJob } = useContext(UserProfileContext);
  const { toast } = useToast();

  if (!savedJobs) return null;

  const onRemoveJob = (job: PrismaJob) => {
    handleSaveJob(job);
    toast({
        title: "Oferta quitada de guardados",
        description: `Has quitado la oferta de ${job.title}.`,
    });
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Ofertas Guardadas</CardTitle>
        <CardDescription>Tus ofertas de interés para postularte más tarde.</CardDescription>
      </CardHeader>
      <CardContent>
        {savedJobs.length === 0 ? (
             <div className="text-center py-8 text-muted-foreground">
                <Bookmark className="mx-auto h-12 w-12 mb-4" />
                <p>Aún no has guardado ninguna oferta.</p>
                <p className="text-sm">Usa el ícono de la estrella <Star className="inline h-3 w-3" /> para guardar las que te interesen.</p>
            </div>
        ) : (
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Puesto</TableHead>
              <TableHead>Empresa</TableHead>
              <TableHead>Ubicación</TableHead>
              <TableHead>Acciones</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {savedJobs.map((job: PrismaJob) => (
              <TableRow key={job.id}>
                <TableCell className="font-medium">{job.title}</TableCell>
                <TableCell>{job.company}</TableCell>
                <TableCell>{job.location}</TableCell>
                <TableCell className="flex gap-2">
                    <Button variant="secondary" size="sm" asChild>
                        <Link href={`/jobs/${job.id}`}>
                            <LinkIcon className="mr-2 h-4 w-4"/>
                            Ver
                        </Link>
                    </Button>
                    <Button variant="destructive" size="sm" onClick={() => onRemoveJob(job)}>
                        <Trash2 className="mr-2 h-4 w-4"/>
                        Quitar
                    </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        )}
      </CardContent>
    </Card>
  );
}

function OffersTab() {
    const [initialJobs, setInitialJobs] = useState<PrismaJob[]>([]);

    useEffect(() => {
        getAllJobs().then(setInitialJobs);
    }, []);

    return (
        <div className="space-y-8">
            <JobListings initialJobs={initialJobs} />
        </div>
    )
}


export function UserProfile() {
  const { session } = useSession();
  const { profileData, hasActiveSubscription, activePlan, subscriptionEndDate } = useContext(UserProfileContext);
  const [isChatOpen, setIsChatOpen] = React.useState(false);
  const [companyProfile, setCompanyProfile] = useState<CompanyProfile | null>(null);

  useEffect(() => {
    async function fetchCompanyProfile() {
        if (session.isMounted && session.user?.role === 'EMPRESA') {
            const profile = await getCompanyProfileByUserId(session.user.id);
            setCompanyProfile(profile);
        }
    }
    fetchCompanyProfile();
  }, [session.isMounted, session.user]);


  if (!session.isMounted || !profileData) return <div className='flex justify-center items-center h-64'><Loader2 className="h-8 w-8 animate-spin" /></div>;
  if (!session.user) return <div>Usuario no encontrado.</div>;
  
  const { user } = session;
  const isAdmin = user.role === 'ADMIN';
  const isCompany = user.role === 'EMPRESA';
  const isWorker = user.role === 'TRABAJADOR';
  const roleDisplay = roleDisplayMap[user.role as keyof typeof roleDisplayMap] || user.role;

  const getAvatarUrl = () => {
    if (isCompany && companyProfile) return companyProfile.logoUrl || 'https://placehold.co/128x128.png';
    return user.avatar || 'https://placehold.co/128x128.png';
  }

  return (
    <>
    <ChatPanel isOpen={isChatOpen} setIsOpen={setIsChatOpen} />
    <div className="max-w-5xl mx-auto space-y-8">
      <div className="flex flex-col md:flex-row items-center text-center md:text-left gap-6">
        <div className="relative w-32 h-32 shrink-0">
            <Avatar className="w-32 h-32 border-4 border-primary shadow-lg">
                <AvatarImage src={getAvatarUrl()} alt={user.name} data-ai-hint="person user"/>
                <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
            </Avatar>
            <Button size="icon" className="absolute bottom-1 right-1 rounded-full hover:scale-110 transition-transform" aria-label="Cambiar foto de perfil">
                <Upload className="w-4 h-4" />
            </Button>
        </div>
        <div className="space-y-2">
            <h1 className="text-3xl font-bold flex items-center gap-2 justify-center md:justify-start">
                {user.name}
                {user.role && (
                    <Badge variant="secondary" className="capitalize text-sm">
                        <Shield className="mr-1.5 h-3 w-3"/>
                        {roleDisplay}
                    </Badge>
                )}
            </h1>
            <div className='text-muted-foreground space-y-1'>
                <p className="flex items-center gap-2 justify-center md:justify-start">
                    <Mail className="h-4 w-4" /> {user.email}
                </p>
                <p className="flex items-center gap-2 justify-center md:justify-start text-xs font-mono">
                    <Key className="h-4 w-4" /> User ID: {user.id}
                </p>
            </div>
        </div>
      </div>

        {isAdmin ? (
            <Card className="bg-secondary text-secondary-foreground text-center p-6 rounded-lg shadow-lg">
                <CardHeader className="p-0 mb-2">
                    <CardTitle>Gestión de Planes</CardTitle>
                    <CardDescription className="text-secondary-foreground/80">
                        Desde aquí puedes administrar los planes de suscripción de la plataforma.
                    </CardDescription>
                </CardHeader>
                <CardContent className="p-0">
                    <Button asChild variant="outline" className="bg-transparent hover:bg-secondary-foreground/10">
                        <Link href="/subscriptions">
                            <Settings className="mr-2 h-4 w-4" />
                            Administrar Planes
                        </Link>
                    </Button>
                </CardContent>
            </Card>
        ) : hasActiveSubscription ? (
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
                        <Link href="/subscriptions">Administrar mi suscripción</Link>
                    </Button>
                </CardContent>
            </Card>
        ) : (
            <Card className="bg-gradient-to-r from-primary/80 to-primary/60 text-primary-foreground text-center p-6 rounded-lg shadow-lg">
                <CardHeader className="p-0 mb-2">
                <CardTitle>¡Potencia tu Búsqueda!</CardTitle>
                <CardDescription className="text-primary-foreground/80">
                    Con nuestros planes premium, accede a funciones exclusivas y destaca sobre los demás.
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
      
      {isAdmin ? (
        <Tabs defaultValue="edit-profile" className="w-full">
            <TabsList className="grid w-full grid-cols-1">
                <TabsTrigger value="edit-profile">
                    <Edit className="mr-2 h-4 w-4" />
                    Configuración de Cuenta
                </TabsTrigger>
            </TabsList>
            <TabsContent value="edit-profile" className="mt-6">
                <EditProfileTab />
            </TabsContent>
        </Tabs>
      ) : isCompany ? (
        <Tabs defaultValue="company-profile" className="w-full">
            <TabsList className="grid w-full grid-cols-1">
                <TabsTrigger value="company-profile">
                    <Building className="mr-2 h-4 w-4" />
                    Perfil de Empresa
                </TabsTrigger>
            </TabsList>
            <TabsContent value="company-profile" className="mt-6">
                <CompanyProfileView company={companyProfile} />
            </TabsContent>
        </Tabs>
      ) : (
        <Tabs defaultValue="edit-profile" className="w-full">
            <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="edit-profile">
                <Edit className="mr-2 h-4 w-4" />
                Editar Perfil
            </TabsTrigger>
            <TabsTrigger value="applications">
                <Briefcase className="mr-2 h-4 w-4" />
                Postulaciones
            </TabsTrigger>
            <TabsTrigger value="saved-jobs">
                <Bookmark className="mr-2 h-4 w-4" />
                Guardados
            </TabsTrigger>
            <TabsTrigger value="offers">
                <Search className="mr-2 h-4 w-4" />
                Buscar Ofertas
            </TabsTrigger>
            </TabsList>
            <TabsContent value="edit-profile" className="mt-6">
                <EditProfileTab />
            </TabsContent>
            <TabsContent value="applications" className="mt-6">
                <ApplicationsTab onChatOpen={() => setIsChatOpen(true)} />
            </TabsContent>
            <TabsContent value="saved-jobs" className="mt-6">
                <SavedJobsTab />
            </TabsContent>
            <TabsContent value="offers" className="mt-6">
                 <OffersTab />
            </TabsContent>
        </Tabs>
      )}
    </div>
    </>
  );
}
