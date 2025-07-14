
'use client';

import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { MapPin, Search, Briefcase, Sparkles, Star, Send } from "lucide-react";
import type { Job } from "@/lib/types";
import Image from "next/image";
import React, { useState, useMemo } from "react";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import { useToast } from "@/components/ui/use-toast";
import { allJobs } from "@/lib/data";
import { cn } from "@/lib/utils";

function JobListingCard({ job }: { job: Job }) {
    const { toast } = useToast();

    const handleAction = (e: React.MouseEvent, action: 'apply' | 'save') => {
        e.preventDefault(); 
        e.stopPropagation();

        if (action === 'apply') {
            toast({
                title: "¡Postulación Enviada!",
                description: `Te has postulado exitosamente a la oferta de ${job.title}.`,
            });
        } else {
            toast({
                title: "¡Oferta Guardada!",
                description: `Has guardado la oferta de ${job.title}.`,
            });
        }
    };

    return (
        <div className={cn(job.isFeatured && 'dark')}>
            <Link href={`/jobs/${job.id}`} className="block h-full">
                <Card className="hover:shadow-xl transition-shadow duration-300 transform hover:-translate-y-1 hover:border-primary/50 relative overflow-hidden flex flex-col bg-card/80 backdrop-blur-sm h-full">
                    {job.isFeatured && (
                        <div className="absolute top-4 right-4 z-10">
                            <Badge variant="default" className="bg-primary/90 text-primary-foreground text-xs font-bold py-1 px-3 rounded-full flex items-center gap-1 border-2 border-primary-foreground/20">
                                <Sparkles className="h-4 w-4" />
                                DESTACADO
                            </Badge>
                        </div>
                    )}
                    <CardHeader className="p-6 pb-2">
                        <div className="flex gap-4">
                            <Image src={job.companyLogo} alt={`${job.company} logo`} width={56} height={56} className="rounded-lg border bg-secondary p-1 shrink-0" data-ai-hint="company logo" />
                            <div className="flex-grow">
                                <CardTitle className="text-lg md:text-xl mb-1">{job.title}</CardTitle>
                                <CardDescription className="flex flex-col sm:flex-row sm:items-center gap-x-4 gap-y-1 pt-1 text-sm">
                                    <span className="flex items-center gap-1.5"><Briefcase className="h-4 w-4 text-muted-foreground" /> {job.company}</span>
                                    <span className="flex items-center gap-1.5"><MapPin className="h-4 w-4 text-muted-foreground" /> {job.location}</span>
                                </CardDescription>
                            </div>
                        </div>
                    </CardHeader>
                    <CardContent className="p-6 pt-4 flex-grow">
                        <p className="text-sm text-muted-foreground line-clamp-2">{job.description}</p>
                    </CardContent>
                    <CardFooter className="flex flex-row justify-between items-center bg-secondary/20 p-4 border-t mt-auto">
                        <Badge variant="outline" className="text-xs capitalize">{job.type}</Badge>
                        <div className="flex items-center gap-2">
                            <Button variant="ghost" size="sm" onClick={(e) => handleAction(e, 'save')}>
                                <Star className="mr-2 h-4 w-4" />
                                Guardar
                            </Button>
                            <Button size="sm" onClick={(e) => handleAction(e, 'apply')}>
                                <Send className="mr-2 h-4 w-4" />
                                Postularse
                            </Button>
                        </div>
                    </CardFooter>
                </Card>
            </Link>
        </div>
    );
}

export function JobListings() {
    const [keyword, setKeyword] = useState('');
    const [location, setLocation] = useState('all');
    const [category, setCategory] = useState('all');

    const filteredJobs = useMemo(() => {
        let jobs = allJobs
            .filter(job => {
                const keywordMatch = keyword.toLowerCase() ? job.title.toLowerCase().includes(keyword.toLowerCase()) || job.description.toLowerCase().includes(keyword.toLowerCase()) : true;
                const locationMatch = location && location !== 'all' ? job.location === location : true;
                const categoryMatch = category && category !== 'all' ? job.category === category : true;
                return keywordMatch && locationMatch && categoryMatch;
            });
        
        jobs.sort((a, b) => (b.isFeatured ? 1 : 0) - (a.isFeatured ? 1 : 0));

        return jobs;
    }, [keyword, location, category]);

    return (
        <div className="space-y-8">
            <Card className="shadow-lg sticky top-[70px] z-30 backdrop-blur-sm bg-card/80 border-border/50">
                <CardHeader>
                    <CardTitle>Encuentra tu próximo trabajo</CardTitle>
                    <CardDescription>Busca entre miles de ofertas de las mejores empresas.</CardDescription>
                </CardHeader>
                <CardContent className="flex flex-col md:flex-row gap-4 items-center">
                    <div className="flex-grow relative w-full">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground h-5 w-5" />
                        <Input 
                            placeholder="Puesto o palabra clave" 
                            className="pl-10"
                            value={keyword}
                            onChange={(e) => setKeyword(e.target.value)}
                        />
                    </div>
                    <div className="flex-grow relative w-full">
                        <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground h-5 w-5" />
                         <Select value={location} onValueChange={setLocation}>
                            <SelectTrigger className="w-full pl-10">
                                <SelectValue placeholder="Ubicación" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="all">Todas las ubicaciones</SelectItem>
                                <SelectItem value="Remoto">Remoto</SelectItem>
                                <SelectItem value="Buenos Aires">Buenos Aires (CABA)</SelectItem>
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
                    <Select value={category} onValueChange={setCategory}>
                        <SelectTrigger className="w-full md:w-[200px]">
                             <SelectValue placeholder="Categoría" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="all">Todas</SelectItem>
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
                            <SelectItem value="other">Otro</SelectItem>
                        </SelectContent>
                    </Select>
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
