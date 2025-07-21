
import type { User, UserProfileData } from '@/lib/types';

// Datos de perfil de ejemplo para usuarios
const userProfileJuan: any = {
    avatarUrl: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=1780&auto=format&fit=crop',
    phone: '+54 9 11 1234-5678',
    location: 'Buenos Aires, CABA',
    professionalSummary: 'Desarrollador Frontend con más de 3 años de experiencia en React y Next.js. Buscando nuevos desafíos para aplicar mis habilidades en un entorno dinámico.',
    experience: '- Frontend Developer en Tech Solutions Inc. (2021-Actualidad)\n- Web Developer en StartUp X (2020-2021)',
    applications: [],
    savedJobs: [],
    stats: { profileViews: 88, interviews: 1, savedJobs: 0 }
};

const userProfileAna: any = {
    avatarUrl: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=1887&auto=format&fit=crop',
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
        name: 'Juan Pérez (Trabajador)',
        email: 'trabajador@test.com',
        password: 'password',
        avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=1780&auto=format&fit=crop',
        role: 'user',
        status: 'Verificado',
        createdAt: new Date('2023-10-27'),
        subscriptionPlan: 'Profesional',
        subscriptionUntil: new Date(new Date().setMonth(new Date().getMonth() + 1)).toISOString(),
        profileData: userProfileJuan
    },
    {
        id: '2',
        name: 'Ana García',
        email: 'ana.garcia@example.com',
        password: 'password123',
        avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=1887&auto=format&fit=crop',
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
        avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=1887&auto=format&fit=crop',
        role: 'admin',
        status: 'Verificado',
        createdAt: new Date('2023-10-25')
    },
     {
        id: '4',
        name: 'Admin LaburoYA',
        email: 'admin@test.com',
        password: 'password',
        avatar: 'https://images.unsplash.com/photo-1633332755192-727a05c4013d?q=80&w=1780&auto=format&fit=crop',
        role: 'admin',
        status: 'Verificado',
        createdAt: new Date('2024-01-01')
    },
    {
        id: '5',
        name: 'Tech Solutions Inc. (Empresa)',
        email: 'empresa@test.com',
        password: 'password',
        avatar: 'https://images.unsplash.com/photo-1556761175-b413da4baf72?q=80&w=1974&auto=format&fit=crop',
        role: 'company',
        status: 'Verificado',
        createdAt: new Date('2024-02-15'),
        subscriptionPlan: 'Empresa Plus',
        subscriptionUntil: new Date(new Date().setMonth(new Date().getMonth() + 1)).toISOString(),
    },
    {
        id: '6',
        name: 'Creative Minds',
        email: 'creative.minds@example.com',
        password: 'password123',
        avatar: 'https://images.unsplash.com/photo-1522125670776-3c7abb882bc2?q=80&w=2070&auto=format&fit=crop',
        role: 'company',
        status: 'Verificado',
        createdAt: new Date('2024-03-01')
    },
    {
        id: '7',
        name: 'Facebook Latam',
        email: 'empresa.facebook@example.com',
        password: 'password123',
        avatar: 'https://images.unsplash.com/photo-1611162616805-669c3fa0de13?q=80&w=1974&auto=format&fit=crop',
        role: 'company',
        status: 'Verificado',
        createdAt: new Date('2024-04-10')
    },
    {
        id: '8',
        name: 'Usuario de Google',
        email: 'user.google@example.com',
        password: 'social-login',
        avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=2070&auto=format&fit=crop',
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
        avatar: 'https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?q=80&w=2070&auto=format&fit=crop',
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
        avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=2070&auto=format&fit=crop',
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
        avatar: 'https://images.unsplash.com/photo-1587440871875-191322ee64b0?q=80&w=2071&auto=format&fit=crop',
        role: 'company',
        status: 'Verificado',
        createdAt: new Date('2024-07-30')
    },
    {
        id: '12',
        name: 'Vallejo Tech',
        email: 'johnatan-vallejo@hotmail.com',
        password: '123456',
        avatar: 'https://images.unsplash.com/photo-1531297484001-80022131f5a1?q=80&w=2020&auto=format&fit=crop',
        role: 'company',
        status: 'Verificado',
        createdAt: new Date('2024-07-30')
    }
];
