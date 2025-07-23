
import { NextResponse } from 'next/server';
import { getAllJobs, createJob, getJobsByCompanyId } from '@/services/jobService';

export async function GET(request: Request) {
    const { searchParams } = new URL(request.url);
    const companyId = searchParams.get('companyId');

    try {
        let jobs;
        if (companyId) {
            jobs = await getJobsByCompanyId(companyId);
        } else {
            jobs = await getAllJobs();
        }
        return NextResponse.json(jobs);
    } catch (error) {
        console.error('Error al obtener los trabajos:', error);
        return NextResponse.json({ error: 'Error al obtener los trabajos' }, { status: 500 });
    }
}

export async function POST(request: Request) {
    try {
        const jobData = await request.json();
        const newJob = await createJob(jobData);
        return NextResponse.json(newJob, { status: 201 });
    } catch (error) {
        console.error('Error al crear el trabajo:', error);
        return NextResponse.json({ error: 'Error al crear el trabajo' }, { status: 500 });
    }
}
