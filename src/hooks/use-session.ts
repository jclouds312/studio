
'use client';

import { useState, useEffect, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { useToast } from '@/hooks/use-toast';
import { getUserByEmail, createUser } from '@/services/userService';
import type { User } from '@prisma/client';

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

type SocialProvider = 'google' | 'facebook' | 'microsoft';

export function useSession() {
    const router = useRouter();
    const { toast } = useToast();
    const [session, setSession] = useState<Session>({
        isLoggedIn: false,
        user: null,
        isMounted: false,
    });

    useEffect(() => {
        const checkSession = async () => {
            try {
                const loggedInStatus = localStorage.getItem('isLoggedIn') === 'true';
                const userEmail = localStorage.getItem('userEmail');
                if (loggedInStatus && userEmail) {
                    const currentUser = await getUserByEmail(userEmail);
                    if (currentUser) {
                        setSession({ isLoggedIn: true, user: currentUser, isMounted: true });
                    } else {
                        localStorage.removeItem('isLoggedIn');
                        localStorage.removeItem('userEmail');
                        setSession({ isLoggedIn: false, user: null, isMounted: true });
                    }
                } else {
                    setSession({ isLoggedIn: false, user: null, isMounted: true });
                }
            } catch (error) {
                console.error("Could not access localStorage or fetch user.", error);
                setSession({ isLoggedIn: false, user: null, isMounted: true });
            }
        };
        checkSession();
    }, []);

    const performLogin = useCallback((user: User) => {
        try {
            localStorage.setItem('isLoggedIn', 'true');
            localStorage.setItem('userEmail', user.email);
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

    const register = useCallback(async (data: RegisterData) => {
        const existingUser = await getUserByEmail(data.email);
        if (existingUser) {
            toast({
                title: "Error de Registro",
                description: "Este correo electrónico ya está en uso.",
                variant: "destructive",
            });
            return;
        }

        const newUser = await createUser({
            name: data.name,
            email: data.email,
            password: data.password, // In a real app, hash this password!
            role: data.role,
            status: 'VERIFICADO',
        });
        
        toast({
            title: "¡Registro Exitoso!",
            description: "Tu cuenta ha sido creada.",
        });
        performLogin(newUser);
    }, [performLogin, toast]);
    
    const loginWithSocial = useCallback(async (provider: SocialProvider, role: 'user' | 'company' = 'user') => {
        const simulatedEmail = `user.${provider}@example.com`;
        
        let user = await getUserByEmail(simulatedEmail);

        if (user) {
            performLogin(user);
        } else {
            const simulatedName = `Usuario de ${provider.charAt(0).toUpperCase() + provider.slice(1)}`;
            const newUser = await createUser({
                name: simulatedName,
                email: simulatedEmail,
                role: role,
                status: 'VERIFICADO',
                password: 'social-login',
            });
            performLogin(newUser);
        }
    }, [performLogin]);

    const login = useCallback(async (email: string, password?: string) => {
        const user = await getUserByEmail(email);
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
            setSession({ isLoggedIn: false, user: null, isMounted: true });
            toast({ title: 'Has cerrado sesión exitosamente.' });
            router.push('/login');
        } catch (error) {
            console.error("Could not access localStorage.", error);
        }
    }, [router, toast]);

    return { session, login, loginWithSocial, register, logout };
}
