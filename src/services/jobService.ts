
'use server';

import type { Job } from '@prisma/client';
import { allJobs as staticJobs } from '@/data/jobs';

// This service now returns static data to avoid Prisma initialization issues.

export async function getAllJobs(): Promise<Job[]> {
    // Simulate async operation
    return Promise.resolve(staticJobs as Job[]);
}

export async function getJobById(id: string): Promise<Job | null> {
    const job = staticJobs.find(j => j.id === id) || null;
    // Simulate async operation
    return Promise.resolve(job as Job | null);
}

export async function createJob(data: Omit<Job, 'id' | 'createdAt' | 'updatedAt' | 'companyProfileId'>): Promise<Job> {
    // This is a mock implementation. In a real scenario, you'd save to a DB.
    const newJob: Job = {
        ...data,
        id: String(Date.now()),
        createdAt: new Date(),
        updatedAt: new Date(),
        companyProfileId: 'comp_1', // Mock company ID
    };
    staticJobs.push(newJob);
    return Promise.resolve(newJob);
}

export async function updateJob(id: string, data: Partial<Omit<Job, 'id'>>): Promise<Job | null> {
    const jobIndex = staticJobs.findIndex(j => j.id === id);
    if (jobIndex === -1) return null;

    const updatedJob = { ...staticJobs[jobIndex], ...data, updatedAt: new Date() };
    staticJobs[jobIndex] = updatedJob;
    return Promise.resolve(updatedJob as Job);
}

export async function deleteJob(id: string): Promise<boolean> {
    const initialLength = staticJobs.length;
    const filteredJobs = staticJobs.filter(j => j.id !== id);
    // This won't work across requests in a stateless environment, but it's fine for this simulation.
    staticJobs.length = 0;
    Array.prototype.push.apply(staticJobs, filteredJobs);
    
    return Promise.resolve(staticJobs.length < initialLength);
}
