
'use server';

import type { Job } from '@prisma/client';
import { allJobs as staticJobs } from '@/data/jobs';
import {allCompanies} from "@/data/companies";

// Helper functions for data conversion
function toJobArray(job: Job): Job {
    const newJob = { ...job };
    // @ts-ignore
    if (typeof newJob.skills === 'string') newJob.skills = JSON.parse(newJob.skills || '[]');
    // @ts-ignore
    if (typeof newJob.customQuestions === 'string') newJob.customQuestions = JSON.parse(newJob.customQuestions || '[]');
    return newJob;
}

function fromJobArray(data: Partial<Omit<Job, 'id'>>): Partial<Omit<Job, 'id'>> {
    const newData = { ...data };
    if (Array.isArray(newData.skills)) {
        // @ts-ignore
        newData.skills = JSON.stringify(newData.skills);
    }
    if (Array.isArray(newData.customQuestions)) {
        // @ts-ignore
        newData.customQuestions = JSON.stringify(newData.customQuestions);
    }
    return newData;
}


// Simulate a database connection by using static data from a file
let jobs: Job[] = staticJobs.map(job => {
    const company = allCompanies.find(c => c.name === job.company);
    return {
        ...job,
        createdAt: new Date(),
        updatedAt: new Date(),
        companyProfileId: company?.id ?? null,
        // @ts-ignore
        skills: JSON.stringify(job.skills || []),
        // @ts-ignore
        customQuestions: JSON.stringify(job.customQuestions || [])
    } as Job
});


export async function getAllJobs(filters?: { companyId?: string }): Promise<Job[]> {
    let filteredJobs = jobs;
    if (filters?.companyId) {
        filteredJobs = jobs.filter(job => job.companyProfileId === filters.companyId);
    }
    return Promise.resolve(filteredJobs.map(toJobArray));
}

export async function getJobById(id: string): Promise<Job | null> {
    const job = jobs.find(j => j.id === id) || null;
    if (!job) return null;
    return Promise.resolve(toJobArray(job));
}

export async function createJob(data: Omit<Job, 'id' | 'createdAt' | 'updatedAt'>): Promise<Job> {
    const newJobData = fromJobArray(data);
    const newJob: Job = {
        ...newJobData,
        id: String(Date.now()),
        createdAt: new Date(),
        updatedAt: new Date(),
    } as Job;
    jobs.push(newJob);
    return Promise.resolve(toJobArray(newJob));
}

export async function updateJob(id: string, data: Partial<Omit<Job, 'id'>>): Promise<Job | null> {
    const jobIndex = jobs.findIndex(j => j.id === id);
    if (jobIndex === -1) return null;
    
    const updatedJob = { ...jobs[jobIndex], ...fromJobArray(data), updatedAt: new Date() };
    jobs[jobIndex] = updatedJob as Job;
    return Promise.resolve(toJobArray(updatedJob as Job));
}

export async function deleteJob(id: string): Promise<boolean> {
    const initialLength = jobs.length;
    jobs = jobs.filter(j => j.id !== id);
    return Promise.resolve(jobs.length < initialLength);
}
