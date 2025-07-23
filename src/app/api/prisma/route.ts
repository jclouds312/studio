
import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

type PrismaModelName = keyof typeof prisma;

// A simple type guard to check if a string is a valid model name
function isValidModel(model: string): model is PrismaModelName {
    return model in prisma;
}

export async function POST(request: Request) {
    try {
        const { model, operation, args } = await request.json();

        if (!isValidModel(model)) {
            return NextResponse.json({ error: `Invalid model: ${model}` }, { status: 400 });
        }

        const modelClient = prisma[model] as any;

        if (typeof modelClient[operation] !== 'function') {
            return NextResponse.json({ error: `Invalid operation: ${operation} on model ${model}` }, { status: 400 });
        }

        const result = await modelClient[operation](args);
        
        return NextResponse.json(result);

    } catch (error) {
        console.error("Prisma API proxy error:", error);
        const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred';
        return NextResponse.json({ error: 'Error processing database request.', details: errorMessage }, { status: 500 });
    }
}
