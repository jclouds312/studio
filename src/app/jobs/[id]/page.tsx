
// This file is now a Server Component responsible for fetching data.
import React from 'react';
import { notFound } from 'next/navigation';
import { getJobById } from '@/services/jobService';
import { JobDetailClient } from '@/components/job-detail-client';
import type { Job } from '@prisma/client';

export default async function JobPage({ params }: { params: { id: string } }) {
  const job = await getJobById(params.id);

  if (!job) {
    notFound();
  }

  // The Server Component fetches the data and then passes it to the Client Component.
  return (
    <main>
      <JobDetailClient job={job} />
    </main>
  );
}
