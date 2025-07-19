
'use client';

import React, { createContext, useState, useCallback, ReactNode } from 'react';
import type { UserApplication, UserProfileData } from '@/lib/types';
import { useSession } from '@/hooks/use-session';
import type { Job as PrismaJob } from '@prisma/client';
import { allJobs as staticJobs } from '@/data/jobs';

// Datos iniciales del perfil
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
    savedJobs: staticJobs.filter(job => ['5', '3'].includes(job.id)),
    stats: {
        profileViews: 128,
        interviews: 3,
        savedJobs: 2,
    }
};


interface UserProfileContextType {
    profileData: UserProfileData | null;
    savedJobs: PrismaJob[];
    handleSaveJob: (job: PrismaJob) => void;
    handleApplyForJob: (job: PrismaJob) => void;
}

export const UserProfileContext = createContext<UserProfileContextType>({
    profileData: null,
    savedJobs: [],
    handleSaveJob: () => {},
    handleApplyForJob: () => {},
});

export const UserProfileProvider = ({ children }: { children: ReactNode }) => {
    const { session } = useSession();
    const [profileData, setProfileData] = useState<UserProfileData | null>(initialProfileData);
    const [savedJobs, setSavedJobs] = useState<PrismaJob[]>(initialProfileData.savedJobs as any);

    const handleSaveJob = useCallback((job: PrismaJob) => {
        setSavedJobs(prevSavedJobs => {
            const isAlreadySaved = prevSavedJobs.some(savedJob => savedJob.id === job.id);
            if (isAlreadySaved) {
                return prevSavedJobs.filter(savedJob => savedJob.id !== job.id);
            } else {
                return [...prevSavedJobs, job];
            }
        });
    }, []);

    const handleApplyForJob = useCallback((job: PrismaJob) => {
        const newApplication: UserApplication = {
            id: job.id,
            title: job.title,
            company: job.company,
            status: 'En revisión'
        };

        setProfileData(prevData => {
            if (!prevData) return null;

            // Evitar duplicados
            const alreadyApplied = prevData.applications.some(app => app.id === newApplication.id);
            if (alreadyApplied) return prevData;

            return {
                ...prevData,
                applications: [newApplication, ...prevData.applications],
            };
        });
    }, []);
    
    // Sincronizar el estado del perfil con los trabajos guardados
    React.useEffect(() => {
        if(profileData){
            setProfileData(prevData => ({
                ...prevData!,
                savedJobs: savedJobs as any,
                stats: {
                    ...prevData!.stats,
                    savedJobs: savedJobs.length
                }
            }));
        }
    }, [savedJobs, profileData]);

    // En una aplicación real, aquí se haría un fetch de los datos del perfil del usuario
    // cuando la sesión se cargue.
    // useEffect(() => {
    //     if (session.isLoggedIn) {
    //         // fetchProfileData(session.user.id).then(data => setProfileData(data));
    //         setProfileData(initialProfileData);
    //         setSavedJobs(initialProfileData.savedJobs);
    //     }
    // }, [session.isLoggedIn]);


    return (
        <UserProfileContext.Provider value={{ profileData, savedJobs, handleSaveJob, handleApplyForJob }}>
            {children}
        </UserProfileContext.Provider>
    );
};
