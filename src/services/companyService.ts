
'use server';

import type { CompanyProfile } from '@/lib/types';
import { allCompanies } from '@/data/companies';

export async function getAllCompanies(): Promise<CompanyProfile[]> {
    return Promise.resolve(allCompanies);
}

export async function getCompanyById(id: string): Promise<CompanyProfile | null> {
    const company = allCompanies.find(c => c.id === id) || null;
    return Promise.resolve(company);
}

export async function createCompany(data: Omit<CompanyProfile, 'id'>): Promise<CompanyProfile> {
    const newCompany: CompanyProfile = {
        ...data,
        id: String(Date.now()),
    };
    allCompanies.push(newCompany);
    return Promise.resolve(newCompany);
}

export async function updateCompany(id: string, data: Partial<Omit<CompanyProfile, 'id'>>): Promise<CompanyProfile | null> {
    const companyIndex = allCompanies.findIndex(c => c.id === id);
    if (companyIndex === -1) return null;

    const updatedCompany = { ...allCompanies[companyIndex], ...data };
    allCompanies[companyIndex] = updatedCompany;
    return Promise.resolve(updatedCompany);
}

export async function deleteCompany(id: string): Promise<boolean> {
    const initialLength = allCompanies.length;
    const filteredCompanies = allCompanies.filter(c => c.id !== id);
    allCompanies.length = 0;
    Array.prototype.push.apply(allCompanies, filteredCompanies);
    return Promise.resolve(allCompanies.length < initialLength);
}
