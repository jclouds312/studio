
import prisma from '@/lib/prisma';

// This file now serves as a database access layer.
// Functions here will use Prisma to interact with the database.

// Example function, can be expanded for other models
export const allJobs = async () => {
  return await prisma.job.findMany();
};

export const allUsers = async () => {
    return await prisma.user.findMany();
};

export const allCompanies = async () => {
    return await prisma.companyProfile.findMany();
}

// Static data can still be exported for things not in the DB yet, like plans
import { allPlans as staticPlans } from './plans';
export const allPlans = () => staticPlans;
