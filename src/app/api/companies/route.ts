
import { NextResponse } from 'next/server';
import { getAllCompanies, createCompany } from '@/services/companyService';

export async function GET() {
    try {
        const companies = await getAllCompanies();
        return NextResponse.json(companies);
    } catch (error) {
        return NextResponse.json({ error: 'Error al obtener las empresas' }, { status: 500 });
    }
}

export async function POST(request: Request) {
    try {
        const companyData = await request.json();
        const newCompany = await createCompany(companyData);
        return NextResponse.json(newCompany, { status: 201 });
    } catch (error) {
        return NextResponse.json({ error: 'Error al crear la empresa' }, { status: 500 });
    }
}
