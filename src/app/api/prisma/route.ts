// This file is no longer used now that Prisma has been replaced by a static data provider.
// It is kept for historical purposes but can be safely removed.
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
    return NextResponse.json({ 
        error: 'This API route is deprecated. The application now uses a static data provider instead of Prisma directly.' 
    }, { status: 410 });
}
