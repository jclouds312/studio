
import type { SubscriptionPlan } from '@/lib/types';

export const allPlans: SubscriptionPlan[] = [
    // Worker Plans
    {
        name: 'Postulación Destacada',
        userType: 'worker',
        isPopular: true,
        planType: 'one-time',
        description: 'Asegúrate de que tu postulación sea vista primero por los reclutadores.',
        iconName: 'Sparkles',
        pricing: [{
            duration: 'monthly', // Duration is nominal for one-time
            price: '$500',
            priceDetail: 'pago único',
            priceAmount: 500,
            features: [
                'Tu postulación aparece primera en la lista.',
                'Recibe una insignia de "Candidato Destacado".',
                'Alerta prioritaria para el reclutador.',
                'Ideal para esa oferta que no puedes dejar pasar.',
            ],
        }]
    },
    {
        name: 'Básico',
        userType: 'worker',
        isPopular: false,
        planType: 'subscription',
        description: 'Ideal para empezar tu búsqueda laboral.',
        iconName: 'Briefcase',
        pricing: [{
            duration: 'monthly',
            price: 'Gratis',
            priceDetail: 'para siempre',
            priceAmount: 0,
            features: [
                'Hasta 5 postulaciones por mes.',
                'Perfil público básico.',
                'Acceso a todas las ofertas.',
            ],
        }]
    },
    
    // Company Plans
     {
        name: 'Publicación Premium Única',
        userType: 'company',
        planType: 'one-time',
        isPopular: false,
        description: 'Destaca una única vacante por 30 días.',
        iconName: 'Sparkles',
        pricing: [{
            duration: 'monthly',
            price: '$500',
            priceDetail: 'pago único',
            priceAmount: 500,
            features: [
                'Tu anuncio en la página principal',
                'Posicionamiento superior en búsquedas',
                'Insignia "Destacado" para máxima atracción',
                'Ideal para búsquedas urgentes',
            ],
        }]
    },
    {
        name: 'Empresa',
        userType: 'company',
        isPopular: false,
        planType: 'subscription',
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
        planType: 'subscription',
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
        planType: 'subscription',
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
