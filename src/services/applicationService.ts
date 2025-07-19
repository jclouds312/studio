
'use server';

import type { UserApplication } from '@/lib/types';
import { allUsers } from '@/data/users'; // We'll store applications within the user's profile data

// Note: This is a simplified service for demonstration.
// In a real app, applications would likely be their own table/collection.

export async function getApplicationsByUserId(userId: string): Promise<UserApplication[]> {
    const user = allUsers.find(u => u.id === userId);
    const applications = user?.profileData?.applications || [];
    return Promise.resolve(applications);
}

export async function createApplication(userId: string, applicationData: Omit<UserApplication, 'id'>): Promise<UserApplication> {
    const userIndex = allUsers.findIndex(u => u.id === userId);
    if (userIndex === -1 || !allUsers[userIndex].profileData) {
        throw new Error("User not found or profile data missing");
    }

    const newApplication: UserApplication = {
        ...applicationData,
        id: String(Date.now()), // Mock ID
    };
    
    allUsers[userIndex].profileData!.applications.push(newApplication);

    return Promise.resolve(newApplication);
}
