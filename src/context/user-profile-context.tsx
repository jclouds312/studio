
'use client';

import React, { createContext, useState, useCallback, ReactNode, useEffect } from 'react';
import type { UserProfileData } from '@/lib/types';
import type { Job, User, Application } from '@prisma/client';
import { useSession } from '@/hooks/use-session';
import { getUserById, updateUser } from '@/services/userService';
import { createApplication, getApplicationsByUserId } from '@/services/applicationService';
import { getJobById } from '@/services/jobService';

type ExtendedApplication = Application & { job: Job };

// Define the shape of the context
interface UserProfileContextType {
    profileData: User | null;
    setProfileData: React.Dispatch<React.SetStateAction<User | null>>;
    savedJobs: Job[];
    handleSaveJob: (job: Job) => void;
    handleApplyForJob: (job: Job) => void;
    applications: ExtendedApplication[];
    hasActiveSubscription: boolean;
    activePlan: string | null;
    subscriptionEndDate: string | null;
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
    subscriptionEndDate: null,
});

// Create the provider component
export const UserProfileProvider = ({ children }: { children: ReactNode }) => {
    const { session } = useSession();
    const [profileData, setProfileData] = useState<User | null>(null);
    const [savedJobs, setSavedJobs] = useState<Job[]>([]);
    const [applications, setApplications] = useState<ExtendedApplication[]>([]);
    const [hasActiveSubscription, setHasActiveSubscription] = useState(false);
    const [activePlan, setActivePlan] = useState<string | null>(null);
    const [subscriptionEndDate, setSubscriptionEndDate] = useState<string | null>(null);

    useEffect(() => {
        const fetchProfileData = async () => {
            if (session.isLoggedIn && session.user) {
                try {
                    const userProfile = await getUserById(session.user.id);
                    if (userProfile) {
                        setProfileData(userProfile);
                        
                        // Fetch saved jobs details
                        if (userProfile.savedJobIds && userProfile.savedJobIds.length > 0) {
                            const jobPromises = userProfile.savedJobIds.map(id => getJobById(id));
                            const resolvedJobs = (await Promise.all(jobPromises)).filter((job): job is Job => job !== null);
                            setSavedJobs(resolvedJobs);
                        } else {
                            setSavedJobs([]);
                        }

                        // Fetch applications
                        const userApplications = await getApplicationsByUserId(session.user.id);
                        setApplications(userApplications);

                        // Check subscription status
                        if (userProfile.subscriptionPlan && userProfile.subscriptionUntil) {
                            const endDate = new Date(userProfile.subscriptionUntil);
                            if (endDate > new Date()) {
                                setHasActiveSubscription(true);
                                setActivePlan(userProfile.subscriptionPlan);
                                setSubscriptionEndDate(endDate.toLocaleDateString('es-AR', { year: 'numeric', month: 'long', day: 'numeric' }));
                            } else {
                                setHasActiveSubscription(false);
                                setActivePlan(null);
                                setSubscriptionEndDate(null);
                            }
                        } else {
                             setHasActiveSubscription(false);
                             setActivePlan(null);
                             setSubscriptionEndDate(null);
                        }
                    }
                } catch(e){
                   console.error("Failed to fetch user profile", e);
                   setProfileData(null);
                   setSavedJobs([]);
                   setApplications([]);
                }
            } else {
                setProfileData(null);
                setSavedJobs([]);
                setApplications([]);
                setHasActiveSubscription(false);
                setActivePlan(null);
                setSubscriptionEndDate(null);
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
            setProfileData(updatedUser);
            // Re-fetch job details
            const jobPromises = updatedSavedJobIds.map(id => getJobById(id));
            const resolvedJobs = (await Promise.all(jobPromises)).filter((j): j is Job => j !== null);
            setSavedJobs(resolvedJobs);
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
                setApplications(prev => [...prev, newApplication]);
            }
        } catch(e){
            console.error("Failed to create application", e);
        }
    }, [profileData, applications]);

    return (
        <UserProfileContext.Provider value={{ profileData, setProfileData, savedJobs, handleSaveJob, handleApplyForJob, applications, hasActiveSubscription, activePlan, subscriptionEndDate }}>
            {children}
        </UserProfileContext.Provider>
    );
};
