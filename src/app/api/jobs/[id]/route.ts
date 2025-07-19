
import { NextResponse } from 'next/server';
import { getJobById, updateJob, deleteJob } from '@/services/jobService';

type RouteParams = {
    params: {
        id: string;
    }
}

export async function GET(request: Request, { params }: RouteParams) {
    try {
        const job = await getJobById(params.id);
        if (!job) {
            return NextResponse.json({ error: 'Trabajo no encontrado' }, { status: 404 });
        }
        return NextResponse.json(job);
    } catch (error) {
        return NextResponse.json({ error: 'Error al obtener el trabajo' }, { status: 500 });
    }
}

export async function PUT(request: Request, { params }: RouteParams) {
    try {
        const jobData = await request.json();
        const updatedJob = await updateJob(params.id, jobData);
        if (!updatedJob) {
            return NextResponse.json({ error: 'Trabajo no encontrado' }, { status: 404 });
        }
        return NextResponse.json(updatedJob);
    } catch (error) {
        return NextResponse.json({ error: 'Error al actualizar el trabajo' }, { status: 500 });
    }
}

export async function DELETE(request: Request, { params }: RouteParams) {
    try {
        const success = await deleteJob(params.id);
        if (!success) {
            return NextResponse.json({ error: 'Trabajo no encontrado' }, { status: 404 });
        }
        return NextResponse.json({ message: 'Trabajo eliminado correctamente' });
    } catch (error) {
        return NextResponse.json({ error: 'Error al eliminar el trabajo' }, { status: 500 });
    }
}
