
'use server';

import type { Application, Job } from '@prisma/client';
import { getAllJobs } from './jobService';

// Simulate a database connection by using static data
let applications: (Application & { job: Job })[] = [];

export async function getApplicationsByUserId(userId: string) {
    const userApplications = applications.filter(app => app.userId === userId);
    return Promise.resolve(userApplications);
}

export async function createApplication(applicationData: Omit<Application, 'id' | 'createdAt' | 'status'>): Promise<Application & { job: Job }> {
    const allJobs = await getAllJobs();
    const job = allJobs.find(j => j.id === applicationData.jobId);
    if (!job) {
        throw new Error("Job not found for this application.");
    }

    const newApplication: Application & { job: Job } = {
        ...applicationData,
        id: String(Date.now()),
        createdAt: new Date(),
        status: 'EN_REVISION',
        job: job,
    };
    applications.push(newApplication);
    return Promise.resolve(newApplication);
}
