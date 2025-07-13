
import type { User } from './types';

export const allUsers: User[] = [
    {
        id: '1',
        name: 'Juan Pérez',
        email: 'juan.perez@example.com',
        password: 'password123',
        avatar: 'https://placehold.co/40x40.png',
        role: 'user',
        status: 'Verificado',
        createdAt: '2023-10-27'
    },
    {
        id: '2',
        name: 'Ana García',
        email: 'ana.garcia@example.com',
        password: 'password123',
        avatar: 'https://placehold.co/40x40.png',
        role: 'user',
        status: 'Pendiente',
        createdAt: '2023-10-26'
    },
    {
        id: '3',
        name: 'Johnatan Vallejo',
        email: 'johnatanvallejomarulanda@gmail.com',
        password: 'julio2025',
        avatar: 'https://placehold.co/40x40.png',
        role: 'admin',
        status: 'Verificado',
        createdAt: '2023-10-25'
    },
     {
        id: '4',
        name: 'Admin LaburoYA',
        email: 'admin@laburoya.com',
        password: 'julio2025',
        avatar: 'https://placehold.co/40x40.png',
        role: 'admin',
        status: 'Verificado',
        createdAt: '2024-01-01'
    },
    {
        id: '5',
        name: 'Tech Solutions Inc.',
        email: 'empresa.facebook@example.com',
        password: 'password123',
        avatar: 'https://placehold.co/40x40.png',
        role: 'company',
        status: 'Verificado',
        createdAt: '2024-02-15'
    }
];
