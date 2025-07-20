
'use server';

import type { Application, Job, User } from '@prisma/client';
import { getAllJobs } from './jobService';
import type { CustomAnswer } from '@/lib/types';


// Helper functions for data conversion
function toApplicationArray(app: Application): Application {
    const newApp = { ...app };
    // @ts-ignore
    if (typeof newApp.customAnswers === 'string') newApp.customAnswers = JSON.parse(newApp.customAnswers || '[]');
    return newApp;
}

function fromApplicationArray(data: Partial<Omit<Application, 'id'>>): Partial<Omit<Application, 'id'>> {
    const newData = { ...data };
    if (Array.isArray(newData.customAnswers)) {
      // @ts-ignore
        newData.customAnswers = JSON.stringify(newData.customAnswers);
    }
    return newData;
}


// Simulate a database connection by using static data
let applications: (Application & { job: Job })[] = [];

export async function getApplicationsByUserId(userId: string): Promise<(Application & { job: Job })[]> {
    const userApplications = applications
        .filter(app => app.userId === userId)
        .map(app => ({...app, ...toApplicationArray(app)}));
    return Promise.resolve(userApplications);
}

export async function createApplication(applicationData: {userId: string, jobId: string, customAnswers?: CustomAnswer[]}): Promise<Application & { job: Job }> {
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

    const newApplicationData = {
      userId: applicationData.userId,
      jobId: applicationData.jobId,
      customAnswers: applicationData.customAnswers || []
    };

    const newApplication: Application & { job: Job } = {
        id: String(Date.now()),
        createdAt: new Date(),
        status: 'EN_REVISION',
        ...(fromApplicationArray(newApplicationData) as any),
        job: job,
    };

    applications.push(newApplication);
    return Promise.resolve(toApplicationArray(newApplication) as Application & { job: Job });
}
