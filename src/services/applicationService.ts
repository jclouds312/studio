
'use server';

import prisma from '@/lib/prisma';
import type { Application } from '@prisma/client';

export async function getApplicationsByUserId(userId: string) {
    const applications = await prisma.application.findMany({
        where: { userId },
        include: {
            job: true, // Include the related job details
        },
        orderBy: {
            createdAt: 'desc',
        },
    });
    return applications;
}

export async function createApplication(applicationData: Omit<Application, 'id' | 'createdAt' | 'status'>): Promise<Application> {
    const newApplication = await prisma.application.create({
        data: {
            ...applicationData,
            status: 'EN_REVISION'
        },
    });
    return newApplication;
}
