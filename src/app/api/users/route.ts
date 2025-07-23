
import { NextResponse } from 'next/server';
import { getAllUsers, createUser, getUserByEmail } from '@/services/userService';

export async function GET(request: Request) {
    const { searchParams } = new URL(request.url);
    const email = searchParams.get('email');

    try {
        if (email) {
            const user = await getUserByEmail(email);
            if (user) {
                return NextResponse.json(user);
            }
            return NextResponse.json({ error: 'Usuario no encontrado' }, { status: 404 });
        }

        const users = await getAllUsers();
        return NextResponse.json(users);
    } catch (error) {
        console.error('Error al obtener los usuarios:', error);
        return NextResponse.json({ error: 'Error al obtener los usuarios' }, { status: 500 });
    }
}

export async function POST(request: Request) {
    try {
        const userData = await request.json();
        const newUser = await createUser(userData);
        return NextResponse.json(newUser, { status: 201 });
    } catch (error) {
        console.error('Error al crear el usuario:', error);
        return NextResponse.json({ error: 'Error al crear el usuario' }, { status: 500 });
    }
}
