
'use client';

import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { MapPin, Search, Briefcase, Sparkles, Star } from "lucide-react";
import type { Job } from "@/lib/types";
import Image from "next/image";
import React, { useState, useMemo } from "react";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";

export const allJobs: Job[] = [
  {
    id: '1',
    title: 'Frontend Developer',
    company: 'Tech Solutions Inc.',
    location: 'Buenos Aires, AR',
    type: 'Full-time',
    description: 'Buscamos un desarrollador Frontend para unirse a nuestro equipo. Serás responsable de construir el lado del cliente de nuestras aplicaciones web. Debes ser capaz de traducir las necesidades de nuestra empresa y clientes en aplicaciones interactivas funcionales y atractivas.',
    companyLogo: 'https://placehold.co/56x56.png',
    category: 'tech',
    isFeatured: true,
    whatsapp: '+5491123456789'
  },
  {
    id: '2',
    title: 'Diseñador/a UX/UI',
    company: 'Creative Minds',
    location: 'Córdoba, AR',
    type: 'Contract',
    description: 'Creative Minds busca un talentoso Diseñador UX/UI para crear experiencias de usuario increíbles. El candidato ideal debe tener un ojo para el diseño limpio y artístico, poseer habilidades superiores de UI y ser capaz de traducir requisitos de alto nivel en flujos de interacción y artefactos.',
    companyLogo: 'https://placehold.co/56x56.png',
    category: 'design'
  },
  {
    id: '3',
    title: 'Ingeniero/a Backend (Node.js)',
    company: 'Server Systems',
    location: 'Remoto',
    type: 'Full-time',
    description: 'Únete a nuestro equipo de backend para diseñar e implementar aplicaciones del lado del servidor escalables y robustas. Trabajarás con un equipo de desarrolladores para construir y mantener nuestros servicios principales, asegurando un alto rendimiento y capacidad de respuesta a las solicitudes del front-end.',
    companyLogo: 'https://placehold.co/56x56.png',
    category: 'tech'
  },
   {
    id: '4',
    title: 'Manager de Marketing Digital',
    company: 'Growth Hackers',
    location: 'Rosario, AR',
    type: 'Part-time',
    description: 'Estamos contratando un Manager de Marketing Digital para desarrollar, implementar, rastrear y optimizar nuestras campañas de marketing digital en todos los canales digitales. Debes tener un fuerte conocimiento de las herramientas y estrategias de marketing actuales.',
    companyLogo: 'https://placehold.co/56x56.png',
    category: 'marketing'
  },
  {
    id: '5',
    title: 'Representante de Ventas',
    company: 'Lead Gen',
    location: 'Buenos Aires, AR',
    type: 'Full-time',
    description: 'Buscamos un Ejecutivo de Ventas competitivo y confiable para ayudarnos a desarrollar nuestras actividades comerciales. Las responsabilidades del Ejecutivo de Ventas incluyen descubrir y buscar nuevos prospectos de ventas, negociar acuerdos y mantener la satisfacción del cliente.',
    companyLogo: 'https://placehold.co/56x56.png',
    category: 'sales',
    isFeatured: true,
    whatsapp: '+5491123456789'
  },
   {
    id: '6',
    title: 'Pintor de Interiores',
    company: 'Servicios Varios',
    location: 'La Plata, AR',
    type: 'Changa',
    description: 'Se necesita pintor con experiencia para pintar un departamento de 2 ambientes. Se proveen materiales. Trabajo por día, pago al finalizar la jornada. Enviar fotos de trabajos previos por WhatsApp.',
    companyLogo: 'https://placehold.co/56x56.png',
    category: 'domestic',
    whatsapp: '+5491123456789'
  }
];

function JobListingCard({ job }: { job: Job }) {
    return (
        <Card className="hover:shadow-xl transition-shadow duration-300 transform hover:-translate-y-1 hover:border-primary/50 relative overflow-hidden">
            <Link href={`/jobs/${job.id}`} className="block">
                {job.isFeatured && (
                    <div className="absolute top-2 right-2">
                        <Badge variant="default" className="bg-primary/90 text-primary-foreground text-xs font-bold py-1 px-3 rounded-full flex items-center gap-1 border-2 border-primary-foreground/20">
                            <Sparkles className="h-4 w-4" />
                            DESTACADO
                        </Badge>
                    </div>
                )}
                <CardHeader>
                    <div className="flex flex-col sm:flex-row gap-4">
                        <Image src={job.companyLogo} alt={`${job.company} logo`} width={56} height={56} className="rounded-lg border bg-secondary p-1" data-ai-hint="company logo" />
                        <div className="flex-grow">
                            <CardTitle className="text-lg md:text-xl">{job.title}</CardTitle>
                            <CardDescription className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 pt-1 text-sm">
                                <span className="flex items-center gap-1.5"><Briefcase className="h-4 w-4 text-muted-foreground" /> {job.company}</span>
                                <span className="flex items-center gap-1.5"><MapPin className="h-4 w-4 text-muted-foreground" /> {job.location}</span>
                            </CardDescription>
                        </div>
                    </div>
                </CardHeader>
                <CardContent>
                    <p className="text-sm text-muted-foreground line-clamp-2">{job.description}</p>
                </CardContent>
            </Link>
            <CardFooter className="flex flex-col sm:flex-row justify-between items-center gap-3">
                 <Badge variant="secondary" className="text-xs capitalize">{job.type}</Badge>
                 <div className="flex gap-2 w-full sm:w-auto">
                    <Button variant="outline" size="sm" className="w-full sm:w-auto">
                        <Star className="mr-2 h-4 w-4" />
                        Guardar
                    </Button>
                    <Button className="w-full sm:w-auto" size="sm" asChild>
                        <Link href={`/jobs/${job.id}`}>Ver Oferta</Link>
                    </Button>
                 </div>
            </CardFooter>
        </Card>
    );
}

export function JobListings() {
    const [keyword, setKeyword] = useState('');
    const [location, setLocation] = useState('');
    const [category, setCategory] = useState('all');

    const filteredJobs = useMemo(() => {
        let jobs = allJobs
            .filter(job => {
                const keywordMatch = keyword.toLowerCase() ? job.title.toLowerCase().includes(keyword.toLowerCase()) || job.description.toLowerCase().includes(keyword.toLowerCase()) : true;
                const locationMatch = location.toLowerCase() ? job.location.toLowerCase().includes(location.toLowerCase()) : true;
                const categoryMatch = category && category !== 'all' ? job.category === category : true;
                return keywordMatch && locationMatch && categoryMatch;
            });
        
        jobs.sort((a, b) => (b.isFeatured ? 1 : 0) - (a.isFeatured ? 1 : 0));

        return jobs;
    }, [keyword, location, category]);

    return (
        <div className="space-y-6">
            <Card className="shadow-lg sticky top-[70px] z-30 backdrop-blur-sm bg-card/80 border-border/50">
                <CardHeader>
                    <CardTitle>Encuentra tu próximo trabajo</CardTitle>
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
                        <Input 
                            placeholder="Ciudad o región" 
                            className="pl-10"
                            value={location}
                            onChange={(e) => setLocation(e.target.value)}
                        />
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
                            <SelectItem value="other">Otro</SelectItem>
                        </SelectContent>
                    </Select>
                </CardContent>
            </Card>

            <div className="grid grid-cols-1 gap-4">
                {filteredJobs.length > 0 ? (
                    filteredJobs.map(job => <JobListingCard key={job.id} job={job} />)
                ) : (
                    <Card>
                        <CardContent className="pt-6">
                            <p className="text-center text-muted-foreground">No se encontraron trabajos con esos criterios. Intenta con otros filtros.</p>
                        </CardContent>
                    </Card>
                )}
            </div>
        </div>
    );
}
