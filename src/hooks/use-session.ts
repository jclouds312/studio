
'use client';

import { useState, useEffect, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { useToast } from '@/hooks/use-toast';
import { allUsers } from '@/data';
import type { User } from '@/lib/types';

interface Session {
    isLoggedIn: boolean;
    user: User | null;
    isMounted: boolean;
}

interface RegisterData {
    name: string;
    email: string;
    password?: string;
    role: 'user' | 'company' | 'admin';
}

// SIMULATED SOCIAL PROFILES
const socialProfiles = {
    google: {
        name: 'Usuario de Google',
        email: 'g-user-12345@example.com',
        role: 'user'
    },
    facebook: {
        name: 'Usuario de Facebook',
        email: 'fb-user-67890@example.com',
        role: 'user'
    },
    microsoft: {
        name: 'Usuario de Microsoft',
        email: 'ms-user-13579@example.com',
        role: 'user'
    },
    google_company: {
        name: 'Empresa de Google',
        email: 'g-company-12345@example.com',
        role: 'company'
    },
    facebook_company: {
        name: 'Empresa de Facebook',
        email: 'fb-company-67890@example.com',
        role: 'company'
    },
    microsoft_company: {
        name: 'Empresa de Microsoft',
        email: 'ms-company-13579@example.com',
        role: 'company'
    }
}

export function useSession() {
    const router = useRouter();
    const { toast } = useToast();
    const [session, setSession] = useState<Session>({
        isLoggedIn: false,
        user: null,
        isMounted: false,
    });

    useEffect(() => {
        try {
            const loggedInStatus = localStorage.getItem('isLoggedIn') === 'true';
            const userEmail = localStorage.getItem('userEmail');
            if (loggedInStatus && userEmail) {
                const currentUser = allUsers.find(u => u.email.toLowerCase() === userEmail.toLowerCase()) || null;
                if (!currentUser) {
                     // This could happen if our "DB" changes. Let's create the user.
                    const tempUser = JSON.parse(localStorage.getItem('tempUser') || '{}');
                    if(tempUser.email === userEmail) {
                         allUsers.push(tempUser);
                         setSession({ isLoggedIn: true, user: tempUser, isMounted: true });
                    } else {
                        // Can't find user, log out
                        localStorage.removeItem('isLoggedIn');
                        localStorage.removeItem('userEmail');
                        localStorage.removeItem('tempUser');
                        setSession({ isLoggedIn: false, user: null, isMounted: true });
                    }
                } else {
                    setSession({ isLoggedIn: true, user: currentUser, isMounted: true });
                }
            } else {
                setSession({ isLoggedIn: false, user: null, isMounted: true });
            }
        } catch (error) {
            console.error("Could not access localStorage.", error);
            setSession({ isLoggedIn: false, user: null, isMounted: true });
        }
    }, []);

    const performLogin = useCallback((user: User) => {
        try {
            localStorage.setItem('isLoggedIn', 'true');
            localStorage.setItem('userEmail', user.email);
            // Store a temporary user object in case it's a new social user not yet in our static `allUsers` array
            if (!allUsers.find(u => u.email === user.email)) {
                 localStorage.setItem('tempUser', JSON.stringify(user));
            } else {
                 localStorage.removeItem('tempUser');
            }

            setSession({ isLoggedIn: true, user, isMounted: true });
            toast({ title: `¡Bienvenido, ${user.name}!` });
            
            if (user.role === 'company') {
                router.push('/company/dashboard');
            } else if (user.role === 'admin') {
                router.push('/admin');
            } else {
                router.push('/');
            }
        } catch (error) {
            console.error("Could not access localStorage.", error);
        }
    }, [router, toast]);

    const register = useCallback((data: RegisterData) => {
        const existingUser = allUsers.find(u => u.email.toLowerCase() === data.email.toLowerCase());
        if (existingUser) {
            toast({
                title: "Error de Registro",
                description: "Este correo electrónico ya está en uso.",
                variant: "destructive",
            });
            return;
        }

        const newUser: User = {
            id: String(Date.now()),
            ...data,
            avatar: 'https://placehold.co/40x40.png',
            status: 'Verificado',
            createdAt: new Date().toISOString().split('T')[0],
        };
        
        allUsers.push(newUser); // Add to our in-memory "database"
        
        toast({
            title: "¡Registro Exitoso!",
            description: "Tu cuenta ha sido creada.",
        });
        performLogin(newUser);
    }, [performLogin, toast]);
    
    const loginWithSocial = useCallback((provider: 'google' | 'facebook' | 'microsoft', role: 'user' | 'company' = 'user') => {
        const profileKey = role === 'company' ? `${provider}_company` : provider;
        const simulatedProfile = socialProfiles[profileKey];
        
        let user = allUsers.find(u => u.email.toLowerCase() === simulatedProfile.email.toLowerCase());

        if (user) {
            // User exists, log them in
            performLogin(user);
        } else {
            // User does not exist, register them
            toast({
                title: "Creando cuenta nueva...",
                description: `Registrando con tu cuenta de ${provider}.`,
            });
            register({
                name: simulatedProfile.name,
                email: simulatedProfile.email,
                role: simulatedProfile.role as 'user' | 'company',
            });
        }
    }, [performLogin, register, toast]);

    const login = useCallback((email: string, password?: string) => {
        const user = allUsers.find(u => u.email.toLowerCase() === email.toLowerCase());
        if (user && user.password === password) {
            performLogin(user);
        } else {
            toast({
                title: "Error de autenticación",
                description: "El email o la contraseña son incorrectos.",
                variant: "destructive",
            });
        }
    }, [performLogin, toast]);

    const logout = useCallback(() => {
        try {
            localStorage.removeItem('isLoggedIn');
            localStorage.removeItem('userEmail');
            localStorage.removeItem('tempUser');
            setSession({ isLoggedIn: false, user: null, isMounted: true });
            toast({ title: 'Has cerrado sesión exitosamente.' });
            router.push('/login');
        } catch (error) {
            console.error("Could not access localStorage.", error);
        }
    }, [router, toast]);

    return { session, login, loginWithSocial, register, logout };
}
