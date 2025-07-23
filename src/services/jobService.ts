
'use server';

import prisma from '@/lib/prisma';
import type { Job } from '@prisma/client';

export async function getAllJobs(filters?: { companyId?: string }): Promise<Job[]> {
    const whereClause = filters?.companyId ? { companyProfileId: filters.companyId } : {};
    return prisma.job.findMany({ where: whereClause });
}

export async function getJobById(id: string): Promise<Job | null> {
    return prisma.job.findUnique({ where: { id } });
}

export async function createJob(data: Partial<Omit<Job, 'id' | 'createdAt' | 'updatedAt'>>): Promise<Job> {
    // Ensure JSON fields are handled correctly
    const jobDataForCreation = {
        ...data,
        title: data.title || 'Untitled Job',
        company: data.company || 'Unknown Company',
        location: data.location || 'Unknown Location',
        type: data.type || 'Full-time',
        category: data.category || 'other',
        skills: data.skills || [],
        customQuestions: data.customQuestions || [],
    };
    // @ts-ignore
    return prisma.job.create({ data: jobDataForCreation });
}

export async function updateJob(id: string, data: Partial<Omit<Job, 'id'>>): Promise<Job | null> {
    try {
        return await prisma.job.update({
            where: { id },
            data,
        });
    } catch (error) {
        console.error("Error updating job:", error);
        return null;
    }
}

export async function deleteJob(id: string): Promise<boolean> {
    try {
        await prisma.job.delete({ where: { id } });
        return true;
    } catch (error) {
        console.error("Error deleting job:", error);
        return false;
    }
}

export async function incrementApplicantCount(jobId: string): Promise<Job | null> {
    try {
        return await prisma.job.update({
            where: { id: jobId },
            data: {
                applicantsCount: {
                    increment: 1,
                },
            },
        });
    } catch (error) {
        console.error("Error incrementing applicant count:", error);
        return null;
    }
}
