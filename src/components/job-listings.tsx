
'use client';

import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue, SelectGroup, SelectLabel } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { MapPin, Search, Briefcase, Sparkles, Star, Send, Info, Loader2, DollarSign, ChevronLeft, ChevronRight } from "lucide-react";
import type { Job } from "@prisma/client";
import Image from "next/image";
import React, { useState, useMemo, useContext, useEffect } from "react";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import { useToast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";
import { UserProfileContext } from "@/context/user-profile-context";
import { useSession } from "@/hooks/use-session";
import { useRouter } from "next/navigation";

function JobListingCard({ job }: { job: Job }) {
    const { toast } = useToast();
    const router = useRouter();
    const { savedJobs, handleSaveJob } = useContext(UserProfileContext);
    const { session } = useSession();
    const [isApplying, setIsApplying] = useState(false);

    const isSaved = savedJobs.some(savedJob => savedJob.id === job.id);

    const handleApply = (e: React.MouseEvent) => {
        e.preventDefault();
        setIsApplying(true);
        if (!session.isLoggedIn) {
            toast({
                title: "Inicia Sesión",
                description: "Debes iniciar sesión para postularte a una oferta.",
                variant: "destructive"
            });
            setIsApplying(false);
            return;
        }
        router.push(`/jobs/${job.id}`);
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
                             <Badge variant="outline" className="text-xs font-bold py-1 px-3 rounded-full flex items-center gap-1 border-sky-400 bg-sky-500/10 text-sky-400">
                                <Info className="h-4 w-4" />
                                NUEVO
                            </Badge>
                        )}
                    </div>
                     <CardHeader className="p-0">
                        <div className="aspect-video w-full relative">
                            <Image src={job.imageUrl || 'https://placehold.co/400x200.png'} alt={job.title} layout="fill" objectFit="cover" className="rounded-t-lg" data-ai-hint="job vacancy" />
                        </div>
                    </CardHeader>
                    <CardContent className="p-6 pt-4 flex-grow flex flex-col justify-between">
                        <div>
                             <CardTitle className={cn("text-lg md:text-xl mb-1 text-card-foreground group-hover:text-primary transition-colors", job.isFeatured && "text-amber-400")}>{job.title}</CardTitle>
                            <CardDescription className="flex flex-col sm:flex-row sm:items-center gap-x-4 gap-y-1 pt-1 text-sm">
                                <span className="flex items-center gap-1.5"><Briefcase className="h-4 w-4 text-muted-foreground" /> {job.company}</span>
                                <span className="flex items-center gap-1.5"><MapPin className="h-4 w-4 text-muted-foreground" /> {job.location}</span>
                            </CardDescription>
                            {job.salary && (
                                 <div className="flex items-center gap-1.5 text-sm text-green-400 pt-1">
                                    <DollarSign className="h-4 w-4" />
                                    <span>{job.salary}</span>
                                </div>
                            )}
                            <p className="text-sm text-muted-foreground line-clamp-2 mt-4">{job.description}</p>
                        </div>
                        <div className="flex flex-row justify-between items-center pt-4 border-t border-border/50 mt-4">
                            <Badge variant="outline" className="text-xs capitalize border-amber-400/50 bg-amber-400/10 text-amber-400">{job.type}</Badge>
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

const JOBS_PER_PAGE = 9;

export function JobListings({ initialJobs }: { initialJobs: Job[] }) {
    const [keyword, setKeyword] = useState('');
    const [location, setLocation] = useState('all');
    const [category, setCategory] = useState('all');
    const [contractType, setContractType] = useState('all');
    const [currentPage, setCurrentPage] = useState(1);
    
    useEffect(() => {
        setCurrentPage(1);
    }, [keyword, location, category, contractType]);

    const filteredJobs = useMemo(() => {
        return initialJobs
            .filter(job => {
                const keywordMatch = keyword.toLowerCase() ? job.title.toLowerCase().includes(keyword.toLowerCase()) || job.description.toLowerCase().includes(keyword.toLowerCase()) : true;
                const locationMatch = location && location !== 'all' ? job.location === location : true;
                const categoryMatch = category && category !== 'all' ? job.category === category : true;
                const contractTypeMatch = contractType && contractType !== 'all' ? job.type === contractType : true;
                return keywordMatch && locationMatch && categoryMatch && contractTypeMatch;
            });
    }, [keyword, location, category, contractType, initialJobs]);


    const sortedJobs = useMemo(() => {
        return [...filteredJobs].sort((a, b) => {
            if (a.isFeatured && !b.isFeatured) return -1;
            if (!a.isFeatured && b.isFeatured) return 1;
            if (a.isNew && !b.isNew) return -1;
            if (!a.isNew && b.isNew) return 1;
            return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
        });
    }, [filteredJobs]);
    
    const jobsOnThisPage = useMemo(() => {
        return sortedJobs.slice((currentPage - 1) * JOBS_PER_PAGE, currentPage * JOBS_PER_PAGE);
    }, [currentPage, sortedJobs]);

    const totalPages = Math.ceil(sortedJobs.length / JOBS_PER_PAGE);


    return (
        <div className="space-y-8">
            <Card className="shadow-lg sticky top-[70px] z-30 bg-card/95 backdrop-blur-sm border-border/50">
                <CardHeader className="text-center">
                    <CardTitle className="text-2xl text-primary">Encuentra tu Próximo Trabajo</CardTitle>
                    <CardDescription>Busca entre miles de ofertas de las mejores empresas.</CardDescription>
                </CardHeader>
                <CardContent className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 items-center">
                    <div className="lg:col-span-2 relative w-full">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground h-5 w-5" />
                        <Input 
                            placeholder="Puesto, empresa o palabra clave" 
                            className="pl-10 text-center text-lg h-12"
                            value={keyword}
                            onChange={(e) => setKeyword(e.target.value)}
                        />
                    </div>
                    <div className="relative w-full">
                        <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground h-5 w-5" />
                         <Select value={location} onValueChange={setLocation}>
                            <SelectTrigger className="w-full pl-10 text-center text-lg h-12">
                                <SelectValue placeholder="Ubicación" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="all">Todas las ubicaciones</SelectItem>
                                <SelectItem value="Remoto">Trabajo Remoto</SelectItem>
                                <SelectGroup>
                                    <SelectLabel>Capital Federal y GBA</SelectLabel>
                                    <SelectItem value="Capital Federal">Capital Federal</SelectItem>
                                    <SelectItem value="GBA Norte">GBA Zona Norte</SelectItem>
                                    <SelectItem value="GBA Oeste">GBA Zona Oeste</SelectItem>
                                    <SelectItem value="GBA Sur">GBA Zona Sur</SelectItem>
                                    <SelectItem value="La Plata">La Plata</SelectItem>
                                </SelectGroup>
                                <SelectGroup>
                                    <SelectLabel>Provincia de Buenos Aires</SelectLabel>
                                    <SelectItem value="Mar del Plata">Mar del Plata</SelectItem>
                                    <SelectItem value="Bahía Blanca">Bahía Blanca</SelectItem>
                                    <SelectItem value="Tandil">Tandil</SelectItem>
                                </SelectGroup>
                                 <SelectGroup>
                                    <SelectLabel>Centro del País</SelectLabel>
                                    <SelectItem value="Córdoba">Córdoba</SelectItem>
                                    <SelectItem value="Rosario">Rosario</SelectItem>
                                    <SelectItem value="Santa Fe">Santa Fe</SelectItem>
                                </SelectGroup>
                                <SelectGroup>
                                    <SelectLabel>Cuyo</SelectLabel>
                                    <SelectItem value="Mendoza">Mendoza</SelectItem>
                                    <SelectItem value="San Juan">San Juan</SelectItem>
                                </SelectGroup>
                                <SelectGroup>
                                    <SelectLabel>Norte</SelectLabel>
                                    <SelectItem value="San Miguel de Tucumán">San Miguel de Tucumán</SelectItem>
                                    <SelectItem value="Salta">Salta</SelectItem>
                                    <SelectItem value="Jujuy">Jujuy</SelectItem>
                                </SelectGroup>
                                <SelectGroup>
                                    <SelectLabel>Patagonia</SelectLabel>
                                    <SelectItem value="Neuquén">Neuquén</SelectItem>
                                    <SelectItem value="Bariloche">Bariloche</SelectItem>
                                    <SelectItem value="Comodoro Rivadavia">Comodoro Rivadavia</SelectItem>
                                    <SelectItem value="Ushuaia">Ushuaia</SelectItem>
                                </SelectGroup>
                            </SelectContent>
                        </Select>
                    </div>
                     <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full">
                        <Select value={category} onValueChange={setCategory}>
                            <SelectTrigger className="w-full text-center text-lg h-12">
                                <SelectValue placeholder="Categoría" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="all">Todas las categorías</SelectItem>
                                <SelectGroup>
                                    <SelectLabel>Tecnología y Desarrollo</SelectLabel>
                                    <SelectItem value="tech">Desarrollo de Software</SelectItem>
                                    <SelectItem value="it-support">Soporte TI y Redes</SelectItem>
                                    <SelectItem value="data">Datos y BI</SelectItem>
                                </SelectGroup>
                                 <SelectGroup>
                                    <SelectLabel>Diseño y Creatividad</SelectLabel>
                                    <SelectItem value="design">Diseño UX/UI y Gráfico</SelectItem>
                                    <SelectItem value="audiovisual">Contenido y Audiovisual</SelectItem>
                                </SelectGroup>
                                <SelectGroup>
                                    <SelectLabel>Negocios y Administración</SelectLabel>
                                    <SelectItem value="admin">Administración y Finanzas</SelectItem>
                                    <SelectItem value="sales">Ventas y Comercial</SelectItem>
                                    <SelectItem value="marketing">Marketing y Comunicación</SelectItem>
                                    <SelectItem value="hr">Recursos Humanos</SelectItem>
                                    <SelectItem value="legal">Legal</SelectItem>
                                    <SelectItem value="logistics">Logística y Supply Chain</SelectItem>
                                </SelectGroup>
                                <SelectGroup>
                                    <SelectLabel>Oficios y Servicios</SelectLabel>
                                    <SelectItem value="gastronomy">Gastronomía y Turismo</SelectItem>
                                    <SelectItem value="construction">Construcción y Mantenimiento</SelectItem>
                                    <SelectItem value="domestic">Servicios Domésticos</SelectItem>
                                    <SelectItem value="health">Salud y Cuidado Personal</SelectItem>
                                    <SelectItem value="education">Educación</SelectItem>
                                </SelectGroup>
                                <SelectItem value="other">Otro</SelectItem>
                            </SelectContent>
                        </Select>
                        <Select value={contractType} onValueChange={setContractType}>
                            <SelectTrigger className="w-full text-center text-lg h-12">
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
                {jobsOnThisPage.length > 0 ? (
                    jobsOnThisPage.map(job => <JobListingCard key={job.id} job={job} />)
                ) : (
                    <Card className="col-span-full">
                        <CardContent className="pt-6">
                            <p className="text-center text-muted-foreground">No se encontraron trabajos con esos criterios. Intenta con otros filtros.</p>
                        </CardContent>
                    </Card>
                )}
            </div>

            {totalPages > 1 && (
                <div className="flex justify-center items-center gap-4 mt-8">
                    <Button 
                        variant="outline"
                        size="icon"
                        onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                        disabled={currentPage === 1}
                    >
                        <ChevronLeft className="h-4 w-4" />
                    </Button>
                    
                    <span className="text-sm text-muted-foreground">
                        Página {currentPage} de {totalPages}
                    </span>

                    <Button
                        variant="outline"
                        size="icon"
                        onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                        disabled={currentPage === totalPages}
                    >
                        <ChevronRight className="h-4 w-4" />
                    </Button>
                </div>
            )}
        </div>
    );
}
