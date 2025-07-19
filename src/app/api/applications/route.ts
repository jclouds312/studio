
import { NextResponse } from 'next/server';
import { createApplication, getApplicationsByUserId } from '@/services/applicationService';

export async function GET(request: Request) {
    const { searchParams } = new URL(request.url);
    const userId = searchParams.get('userId');

    if (!userId) {
        return NextResponse.json({ error: 'Se requiere el ID del usuario (userId)' }, { status: 400 });
    }

    try {
        const applications = await getApplicationsByUserId(userId);
        return NextResponse.json(applications);
    } catch (error) {
        return NextResponse.json({ error: 'Error al obtener las postulaciones' }, { status: 500 });
    }
}


export async function POST(request: Request) {
    try {
        const { userId, ...applicationData } = await request.json();
        if (!userId) {
            return NextResponse.json({ error: 'Se requiere el ID del usuario (userId)' }, { status: 400 });
        }
        const newApplication = await createApplication(userId, applicationData);
        return NextResponse.json(newApplication, { status: 201 });
    } catch (error) {
        const message = error instanceof Error ? error.message : 'Error desconocido';
        return NextResponse.json({ error: `Error al crear la postulación: ${message}` }, { status: 500 });
    }
}
