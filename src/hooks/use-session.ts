
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
        if (!user) return;
        if (user.role === 'EMPRESA') {
            router.push('/company/dashboard');
        } else if (user.role === 'ADMIN') {
            router.push('/admin');
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
        // The redirect is now handled by the useEffect below
    }, [toast, session.firebaseUser]);
    
    useEffect(() => {
        if(session.isLoggedIn && session.user) {
            performRedirect(session.user);
        }
    }, [session.isLoggedIn, session.user, performRedirect]);

    useEffect(() => {
        // Only run if auth is initialized
        if (!auth) {
            setSession(prev => ({ ...prev, isMounted: true }));
            return;
        }
        
        const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
            if (firebaseUser) {
                const appUser = await getUserByEmail(firebaseUser.email!);
                if (appUser) {
                    setSession({ isLoggedIn: true, user: appUser, firebaseUser, isMounted: true });
                } else {
                    setSession({ isLoggedIn: false, user: null, firebaseUser: null, isMounted: true });
                }
            } else {
                setSession({ isLoggedIn: false, user: null, firebaseUser: null, isMounted: true });
            }
        });

        return () => unsubscribe();
    }, []);

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
                description: "La autenticación no está configurada. Contacta al administrador.",
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
                title: "Error de autenticación",
                description: "No se pudo iniciar sesión. Por favor, intenta de nuevo.",
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

    const loginWithMicrosoft = useCallback((role: Role = 'TRABAJADOR') => {
        const provider = new OAuthProvider('microsoft.com');
        socialLogin(provider, role);
    }, [socialLogin]);

    const logout = useCallback(async () => {
        if (auth) {
            await signOut(auth);
        }
        setSession({ isLoggedIn: false, user: null, firebaseUser: null, isMounted: true });
        toast({ title: 'Has cerrado sesión exitosamente.' });
        router.push('/login');
    }, [router, toast]);

    return { session, login, loginWithGoogle, loginWithFacebook, loginWithMicrosoft, register, logout };
}
