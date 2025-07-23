
import { Header } from '@/components/layout/header';
import { JobListings } from '@/components/job-listings';
import { Footer } from '@/components/layout/footer';
import { cn } from '@/lib/utils';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel';
import Link from 'next/link';
import Image from 'next/image';
import { Badge } from '@/components/ui/badge';
import { Briefcase, MapPin, Sparkles, Info, DollarSign } from 'lucide-react';
import React from 'react';
import type { Job } from '@prisma/client';
import { getAllJobs } from '@/services/jobService';


async function JobCarousel({ featuredJobs }: { featuredJobs: Job[] }) {

    if (!featuredJobs || featuredJobs.length === 0) {
        return null;
    }

    return (
        <div className="w-full">
            <h2 className="text-3xl font-bold tracking-tight mb-6 text-center text-primary">Ofertas Destacadas</h2>
            <Carousel 
                opts={{
                    align: "start",
                    loop: true,
                }}
                className="w-full"
            >
                <CarouselContent>
                    {featuredJobs.map((job) => (
                        <CarouselItem key={job.id} className="md:basis-1/2 lg:basis-1/3">
                            <div className="p-1 h-full">
                               <Link href={`/jobs/${job.id}`} className="block h-full group">
                                    <div className={cn("h-full card-neon-border rounded-lg")}>
                                        <Card className={cn("hover:shadow-xl transition-all duration-300 transform group-hover:scale-[1.02] relative overflow-hidden flex flex-col h-full bg-transparent border-0 theme-premium")}>
                                            <div className="absolute top-4 right-4 z-10 flex flex-col items-end gap-2">
                                                <Badge variant="default" className="bg-amber-400 text-amber-900 text-xs font-bold py-1 px-3 rounded-full flex items-center gap-1 border-2 border-amber-900/20">
                                                    <Sparkles className="h-4 w-4" />
                                                    DESTACADO
                                                </Badge>
                                                {job.isNew && (
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
                                                    <CardTitle className="text-lg md:text-xl mb-1 text-card-foreground group-hover:text-primary transition-colors card-title-premium">{job.title}</CardTitle>
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
                                            </CardContent>
                                        </Card>
                                    </div>
                                </Link>
                            </div>
                        </CarouselItem>
                    ))}
                </CarouselContent>
                <CarouselPrevious />
                <CarouselNext />
            </Carousel>
        </div>
    );
}

export default async function Home() {
  const allJobs: Job[] = await getAllJobs();

  // Separate featured jobs
  const featuredJobs = allJobs.filter(job => job.isFeatured).sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
  
  // All other jobs, excluding the ones already featured
  const featuredJobIds = new Set(featuredJobs.map(job => job.id));
  const regularJobs = allJobs.filter(job => !featuredJobIds.has(job.id));

  return (
    <div className={cn("flex flex-col min-h-screen")}>
      <main className="flex-1 container mx-auto py-8 px-4 space-y-12">
         <JobCarousel featuredJobs={featuredJobs} />
         <JobListings initialJobs={regularJobs} />
      </main>
    </div>
  );
}
