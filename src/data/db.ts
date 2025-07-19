
import { allJobs as staticJobs } from './jobs';
import { allUsers as staticUsers } from './users';
import { allCompanies as staticCompanies } from './companies';

// This file is kept for legacy purposes but services should be used instead.
// Functions here will use the static data to simulate database interaction.

export const allJobs = async () => {
  return Promise.resolve(staticJobs);
};

export const allUsers = async () => {
    return Promise.resolve(staticUsers);
};

export const allCompanies = async () => {
    return Promise.resolve(staticCompanies);
}

// Static data can still be exported for things not in the DB yet, like plans
import { allPlans as staticPlans } from './plans';
export const allPlans = () => staticPlans;
