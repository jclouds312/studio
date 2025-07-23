
'use server';

import type { Application, Job } from '@prisma/client';
import type { CustomAnswer } from '@/lib/types';
import { fetchFromPrisma } from './prismaProxy';
import { incrementApplicantCount } from './jobService';

type ExtendedApplication = Application & { job: Job };

export async function getApplicationsByUserId(userId: string): Promise<ExtendedApplication[]> {
    return fetchFromPrisma('application', 'findMany', {
        where: { userId },
        include: { job: true },
    });
}

export async function createApplication(applicationData: {
  userId: string;
  jobId: string;
  customAnswers?: CustomAnswer[];
}): Promise<ExtendedApplication> {
  const { userId, jobId, customAnswers } = applicationData;

  const existingApplication: ExtendedApplication | null = await fetchFromPrisma('application', 'findFirst', {
    where: { userId, jobId },
    include: { job: true },
  });

  if (existingApplication) {
    return existingApplication;
  }

  await incrementApplicantCount(jobId);

  const newApplication: ExtendedApplication = await fetchFromPrisma('application', 'create', {
    data: {
      userId,
      jobId,
      customAnswers: JSON.stringify(customAnswers || []),
      status: 'EN_REVISION',
    },
    include: {
      job: true,
    },
  });

  return newApplication;
}
