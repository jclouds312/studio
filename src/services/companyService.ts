
'use server';

import type { CompanyProfile } from '@prisma/client';
import { fetchFromPrisma } from './prismaProxy';

export async function getAllCompanies(): Promise<CompanyProfile[]> {
    return fetchFromPrisma('companyProfile', 'findMany', {});
}

export async function getCompanyById(id: string): Promise<CompanyProfile | null> {
    return fetchFromPrisma('companyProfile', 'findUnique', { where: { id } });
}

export async function createCompany(data: Partial<CompanyProfile>): Promise<CompanyProfile> {
    return fetchFromPrisma('companyProfile', 'create', { data });
}

export async function updateCompany(id: string, data: Partial<Omit<CompanyProfile, 'id'>>): Promise<CompanyProfile | null> {
    try {
        return await fetchFromPrisma('companyProfile', 'update', {
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
        await fetchFromPrisma('companyProfile', 'delete', { where: { id } });
        return true;
    } catch (error) {
        console.error("Error deleting company:", error);
        return false;
    }
}
