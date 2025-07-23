
'use server';

import type { Job } from '@prisma/client';
import { fetchFromPrisma } from './prismaProxy';

export async function getAllJobs(filters?: { companyId?: string }): Promise<Job[]> {
    const whereClause = filters?.companyId ? { companyProfileId: filters.companyId } : {};
    return fetchFromPrisma('job', 'findMany', { where: whereClause });
}

export async function getJobById(id: string): Promise<Job | null> {
    return fetchFromPrisma('job', 'findUnique', { where: { id } });
}

export async function createJob(data: Partial<Omit<Job, 'id' | 'createdAt' | 'updatedAt'>>): Promise<Job> {
    const jobDataForCreation = {
        ...data,
        title: data.title || 'Untitled Job',
        company: data.company || 'Unknown Company',
        location: data.location || 'Unknown Location',
        type: data.type || 'Full-time',
        category: data.category || 'other',
        skills: JSON.stringify(data.skills || []),
        customQuestions: JSON.stringify(data.customQuestions || []),
    };
    // @ts-ignore
    return fetchFromPrisma('job', 'create', { data: jobDataForCreation });
}

export async function updateJob(id: string, data: Partial<Omit<Job, 'id'>>): Promise<Job | null> {
    try {
        // Stringify JSON fields before sending
        const dataToUpdate = { ...data };
        if (data.skills && Array.isArray(data.skills)) {
            dataToUpdate.skills = JSON.stringify(data.skills);
        }
        if (data.customQuestions && Array.isArray(data.customQuestions)) {
            dataToUpdate.customQuestions = JSON.stringify(data.customQuestions);
        }

        return await fetchFromPrisma('job', 'update', {
            where: { id },
            data: dataToUpdate,
        });
    } catch (error) {
        console.error("Error updating job:", error);
        return null;
    }
}

export async function deleteJob(id: string): Promise<boolean> {
    try {
        await fetchFromPrisma('job', 'delete', { where: { id } });
        return true;
    } catch (error) {
        console.error("Error deleting job:", error);
        return false;
    }
}

export async function incrementApplicantCount(jobId: string): Promise<Job | null> {
    try {
        return await fetchFromPrisma('job', 'update', {
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
