
'use client';

import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { MapPin, Search, Briefcase, Sparkles, Star, Send, Info, Loader2 } from "lucide-react";
import type { Job } from "@prisma/client";
import Image from "next/image";
import React, { useState, useMemo, useContext } from "react";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import { useToast } from "@/components/ui/use-toast";
import { cn } from "@/lib/utils";
import { UserProfileContext } from "@/context/user-profile-context";
import { useSession } from "@/hooks/use-session";

function JobListingCard({ job }: { job: Job }) {
    const { toast } = useToast();
    const { savedJobs, handleSaveJob, handleApplyForJob } = useContext(UserProfileContext);
    const { session } = useSession();
    const [isApplying, setIsApplying] = useState(false);

    const isSaved = savedJobs.some(savedJob => savedJob.id === job.id);

    const handleApply = async (e: React.MouseEvent) => {
        e.preventDefault(); 
        e.stopPropagation();
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
            
            handleApplyForJob(job);
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
        handleSaveJob(job);
        toast({
            title: isSaved ? "Oferta quitada de guardados" : "¡Oferta Guardada!",
            description: isSaved ? `Has quitado la oferta de ${job.title}.` : `Has guardado la oferta de ${job.title}.`,
        });
    }

    const getThemeClass = () => {
        if (job.isFeatured) return 'theme-premium';
        return '';
    }

    return (
        <Link href={`/jobs/${job.id}`} className="block h-full group">
            <div className={cn("h-full card-neon-border rounded-lg")}>
                <Card className={cn("hover:shadow-xl transition-all duration-300 transform group-hover:scale-[1.02] relative overflow-hidden flex flex-col h-full bg-transparent border-0", getThemeClass())}>
                    <div className="absolute top-4 right-4 z-10 flex flex-col items-end gap-2">
                        {job.isFeatured && (
                             <Badge variant="default" className="bg-amber-400 text-amber-900 text-xs font-bold py-1 px-3 rounded-full flex items-center gap-1 border-2 border-amber-900/20">
                                <Sparkles className="h-4 w-4" />
                                DESTACADO
                            </Badge>
                        )}
                         {job.isNew && !job.isFeatured && (
                            <Badge variant="secondary" className="text-xs font-bold py-1 px-3 rounded-full flex items-center gap-1 border-2 border-primary/20 bg-blue-500/10 text-blue-400">
                                <Info className="h-4 w-4" />
                                NUEVO
                            </Badge>
                        )}
                    </div>
                    <CardHeader className="p-6 pb-2">
                        <div className="flex gap-4">
                            <Image src={job.companyLogo} alt={`${job.company} logo`} width={56} height={56} className="rounded-lg border bg-white p-1 shrink-0" data-ai-hint="company logo" />
                            <div className="flex-grow">
                                <CardTitle className="text-lg md:text-xl mb-1 text-blue-400">{job.title}</CardTitle>
                                <CardDescription className="flex flex-col sm:flex-row sm:items-center gap-x-4 gap-y-1 pt-1 text-sm">
                                    <span className="flex items-center gap-1.5"><Briefcase className="h-4 w-4 text-muted-foreground" /> {job.company}</span>
                                    <span className="flex items-center gap-1.5"><MapPin className="h-4 w-4 text-muted-foreground" /> {job.location}</span>
                                </CardDescription>
                            </div>
                        </div>
                    </CardHeader>
                    <CardContent className="p-6 pt-4 flex-grow flex flex-col justify-between">
                        <p className="text-sm text-card-foreground line-clamp-2 mb-4">{job.description}</p>
                        <div className="flex flex-row justify-between items-center pt-4 border-t border-border/50 mt-auto">
                            <Badge variant="outline" className="text-xs capitalize">{job.type}</Badge>
                            <div className="flex items-center gap-2">
                                {session.isLoggedIn && session.user?.role === 'user' && (
                                    <Button variant="ghost" size="sm" onClick={onSaveClick} className="hidden md:flex">
                                        <Star className={cn("mr-2 h-4 w-4 text-amber-400 transition-all", isSaved && "fill-amber-400")} />
                                        {isSaved ? 'Guardado' : 'Guardar'}
                                    </Button>
                                )}
                                <Button size="sm" onClick={handleApply} disabled={isApplying}>
                                    {isApplying ? (
                                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                    ) : (
                                        <Send className="mr-2 h-4 w-4" />
                                    )}
                                    Postularse
                                </Button>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </Link>
    );
}

export function JobListings({ initialJobs }: { initialJobs: Job[] }) {
    const [keyword, setKeyword] = useState('');
    const [location, setLocation] = useState('all');
    const [category, setCategory] = useState('all');
    const [contractType, setContractType] = useState('all');

    const filteredJobs = useMemo(() => {
        let jobs = initialJobs
            .filter(job => {
                const keywordMatch = keyword.toLowerCase() ? job.title.toLowerCase().includes(keyword.toLowerCase()) || job.description.toLowerCase().includes(keyword.toLowerCase()) : true;
                const locationMatch = location && location !== 'all' ? job.location === location : true;
                const categoryMatch = category && category !== 'all' ? job.category === category : true;
                const contractTypeMatch = contractType && contractType !== 'all' ? job.type === contractType : true;
                return keywordMatch && locationMatch && categoryMatch && contractTypeMatch;
            });
        
        jobs.sort((a, b) => {
            const scoreA = (a.isFeatured ? 2 : 0) + (a.isNew ? 1 : 0);
            const scoreB = (b.isFeatured ? 2 : 0) + (b.isNew ? 1 : 0);
            return scoreB - scoreA;
        });

        return jobs;
    }, [keyword, location, category, contractType, initialJobs]);

    return (
        <div className="space-y-8">
            <Card className="shadow-lg sticky top-[70px] z-30 bg-card/95 backdrop-blur-sm border-border/50">
                <CardHeader>
                    <CardTitle>Encuentra tu próximo trabajo</CardTitle>
                    <CardDescription>Busca entre miles de ofertas de las mejores empresas.</CardDescription>
                </CardHeader>
                <CardContent className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 items-center">
                    <div className="lg:col-span-2 relative w-full">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground h-5 w-5" />
                        <Input 
                            placeholder="Puesto, empresa o palabra clave" 
                            className="pl-10"
                            value={keyword}
                            onChange={(e) => setKeyword(e.target.value)}
                        />
                    </div>
                    <div className="relative w-full">
                        <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground h-5 w-5" />
                         <Select value={location} onValueChange={setLocation}>
                            <SelectTrigger className="w-full pl-10">
                                <SelectValue placeholder="Ubicación" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="all">Todas las ubicaciones</SelectItem>
                                <SelectItem value="Remoto">Remoto</SelectItem>
                                <SelectItem value="Buenos Aires">Buenos Aires</SelectItem>
                                <SelectItem value="La Matanza">La Matanza (GBA)</SelectItem>
                                <SelectItem value="Quilmes">Quilmes (GBA)</SelectItem>
                                <SelectItem value="Lomas de Zamora">Lomas de Zamora (GBA)</SelectItem>
                                <SelectItem value="La Plata">La Plata</SelectItem>
                                <SelectItem value="Mar del Plata">Mar del Plata</SelectItem>
                                <SelectItem value="Córdoba">Córdoba</SelectItem>
                                <SelectItem value="Rosario">Rosario</SelectItem>
                                <SelectItem value="Mendoza">Mendoza</SelectItem>
                                <SelectItem value="San Miguel de Tucumán">San Miguel de Tucumán</SelectItem>
                                <SelectItem value="Salta">Salta</SelectItem>
                                <SelectItem value="Santa Fe">Santa Fe</SelectItem>
                                <SelectItem value="Neuquén">Neuquén</SelectItem>
                                <SelectItem value="Bariloche">Bariloche</SelectItem>
                                <SelectItem value="Ushuaia">Ushuaia</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                     <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full">
                        <Select value={category} onValueChange={setCategory}>
                            <SelectTrigger className="w-full">
                                <SelectValue placeholder="Categoría" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="all">Todas las categorías</SelectItem>
                                <SelectItem value="tech">Tecnología</SelectItem>
                                <SelectItem value="design">Diseño</SelectItem>
                                <SelectItem value="marketing">Marketing</SelectItem>
                                <SelectItem value="sales">Ventas</SelectItem>
                                <SelectItem value="domestic">Doméstico</SelectItem>
                                <SelectItem value="construction">Construcción</SelectItem>
                                <SelectItem value="admin">Administración</SelectItem>
                                <SelectItem value="gastronomy">Gastronomía</SelectItem>
                                <SelectItem value="health">Salud</SelectItem>
                                <SelectItem value="education">Educación</SelectItem>
                                <SelectItem value="hr">Recursos Humanos</SelectItem>
                                <SelectItem value="finance">Finanzas</SelectItem>
                                <SelectItem value="legal">Legal</SelectItem>
                                <SelectItem value="logistics">Logística</SelectItem>
                                <SelectItem value="other">Otro</SelectItem>
                            </SelectContent>
                        </Select>
                        <Select value={contractType} onValueChange={setContractType}>
                            <SelectTrigger className="w-full">
                                <SelectValue placeholder="Tipo de Contrato" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="all">Todos los tipos</SelectItem>
                                <SelectItem value="Full-time">Full-time</SelectItem>
                                <SelectItem value="Part-time">Part-time</SelectItem>
                                <SelectItem value="Contract">Contract</SelectItem>
                                <SelectItem value="Changa">Changa</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                </CardContent>
            </Card>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredJobs.length > 0 ? (
                    filteredJobs.map(job => <JobListingCard key={job.id} job={job} />)
                ) : (
                    <Card className="col-span-full">
                        <CardContent className="pt-6">
                            <p className="text-center text-muted-foreground">No se encontraron trabajos con esos criterios. Intenta con otros filtros.</p>
                        </CardContent>
                    </Card>
                )}
            </div>
        </div>
    );
}
