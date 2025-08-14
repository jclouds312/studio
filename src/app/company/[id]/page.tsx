
// This file is now a Server Component responsible for fetching data.
import React from 'react';
import { notFound } from 'next/navigation';
import { getCompanyById, getAllCompanies } from '@/services/companyService';
import { getAllJobs } from '@/services/jobService';
import { CompanyProfileClient } from '@/components/company/company-profile-client';
import type { CompanyProfile, Job } from '@/lib/types';

export async function generateStaticParams() {
  const companies = await getAllCompanies();
  return companies.map((company) => ({
    id: company.id,
  }));
}

export default async function CompanyPublicProfilePage({ params }: { params: { id: string } }) {
  const companyData = await getCompanyById(params.id);
  
  if (!companyData) {
    notFound();
  }

  const allJobs = await getAllJobs();
  const companyJobs = allJobs.filter(job => job.companyProfileId === params.id);

  // The Server Component fetches the data and then passes it to the Client Component.
  return (
      <CompanyProfileClient company={companyData} initialJobs={companyJobs} />
  );
}
