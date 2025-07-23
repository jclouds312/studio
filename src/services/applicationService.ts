
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
        if (!job) return null;

        const parsedApp = {
            ...app,
            customAnswers: typeof app.customAnswers === 'string' ? JSON.parse(app.customAnswers) : app.customAnswers,
            job: {
                ...job,
                skills: typeof job.skills === 'string' ? JSON.parse(job.skills) : job.skills,
                customQuestions: typeof job.customQuestions === 'string' ? JSON.parse(job.customQuestions) : job.customQuestions,
            }
        };
        return parsedApp;
    }).filter((app): app is ExtendedApplication => app !== null);
    
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

  const extendedNewApplication = {
      ...newApplication,
      customAnswers: customAnswers || [],
      job: {
          ...job!,
          skills: typeof job!.skills === 'string' ? JSON.parse(job!.skills) : job!.skills,
          customQuestions: typeof job!.customQuestions === 'string' ? JSON.parse(job!.customQuestions) : job!.customQuestions,
      }
  };

  return JSON.parse(JSON.stringify(extendedNewApplication));
}
