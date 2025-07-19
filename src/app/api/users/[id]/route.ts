
import { NextResponse } from 'next/server';
import { getUserById, updateUser, deleteUser } from '@/services/userService';

type RouteParams = {
    params: {
        id: string;
    }
}

export async function GET(request: Request, { params }: RouteParams) {
    try {
        const user = await getUserById(params.id);
        if (!user) {
            return NextResponse.json({ error: 'Usuario no encontrado' }, { status: 404 });
        }
        return NextResponse.json(user);
    } catch (error) {
        return NextResponse.json({ error: 'Error al obtener el usuario' }, { status: 500 });
    }
}

export async function PUT(request: Request, { params }: RouteParams) {
    try {
        const userData = await request.json();
        const updatedUser = await updateUser(params.id, userData);
        if (!updatedUser) {
            return NextResponse.json({ error: 'Usuario no encontrado' }, { status: 404 });
        }
        return NextResponse.json(updatedUser);
    } catch (error) {
        return NextResponse.json({ error: 'Error al actualizar el usuario' }, { status: 500 });
    }
}

export async function DELETE(request: Request, { params }: RouteParams) {
    try {
        const success = await deleteUser(params.id);
        if (!success) {
            return NextResponse.json({ error: 'Usuario no encontrado' }, { status: 404 });
        }
        return NextResponse.json({ message: 'Usuario eliminado correctamente' });
    } catch (error) {
        return NextResponse.json({ error: 'Error al eliminar el usuario' }, { status: 500 });
    }
}
