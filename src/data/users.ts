
import type { User, UserProfileData } from '@/lib/types';

// Datos de perfil de ejemplo para usuarios
const userProfileJuan: any = {
    avatarUrl: 'https://placehold.co/128x128.png',
    phone: '+54 9 11 1234-5678',
    location: 'Buenos Aires, CABA',
    professionalSummary: 'Desarrollador Frontend con más de 3 años de experiencia en React y Next.js. Buscando nuevos desafíos para aplicar mis habilidades en un entorno dinámico.',
    experience: '- Frontend Developer en Tech Solutions Inc. (2021-Actualidad)\n- Web Developer en StartUp X (2020-2021)',
    applications: [],
    savedJobs: [],
    stats: { profileViews: 88, interviews: 1, savedJobs: 0 }
};

const userProfileAna: any = {
    avatarUrl: 'https://placehold.co/128x128.png',
    phone: '+54 9 351 8765-4321',
    location: 'Córdoba, Argentina',
    professionalSummary: 'Diseñadora UX/UI con pasión por crear productos digitales intuitivos y atractivos. Experiencia en todo el proceso de diseño, desde la investigación hasta el prototipado y las pruebas de usuario.',
    experience: '- UX/UI Designer en Creative Minds (2019-Actualidad)\n- Pasante de Diseño Gráfico en Agencia Visual (2018)',
    applications: [],
    savedJobs: [],
    stats: { profileViews: 152, interviews: 4, savedJobs: 0 }
};


export const allUsers: any[] = [
    {
        id: '1',
        name: 'Juan Pérez',
        email: 'juan.perez@example.com',
        password: 'password123',
        avatar: 'https://placehold.co/40x40.png',
        role: 'user',
        status: 'Verificado',
        createdAt: new Date('2023-10-27'),
        profileData: userProfileJuan
    },
    {
        id: '2',
        name: 'Ana García',
        email: 'ana.garcia@example.com',
        password: 'password123',
        avatar: 'https://placehold.co/40x40.png',
        role: 'user',
        status: 'Pendiente',
        createdAt: new Date('2023-10-26'),
        profileData: userProfileAna
    },
    {
        id: '3',
        name: 'Johnatan Vallejo Marulanda',
        email: 'johnatanvallejomarulanda@gmail.com',
        password: '12345678',
        avatar: 'https://placehold.co/40x40.png',
        role: 'admin',
        status: 'Verificado',
        createdAt: new Date('2023-10-25')
    },
     {
        id: '4',
        name: 'Admin LaburoYA',
        email: 'admin@laburoya.com',
        password: 'julio2025',
        avatar: 'https://placehold.co/40x40.png',
        role: 'admin',
        status: 'Verificado',
        createdAt: new Date('2024-01-01')
    },
    {
        id: '5',
        name: 'Tech Solutions Inc.',
        email: 'tech.solutions@example.com',
        password: 'password123',
        avatar: 'https://placehold.co/40x40.png',
        role: 'company',
        status: 'Verificado',
        createdAt: new Date('2024-02-15')
    },
    {
        id: '6',
        name: 'Creative Minds',
        email: 'creative.minds@example.com',
        password: 'password123',
        avatar: 'https://placehold.co/40x40.png',
        role: 'company',
        status: 'Verificado',
        createdAt: new Date('2024-03-01')
    },
    {
        id: '7',
        name: 'Facebook Latam',
        email: 'empresa.facebook@example.com',
        password: 'password123',
        avatar: 'https://placehold.co/40x40.png',
        role: 'company',
        status: 'Verificado',
        createdAt: new Date('2024-04-10')
    },
    {
        id: '8',
        name: 'Usuario de Google',
        email: 'user.google@example.com',
        password: 'social-login',
        avatar: 'https://placehold.co/40x40.png',
        role: 'user',
        status: 'Verificado',
        createdAt: new Date('2024-05-20'),
        profileData: userProfileJuan
    },
     {
        id: '9',
        name: 'Usuario de Facebook',
        email: 'user.facebook@example.com',
        password: 'social-login',
        avatar: 'https://placehold.co/40x40.png',
        role: 'user',
        status: 'Verificado',
        createdAt: new Date('2024-05-21'),
        profileData: userProfileAna
    },
    {
        id: '10',
        name: 'Usuario de Microsoft',
        email: 'user.microsoft@example.com',
        password: 'social-login',
        avatar: 'https://placehold.co/40x40.png',
        role: 'user',
        status: 'Verificado',
        createdAt: new Date('2024-05-22'),
        profileData: userProfileJuan
    },
    {
        id: '11',
        name: 'JV Solutions',
        email: 'john474nvallejo@gmail.com',
        password: '123456',
        avatar: 'https://placehold.co/40x40.png',
        role: 'company',
        status: 'Verificado',
        createdAt: new Date('2024-07-30')
    },
    {
        id: '12',
        name: 'Vallejo Tech',
        email: 'johnatan-vallejo@hotmail.com',
        password: '123456',
        avatar: 'https://placehold.co/40x40.png',
        role: 'company',
        status: 'Verificado',
        createdAt: new Date('2024-07-30')
    }
];
