
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
    hasActiveSubscription: boolean;
    activePlan: string | null;
}

// Create the context with a default value
export const UserProfileContext = createContext<UserProfileContextType>({
    profileData: null,
    setProfileData: () => {},
    savedJobs: [],
    handleSaveJob: () => {},
    handleApplyForJob: () => {},
    applications: [],
    hasActiveSubscription: false,
    activePlan: null,
});

// Create the provider component
export const UserProfileProvider = ({ children }: { children: ReactNode }) => {
    const { session } = useSession();
    const [profileData, setProfileData] = useState<(UserProfileData & User) | null>(null);
    const [applications, setApplications] = useState<ExtendedApplication[]>([]);
    
    // Simulación del estado de la suscripción
    const [hasActiveSubscription, setHasActiveSubscription] = useState(false);
    const [activePlan, setActivePlan] = useState<string | null>(null);

    useEffect(() => {
        const fetchProfileData = async () => {
            if (session.isLoggedIn && session.user) {
                try {
                    const userProfile = await getUserById(session.user.id);
                    if (userProfile) {
                        const userApplications = await getApplicationsByUserId(session.user.id);
                        // @ts-ignore
                        setProfileData(userProfile);
                        setApplications(userApplications as ExtendedApplication[]);

                        // Simulación: el usuario 'juan.perez@example.com' tiene un plan activo.
                        if(userProfile.email === 'juan.perez@example.com'){
                            setHasActiveSubscription(true);
                            setActivePlan('Profesional');
                        } else {
                            setHasActiveSubscription(false);
                            setActivePlan(null);
                        }

                    }
                } catch(e){
                   console.error("Failed to fetch user profile", e);
                   setProfileData(null);
                   setApplications([]);
                }
            } else {
                setProfileData(null);
                setApplications([]);
                setHasActiveSubscription(false);
                setActivePlan(null);
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

        try {
            const newApplication = await createApplication({
                userId: profileData.id,
                jobId: job.id,
            });

            if (newApplication) {
                const userApplications = await getApplicationsByUserId(profileData.id);
                setApplications(userApplications as ExtendedApplication[]);
            }
        } catch(e){
            console.error("Failed to create application", e);
        }
    }, [profileData, applications]);

    // @ts-ignore
    const savedJobs = profileData?.savedJobs || [];

    return (
        <UserProfileContext.Provider value={{ profileData, setProfileData, savedJobs, handleSaveJob, handleApplyForJob, applications, hasActiveSubscription, activePlan }}>
            {children}
        </UserProfileContext.Provider>
    );
};
