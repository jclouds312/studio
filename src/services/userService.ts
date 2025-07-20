
'use server';

import type { User, Job } from '@prisma/client';
import { allUsers as staticUsers } from '@/data/users';
import { allCompanies } from '@/data/companies';

// Simulate a database connection by using static data
let users: User[] = staticUsers.map(u => {
    const company = allCompanies.find(c => c.name === u.name);
    return {
        ...u,
        companyProfileId: company?.id ?? null,
    }
}) as User[];

export async function getAllUsers(): Promise<User[]> {
    return Promise.resolve(users);
}

export async function getUserById(id: string): Promise<User | null> {
    const user = users.find(u => u.id === id);
    return Promise.resolve(user || null);
}

export async function getUserByEmail(email: string): Promise<User | null> {
    const user = users.find(u => u.email === email);
    return Promise.resolve(user || null);
}

export async function createUser(data: Omit<User, 'id' | 'createdAt' | 'updatedAt' | 'emailVerified' | 'phone' | 'location' | 'professionalSummary' | 'experience' | 'avatar' | 'savedJobIds' | 'status' | 'companyProfileId'> & { status?: string | null }): Promise<User> {
    const newUser: User = {
        ...data,
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
    };
    users.push(newUser);
    return Promise.resolve(newUser);
}

export async function updateUser(id: string, data: Partial<Omit<User, 'id'>>): Promise<User | null> {
    const userIndex = users.findIndex(u => u.id === id);
    if (userIndex === -1) return null;

    const updatedUser = { ...users[userIndex], ...data, updatedAt: new Date() };
    users[userIndex] = updatedUser as User;
    return Promise.resolve(updatedUser as User);
}

export async function deleteUser(id: string): Promise<boolean> {
    const initialLength = users.length;
    users = users.filter(u => u.id !== id);
    return Promise.resolve(users.length < initialLength);
}
