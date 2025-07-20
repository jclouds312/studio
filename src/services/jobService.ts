
'use server';

import type { Job } from '@prisma/client';
import { allJobs as staticJobs } from '@/data/jobs';
import {allCompanies} from "@/data/companies";

// Simulate a database connection by using static data from a file
let jobs: Job[] = staticJobs.map(job => {
    const company = allCompanies.find(c => c.name === job.company);
    return {
        ...job,
        createdAt: new Date(),
        updatedAt: new Date(),
        companyProfileId: company?.id ?? null
    } as Job
});


export async function getAllJobs(): Promise<Job[]> {
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
