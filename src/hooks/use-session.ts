
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
                if (currentUser) {
                    setSession({ isLoggedIn: true, user: currentUser, isMounted: true });
                } else {
                    // If user is not in our static list but was logged in, log them out.
                    localStorage.removeItem('isLoggedIn');
                    localStorage.removeItem('userEmail');
                    setSession({ isLoggedIn: false, user: null, isMounted: true });
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
        // Simulate getting a unique email from the social provider
        const simulatedEmail = `${provider}-${role}-${Math.floor(Math.random() * 10000)}@example.com`;
        const simulatedName = `${provider.charAt(0).toUpperCase() + provider.slice(1)} ${role.charAt(0).toUpperCase() + role.slice(1)}`;

        let user = allUsers.find(u => u.email.toLowerCase() === simulatedEmail.toLowerCase());

        if (user) {
            // User exists, log them in (unlikely in this simulation, but good practice)
            performLogin(user);
        } else {
            // User does not exist, register them
            toast({
                title: "Creando cuenta nueva...",
                description: `Registrando con tu cuenta de ${provider}.`,
            });
            const newUser: User = {
                id: String(Date.now()),
                name: simulatedName,
                email: simulatedEmail,
                role: role,
                avatar: 'https://placehold.co/40x40.png',
                status: 'Verificado',
                createdAt: new Date().toISOString().split('T')[0],
            };
            allUsers.push(newUser);
            performLogin(newUser);
        }
    }, [performLogin, toast]);

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
            setSession({ isLoggedIn: false, user: null, isMounted: true });
            toast({ title: 'Has cerrado sesión exitosamente.' });
            router.push('/login');
        } catch (error) {
            console.error("Could not access localStorage.", error);
        }
    }, [router, toast]);

    return { session, login, loginWithSocial, register, logout };
}
