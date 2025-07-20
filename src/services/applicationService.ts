
'use server';

import type { Application, Job } from '@prisma/client';
import { getAllJobs } from './jobService';

// Simulate a database connection by using static data
let applications: (Application & { job: Job })[] = [];

export async function getApplicationsByUserId(userId: string): Promise<(Application & { job: Job })[]> {
    const userApplications = applications.filter(app => app.userId === userId);
    return Promise.resolve(userApplications);
}

export async function createApplication(applicationData: {userId: string, jobId: string}): Promise<Application & { job: Job }> {
    const allJobs = await getAllJobs();
    const job = allJobs.find(j => j.id === applicationData.jobId);
    if (!job) {
        throw new Error("Job not found for this application.");
    }
    
    // Check if application already exists
    const existingApplication = applications.find(app => app.userId === applicationData.userId && app.jobId === applicationData.jobId);
    if (existingApplication) {
        return Promise.resolve(existingApplication);
    }

    const newApplication: Application & { job: Job } = {
        id: String(Date.now()),
        createdAt: new Date(),
        status: 'EN_REVISION',
        userId: applicationData.userId,
        jobId: applicationData.jobId,
        job: job,
    };
    applications.push(newApplication);
    return Promise.resolve(newApplication);
}
