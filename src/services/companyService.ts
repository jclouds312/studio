
'use server';

import prisma from '@/lib/prisma';
import type { CompanyProfile } from '@prisma/client';

export async function getAllCompanies(): Promise<CompanyProfile[]> {
    return prisma.companyProfile.findMany();
}

export async function getCompanyById(id: string): Promise<CompanyProfile | null> {
    return prisma.companyProfile.findUnique({ where: { id } });
}

export async function createCompany(data: Omit<CompanyProfile, 'id' | 'userId'> & { userId: string }): Promise<CompanyProfile> {
    return prisma.companyProfile.create({ data });
}

export async function updateCompany(id: string, data: Partial<Omit<CompanyProfile, 'id'>>): Promise<CompanyProfile | null> {
    try {
        return await prisma.companyProfile.update({
            where: { id },
            data,
        });
    } catch (error) {
        console.error("Error updating company:", error);
        return null;
    }
}

export async function deleteCompany(id: string): Promise<boolean> {
    try {
        await prisma.companyProfile.delete({ where: { id } });
        return true;
    } catch (error) {
        console.error("Error deleting company:", error);
        return false;
    }
}
