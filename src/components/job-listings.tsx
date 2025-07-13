'use client';

import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { MapPin, Search, Briefcase } from "lucide-react";
import type { Job } from "@/lib/types";
import Image from "next/image";
import React, { useState, useMemo } from "react";

const allJobs: Job[] = [
  {
    id: '1',
    title: 'Frontend Developer',
    company: 'Tech Solutions Inc.',
    location: 'Buenos Aires, AR',
    type: 'Full-time',
    description: 'We are looking for a skilled Frontend Developer to join our team. You will be responsible for building the ‘client-side’ of our web applications. You should be able to translate our company and customer needs into functional and appealing interactive applications.',
    companyLogo: 'https://placehold.co/56x56.png',
    category: 'tech'
  },
  {
    id: '2',
    title: 'UX/UI Designer',
    company: 'Creative Minds',
    location: 'Córdoba, AR',
    type: 'Contract',
    description: 'Creative Minds is seeking a talented UX/UI Designer to create amazing user experiences. The ideal candidate should have an eye for clean and artful design, possess superior UI skills and be able to translate high-level requirements into interaction flows and artifacts.',
    companyLogo: 'https://placehold.co/56x56.png',
    category: 'design'
  },
  {
    id: '3',
    title: 'Backend Engineer (Node.js)',
    company: 'Server Systems',
    location: 'Remote',
    type: 'Full-time',
    description: 'Join our backend team to design and implement scalable and robust server-side applications. You will work with a team of developers to build and maintain our core services, ensuring high performance and responsiveness to requests from the front-end.',
    companyLogo: 'https://placehold.co/56x56.png',
    category: 'tech'
  },
   {
    id: '4',
    title: 'Digital Marketing Manager',
    company: 'Growth Hackers',
    location: 'Rosario, AR',
    type: 'Part-time',
    description: 'We are hiring a Digital Marketing Manager to develop, implement, track and optimize our digital marketing campaigns across all digital channels. You should have a strong grasp of current marketing tools and strategies.',
    companyLogo: 'https://placehold.co/56x56.png',
    category: 'marketing'
  },
  {
    id: '5',
    title: 'Sales Representative',
    company: 'Lead Gen',
    location: 'Buenos Aires, AR',
    type: 'Full-time',
    description: 'We are looking for a competitive and trustworthy Sales Executive to help us build up our business activities. Sales Executive responsibilities include discovering and pursuing new sales prospects, negotiating deals and maintaining customer satisfaction.',
    companyLogo: 'https://placehold.co/56x56.png',
    category: 'sales'
  }
];

function JobListingCard({ job }: { job: Job }) {
    return (
        <Card className="hover:shadow-lg transition-shadow duration-300 transform hover:-translate-y-1">
            <CardHeader>
                <div className="flex flex-col sm:flex-row gap-4">
                    <Image src={job.companyLogo} alt={`${job.company} logo`} width={56} height={56} className="rounded-lg border bg-white" data-ai-hint="company logo" />
                    <div className="flex-grow">
                        <CardTitle>{job.title}</CardTitle>
                        <CardDescription className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 pt-1">
                            <span className="flex items-center gap-1"><Briefcase className="h-4 w-4 text-muted-foreground" /> {job.company}</span>
                            <span className="flex items-center gap-1"><MapPin className="h-4 w-4 text-muted-foreground" /> {job.location}</span>
                        </CardDescription>
                    </div>
                    <div className="hidden sm:block">
                        <Button>Apply Now</Button>
                    </div>
                </div>
            </CardHeader>
            <CardContent>
                <p className="text-sm text-muted-foreground line-clamp-2">{job.description}</p>
            </CardContent>
            <CardFooter className="flex justify-between items-center">
                 <div className="text-sm font-medium text-accent-foreground bg-accent/30 px-2 py-1 rounded-md">{job.type}</div>
                 <div className="flex gap-2">
                    <Button variant="ghost">Save</Button>
                    <Button variant="outline" className="hidden sm:block">View Details</Button>
                    <Button className="sm:hidden">Apply</Button>
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
        return allJobs.filter(job => {
            const keywordMatch = keyword.toLowerCase() ? job.title.toLowerCase().includes(keyword.toLowerCase()) || job.description.toLowerCase().includes(keyword.toLowerCase()) : true;
            const locationMatch = location.toLowerCase() ? job.location.toLowerCase().includes(location.toLowerCase()) : true;
            const categoryMatch = category && category !== 'all' ? job.category === category : true;
            return keywordMatch && locationMatch && categoryMatch;
        });
    }, [keyword, location, category]);

    return (
        <div className="space-y-6">
            <Card className="shadow-lg">
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
                        </SelectContent>
                    </Select>
                </CardContent>
            </Card>

            <div className="space-y-4">
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
