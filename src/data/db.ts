// This file acts as a central database for the prototype.
// It imports all data from other files and exports them as a single source of truth.

import { allJobs as jobs } from './jobs';
import { allUsers as users } from './users';
import { allCompanies as companies } from './companies';
import { allApplications as applications } from './applications';
import type { Job, User, CompanyProfile, Application } from '@prisma/client';

let allJobs: Job[] = [...jobs];
let allUsers: User[] = [...users];
let allCompanies: CompanyProfile[] = [...companies];
let allApplications: Application[] = [...applications];

export { 
    allJobs,
    allUsers,
    allCompanies,
    allApplications
};
