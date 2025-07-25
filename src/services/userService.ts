
'use server';

import type { User, CompanyProfile } from '@prisma/client';
import { allUsers, allCompanies } from '@/data/db';

export async function getAllUsers(): Promise<User[]> {
    await new Promise(resolve => setTimeout(resolve, 200));
    return JSON.parse(JSON.stringify(allUsers));
}

export async function getUserById(id: string): Promise<User | null> {
    await new Promise(resolve => setTimeout(resolve, 200));
    const user = allUsers.find(user => user.id === id) || null;
    return user ? JSON.parse(JSON.stringify(user)) : null;
}

export async function getUserByEmail(email: string): Promise<User | null> {
    await new Promise(resolve => setTimeout(resolve, 200));
    const user = allUsers.find(user => user.email === email) || null;
    return user ? JSON.parse(JSON.stringify(user)) : null;
}

export async function getCompanyProfileByUserId(userId: string): Promise<CompanyProfile | null> {
    await new Promise(resolve => setTimeout(resolve, 200));
    const company = allCompanies.find(c => c.userId === userId) || null;
    return company ? JSON.parse(JSON.stringify(company)) : null;
}

export async function createUser(data: Partial<Omit<User, 'id' | 'createdAt' | 'updatedAt'>>): Promise<User> {
    await new Promise(resolve => setTimeout(resolve, 200));
    const roleMap: Record<string, 'TRABAJADOR' | 'EMPRESA' | 'ADMIN'> = {
        'user': 'TRABAJADOR',
        'worker': 'TRABAJADOR',
        'TRABAJADOR': 'TRABAJADOR',
        'company': 'EMPRESA',
        'EMPRESA': 'EMPRESA',
        'admin': 'ADMIN',
        'ADMIN': 'ADMIN',
    }
    const mappedRole = roleMap[data.role!] || 'TRABAJADOR';

    const newUser: User = {
        id: `user_${Date.now()}`,
        createdAt: new Date(),
        updatedAt: new Date(),
        name: data.name!,
        email: data.email!,
        password: data.password, // In a real app, hash this!
        role: mappedRole,
        avatar: data.avatar || `https://i.pravatar.cc/150?u=${data.email}`,
        status: data.status || 'VERIFICADO',
        savedJobIds: JSON.stringify(data.savedJobIds || []),
        companyProfileId: data.companyProfileId || null,
        professionalSummary: data.professionalSummary || null,
        experience: data.experience || null,
        phone: data.phone || null,
        location: data.location || null,
        subscriptionPlan: data.subscriptionPlan || null,
        subscriptionUntil: data.subscriptionUntil || null,
    };
    allUsers.push(newUser);
    return JSON.parse(JSON.stringify(newUser));
}

export async function updateUser(id: string, data: Partial<Omit<User, 'id'>>): Promise<User | null> {
     await new Promise(resolve => setTimeout(resolve, 200));
    const userIndex = allUsers.findIndex(user => user.id === id);
    if (userIndex === -1) {
        return null;
    }
    
    const updatedData = { ...data };
    if (Array.isArray(updatedData.savedJobIds)) {
        updatedData.savedJobIds = JSON.stringify(updatedData.savedJobIds);
    }
    
    const updatedUser = { ...allUsers[userIndex], ...updatedData, updatedAt: new Date() };
    allUsers[userIndex] = updatedUser;
    return JSON.parse(JSON.stringify(updatedUser));
}

export async function deleteUser(id: string): Promise<boolean> {
     await new Promise(resolve => setTimeout(resolve, 200));
    const initialLength = allUsers.length;
    const filteredUsers = allUsers.filter(user => user.id !== id);
    if (allUsers.length === filteredUsers.length) {
        return false;
    }
    allUsers.length = 0;
    Array.prototype.push.apply(allUsers, filteredUsers);
    return true;
}
