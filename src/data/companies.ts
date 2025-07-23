
import type { CompanyProfile } from '@prisma/client';

export const allCompanies: CompanyProfile[] = [
    {
        id: 'co_1',
        userId: 'user_empresa_test',
        name: 'Tech Solutions Inc.',
        cuit: '30-12345678-9',
        logoUrl: 'https://placehold.co/128x128.png',
        status: 'Activa',
        description: 'Líderes en soluciones de software innovadoras. Buscamos talento para revolucionar el mercado.',
        phone: '+54 9 11 1234-5678',
        address: 'Av. Corrientes 1234',
        city: 'Capital Federal',
        province: 'Buenos Aires',
        createdAt: new Date(),
        updatedAt: new Date(),
    },
    {
        id: 'co_2',
        userId: 'user_creative_minds',
        name: 'Creative Minds',
        cuit: '30-87654321-1',
        logoUrl: 'https://placehold.co/128x128.png',
        status: 'Activa',
        description: 'Agencia de diseño y marketing digital. Creamos experiencias memorables para marcas audaces.',
        phone: '+54 9 351 8765-4321',
        address: 'Av. Colón 500',
        city: 'Córdoba',
        province: 'Córdoba',
        createdAt: new Date(),
        updatedAt: new Date(),
    },
];
