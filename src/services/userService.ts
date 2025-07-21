
'use server';

import type { User, Job } from '@prisma/client';
import { allUsers as staticUsers } from '@/data/users';
import { allCompanies } from '@/data/companies';

// Simulate a database connection by using static data
let users: User[] = staticUsers.map(u => {
    const company = allCompanies.find(c => c.name === u.name);
    const user: Partial<User> = {
        ...u,
        id: u.id,
        createdAt: new Date(u.createdAt),
        updatedAt: new Date(),
        emailVerified: u.status === 'Verificado' ? new Date() : null,
        companyProfileId: company?.id ?? null,
    };
    return user as User;
});


export async function getAllUsers(): Promise<User[]> {
    return Promise.resolve(users);
}

export async function getUserById(id: string): Promise<User | null> {
    const user = users.find(u => u.id === id);
    if (!user) return null;
    return Promise.resolve(JSON.parse(JSON.stringify(user)));
}

export async function getUserByEmail(email: string): Promise<User | null> {
    const user = users.find(u => u.email === email);
    if (!user) return null;
    return Promise.resolve(JSON.parse(JSON.stringify(user)));
}

export async function createUser(data: Partial<Omit<User, 'id' | 'createdAt' | 'updatedAt'>>): Promise<User> {
    const newUser: User = {
        id: String(Date.now()),
        createdAt: new Date(),
        updatedAt: new Date(),
        emailVerified: null,
        phone: null,
        location: null,
        professionalSummary: null,
        experience: null,
        avatar: 'https://placehold.co/40x40.png',
        savedJobIds: [],
        status: 'VERIFICADO', // Default status for new users
        companyProfileId: null,
        subscriptionPlan: null,
        subscriptionUntil: null,
        ...data,
        name: data.name || '',
        email: data.email || '',
        password: data.password || '',
        role: data.role || 'user',
    };
    users.push(newUser);
    return Promise.resolve(JSON.parse(JSON.stringify(newUser)));
}

export async function updateUser(id: string, data: Partial<Omit<User, 'id'>>): Promise<User | null> {
    const userIndex = users.findIndex(u => u.id === id);
    if (userIndex === -1) return null;

    const updatedUser = { ...users[userIndex], ...data, updatedAt: new Date() };
    users[userIndex] = updatedUser as User;
    return Promise.resolve(JSON.parse(JSON.stringify(updatedUser)));
}

export async function deleteUser(id: string): Promise<boolean> {
    const initialLength = users.length;
    users = users.filter(u => u.id !== id);
    return Promise.resolve(users.length < initialLength);
}

    