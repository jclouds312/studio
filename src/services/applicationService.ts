
'use server';

import type { Application, Job } from '@prisma/client';
import type { CustomAnswer } from '@/lib/types';
import { allApplications, allJobs } from '@/data/db';
import { incrementApplicantCount } from './jobService';

type ExtendedApplication = Application & { job: Job };

export async function getApplicationsByUserId(userId: string): Promise<ExtendedApplication[]> {
    await new Promise(resolve => setTimeout(resolve, 200));
    const userApplications = allApplications.filter(app => app.userId === userId);
    const extendedApplications = userApplications.map(app => {
        const job = allJobs.find(j => j.id === app.jobId);
        return { ...app, job: job! };
    }).filter(app => app.job);
    return JSON.parse(JSON.stringify(extendedApplications));
}

export async function createApplication(applicationData: {
  userId: string;
  jobId: string;
  customAnswers?: CustomAnswer[];
}): Promise<ExtendedApplication> {
  await new Promise(resolve => setTimeout(resolve, 200));
  const { userId, jobId, customAnswers } = applicationData;

  const existingApplication = allApplications.find(app => app.userId === userId && app.jobId === jobId);

  if (existingApplication) {
      const job = allJobs.find(j => j.id === existingApplication.jobId);
      return JSON.parse(JSON.stringify({ ...existingApplication, job }));
  }

  await incrementApplicantCount(jobId);
  
  const newApplication: Application = {
      id: `app_${Date.now()}`,
      userId,
      jobId,
      customAnswers: JSON.stringify(customAnswers || []),
      status: 'EN_REVISION',
      createdAt: new Date(),
      updatedAt: new Date(),
  };
  
  allApplications.push(newApplication);
  const job = allJobs.find(j => j.id === jobId);

  return JSON.parse(JSON.stringify({ ...newApplication, job }));
}
