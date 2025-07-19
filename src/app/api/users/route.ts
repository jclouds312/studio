
import { NextResponse } from 'next/server';
import { getAllUsers, createUser } from '@/services/userService';

export async function GET() {
    try {
        const users = await getAllUsers();
        return NextResponse.json(users);
    } catch (error) {
        return NextResponse.json({ error: 'Error al obtener los usuarios' }, { status: 500 });
    }
}

export async function POST(request: Request) {
    try {
        const userData = await request.json();
        const newUser = await createUser(userData);
        return NextResponse.json(newUser, { status: 201 });
    } catch (error) {
        return NextResponse.json({ error: 'Error al crear el usuario' }, { status: 500 });
    }
}
