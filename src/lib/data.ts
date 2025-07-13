
// This file acts as a centralized, in-memory database for the prototype.
// All major data structures are defined and exported from here.

import type { Job, User, CompanyProfile, SubscriptionPlan } from './types';

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
        email: 'tech.solutions@example.com',
        password: 'password123',
        avatar: 'https://placehold.co/40x40.png',
        role: 'company',
        status: 'Verificado',
        createdAt: '2024-02-15'
    },
    {
        id: '6',
        name: 'Creative Minds',
        email: 'creative.minds@example.com',
        password: 'password123',
        avatar: 'https://placehold.co/40x40.png',
        role: 'company',
        status: 'Verificado',
        createdAt: '2024-03-01'
    }
];

export const allJobs: Job[] = [
  {
    id: '1',
    title: 'Frontend Developer',
    company: 'Tech Solutions Inc.',
    location: 'Buenos Aires',
    type: 'Full-time',
    description: 'Buscamos un desarrollador Frontend para unirse a nuestro equipo. Serás responsable de construir el lado del cliente de nuestras aplicaciones web. Debes ser capaz de traducir las necesidades de nuestra empresa y clientes en aplicaciones interactivas funcionales y atractivas.',
    companyLogo: 'https://placehold.co/56x56.png',
    category: 'tech',
    isFeatured: true,
    whatsapp: '+5491123456789'
  },
  {
    id: '2',
    title: 'Diseñador/a UX/UI',
    company: 'Creative Minds',
    location: 'Córdoba',
    type: 'Contract',
    description: 'Creative Minds busca un talentoso Diseñador UX/UI para crear experiencias de usuario increíbles. El candidato ideal debe tener un ojo para el diseño limpio y artístico, poseer habilidades superiores de UI y ser capaz de traducir requisitos de alto nivel en flujos de interacción y artefactos.',
    companyLogo: 'https://placehold.co/56x56.png',
    category: 'design'
  },
  {
    id: '3',
    title: 'Ingeniero/a Backend (Node.js)',
    company: 'Server Systems',
    location: 'Remoto',
    type: 'Full-time',
    description: 'Únete a nuestro equipo de backend para diseñar e implementar aplicaciones del lado del servidor escalables y robustas. Trabajarás con un equipo de desarrolladores para construir y mantener nuestros servicios principales, asegurando un alto rendimiento y capacidad de respuesta a las solicitudes del front-end.',
    companyLogo: 'https://placehold.co/56x56.png',
    category: 'tech'
  },
   {
    id: '4',
    title: 'Manager de Marketing Digital',
    company: 'Growth Hackers',
    location: 'Rosario',
    type: 'Part-time',
    description: 'Estamos contratando un Manager de Marketing Digital para desarrollar, implementar, rastrear y optimizar nuestras campañas de marketing digital en todos los canales digitales. Debes tener un fuerte conocimiento de las herramientas y estrategias de marketing actuales.',
    companyLogo: 'https://placehold.co/56x56.png',
    category: 'marketing'
  },
  {
    id: '5',
    title: 'Representante de Ventas',
    company: 'Lead Gen',
    location: 'Buenos Aires',
    type: 'Full-time',
    description: 'Buscamos un Ejecutivo de Ventas competitivo y confiable para ayudarnos a desarrollar nuestras actividades comerciales. Las responsabilidades del Ejecutivo de Ventas incluyen descubrir y buscar nuevos prospectos de ventas, negociar acuerdos y mantener la satisfacción del cliente.',
    companyLogo: 'https://placehold.co/56x56.png',
    category: 'sales',
    isFeatured: true,
    whatsapp: '+5491123456789'
  },
   {
    id: '6',
    title: 'Pintor de Interiores',
    company: 'Servicios Varios',
    location: 'La Plata',
    type: 'Changa',
    description: 'Se necesita pintor con experiencia para pintar un departamento de 2 ambientes. Se proveen materiales. Trabajo por día, pago al finalizar la jornada. Enviar fotos de trabajos previos por WhatsApp.',
    companyLogo: 'https://placehold.co/56x56.png',
    category: 'domestic',
    whatsapp: '+5492212345678'
  }
];

export const allCompanies: CompanyProfile[] = [
    {
        id: '1',
        name: 'Tech Solutions Inc.',
        cuit: '30-12345678-9',
        address: 'Av. Corrientes 1234, Piso 5',
        city: 'CABA',
        province: 'Buenos Aires',
        phone: '11-4321-9876',
        logoUrl: 'https://placehold.co/40x40.png',
        status: 'Activa',
    },
    {
        id: '2',
        name: 'Creative Minds',
        cuit: '30-98765432-1',
        address: 'Bv. San Juan 567',
        city: 'Córdoba',
        province: 'Córdoba',
        phone: '351-123-4567',
        logoUrl: 'https://placehold.co/40x40.png',
        status: 'Activa',
    },
     {
        id: '3',
        name: 'Server Systems',
        cuit: '30-55555555-5',
        address: 'N/A',
        city: 'Remoto',
        province: 'N/A',
        phone: 'N/A',
        logoUrl: 'https://placehold.co/40x40.png',
        status: 'Inactiva',
    },
];

export const allPlans: SubscriptionPlan[] = [
    {
        name: 'Básico',
        userType: 'worker',
        isPopular: false,
        description: 'Ideal para empezar tu búsqueda laboral.',
        iconName: 'Briefcase',
        pricing: [{
            duration: 'monthly',
            price: 'Gratis',
            priceDetail: 'para siempre',
            priceAmount: 0,
            features: [
                'Hasta 5 postulaciones por mes',
                'Perfil público básico',
                'Acceso a todas las ofertas',
            ],
        }]
    },
    {
        name: 'Profesional',
        userType: 'worker',
        isPopular: true,
        description: 'Potencia tu perfil y destaca sobre los demás.',
        iconName: 'Star',
        pricing: [
            {
                duration: 'monthly',
                price: '$2.000',
                priceDetail: 'por mes',
                priceAmount: 2000,
                features: [
                    'Postulaciones ilimitadas',
                    'Perfil destacado en búsquedas',
                    'Acceso a estadísticas de perfil',
                    'Soporte prioritario por email',
                ],
            },
            {
                duration: 'quarterly',
                price: '$1.700',
                priceDetail: 'por mes',
                priceAmount: 1700 * 3,
                discount: 'AHORRA 15%',
                features: [
                    'Todo lo del plan mensual',
                    'Acceso a webinars de carrera exclusivos',
                    'Revisión de CV por IA',
                ],
            },
            {
                duration: 'semi-annually',
                price: '$1.500',
                priceDetail: 'por mes',
                priceAmount: 1500 * 6,
                discount: 'AHORRA 25%',
                features: [
                    'Todo lo del plan trimestral',
                    'Soporte VIP 24/7',
                    'Consulta de 30 min con un coach laboral',
                ],
            },
        ]
    },
    {
        name: 'Empresa',
        userType: 'company',
        isPopular: false,
        description: 'Perfecto para pequeñas y medianas empresas.',
        iconName: 'Building',
        pricing: [{
            duration: 'monthly',
            price: '$10.000',
            priceDetail: 'por mes',
            priceAmount: 10000,
            features: [
                'Publica hasta 5 ofertas de trabajo',
                'Acceso a base de datos de candidatos',
                'Dashboard de seguimiento de postulantes',
                'Soporte por email',
            ],
        }]
    },
    {
        name: 'Empresa Plus',
        userType: 'company',
        isPopular: true,
        description: 'La solución completa para grandes reclutadores.',
        iconName: 'Zap',
        pricing: [
            {
                duration: 'monthly',
                price: '$25.000',
                priceDetail: 'por mes',
                priceAmount: 25000,
                features: [
                    'Publicaciones ilimitadas',
                    'Destaca hasta 5 ofertas de trabajo',
                    'Herramientas avanzadas de filtrado',
                    'Soporte dedicado 24/7',
                ],
            },
            {
                duration: 'quarterly',
                price: '$22.000',
                priceDetail: 'por mes',
                priceAmount: 22000 * 3,
                discount: 'AHORRA 12%',
                features: [
                    'Todo lo del plan mensual',
                    'Publicaciones de la empresa en redes sociales',
                    'Acceso a analíticas avanzadas de candidatos',
                ],
            },
            {
                duration: 'semi-annually',
                price: '$20.000',
                priceDetail: 'por mes',
                priceAmount: 20000 * 6,
                discount: 'AHORRA 20%',
                features: [
                    'Todo lo del plan trimestral',
                    'Gestor de cuenta personal dedicado',
                    'Candidatos pre-seleccionados por IA',
                ],
            }
        ]
    },
];
