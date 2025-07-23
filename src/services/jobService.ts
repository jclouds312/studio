
'use server';

import type { Job } from '@prisma/client';
import { allJobs } from '@/data/db';

const parseJobFields = (job: Job): Job => {
    try {
        return {
            ...job,
            skills: typeof job.skills === 'string' ? JSON.parse(job.skills) : (job.skills || []),
            customQuestions: typeof job.customQuestions === 'string' ? JSON.parse(job.customQuestions) : (job.customQuestions || []),
        };
    } catch (error) {
        console.warn(`Could not parse JSON fields for job ${job.id}`);
        return {
            ...job,
            skills: [],
            customQuestions: [],
        }
    }
};

export async function getAllJobs(): Promise<Job[]> {
    await new Promise(resolve => setTimeout(resolve, 200));
    return JSON.parse(JSON.stringify(allJobs.map(parseJobFields)));
}

export async function getJobsByCompanyId(companyId: string): Promise<Job[]> {
    await new Promise(resolve => setTimeout(resolve, 200));
    const jobs = allJobs.filter(job => job.companyProfileId === companyId);
    return JSON.parse(JSON.stringify(jobs.map(parseJobFields)));
}

export async function getJobById(id: string): Promise<Job | null> {
    await new Promise(resolve => setTimeout(resolve, 200));
    const job = allJobs.find(job => job.id === id) || null;
    if (job) {
        return JSON.parse(JSON.stringify(parseJobFields(job)));
    }
    return null;
}

export async function createJob(data: Partial<Omit<Job, 'id' | 'createdAt' | 'updatedAt'>>): Promise<Job> {
    await new Promise(resolve => setTimeout(resolve, 200));
    const newJob: Job = {
        id: `job_${Date.now()}`,
        createdAt: new Date(),
        updatedAt: new Date(),
        title: data.title || 'Untitled Job',
        company: data.company || 'Unknown Company',
        location: data.location || 'Unknown Location',
        type: data.type || 'Full-time',
        category: data.category || 'other',
        description: data.description || '',
        imageUrl: data.imageUrl || 'https://placehold.co/800x400.png',
        isFeatured: data.isFeatured || false,
        isNew: true,
        applicantsCount: 0,
        companyLogo: data.companyLogo || 'https://placehold.co/56x56.png',
        salary: data.salary || null,
        skills: JSON.stringify(data.skills || []),
        customQuestions: JSON.stringify(data.customQuestions || []),
        whatsapp: data.whatsapp || null,
        companyProfileId: data.companyProfileId || null,
        desiredProfile: data.desiredProfile || null,
        horario: data.horario || null,
        modalidad: data.modalidad || 'Presencial',
        direccionCompleta: data.direccionCompleta || null,
    };
    allJobs.push(newJob);
    return JSON.parse(JSON.stringify(newJob));
}

export async function updateJob(id: string, data: Partial<Omit<Job, 'id'>>): Promise<Job | null> {
    await new Promise(resolve => setTimeout(resolve, 200));
    const jobIndex = allJobs.findIndex(job => job.id === id);
    if (jobIndex === -1) {
        return null;
    }

    const updatedData = { ...data };
    if (Array.isArray(updatedData.skills)) {
        updatedData.skills = JSON.stringify(updatedData.skills);
    }
    if (Array.isArray(updatedData.customQuestions)) {
        updatedData.customQuestions = JSON.stringify(updatedData.customQuestions);
    }
    
    const updatedJob = { ...allJobs[jobIndex], ...updatedData, updatedAt: new Date() };
    allJobs[jobIndex] = updatedJob;
    return JSON.parse(JSON.stringify(updatedJob));
}

export async function deleteJob(id: string): Promise<boolean> {
    await new Promise(resolve => setTimeout(resolve, 200));
    const initialLength = allJobs.length;
    const filteredJobs = allJobs.filter(job => job.id !== id);
    if (allJobs.length === filteredJobs.length) {
        return false;
    }
    allJobs.length = 0;
    Array.prototype.push.apply(allJobs, filteredJobs);
    return true;
}

export async function incrementApplicantCount(jobId: string): Promise<Job | null> {
    await new Promise(resolve => setTimeout(resolve, 200));
     const jobIndex = allJobs.findIndex(job => job.id === jobId);
    if (jobIndex === -1) {
        return null;
    }
    const currentCount = allJobs[jobIndex].applicantsCount || 0;
    allJobs[jobIndex].applicantsCount = currentCount + 1;
    return JSON.parse(JSON.stringify(allJobs[jobIndex]));
}
