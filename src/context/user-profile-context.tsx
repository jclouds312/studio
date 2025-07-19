
'use client';

import React, { createContext, useState, useCallback, ReactNode, useEffect } from 'react';
import type { UserApplication, UserProfileData } from '@/lib/types';
import type { Job, User } from '@prisma/client';
import { useSession } from '@/hooks/use-session';

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
    const [savedJobs, setSavedJobs] = useState<Job[]>([]);

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
                    { id: '1', title: 'Frontend Developer', company: 'Tech Solutions Inc.', status: 'En revisión' },
                    { id: '2', title: 'Diseñador/a UX/UI', company: 'Creative Minds', status: 'Rechazado' },
                    { id: '3', title: 'Pintor de Interiores', company: 'Servicios Varios', status: 'Contactado' },
                ],
                stats: {
                    profileViews: 128,
                    interviews: 3,
                    savedJobs: 2,
                }
            };
            setProfileData(initialProfileData);
            
            // TODO: Replace with API call to get saved jobs
            // setSavedJobs(staticJobs.filter(job => ['5', '3'].includes(job.id)));
        } else {
            setProfileData(null);
            setSavedJobs([]);
        }
    }, [session.isLoggedIn, session.user]);


    const handleSaveJob = useCallback((job: Job) => {
        setSavedJobs(prevSavedJobs => {
            const isAlreadySaved = prevSavedJobs.some(savedJob => savedJob.id === job.id);
            if (isAlreadySaved) {
                return prevSavedJobs.filter(savedJob => savedJob.id !== job.id);
            } else {
                return [...prevSavedJobs, job];
            }
        });
    }, []);

    const handleApplyForJob = useCallback((job: Job) => {
        const newApplication: UserApplication = {
            id: job.id,
            title: job.title,
            company: job.company,
            status: 'En revisión'
        };

        setProfileData(prevData => {
            if (!prevData) return null;

            const alreadyApplied = prevData.applications.some(app => app.id === newApplication.id);
            if (alreadyApplied) return prevData;

            return {
                ...prevData,
                applications: [newApplication, ...prevData.applications],
            };
        });
    }, []);

    return (
        <UserProfileContext.Provider value={{ profileData, savedJobs, handleSaveJob, handleApplyForJob }}>
            {children}
        </UserProfileContext.Provider>
    );
};
