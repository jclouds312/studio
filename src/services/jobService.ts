
'use server';

import type { Job } from '@prisma/client';
import { allJobs as staticJobs } from '@/data/jobs';

// Simulate a database connection by using static data from a file
// In a real scenario, this would be: await prisma.job.findMany(...)
let jobs: Job[] = staticJobs as Job[];

export async function getAllJobs(): Promise<Job[]> {
    return Promise.resolve(jobs);
}

export async function getJobById(id: string): Promise<Job | null> {
    const job = jobs.find(j => j.id === id) || null;
    return Promise.resolve(job);
}

export async function createJob(data: Omit<Job, 'id' | 'createdAt' | 'updatedAt' | 'companyProfileId'>): Promise<Job> {
    const newJob: Job = {
        ...data,
        id: String(Date.now()),
        createdAt: new Date(),
        updatedAt: new Date(),
        companyProfileId: 'clz7s1m2n000018mjdlgqdt7g', // Mock company ID
    };
    jobs.push(newJob);
    return Promise.resolve(newJob);
}

export async function updateJob(id: string, data: Partial<Omit<Job, 'id'>>): Promise<Job | null> {
    const jobIndex = jobs.findIndex(j => j.id === id);
    if (jobIndex === -1) return null;
    
    const updatedJob = { ...jobs[jobIndex], ...data, updatedAt: new Date() };
    jobs[jobIndex] = updatedJob as Job;
    return Promise.resolve(updatedJob as Job);
}

export async function deleteJob(id: string): Promise<boolean> {
    const initialLength = jobs.length;
    jobs = jobs.filter(j => j.id !== id);
    return Promise.resolve(jobs.length < initialLength);
}
