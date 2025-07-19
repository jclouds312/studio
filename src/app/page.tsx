
import { Header } from '@/components/layout/header';
import { JobListings } from '@/components/job-listings';
import { Footer } from '@/components/layout/footer';
import { cn } from '@/lib/utils';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel';
import Link from 'next/link';
import Image from 'next/image';
import { Badge } from '@/components/ui/badge';
import { Briefcase, MapPin, Sparkles, Info } from 'lucide-react';
import React from 'react';
import type { Job } from '@prisma/client';
import { getAllJobs } from '@/services/jobService';


async function JobCarousel() {
    const allJobs: Job[] = await getAllJobs();
    const featuredJobs: Job[] = allJobs.filter(
        (job) => job.isFeatured || job.isNew
    ).slice(0, 10);


    return (
        <div className="w-full">
            <h2 className="text-3xl font-bold tracking-tight mb-4">Ofertas Destacadas</h2>
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
                                        <Card className="hover:shadow-xl transition-all duration-300 transform group-hover:scale-[1.02] relative overflow-hidden flex flex-col h-full min-h-[250px] bg-transparent border-0">
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
                                            <CardHeader className="p-6 pb-2">
                                                <div className="flex gap-4">
                                                    <Image src={job.companyLogo} alt={`${job.company} logo`} width={56} height={56} className="rounded-lg border bg-white p-1 shrink-0" data-ai-hint="company logo" />
                                                    <div className="flex-grow">
                                                        <CardTitle className="text-lg md:text-xl mb-1 line-clamp-2">{job.title}</CardTitle>
                                                        <CardDescription className="flex flex-col sm:flex-row sm:items-center gap-x-4 gap-y-1 pt-1 text-sm">
                                                            <span className="flex items-center gap-1.5"><Briefcase className="h-4 w-4 text-muted-foreground" /> {job.company}</span>
                                                        </CardDescription>
                                                    </div>
                                                </div>
                                            </CardHeader>
                                            <CardContent className="p-6 pt-4 flex-grow">
                                                 <span className="flex items-center gap-1.5 text-sm text-muted-foreground"><MapPin className="h-4 w-4 text-muted-foreground" /> {job.location}</span>
                                            </CardContent>
                                            <CardContent className="p-6 pt-0">
                                                <p className="text-sm text-muted-foreground line-clamp-2">{job.description}</p>
                                            </CardContent>
                                        </Card>
                                     </div>
                                </Link>
                            </div>
                        </CarouselItem>
                    ))}
                </CarouselContent>
                <CarouselPrevious className="hidden lg:flex" />
                <CarouselNext className="hidden lg:flex" />
            </Carousel>
        </div>
    );
}

export default async function Home() {
  const jobs = await getAllJobs();

  const sortedJobs = [...jobs].sort((a, b) => {
    const scoreA = (a.isFeatured ? 2 : 0) + (a.isNew ? 1 : 0);
    const scoreB = (b.isFeatured ? 2 : 0) + (b.isNew ? 1 : 0);
    if (scoreB !== scoreA) {
        return scoreB - scoreA;
    }
    const dateA = new Date(a.createdAt).getTime();
    const dateB = new Date(b.createdAt).getTime();
    return dateB - dateA;
  });

  return (
    <div className={cn("flex flex-col min-h-screen")}>
      <Header />
      <main className="flex-1 container mx-auto py-8 px-4 space-y-12">
         <JobCarousel />
         <JobListings initialJobs={sortedJobs} />
      </main>
      <Footer />
    </div>
  );
}
