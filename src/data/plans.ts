
import type { SubscriptionPlan } from '@/lib/types';

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
                discount: undefined,
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
        name: 'Candidato VIP',
        userType: 'worker',
        isPopular: false,
        description: 'Acceso total y asistencia personalizada para tu carrera.',
        iconName: 'Gem',
        pricing: [
             {
                duration: 'monthly',
                price: '$5.000',
                priceDetail: 'por mes',
                priceAmount: 5000,
                discount: undefined,
                features: [
                    'Todo lo del plan Profesional',
                    'Gestor de cuenta de carrera personal',
                    'Postulaciones destacadas (Prioridad)',
                    'Aplicaciones gestionadas por expertos',
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
            discount: undefined,
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
                discount: undefined,
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
     {
        name: 'Corporativo',
        userType: 'company',
        isPopular: false,
        description: 'Soluciones a medida para grandes corporaciones.',
        iconName: 'Gem',
        pricing: [
             {
                duration: 'monthly',
                price: '$50.000',
                priceDetail: 'por mes',
                priceAmount: 50000,
                discount: undefined,
                features: [
                    'Todo lo del plan Empresa Plus',
                    'Integración con ATS de la empresa',
                    'Soporte prioritario y SLA dedicado',
                    'Reportes de mercado personalizados',
                ],
            },
        ]
    },
];
