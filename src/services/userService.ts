
'use server';

import type { User } from '@prisma/client';
import { allUsers } from '@/data/users';

// This service uses static data for now.
// It can be updated to use Prisma later.

export async function getAllUsers(): Promise<User[]> {
    return Promise.resolve(allUsers as User[]);
}

export async function getUserById(id: string): Promise<User | null> {
    const user = allUsers.find(u => u.id === id) || null;
    return Promise.resolve(user as User | null);
}

export async function createUser(data: Omit<User, 'id' | 'createdAt' | 'updatedAt' | 'emailVerified'>): Promise<User> {
    const newUser: User = {
        ...data,
        id: String(Date.now()),
        createdAt: new Date(),
        updatedAt: new Date(),
        emailVerified: null,
    };
    allUsers.push(newUser);
    return Promise.resolve(newUser);
}

export async function updateUser(id: string, data: Partial<Omit<User, 'id'>>): Promise<User | null> {
    const userIndex = allUsers.findIndex(u => u.id === id);
    if (userIndex === -1) return null;

    const updatedUser = { ...allUsers[userIndex], ...data, updatedAt: new Date() };
    allUsers[userIndex] = updatedUser;
    return Promise.resolve(updatedUser as User);
}

export async function deleteUser(id: string): Promise<boolean> {
    const initialLength = allUsers.length;
    const filteredUsers = allUsers.filter(u => u.id !== id);
    allUsers.length = 0;
    Array.prototype.push.apply(allUsers, filteredUsers);
    return Promise.resolve(allUsers.length < initialLength);
}
