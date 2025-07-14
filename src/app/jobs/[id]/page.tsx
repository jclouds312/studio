
'use client';

import React from 'react';
import { Header } from '@/components/layout/header';
import { allJobs } from '@/data';
import { notFound } from 'next/navigation';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Briefcase, MapPin, Sparkles, Star, Phone, ArrowLeft, Clock, Send, Info, ExternalLink, Loader2 } from 'lucide-react';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { Separator } from '@/components/ui/separator';
import { Footer } from '@/components/layout/footer';
import { useToast } from "@/components/ui/use-toast";
import { cn } from '@/lib/utils';
import { useSession } from '@/hooks/use-session';

export default function JobDetailPage({ params }: { params: { id: string } }) {
  const { id } = params;
  const job = allJobs.find((j) => j.id === id);
  const { toast } = useToast();
  const { session } = useSession();
  const [isApplying, setIsApplying] = React.useState(false);

  if (!job) {
    notFound();
  }
  
  const handleApply = async () => {
    setIsApplying(true);

    if (!session.isLoggedIn || !session.user) {
        toast({
            title: "Inicia Sesión",
            description: "Debes iniciar sesión para postularte a una oferta.",
            variant: "destructive"
        });
        setIsApplying(false);
        return;
    }

    try {
        const response = await fetch('/api/send-application-email', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                jobTitle: job.title,
                companyName: job.company,
                companyEmail: 'hr@example.com', // En una app real, esto vendría del perfil de la empresa
                userName: session.user.name,
                userEmail: session.user.email,
            }),
        });

        if (!response.ok) {
            throw new Error('Error al enviar la postulación.');
        }

        toast({
            title: "¡Postulación Enviada!",
            description: `Te has postulado exitosamente a la oferta de ${job.title}.`,
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

  const getThemeClass = () => {
    if (job.isFeatured) return 'theme-premium';
    if (job.isNew) return 'theme-new';
    return '';
  }

  const mapUrl = `https://maps.google.com/maps?q=${encodeURIComponent(job.location + ', Argentina')}&t=&z=13&ie=UTF8&iwloc=&output=embed`;
  const mapLink = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(job.location + ', Argentina')}`;


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

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <Card className="relative overflow-hidden">
                 <div className="absolute top-4 right-4 z-10 flex flex-col items-end gap-2">
                    {job.isFeatured && (
                         <Badge variant="default" className="bg-amber-400 text-amber-900 text-xs font-bold py-1 px-3 rounded-full flex items-center gap-1 border-2 border-amber-900/20">
                            <Sparkles className="h-4 w-4" />
                            DESTACADO
                        </Badge>
                    )}
                     {job.isNew && !job.isFeatured && (
                        <Badge variant="secondary" className="text-xs font-bold py-1 px-3 rounded-full flex items-center gap-1 border-2 border-primary/20">
                            <Info className="h-4 w-4" />
                            NUEVO
                        </Badge>
                    )}
                </div>
              <CardHeader>
                <div className="flex items-start gap-4">
                  <Image src={job.companyLogo} alt={`${job.company} logo`} width={64} height={64} className="rounded-lg border bg-secondary p-1" data-ai-hint="company logo"/>
                  <div>
                    <CardTitle className="text-2xl lg:text-3xl mb-1">{job.title}</CardTitle>
                    <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-muted-foreground">
                        <span className="flex items-center gap-1.5"><Briefcase className="h-4 w-4" /> {job.company}</span>
                        <span className="flex items-center gap-1.5"><MapPin className="h-4 w-4" /> {job.location}</span>
                        <span className="flex items-center gap-1.5"><Clock className="h-4 w-4" /> <span className="capitalize">{job.type}</span></span>
                    </div>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <Separator className="my-4"/>
                <h3 className="text-lg font-semibold mb-2 text-primary">Descripción del trabajo</h3>
                <p className="text-muted-foreground whitespace-pre-wrap">{job.description}</p>
              </CardContent>
            </Card>
          </div>

          <div className="lg:col-span-1 space-y-6">
             <Card>
                <CardHeader>
                    <CardTitle>Acciones</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                    <Button size="lg" className="w-full" onClick={handleApply} disabled={isApplying}>
                        {isApplying ? (
                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        ) : (
                            <Send className="mr-2 h-4 w-4" />
                        )}
                        Postularse ahora
                    </Button>
                    {job.whatsapp && (
                        <Button asChild size="lg" variant="outline" className="w-full bg-green-500/10 border-green-500/30 hover:bg-green-500/20 text-green-400 hover:text-green-300">
                             <a href={`https://wa.me/${job.whatsapp.replace(/\D/g, '')}`} target="_blank" rel="noopener noreferrer">
                                <Phone className="mr-2 h-4 w-4" />
                                Contactar por WhatsApp
                             </a>
                        </Button>
                    )}
                     <Button size="lg" variant="secondary" className="w-full">
                        <Star className="mr-2 h-4 w-4" />
                        Guardar oferta
                    </Button>
                </CardContent>
             </Card>

             <Card>
                <CardHeader>
                    <CardTitle>Ubicación</CardTitle>
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
                            title={`Mapa de ${job.location}`}
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
    </div>
  );
}
