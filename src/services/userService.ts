
'use server';

import prisma from '@/lib/prisma';
import type { User } from '@prisma/client';

export async function getAllUsers(): Promise<User[]> {
    return await prisma.user.findMany({
        include: {
            savedJobs: true,
            applications: true,
        }
    });
}

export async function getUserById(id: string): Promise<User | null> {
    const user = await prisma.user.findUnique({
        where: { id },
        include: {
            savedJobs: true,
            applications: {
                include: {
                    job: true
                }
            }
        }
    });
    return user;
}


export async function getUserByEmail(email: string): Promise<User | null> {
    return await prisma.user.findUnique({
        where: { email },
    });
}


export async function createUser(data: Omit<User, 'id' | 'createdAt' | 'updatedAt' | 'emailVerified' | 'phone' | 'location' | 'professionalSummary' | 'experience' | 'avatar' | 'savedJobIds' | 'status'> & { status?: string | null }): Promise<User> {
    const newUser = await prisma.user.create({ 
      data: {
        ...data,
        status: 'VERIFICADO', // Default status for new users
      } 
    });
    return newUser;
}

export async function updateUser(id: string, data: Partial<Omit<User, 'id'>>): Promise<User | null> {
    const updatedUser = await prisma.user.update({
        where: { id },
        data: { ...data, updatedAt: new Date() },
    });
    return updatedUser;
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
