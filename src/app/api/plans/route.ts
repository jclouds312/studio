
import { NextResponse } from 'next/server';
import { getAllPlans } from '@/services/planService';

export async function GET() {
    try {
        const plans = await getAllPlans();
        return NextResponse.json(plans);
    } catch (error) {
        return NextResponse.json({ error: 'Error al obtener los planes' }, { status: 500 });
    }
}

    