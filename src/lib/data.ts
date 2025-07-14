
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
    title: 'Frontend Developer (React)',
    company: 'Tech Solutions Inc.',
    location: 'Buenos Aires',
    type: 'Full-time',
    description: 'Buscamos un desarrollador Frontend para unirse a nuestro equipo. Serás responsable de construir el lado del cliente de nuestras aplicaciones web. Debes ser capaz de traducir las necesidades de nuestra empresa y clientes en aplicaciones interactivas funcionales y atractivas.',
    companyLogo: 'https://placehold.co/56x56.png',
    category: 'tech',
    isFeatured: true,
    isNew: false,
    whatsapp: '+5491123456789'
  },
  {
    id: '2',
    title: 'Diseñador/a UX/UI Sr.',
    company: 'Creative Minds',
    location: 'Córdoba',
    type: 'Contract',
    description: 'Creative Minds busca un talentoso Diseñador UX/UI para crear experiencias de usuario increíbles. El candidato ideal debe tener un ojo para el diseño limpio y artístico, poseer habilidades superiores de UI y ser capaz de traducir requisitos de alto nivel en flujos de interacción y artefactos.',
    companyLogo: 'https://placehold.co/56x56.png',
    category: 'design',
    isNew: true,
  },
  {
    id: '3',
    title: 'Ingeniero/a Backend (Node.js)',
    company: 'Server Systems',
    location: 'Remoto',
    type: 'Full-time',
    description: 'Únete a nuestro equipo de backend para diseñar e implementar aplicaciones del lado del servidor escalables y robustas. Trabajarás con un equipo de desarrolladores para construir y mantener nuestros servicios principales, asegurando un alto rendimiento y capacidad de respuesta a las solicitudes del front-end.',
    companyLogo: 'https://placehold.co/56x56.png',
    category: 'tech',
    isNew: true,
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
    title: 'Representante de Ventas B2B',
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
  },
  {
    id: '7',
    title: 'Analista de Recursos Humanos',
    company: 'Capital Humano S.A.',
    location: 'Mendoza',
    type: 'Full-time',
    description: 'Buscamos un Analista de RRHH para gestionar el ciclo completo de reclutamiento, la incorporación de empleados y las relaciones laborales. Se requiere experiencia en procesos de selección y conocimiento de la legislación laboral argentina.',
    companyLogo: 'https://placehold.co/56x56.png',
    category: 'hr'
  },
  {
    id: '8',
    title: 'Mozo/a con experiencia',
    company: 'Restaurante El Buen Sabor',
    location: 'Mar del Plata',
    type: 'Part-time',
    description: 'Restaurante céntrico busca mozo/a para la temporada de verano. Se requiere experiencia comprobable, buena presencia y disponibilidad para trabajar fines de semana y feriados. Se ofrece excelente ambiente laboral y propinas.',
    companyLogo: 'https://placehold.co/56x56.png',
    category: 'gastronomy',
    isNew: true,
    whatsapp: '+5492231234567'
  },
  {
    id: '9',
    title: 'Analista Contable Jr.',
    company: 'Finanzas Claras',
    location: 'Remoto',
    type: 'Full-time',
    description: 'Estudio contable busca Analista Jr. para tareas de conciliaciones bancarias, análisis de cuentas y asistencia en la preparación de balances. Ideal para estudiantes avanzados o recién recibidos de Contador Público.',
    companyLogo: 'https://placehold.co/56x56.png',
    category: 'finance',
    isFeatured: true
  },
  {
    id: '10',
    title: 'Repositor/a de Supermercado',
    company: 'Supermercados Argentinos',
    location: 'Quilmes',
    type: 'Full-time',
    description: 'Buscamos repositores para nuestra sucursal de Quilmes. Las tareas incluyen la reposición de mercadería en góndolas, control de stock y atención al cliente. No se requiere experiencia previa.',
    companyLogo: 'https://placehold.co/56x56.png',
    category: 'logistics'
  },
  {
    id: '11',
    title: 'Abogado/a Corporativo',
    company: 'Estudio Jurídico Integral',
    location: 'Buenos Aires',
    type: 'Full-time',
    description: 'Importante estudio jurídico busca abogado/a con experiencia en derecho corporativo para asesoramiento a empresas, redacción de contratos y seguimiento de litigios. Se requiere matrícula activa.',
    companyLogo: 'https://placehold.co/56x56.png',
    category: 'legal'
  },
  {
    id: '12',
    title: 'Enfermero/a Profesional',
    company: 'Clínica Salud Total',
    location: 'San Miguel de Tucumán',
    type: 'Full-time',
    description: 'Se necesita enfermero/a con matrícula para cubrir puesto en sala de internación. Se valorará experiencia en cuidados intensivos. Disponibilidad para turnos rotativos.',
    companyLogo: 'https://placehold.co/56x56.png',
    category: 'health',
    whatsapp: '+5493811234567'
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
