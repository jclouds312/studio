
'use server';

import type { Job } from '@prisma/client';
import { allJobs as staticJobs } from '@/data/jobs';
import { allCompanies } from "@/data/companies";

function toJob(job: any): Job {
    return {
        ...job,
        skills: Array.isArray(job.skills) ? job.skills : [],
        customQuestions: Array.isArray(job.customQuestions) ? job.customQuestions : [],
    } as Job;
}

// Simulate a database connection by using static data from a file
let jobs: Job[] = staticJobs.map(job => {
    const company = allCompanies.find(c => c.name === job.company);
    return toJob({
        ...job,
        createdAt: new Date(),
        updatedAt: new Date(),
        companyProfileId: company?.id ?? null,
    });
});


export async function getAllJobs(filters?: { companyId?: string }): Promise<Job[]> {
    let filteredJobs = jobs;
    if (filters?.companyId) {
        filteredJobs = jobs.filter(job => job.companyProfileId === filters.companyId);
    }
    return Promise.resolve(filteredJobs.map(toJob));
}

export async function getJobById(id: string): Promise<Job | null> {
    const job = jobs.find(j => j.id === id) || null;
    if (!job) return null;
    return Promise.resolve(toJob(job));
}

export async function createJob(data: Partial<Omit<Job, 'id' | 'createdAt' | 'updatedAt'>>): Promise<Job> {
    const newJob: Job = toJob({
        ...data,
        id: String(Date.now()),
        createdAt: new Date(),
        updatedAt: new Date(),
        applicantsCount: 0,
    });
    jobs.push(newJob);
    return Promise.resolve(newJob);
}

export async function updateJob(id: string, data: Partial<Omit<Job, 'id'>>): Promise<Job | null> {
    const jobIndex = jobs.findIndex(j => j.id === id);
    if (jobIndex === -1) return null;
    
    const updatedJob = toJob({ ...jobs[jobIndex], ...data, updatedAt: new Date() });
    jobs[jobIndex] = updatedJob;
    return Promise.resolve(updatedJob);
}

export async function deleteJob(id: string): Promise<boolean> {
    const initialLength = jobs.length;
    jobs = jobs.filter(j => j.id !== id);
    return Promise.resolve(jobs.length < initialLength);
}

export async function incrementApplicantCount(jobId: string): Promise<Job | null> {
    const jobIndex = jobs.findIndex(j => j.id === jobId);
    if (jobIndex === -1) return null;

    const job = jobs[jobIndex];
    job.applicantsCount = (job.applicantsCount || 0) + 1;
    return Promise.resolve(job);
}

    