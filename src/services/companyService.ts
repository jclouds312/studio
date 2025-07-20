
'use server';

import type { CompanyProfile } from '@prisma/client';
import { allCompanies as staticCompanies } from '@/data/companies';

let companies: CompanyProfile[] = staticCompanies.map(c => ({...c, userId: null}));


export async function getAllCompanies(): Promise<CompanyProfile[]> {
    return Promise.resolve(companies);
}

export async function getCompanyById(id: string): Promise<CompanyProfile | null> {
    const company = companies.find(c => c.id === id) || null;
    return Promise.resolve(company);
}

export async function createCompany(data: Omit<CompanyProfile, 'id' | 'userId'>): Promise<CompanyProfile> {
    const newCompany: CompanyProfile = {
        ...data,
        id: String(Date.now()),
        userId: null
    };
    companies.push(newCompany);
    return Promise.resolve(newCompany);
}

export async function updateCompany(id: string, data: Partial<Omit<CompanyProfile, 'id'>>): Promise<CompanyProfile | null> {
    const companyIndex = companies.findIndex(c => c.id === id);
    if (companyIndex === -1) return null;

    const updatedCompany = { ...companies[companyIndex], ...data };
    companies[companyIndex] = updatedCompany;
    return Promise.resolve(updatedCompany);
}

export async function deleteCompany(id: string): Promise<boolean> {
    const initialLength = companies.length;
    const filteredCompanies = companies.filter(c => c.id !== id);
    companies.length = 0;
    Array.prototype.push.apply(companies, filteredCompanies);
    return Promise.resolve(companies.length < initialLength);
}
