
'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import type { CompanyProfile, Job } from '@/lib/types';
import { Building, MapPin, Phone, Mail, ArrowLeft } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { JobListings } from '@/components/job-listings';

interface CompanyProfileClientProps {
  company: CompanyProfile;
  initialJobs: Job[];
}

export function CompanyProfileClient({ company, initialJobs }: CompanyProfileClientProps) {
  const router = useRouter();

  const sortedJobs = [...initialJobs].sort((a, b) => {
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
    <div className="flex flex-col min-h-screen">
      <main className="flex-1 container mx-auto py-12 px-4 space-y-12">
        <div className="mb-6">
            <Button variant="outline" onClick={() => router.back()} className="flex items-center gap-2">
                <ArrowLeft className="h-4 w-4" />
                Volver
            </Button>
        </div>

        <Card className="overflow-hidden">
          <div className="bg-secondary/50 h-32 w-full" />
          <CardContent className="p-6 relative">
            <div className="flex flex-col md:flex-row gap-6 -mt-16">
              <Image 
                src={company.logoUrl || 'https://placehold.co/128x128.png'} 
                alt={`${company.name} logo`}
                width={128}
                height={128}
                className="w-32 h-32 rounded-lg border-4 border-background bg-background shrink-0 object-cover"
                data-ai-hint="company logo"
              />
              <div className="pt-4 md:pt-16">
                <CardTitle className="text-3xl font-bold">{company.name}</CardTitle>
                <div className="flex flex-wrap items-center gap-x-6 gap-y-2 mt-2 text-muted-foreground">
                    <span className="flex items-center gap-2"><MapPin className="h-4 w-4" /> {company.city}, {company.province}</span>
                    <span className="flex items-center gap-2"><Phone className="h-4 w-4" /> {company.phone}</span>
                    <span className="flex items-center gap-2"><Mail className="h-4 w-4" /> {company.cuit}</span>
                </div>
              </div>
            </div>
            
             <div className="mt-6">
                <h3 className="text-lg font-semibold text-primary">Acerca de la Empresa</h3>
                <p className="mt-2 text-muted-foreground">
                    {company.description || 'No se ha proporcionado una descripción de la empresa.'}
                </p>
            </div>
          </CardContent>
        </Card>

        <div>
            <h2 className="text-2xl font-bold mb-6">Ofertas de Trabajo Activas</h2>
            <JobListings initialJobs={sortedJobs} />
        </div>

      </main>
    </div>
  );
}
