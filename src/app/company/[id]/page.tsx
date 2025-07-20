
'use client';

import React, { useEffect, useState, use } from 'react';
import { notFound, useRouter } from 'next/navigation';
import { Header } from '@/components/layout/header';
import { Footer } from '@/components/layout/footer';
import { getCompanyById } from '@/services/companyService';
import { getAllJobs } from '@/services/jobService';
import type { CompanyProfile, Job } from '@/lib/types';
import { Loader2, Building, MapPin, Phone, Mail, ArrowLeft } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import Image from 'next/image';
import { Separator } from '@/components/ui/separator';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { JobListings } from '@/components/job-listings';

export default function CompanyPublicProfilePage({ params: paramsPromise }: { params: Promise<{ id: string }> }) {
  const params = use(paramsPromise);
  const { id } = params;
  const router = useRouter();
  const [company, setCompany] = useState<CompanyProfile | null>(null);
  const [companyJobs, setCompanyJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const companyData = await getCompanyById(id);
        if (companyData) {
          setCompany(companyData);
          const jobsData = await getAllJobs({ companyId: id });
          setCompanyJobs(jobsData);
        }
      } catch (error) {
        console.error("Error fetching company data:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [id]);

  if (loading) {
    return (
      <div className="flex flex-col min-h-screen">
        <Header />
        <main className="flex-1 flex items-center justify-center">
          <Loader2 className="h-8 w-8 animate-spin" />
        </main>
        <Footer />
      </div>
    );
  }

  if (!company) {
    notFound();
  }
  
  const sortedJobs = [...companyJobs].sort((a, b) => {
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
      <Header />
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
                className="w-32 h-32 rounded-lg border-4 border-background bg-background shrink-0"
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
                    Información sobre la empresa. Este es un texto de ejemplo. En una aplicación real, aquí iría una descripción detallada de la compañía, su misión, visión y valores.
                </p>
            </div>
          </CardContent>
        </Card>

        <div>
            <h2 className="text-2xl font-bold mb-6">Ofertas de Trabajo Activas</h2>
            <JobListings initialJobs={sortedJobs} />
        </div>

      </main>
      <Footer />
    </div>
  );
}
