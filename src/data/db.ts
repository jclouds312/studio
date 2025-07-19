
// This file serves as a temporary, in-memory "database" by exporting
// the static data arrays. In a real application, these would be replaced
// by database queries using an ORM like Prisma.
'use server';
import prisma from '@/lib/prisma';

export const allJobs = () => prisma.job.findMany();
export const allUsers = () => prisma.user.findMany();
export const allCompanies = () => prisma.companyProfile.findMany();
export const allPlans = () => prisma.subscriptionPlan.findMany({ include: { pricingOptions: true } });
