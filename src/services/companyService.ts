
'use server';

import type { CompanyProfile } from '@prisma/client';
import { allCompanies } from '@/data/db';

export async function getAllCompanies(): Promise<CompanyProfile[]> {
    await new Promise(resolve => setTimeout(resolve, 200));
    return JSON.parse(JSON.stringify(allCompanies));
}

export async function getCompanyById(id: string): Promise<CompanyProfile | null> {
    await new Promise(resolve => setTimeout(resolve, 200));
    const company = allCompanies.find(c => c.id === id) || null;
    return JSON.parse(JSON.stringify(company));
}

export async function createCompany(data: Partial<CompanyProfile>): Promise<CompanyProfile> {
     await new Promise(resolve => setTimeout(resolve, 200));
    const newCompany: CompanyProfile = {
        id: `co_${Date.now()}`,
        createdAt: new Date(),
        updatedAt: new Date(),
        name: data.name || 'Nueva Empresa',
        cuit: data.cuit || '',
        logoUrl: data.logoUrl || 'https://placehold.co/40x40.png',
        status: data.status || 'Pendiente',
        userId: data.userId || `user_co_${Date.now()}`,
        description: data.description || null,
        phone: data.phone || null,
        address: data.address || null,
        city: data.city || null,
        province: data.province || null,
    };
    allCompanies.push(newCompany);
    return JSON.parse(JSON.stringify(newCompany));
}

export async function updateCompany(id: string, data: Partial<Omit<CompanyProfile, 'id'>>): Promise<CompanyProfile | null> {
    await new Promise(resolve => setTimeout(resolve, 200));
    const companyIndex = allCompanies.findIndex(c => c.id === id);
    if (companyIndex === -1) {
        return null;
    }
    const updatedCompany = { ...allCompanies[companyIndex], ...data, updatedAt: new Date() };
    allCompanies[companyIndex] = updatedCompany;
    return JSON.parse(JSON.stringify(updatedCompany));
}

export async function deleteCompany(id: string): Promise<boolean> {
    await new Promise(resolve => setTimeout(resolve, 200));
    const initialLength = allCompanies.length;
    const filteredCompanies = allCompanies.filter(c => c.id !== id);
    allCompanies.length = 0;
    Array.prototype.push.apply(allCompanies, filteredCompanies);
    return allCompanies.length < initialLength;
}
