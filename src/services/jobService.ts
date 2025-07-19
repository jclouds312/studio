
'use server';

import { allJobs as staticJobs } from '@/data/jobs';
import type { Job } from '@prisma/client';

let jobs: Job[] = [...staticJobs];

export async function getAllJobs(): Promise<Job[]> {
    // En una app real, aquí harías: return await prisma.job.findMany();
    return Promise.resolve(jobs);
}

export async function getJobById(id: string): Promise<Job | null> {
    const job = jobs.find(j => j.id === id) || null;
    return Promise.resolve(job);
}

export async function createJob(data: Omit<Job, 'id' | 'createdAt' | 'updatedAt'>): Promise<Job> {
    const newJob: Job = {
        ...data,
        id: String(Date.now()),
        createdAt: new Date(),
        updatedAt: new Date(),
    };
    jobs.push(newJob);
    return Promise.resolve(newJob);
}

export async function updateJob(id: string, data: Partial<Omit<Job, 'id'>>): Promise<Job | null> {
    const jobIndex = jobs.findIndex(j => j.id === id);
    if (jobIndex === -1) {
        return null;
    }
    const updatedJob = { ...jobs[jobIndex], ...data, updatedAt: new Date() };
    jobs[jobIndex] = updatedJob;
    return Promise.resolve(updatedJob);
}

export async function deleteJob(id: string): Promise<boolean> {
    const initialLength = jobs.length;
    jobs = jobs.filter(j => j.id !== id);
    return Promise.resolve(jobs.length < initialLength);
}
