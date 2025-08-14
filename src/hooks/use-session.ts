
'use client';

import { useState, useEffect, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { useToast } from '@/hooks/use-toast';
import { getUserByEmail, createUser } from '@/services/userService';
import type { User, Role } from '@prisma/client';
import { GoogleAuthProvider, FacebookAuthProvider, OAuthProvider, signInWithPopup, onAuthStateChanged, signOut, User as FirebaseUser } from 'firebase/auth';
import { auth } from '@/lib/firebase/config';

interface Session {
    isLoggedIn: boolean;
    user: User | null;
    firebaseUser: FirebaseUser | null;
    isMounted: boolean;
}

interface RegisterData {
    name: string;
    email: string;
    password?: string;
    role: Role;
}

export function useSession() {
    const router = useRouter();
    const { toast } = useToast();
    const [session, setSession] = useState<Session>({
        isLoggedIn: false,
        user: null,
        firebaseUser: null,
        isMounted: false,
    });

    const performRedirect = useCallback((user: User | null) => {
        if (!user) {
            router.push('/login');
            return;
        }
        if (user.role === 'ADMIN') {
            router.push('/admin');
        } else if (user.role === 'EMPRESA') {
            router.push('/company/dashboard');
        } else {
            router.push('/');
        }
    }, [router]);

    const performLogin = useCallback((appUser: User, firebaseUser?: FirebaseUser) => {
        setSession({
            isLoggedIn: true,
            user: appUser,
            firebaseUser: firebaseUser || session.firebaseUser,
            isMounted: true,
        });
        toast({ title: `¡Bienvenido, ${appUser.name}!` });
        performRedirect(appUser);
    }, [toast, session.firebaseUser, performRedirect]);

    const handleUserSession = useCallback(async (firebaseUser: FirebaseUser | null) => {
        if (!auth) {
            setSession(prev => ({ ...prev, isMounted: true }));
            return;
        }
        if (firebaseUser) {
            const appUser = await getUserByEmail(firebaseUser.email!);
            if (appUser) {
                 setSession({ isLoggedIn: true, user: appUser, firebaseUser, isMounted: true });
            } else {
                // If user is authenticated with Firebase but not in our DB, log them out from Firebase
                // This case happens if DB is cleared but Firebase session persists.
                await signOut(auth);
                setSession({ isLoggedIn: false, user: null, firebaseUser: null, isMounted: true });
            }
        } else {
            setSession({ isLoggedIn: false, user: null, firebaseUser: null, isMounted: true });
        }
    }, []);

    useEffect(() => {
        if (!auth) {
            console.warn("Firebase Auth is not initialized. Skipping session check.");
            setSession(prev => ({ ...prev, isMounted: true }));
            return;
        }
        const unsubscribe = onAuthStateChanged(auth, handleUserSession);
        return () => unsubscribe();
    }, [handleUserSession]);

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
            password: data.password,
            role: data.role,
        });
        
        toast({
            title: "¡Registro Exitoso!",
            description: "Tu cuenta ha sido creada.",
        });
        performLogin(newUser);
    }, [performLogin, toast]);
    
    const socialLogin = useCallback(async (provider: GoogleAuthProvider | FacebookAuthProvider | OAuthProvider, role: Role) => {
        if (!auth) {
            toast({
                title: "Servicio no disponible",
                description: "La autenticación no está configurada.",
                variant: "destructive",
            });
            return;
        }
        try {
            const result = await signInWithPopup(auth, provider);
            const firebaseUser = result.user;

            let appUser = await getUserByEmail(firebaseUser.email!);

            if (appUser) {
                performLogin(appUser, firebaseUser);
            } else {
                const newUser = await createUser({
                    name: firebaseUser.displayName || 'Nuevo Usuario',
                    email: firebaseUser.email!,
                    role: role,
                    password: 'social-login',
                    avatar: firebaseUser.photoURL,
                });
                performLogin(newUser, firebaseUser);
            }
        } catch (error) {
            console.error("Error during social sign-in:", error);
            toast({
                title: "Error de autenticación social",
                description: "No se pudo completar el inicio de sesión. Intenta de nuevo.",
                variant: "destructive",
            });
        }
    }, [performLogin, toast]);


    const loginWithGoogle = useCallback((role: Role = 'TRABAJADOR') => {
        const provider = new GoogleAuthProvider();
        socialLogin(provider, role);
    }, [socialLogin]);

    const loginWithFacebook = useCallback((role: Role = 'TRABAJADOR') => {
        const provider = new FacebookAuthProvider();
        socialLogin(provider, role);
    }, [socialLogin]);

    const loginWithMercadoPago = useCallback(async (role: Role = 'TRABAJADOR') => {
        // This is a simulated login as Firebase does not have a native MP provider.
        const mockEmail = `user.mp.${Date.now()}@example.com`;
        const mockName = 'Usuario de Mercado Pago';
        
        let appUser = await getUserByEmail(mockEmail);
        if (!appUser) {
            appUser = await createUser({
                name: mockName,
                email: mockEmail,
                role: role,
                password: 'social-login',
                avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=40&h=40&fit=crop'
            });
        }
        performLogin(appUser);
    }, [performLogin]);


    const logout = useCallback(async () => {
        if (auth && auth.currentUser) {
            await signOut(auth);
        }
        setSession({ isLoggedIn: false, user: null, firebaseUser: null, isMounted: true });
        router.push('/login');
        toast({ title: 'Has cerrado sesión exitosamente.' });
    }, [router, toast]);

    return { session, login, loginWithGoogle, loginWithFacebook, loginWithMercadoPago, register, logout };
}
