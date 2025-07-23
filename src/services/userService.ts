
'use server';

import prisma from '@/lib/prisma';
import type { User } from '@prisma/client';

export async function getAllUsers(): Promise<User[]> {
    return prisma.user.findMany();
}

export async function getUserById(id: string): Promise<User | null> {
    return prisma.user.findUnique({ where: { id } });
}

export async function getUserByEmail(email: string): Promise<User | null> {
    return prisma.user.findUnique({ where: { email } });
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

    return prisma.user.create({
        data: {
            name: data.name!,
            email: data.email!,
            password: data.password, // In a real app, hash this!
            role: mappedRole,
            avatar: data.avatar || 'https://placehold.co/40x40.png',
            status: data.status || 'VERIFICADO',
        }
    });
}

export async function updateUser(id: string, data: Partial<Omit<User, 'id'>>): Promise<User | null> {
    try {
        return await prisma.user.update({
            where: { id },
            data,
        });
    } catch (error) {
        console.error("Error updating user:", error);
        return null;
    }
}

export async function deleteUser(id: string): Promise<boolean> {
    try {
        await prisma.user.delete({ where: { id } });
        return true;
    } catch (error) {
        console.error("Error deleting user:", error);
        return false;
    }
}
