
'use server';

import prisma from '@/lib/prisma';
import { incrementApplicantCount } from './jobService';
import type { Application, Job } from '@prisma/client';
import type { CustomAnswer } from '@/lib/types';

type ExtendedApplication = Application & { job: Job };

export async function getApplicationsByUserId(userId: string): Promise<ExtendedApplication[]> {
    return prisma.application.findMany({
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

  const existingApplication = await prisma.application.findFirst({
    where: { userId, jobId },
    include: { job: true },
  });

  if (existingApplication) {
    return existingApplication;
  }

  await incrementApplicantCount(jobId);

  const newApplication = await prisma.application.create({
    data: {
      userId,
      jobId,
      customAnswers: customAnswers || [],
      status: 'EN_REVISION',
    },
    include: {
      job: true,
    },
  });

  return newApplication;
}
