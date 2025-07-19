
// This file serves as a temporary, in-memory "database" by exporting
// the static data arrays. In a real application, these would be replaced
// by database queries using an ORM like Prisma.

import { allJobs as staticJobs } from './jobs';
import { allUsers as staticUsers } from './users';
import { allCompanies as staticCompanies } from './companies';
import { allPlans as staticPlans } from './plans';

export const allJobs = () => staticJobs;
export const allUsers = () => staticUsers;
export const allCompanies = () => staticCompanies;
export const allPlans = () => staticPlans;
