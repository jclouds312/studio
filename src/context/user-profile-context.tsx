
'use client';

import React, { createContext, useState, useCallback, ReactNode, useEffect } from 'react';
import type { UserProfileData } from '@/lib/types';
import type { Job, User, Application } from '@prisma/client';
import { useSession } from '@/hooks/use-session';
import { getUserById, updateUser } from '@/services/userService';
import { createApplication, getApplicationsByUserId } from '@/services/applicationService';

type ExtendedApplication = Application & { job: Job };

// Define the shape of the context
interface UserProfileContextType {
    profileData: (UserProfileData & User) | null;
    setProfileData: React.Dispatch<React.SetStateAction<(UserProfileData & User) | null>>;
    savedJobs: Job[];
    handleSaveJob: (job: Job) => void;
    handleApplyForJob: (job: Job) => void;
    applications: ExtendedApplication[];
}

// Create the context with a default value
export const UserProfileContext = createContext<UserProfileContextType>({
    profileData: null,
    setProfileData: () => {},
    savedJobs: [],
    handleSaveJob: () => {},
    handleApplyForJob: () => {},
    applications: [],
});

// Create the provider component
export const UserProfileProvider = ({ children }: { children: ReactNode }) => {
    const { session } = useSession();
    const [profileData, setProfileData] = useState<(UserProfileData & User) | null>(null);
    const [applications, setApplications] = useState<ExtendedApplication[]>([]);
    
    useEffect(() => {
        const fetchProfileData = async () => {
            if (session.isLoggedIn && session.user) {
                const userProfile = await getUserById(session.user.id);
                if (userProfile) {
                    const userApplications = await getApplicationsByUserId(session.user.id);
                    // @ts-ignore
                    setProfileData(userProfile);
                    setApplications(userApplications as ExtendedApplication[]);
                }
            } else {
                setProfileData(null);
                setApplications([]);
            }
        };
        fetchProfileData();
    }, [session.isLoggedIn, session.user]);

    const handleSaveJob = useCallback(async (job: Job) => {
        if (!profileData) return;

        const currentSavedJobIds = profileData.savedJobIds || [];
        const isAlreadySaved = currentSavedJobIds.includes(job.id);
        
        const updatedSavedJobIds = isAlreadySaved
            ? currentSavedJobIds.filter(id => id !== job.id)
            : [...currentSavedJobIds, job.id];

        const updatedUser = await updateUser(profileData.id, { savedJobIds: updatedSavedJobIds });

        if (updatedUser) {
            // @ts-ignore
            setProfileData(updatedUser);
        }
    }, [profileData]);

    const handleApplyForJob = useCallback(async (job: Job) => {
        if (!profileData) return;

        const alreadyApplied = applications.some(app => app.jobId === job.id);
        if (alreadyApplied) return;

        const newApplication = await createApplication({
            userId: profileData.id,
            jobId: job.id,
        });

        if (newApplication) {
            const userApplications = await getApplicationsByUserId(profileData.id);
            setApplications(userApplications as ExtendedApplication[]);
        }
    }, [profileData, applications]);

    // @ts-ignore
    const savedJobs = profileData?.savedJobs || [];

    return (
        <UserProfileContext.Provider value={{ profileData, setProfileData, savedJobs, handleSaveJob, handleApplyForJob, applications }}>
            {children}
        </UserProfileContext.Provider>
    );
};
