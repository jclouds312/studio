
'use client';

import React, { useContext, useState, useEffect } from 'react';
import { Header } from '@/components/layout/header';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Briefcase, MapPin, Sparkles, Star, Phone, ArrowLeft, Clock, Send, Info, ExternalLink, Loader2, DollarSign, Tag, UserCheck, Calendar, Home, Users } from 'lucide-react';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { Separator } from '@/components/ui/separator';
import { Footer } from '@/components/layout/footer';
import { useToast } from "@/hooks/use-toast";
import { cn } from '@/lib/utils';
import { useSession } from '@/hooks/use-session';
import type { Job } from '@prisma/client';
import { UserProfileContext } from '@/context/user-profile-context';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';

// --- This is the Client Component for UI and interactivity ---
export function JobDetailClient({ job: initialJob }: { job: Job }) {
  const { toast } = useToast();
  const { session } = useSession();
  const { handleApplyForJob, savedJobs, handleSaveJob, applications } = useContext(UserProfileContext);
  const [currentJob, setCurrentJob] = useState(initialJob);
  const [isApplying, setIsApplying] = React.useState(false);
  const [isQuestionsModalOpen, setIsQuestionsModalOpen] = useState(false);
  const [customAnswers, setCustomAnswers] = useState<Record<string, string>>({});
  
  useEffect(() => {
    setCurrentJob(initialJob);
  }, [initialJob]);

  const isSaved = savedJobs.some(savedJob => savedJob.id === currentJob.id);
  const hasApplied = applications.some(app => app.jobId === currentJob.id);
  
  const startApplicationProcess = () => {
    if (!session.isLoggedIn || !session.user) {
        toast({
            title: "Inicia Sesión",
            description: "Debes iniciar sesión para postularte a una oferta.",
            variant: "destructive"
        });
        return;
    }

    const customQuestions = Array.isArray(currentJob.customQuestions) ? currentJob.customQuestions : [];
    if (customQuestions.length > 0) {
      setIsQuestionsModalOpen(true);
    } else {
      handleApply();
    }
  };

  const handleApply = async (answers?: { question: string; answer: string; }[]) => {
    setIsApplying(true);
    if(isQuestionsModalOpen) setIsQuestionsModalOpen(false);

    try {
        await fetch('/api/send-application-email', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                jobTitle: currentJob.title,
                companyName: currentJob.company,
                companyEmail: 'hr@example.com', // En una app real, esto vendría del perfil de la empresa
                userName: session.user!.name,
                userEmail: session.user!.email,
            }),
        });
        
        handleApplyForJob(currentJob, answers);
        setCurrentJob(prev => ({...prev, applicantsCount: (prev.applicantsCount || 0) + 1 }));
        toast({
            title: "¡Postulación Enviada!",
            description: `Te has postulado exitosamente a la oferta de ${currentJob.title}.`,
        });
    } catch (error) {
        console.error(error);
        toast({
            title: "Error",
            description: "No se pudo completar la postulación. Intenta de nuevo.",
            variant: "destructive",
        });
    } finally {
        setIsApplying(false);
    }
  };

  const handleSubmitQuestions = () => {
    const customQuestions = Array.isArray(currentJob.customQuestions) ? currentJob.customQuestions : [];
    const answers = customQuestions.map(q => ({
      question: q,
      answer: customAnswers[q] || 'No respondida'
    }));
    handleApply(answers);
  };

  const onSaveClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (!session.isLoggedIn) {
        toast({
            title: "Inicia Sesión",
            description: "Debes iniciar sesión para guardar una oferta.",
            variant: "destructive"
        });
        return;
    }
    handleSaveJob(currentJob);
    toast({
        title: isSaved ? "Oferta quitada de guardados" : "¡Oferta Guardada!",
        description: isSaved ? `Has quitado la oferta de ${currentJob.title}.` : `Has guardado la oferta de ${currentJob.title}.`,
    });
}

  const getThemeClass = () => {
    if (currentJob.isFeatured) return 'theme-premium';
    return '';
  }

  const mapUrl = `https://maps.google.com/maps?q=${encodeURIComponent(currentJob.direccionCompleta || (currentJob.location + ', Argentina'))}&t=&z=13&ie=UTF8&iwloc=&output=embed`;
  const mapLink = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(currentJob.direccionCompleta || (currentJob.location + ', Argentina'))}`;

  const skills = Array.isArray(currentJob.skills) ? currentJob.skills : [];
  const customQuestions = Array.isArray(currentJob.customQuestions) ? currentJob.customQuestions : [];

  return (
    <div className="flex flex-col min-h-screen bg-transparent">
      <Header />
      <main className="flex-1 container mx-auto py-8 px-4">
        <div className="mb-6">
            <Button variant="outline" asChild>
                <Link href="/" className="flex items-center gap-2">
                    <ArrowLeft className="h-4 w-4" />
                    Volver a las ofertas
                </Link>
            </Button>
        </div>
        
        <Card className={cn("overflow-hidden mb-8", getThemeClass())}>
            <div className="relative aspect-[2.5/1] w-full bg-secondary">
                <Image src={currentJob.imageUrl || 'https://placehold.co/800x320.png'} alt={currentJob.title} layout="fill" objectFit="cover" data-ai-hint="job vacancy" />
                 <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
                 <div className="absolute top-4 right-4 z-10 flex flex-col items-end gap-2">
                    {currentJob.isFeatured && (
                         <Badge variant="default" className="bg-amber-400 text-amber-900 text-xs font-bold py-1 px-3 rounded-full flex items-center gap-1 border-2 border-amber-900/20">
                            <Sparkles className="h-4 w-4" />
                            DESTACADO
                        </Badge>
                    )}
                     {currentJob.isNew && !currentJob.isFeatured && (
                        <Badge variant="outline" className="text-xs font-bold py-1 px-3 rounded-full flex items-center gap-1 border-sky-400 bg-sky-500/10 text-sky-400">
                            <Info className="h-4 w-4" />
                            NUEVO
                        </Badge>
                    )}
                </div>
                <div className="absolute bottom-6 left-6 text-white">
                    <CardTitle className="text-3xl lg:text-4xl mb-1 drop-shadow-lg">{currentJob.title}</CardTitle>
                    <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-white/90">
                        <Link href={`/company/${currentJob.companyProfileId}`} className="flex items-center gap-1.5 hover:text-primary transition-colors"><Briefcase className="h-4 w-4" /> {currentJob.company}</Link>
                        <span className="flex items-center gap-1.5"><MapPin className="h-4 w-4" /> {currentJob.location}</span>
                        <span className="flex items-center gap-1.5"><Clock className="h-4 w-4" /> <span className="capitalize">{currentJob.type}</span></span>
                    </div>
                 </div>
            </div>
        </Card>


        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <Card className={cn("relative overflow-hidden", getThemeClass())}>
              <CardContent className="p-6">
                <div className="grid md:grid-cols-3 gap-6 text-sm mb-6">
                  {currentJob.modalidad && (
                    <div className="flex items-center gap-2 p-3 bg-secondary/50 rounded-lg">
                      {currentJob.modalidad === 'Híbrido' ? <Users className="h-5 w-5 text-muted-foreground" /> : <Home className="h-5 w-5 text-muted-foreground" />}
                      <div>
                        <p className="font-semibold">Modalidad</p>
                        <p className="text-muted-foreground">{currentJob.modalidad}</p>
                      </div>
                    </div>
                  )}
                   {currentJob.salary && (
                    <div className="flex items-center gap-2 p-3 bg-secondary/50 rounded-lg">
                      <DollarSign className="h-5 w-5 text-muted-foreground" />
                      <div>
                        <p className="font-semibold">Salario</p>
                        <p className="text-muted-foreground">{currentJob.salary}</p>
                      </div>
                    </div>
                  )}
                  {currentJob.horario && (
                    <div className="flex items-center gap-2 p-3 bg-secondary/50 rounded-lg">
                       <Calendar className="h-5 w-5 text-muted-foreground" />
                       <div>
                         <p className="font-semibold">Horario</p>
                         <p className="text-muted-foreground">{currentJob.horario}</p>
                       </div>
                    </div>
                  )}
                </div>
                <Separator className="my-4"/>
                <div className="flex justify-between items-center mb-2">
                    <h3 className={cn("text-lg font-semibold", currentJob.isFeatured ? "text-primary" : "text-card-foreground")}>Descripción del trabajo</h3>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground p-2 rounded-lg bg-secondary/50">
                        <Users className="h-4 w-4" />
                        <span>{currentJob.applicantsCount} postulante{currentJob.applicantsCount !== 1 && 's'}</span>
                    </div>
                </div>

                <p className="text-card-foreground whitespace-pre-wrap">{currentJob.description}</p>
                 {currentJob.desiredProfile && (
                    <>
                        <Separator className="my-4"/>
                        <h3 className={cn("text-lg font-semibold mb-2 flex items-center gap-2", currentJob.isFeatured ? "text-primary" : "text-card-foreground")}>
                            <UserCheck className="h-5 w-5"/>
                            Perfil Deseado
                        </h3>
                        <p className="text-card-foreground whitespace-pre-wrap">{currentJob.desiredProfile}</p>
                    </>
                 )}
                 {skills.length > 0 && (
                  <>
                    <Separator className="my-4"/>
                    <h3 className={cn("text-lg font-semibold mb-2", currentJob.isFeatured ? "text-primary" : "text-card-foreground")}>Habilidades Requeridas</h3>
                    <div className="flex flex-wrap gap-2">
                      {skills.map(skill => (
                        <Badge key={skill} variant="secondary" className="flex items-center gap-1.5">
                          <Tag className="h-3 w-3" />
                          {skill}
                        </Badge>
                      ))}
                    </div>
                  </>
                )}
              </CardContent>
            </Card>
          </div>

          <div className="lg:col-span-1 space-y-6">
             <Card>
                <CardHeader>
                    <CardTitle>Acciones</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                    <Button size="lg" className="w-full" onClick={startApplicationProcess} disabled={isApplying || hasApplied}>
                        {isApplying ? (
                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        ) : (
                            <Send className="mr-2 h-4 w-4" />
                        )}
                        {hasApplied ? 'Ya Postulaste' : 'Postularse ahora'}
                    </Button>
                    {currentJob.whatsapp && (
                        <Button asChild size="lg" variant="outline" className="w-full bg-green-500/10 border-green-500/30 hover:bg-green-500/20 text-green-400 hover:text-green-300">
                             <a href={`https://wa.me/${currentJob.whatsapp.replace(/\D/g, '')}`} target="_blank" rel="noopener noreferrer">
                                <Phone className="mr-2 h-4 w-4" />
                                Contactar por WhatsApp
                             </a>
                        </Button>
                    )}
                     <Button size="lg" variant="secondary" className="w-full" onClick={onSaveClick}>
                        <Star className={cn("mr-2 h-4 w-4 text-amber-400 transition-all", isSaved && "fill-amber-400")} />
                        {isSaved ? 'Guardado' : 'Guardar oferta'}
                    </Button>
                </CardContent>
             </Card>

             <Card>
                <CardHeader>
                    <CardTitle>Ubicación</CardTitle>
                    {currentJob.direccionCompleta && <CardDescription>{currentJob.direccionCompleta}</CardDescription>}
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="aspect-video w-full overflow-hidden rounded-lg border">
                        <iframe
                            width="100%"
                            height="100%"
                            loading="lazy"
                            allowFullScreen
                            referrerPolicy="no-referrer-when-downgrade"
                            src={mapUrl}
                            title={`Mapa de ${currentJob.location}`}
                            style={{ border: 0 }}
                        ></iframe>
                    </div>
                    <Button asChild variant="outline" className="w-full">
                        <a href={mapLink} target="_blank" rel="noopener noreferrer">
                           <ExternalLink className="mr-2 h-4 w-4" />
                            Abrir en Google Maps
                        </a>
                    </Button>
                </CardContent>
             </Card>
          </div>
        </div>
      </main>
      <Footer />
        <Dialog open={isQuestionsModalOpen} onOpenChange={setIsQuestionsModalOpen}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Preguntas Adicionales</DialogTitle>
                    <DialogDescription>
                        La empresa solicita que respondas a las siguientes preguntas para completar tu postulación.
                    </DialogDescription>
                </DialogHeader>
                <div className="space-y-4 py-4 max-h-[60vh] overflow-y-auto pr-4">
                    {customQuestions.map((question, index) => (
                        <div key={index} className="space-y-2">
                            <Label htmlFor={`question-${index}`}>{question}</Label>
                            <Textarea 
                                id={`question-${index}`} 
                                value={customAnswers[question] || ''}
                                onChange={(e) => setCustomAnswers(prev => ({...prev, [question]: e.target.value}))}
                                required
                            />
                        </div>
                    ))}
                </div>
                <DialogFooter>
                    <Button variant="outline" onClick={() => setIsQuestionsModalOpen(false)}>Cancelar</Button>
                    <Button onClick={handleSubmitQuestions} disabled={isApplying}>
                         {isApplying ? (
                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                          ) : (
                            <Send className="mr-2 h-4 w-4" />
                          )}
                        Enviar Postulación
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    </div>
  );
}
