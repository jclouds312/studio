
'use client';

import React, { createContext, useState, useCallback, ReactNode, useEffect } from 'react';
import type { UserApplication, UserProfileData } from '@/lib/types';
import type { Job } from '@prisma/client';
import { useSession } from '@/hooks/use-session';
import { allJobs as staticJobs } from '@/data/jobs';

// Define the shape of the context
interface UserProfileContextType {
    profileData: UserProfileData | null;
    savedJobs: Job[];
    handleSaveJob: (job: Job) => void;
    handleApplyForJob: (job: Job) => void;
}

// Create the context with a default value
export const UserProfileContext = createContext<UserProfileContextType>({
    profileData: null,
    savedJobs: [],
    handleSaveJob: () => {},
    handleApplyForJob: () => {},
});

// Create the provider component
export const UserProfileProvider = ({ children }: { children: ReactNode }) => {
    const { session } = useSession();
    const [profileData, setProfileData] = useState<UserProfileData | null>(null);

    useEffect(() => {
        // Here you would fetch the user's profile data from your database
        // For now, we'll use and initialize mock data when the session is loaded
        if (session.isLoggedIn && session.user) {
            // TODO: Replace with API call to get user profile
            const initialProfileData: UserProfileData = {
                avatarUrl: 'https://placehold.co/128x128.png',
                phone: '+54 9 11 1234-5678',
                location: 'Buenos Aires, CABA',
                professionalSummary: 'Desarrollador Full-Stack con más de 5 años de experiencia en la creación de aplicaciones web escalables. Apasionado por las tecnologías modernas y el diseño centrado en el usuario.',
                experience: '- Frontend Developer en Tech Solutions Inc. (2020-Actualidad)\n- Junior Developer en Creative Minds (2018-2020)',
                applications: [
                    { id: '1', title: 'Frontend Developer (React)', company: 'Tech Solutions Inc.', status: 'En revisión' },
                    { id: '2', title: 'Diseñador/a UX/UI Sr.', company: 'Creative Minds', status: 'Rechazado' },
                    { id: '6', title: 'Pintor de Interiores', company: 'Servicios Varios', status: 'Contactado' },
                ],
                savedJobs: staticJobs.filter(job => ['5', '3'].includes(job.id)) as Job[],
                stats: {
                    profileViews: 128,
                    interviews: 3,
                }
            };
            setProfileData(initialProfileData);
        } else {
            setProfileData(null);
        }
    }, [session.isLoggedIn, session.user]);


    const handleSaveJob = useCallback((job: Job) => {
        setProfileData(prevData => {
            if (!prevData) return null;

            const isAlreadySaved = prevData.savedJobs.some(savedJob => savedJob.id === job.id);
            let updatedSavedJobs;

            if (isAlreadySaved) {
                updatedSavedJobs = prevData.savedJobs.filter(savedJob => savedJob.id !== job.id);
            } else {
                updatedSavedJobs = [...prevData.savedJobs, job];
            }

            return {
                ...prevData,
                savedJobs: updatedSavedJobs,
            };
        });
    }, []);

    const handleApplyForJob = useCallback((job: Job) => {
        setProfileData(prevData => {
            if (!prevData) return null;

            const alreadyApplied = prevData.applications.some(app => app.id === job.id);
            if (alreadyApplied) return prevData;

            const newApplication: UserApplication = {
                id: job.id,
                title: job.title,
                company: job.company,
                status: 'En revisión'
            };

            return {
                ...prevData,
                applications: [newApplication, ...prevData.applications],
            };
        });
    }, []);

    const savedJobs = profileData?.savedJobs || [];

    return (
        <UserProfileContext.Provider value={{ profileData, savedJobs, handleSaveJob, handleApplyForJob }}>
            {children}
        </UserProfileContext.Provider>
    );
};
