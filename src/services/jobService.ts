
'use server';

import type { Job } from '@prisma/client';
// import prisma from '@/lib/prisma';
import { allJobs as staticJobs } from '@/data/jobs';

export async function getAllJobs(): Promise<Job[]> {
    // return await prisma.job.findMany({
    //     orderBy: [
    //         { isFeatured: 'desc' },
    //         { isNew: 'desc' },
    //         { createdAt: 'desc' }
    //     ]
    // });
    return Promise.resolve(staticJobs as Job[]);
}

export async function getJobById(id: string): Promise<Job | null> {
    // const job = await prisma.job.findUnique({ where: { id } });
    const job = staticJobs.find(j => j.id === id) || null;
    return Promise.resolve(job as Job | null);
}

export async function createJob(data: Omit<Job, 'id' | 'createdAt' | 'updatedAt' | 'companyProfileId'>): Promise<Job> {
    const newJob = {
        ...data,
        id: String(Date.now()),
        createdAt: new Date(),
        updatedAt: new Date(),
        companyProfileId: 'clz7s1m2n000018mjdlgqdt7g', // Mock company ID
    };
    // In a real scenario, this would be `prisma.job.create({ data: newJob })`
    staticJobs.push(newJob);
    return Promise.resolve(newJob as Job);
}

export async function updateJob(id: string, data: Partial<Omit<Job, 'id'>>): Promise<Job | null> {
    // const updatedJob = await prisma.job.update({
    //     where: { id },
    //     data: { ...data, updatedAt: new Date() },
    // });
    const jobIndex = staticJobs.findIndex(j => j.id === id);
    if (jobIndex === -1) return null;
    
    const updatedJob = { ...staticJobs[jobIndex], ...data, updatedAt: new Date() };
    // @ts-ignore
    staticJobs[jobIndex] = updatedJob;
    return Promise.resolve(updatedJob as Job);
}

export async function deleteJob(id: string): Promise<boolean> {
    // try {
    //     await prisma.job.delete({ where: { id } });
    //     return true;
    // } catch (error) {
    //     console.error("Error deleting job:", error);
    //     return false;
    // }
    const initialLength = staticJobs.length;
    const filteredJobs = staticJobs.filter(j => j.id !== id);
    staticJobs.length = 0;
    Array.prototype.push.apply(staticJobs, filteredJobs);
    return Promise.resolve(staticJobs.length < initialLength);
}
