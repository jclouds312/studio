
'use client';

import { useState, useEffect, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { useToast } from '@/hooks/use-toast';
import { allUsers } from '@/lib/data';
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
                setSession({ isLoggedIn: true, user: currentUser, isMounted: true });
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
    
    const loginWithSocial = useCallback((email: string) => {
        const user = allUsers.find(u => u.email.toLowerCase() === email.toLowerCase());
        if (user) {
            performLogin(user);
        } else {
            toast({
                title: "Error de autenticación",
                description: "No se pudo iniciar sesión con esta cuenta social.",
                variant: "destructive",
            });
        }
    }, [performLogin, toast]);

    const register = useCallback((data: RegisterData) => {
        // En una app real, aquí se llamaría a una API para crear el usuario.
        // Por ahora, lo simulamos y hacemos login.
        const newUser: User = {
            id: String(allUsers.length + 1),
            ...data,
            avatar: 'https://placehold.co/40x40.png',
            status: 'Verificado',
            createdAt: new Date().toISOString().split('T')[0],
        };
        
        // En un prototipo, no podemos realmente agregar el usuario a la lista `allUsers`
        // porque los módulos se recargan. En su lugar, lo pasamos directamente al login.
        
        toast({
            title: "¡Registro Exitoso!",
            description: "Tu cuenta ha sido creada.",
        });
        performLogin(newUser);
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
