
import { NextResponse } from 'next/server';
import { getCompanyById, updateCompany, deleteCompany } from '@/services/companyService';

type RouteParams = {
    params: {
        id: string;
    }
}

export async function GET(request: Request, { params }: RouteParams) {
    try {
        const company = await getCompanyById(params.id);
        if (!company) {
            return NextResponse.json({ error: 'Empresa no encontrada' }, { status: 404 });
        }
        return NextResponse.json(company);
    } catch (error) {
        console.error(`Error al obtener la empresa ${params.id}:`, error);
        return NextResponse.json({ error: 'Error al obtener la empresa' }, { status: 500 });
    }
}

export async function PUT(request: Request, { params }: RouteParams) {
    try {
        const companyData = await request.json();
        const updatedCompany = await updateCompany(params.id, companyData);
        if (!updatedCompany) {
            return NextResponse.json({ error: 'Empresa no encontrada' }, { status: 404 });
        }
        return NextResponse.json(updatedCompany);
    } catch (error) {
        console.error(`Error al actualizar la empresa ${params.id}:`, error);
        return NextResponse.json({ error: 'Error al actualizar la empresa' }, { status: 500 });
    }
}

export async function DELETE(request: Request, { params }: RouteParams) {
    try {
        const success = await deleteCompany(params.id);
        if (!success) {
            return NextResponse.json({ error: 'Empresa no encontrada' }, { status: 404 });
        }
        return NextResponse.json({ message: 'Empresa eliminada correctamente' });
    } catch (error) {
        console.error(`Error al eliminar la empresa ${params.id}:`, error);
        return NextResponse.json({ error: 'Error al eliminar la empresa' }, { status: 500 });
    }
}
