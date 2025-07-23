
'use server';

import type { User } from '@prisma/client';
import { fetchFromPrisma } from './prismaProxy';

export async function getAllUsers(): Promise<User[]> {
    return fetchFromPrisma('user', 'findMany', {});
}

export async function getUserById(id: string): Promise<User | null> {
    return fetchFromPrisma('user', 'findUnique', { where: { id } });
}

export async function getUserByEmail(email: string): Promise<User | null> {
    return fetchFromPrisma('user', 'findUnique', { where: { email } });
}

export async function createUser(data: Partial<Omit<User, 'id' | 'createdAt' | 'updatedAt'>>): Promise<User> {
    const roleMap = {
        'user': 'TRABAJADOR',
        'worker': 'TRABAJADOR',
        'company': 'EMPRESA',
        'admin': 'ADMIN'
    }

    // @ts-ignore
    const mappedRole = roleMap[data.role] || 'TRABAJADOR';

    const createData = {
        name: data.name!,
        email: data.email!,
        password: data.password, // In a real app, hash this!
        role: mappedRole,
        avatar: data.avatar || 'https://placehold.co/40x40.png',
        status: data.status || 'VERIFICADO',
        savedJobIds: JSON.stringify(data.savedJobIds || []),
    };

    return fetchFromPrisma('user', 'create', { data: createData });
}

export async function updateUser(id: string, data: Partial<Omit<User, 'id'>>): Promise<User | null> {
    try {
        const dataToUpdate = { ...data };
        if (data.savedJobIds && Array.isArray(data.savedJobIds)) {
            dataToUpdate.savedJobIds = JSON.stringify(data.savedJobIds);
        }

        return await fetchFromPrisma('user', 'update', {
            where: { id },
            data: dataToUpdate,
        });
    } catch (error) {
        console.error("Error updating user:", error);
        return null;
    }
}

export async function deleteUser(id: string): Promise<boolean> {
    try {
        await fetchFromPrisma('user', 'delete', { where: { id } });
        return true;
    } catch (error) {
        console.error("Error deleting user:", error);
        return false;
    }
}
