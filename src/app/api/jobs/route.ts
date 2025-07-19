
import { NextResponse } from 'next/server';
import { getAllJobs, createJob } from '@/services/jobService';

export async function GET() {
    try {
        const jobs = await getAllJobs();
        return NextResponse.json(jobs);
    } catch (error) {
        return NextResponse.json({ error: 'Error al obtener los trabajos' }, { status: 500 });
    }
}

export async function POST(request: Request) {
    try {
        const jobData = await request.json();
        const newJob = await createJob(jobData);
        return NextResponse.json(newJob, { status: 201 });
    } catch (error) {
        return NextResponse.json({ error: 'Error al crear el trabajo' }, { status: 500 });
    }
}
