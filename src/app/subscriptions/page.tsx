
'use client';

import { Header } from '@/components/layout/header';
import { Footer } from '@/components/layout/footer';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { CheckCircle, Star, Briefcase, Zap, Edit, Trash2, PlusCircle, Building } from 'lucide-react';
import React from 'react';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import Image from "next/image";
import { Loader2, Sparkles, CreditCard } from "lucide-react";
import { cn } from '@/lib/utils';
import { Badge } from '@/components/ui/badge';
import { useSession } from '@/hooks/use-session';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel';
import { useToast } from "@/components/ui/use-toast";

const allPlans = [
    {
        name: 'Básico',
        price: 'Gratis',
        priceDetail: 'para siempre',
        features: [
            'Hasta 5 postulaciones por mes',
            'Perfil público básico',
            'Acceso a todas las ofertas',
        ],
        isPopular: false,
        userType: 'worker',
        description: 'Ideal para empezar tu búsqueda laboral.',
        priceAmount: 0,
        icon: Briefcase,
    },
    {
        name: 'Profesional',
        price: '$2.000',
        priceDetail: 'por mes',
        features: [
            'Postulaciones ilimitadas',
            'Perfil destacado en búsquedas',
            'Acceso a estadísticas de perfil',
            'Soporte prioritario por email',
        ],
        isPopular: true,
        userType: 'worker',
        description: 'Potencia tu perfil y destaca sobre los demás.',
        priceAmount: 2000,
        icon: Star,
    },
    {
        name: 'Empresa',
        price: '$10.000',
        priceDetail: 'por mes',
        features: [
            'Publica hasta 5 ofertas de trabajo',
            'Acceso a base de datos de candidatos',
            'Dashboard de seguimiento de postulantes',
            'Soporte por email',
        ],
        isPopular: false,
        userType: 'company',
        description: 'Perfecto para pequeñas y medianas empresas.',
        priceAmount: 10000,
        icon: Building,
    },
    {
        name: 'Empresa Plus',
        price: '$25.000',
        priceDetail: 'por mes',
        features: [
            'Publicaciones ilimitadas',
            'Destaca hasta 5 ofertas de trabajo',
            'Herramientas avanzadas de filtrado',
            'Soporte dedicado 24/7',
        ],
        isPopular: true,
        userType: 'company',
        description: 'La solución completa para grandes reclutadores.',
        priceAmount: 25000,
        icon: Zap,
    },
];

function PaymentModal({ planName, planPrice, planPriceAmount, userType, isPopular }: { planName: string, planPrice: string, planPriceAmount: number, userType: string, isPopular: boolean }) {
    const [isPaying, setIsPaying] = React.useState(false);
    const [paymentSuccess, setPaymentSuccess] = React.useState(false);
    const { toast } = useToast();
  
    const handlePayment = async () => {
      if(planPriceAmount <= 0) {
        setPaymentSuccess(true);
        return;
      }

      setIsPaying(true);
      try {
        const response = await fetch('/api/mercadopago/create-preference', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                title: `Suscripción Plan ${planName}`,
                unit_price: planPriceAmount,
            }),
        });

        if (!response.ok) {
            throw new Error('Failed to create payment preference');
        }

        const preference = await response.json();
        
        console.log('Preferencia de pago creada:', preference.id);
        toast({
          title: "Redirigiendo a Mercado Pago...",
          description: `ID de Preferencia: ${preference.id}. En una app real, serías redirigido.`,
        });

        setTimeout(() => {
          setIsPaying(false);
          setPaymentSuccess(true);
        }, 2000);

      } catch (error) {
        console.error(error);
        toast({
          title: "Error al procesar el pago",
          description: "No se pudo crear la preferencia de pago. Intenta de nuevo.",
          variant: "destructive"
        })
        setIsPaying(false);
      }
    };
  
    return (
       <AlertDialog onOpenChange={() => { setIsPaying(false); setPaymentSuccess(false); }}>
        <AlertDialogTrigger asChild>
          <Button className="w-full" size="lg" variant={isPopular ? 'default' : 'outline'}>
            {planPriceAmount === 0 ? 'Comenzar Ahora' : 'Contratar Plan'}
          </Button>
        </AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
              {paymentSuccess ? (
                <div className="text-center py-4">
                  <Sparkles className="h-12 w-12 text-green-500 mx-auto mb-2"/>
                  <AlertDialogTitle>¡Suscripción Activada!</AlertDialogTitle>
                  <AlertDialogDescription>Tu plan {planName} ha sido activado.</AlertDialogDescription>
                </div>
              ) : (
                <>
                    <AlertDialogTitle className="flex items-center gap-2">
                        <Image src="https://www.mercadopago.com.ar/static/logo-lila.svg" alt="Mercado Pago" width={120} height={28} data-ai-hint="company logo"/>
                        Confirmar Pago
                    </AlertDialogTitle>
                    <AlertDialogDescription>
                        Estás a punto de suscribirte al <strong>Plan {planName}</strong> por <span className="font-bold text-foreground">{planPrice}/mes</span>.
                    </AlertDialogDescription>
                </>
              )}
          </AlertDialogHeader>
          <AlertDialogFooter>
              {paymentSuccess ? (
                  <AlertDialogCancel>Cerrar</AlertDialogCancel>
              ) : (
                  <>
                      <AlertDialogCancel disabled={isPaying}>Cancelar</AlertDialogCancel>
                      <Button onClick={handlePayment} disabled={planPriceAmount < 0}>
                        {isPaying ? (
                          <>
                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                            Procesando...
                          </>
                        ) : (
                          <>
                            <CreditCard className="mr-2 h-4 w-4" />
                             {planPriceAmount > 0 ? 'Pagar con Mercado Pago' : 'Confirmar'}
                          </>
                        )}
                      </Button>
                  </>
              )}
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    )
}

function AdminPlanView() {
    const { toast } = useToast();
    const [plans, setPlans] = React.useState(allPlans);

    const handleDelete = (planName: string) => {
        toast({
            title: "Plan Eliminado",
            description: `El plan "${planName}" ha sido eliminado.`,
            variant: "destructive",
        })
    }
    
    return (
        <main className="flex-1 container mx-auto py-12 px-4">
        <div className="flex items-center justify-between mb-12">
            <div className='flex-1'>
                <h1 className="text-4xl font-bold tracking-tight">Administrar Planes</h1>
                <p className="text-lg text-muted-foreground mt-2">
                Crea, edita o elimina los planes de suscripción de la plataforma.
                </p>
            </div>
            <Button size="lg">
                <PlusCircle className="mr-2 h-5 w-5"/>
                Crear Nuevo Plan
            </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {plans.map((plan) => (
                <Card key={plan.name} className={cn(
                    "flex flex-col",
                    plan.isPopular && "border-primary shadow-2xl relative"
                )}>
                    {plan.isPopular && (
                        <div className="absolute top-0 -translate-y-1/2 w-full flex justify-center">
                            <Badge className="bg-primary text-primary-foreground text-sm py-1 px-4 font-bold flex items-center gap-1">
                                <Star className="h-4 w-4"/>
                                MÁS POPULAR
                            </Badge>
                        </div>
                    )}
                    <CardHeader className="text-center pt-10">
                        <div className="mx-auto bg-secondary p-3 rounded-full w-fit mb-2">
                            <plan.icon className="h-6 w-6 text-primary" />
                        </div>
                        <CardTitle className="text-2xl">{plan.name}</CardTitle>
                        <CardDescription>{plan.description}</CardDescription>
                    </CardHeader>
                    <CardContent className="flex-grow space-y-6">
                        <div className="text-center">
                            <span className="text-4xl font-bold">{plan.price}</span>
                            <span className="text-muted-foreground"> {plan.priceDetail}</span>
                        </div>
                        <ul className="space-y-3 text-sm">
                            {plan.features.map((feature, index) => (
                                <li key={index} className="flex items-start gap-3">
                                    <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 shrink-0" />
                                    <span>{feature}</span>
                                </li>
                            ))}
                        </ul>
                    </CardContent>
                    <CardFooter className='flex gap-2'>
                       <Button variant="outline" className='w-full'>
                            <Edit className='mr-2 h-4 w-4' />
                            Editar
                       </Button>
                       <Button variant="destructive" className='w-full' onClick={() => handleDelete(plan.name)}>
                            <Trash2 className='mr-2 h-4 w-4'/>
                            Eliminar
                       </Button>
                    </CardFooter>
                </Card>
            ))}
        </div>
      </main>
    )
}

function CustomerPlanView() {
    const { session } = useSession();
    const userRole = session.user?.role;

    const visiblePlans = allPlans.filter(plan => {
        if (userRole === 'user') return plan.userType === 'worker';
        if (userRole === 'company') return plan.userType === 'company';
        return true; 
    });

    const title = userRole === 'company' ? 'Planes para Empresas' : 'Planes para Candidatos';
    const description = userRole === 'company' 
        ? 'Elige el plan ideal para encontrar el mejor talento para tu equipo.'
        : 'Elige el plan que mejor se adapte a tus necesidades para encontrar trabajo.';

    return (
      <main className="flex-1 container mx-auto py-12 px-4">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold tracking-tight md:text-5xl">{title}</h1>
          <p className="text-lg text-muted-foreground mt-4 max-w-2xl mx-auto">
            {description}
          </p>
        </div>

        <Carousel 
            className="w-full max-w-sm md:max-w-xl lg:max-w-2xl mx-auto"
            opts={{
                align: "start",
                loop: false,
            }}
        >
            <CarouselContent>
                {visiblePlans.map((plan, index) => (
                    <CarouselItem key={index} className="md:basis-1/2">
                         <div className="p-1">
                            <Card className={cn(
                                "flex flex-col h-full transition-all duration-300",
                                plan.isPopular && "border-2 border-primary shadow-2xl"
                            )}>
                                {plan.isPopular && (
                                    <div className="w-full flex justify-center">
                                        <Badge className="bg-primary text-primary-foreground text-sm py-1 px-4 font-bold -mt-3.5 flex items-center gap-1 z-10">
                                            <Star className="h-4 w-4"/>
                                            MÁS POPULAR
                                        </Badge>
                                    </div>
                                )}
                                <CardHeader className="text-center pt-8">
                                    <div className="mx-auto bg-secondary p-4 rounded-full w-fit mb-4">
                                        <plan.icon className="h-8 w-8 text-primary" />
                                    </div>
                                    <CardTitle className="text-3xl">{plan.name}</CardTitle>
                                    <CardDescription className="text-base">{plan.description}</CardDescription>
                                </CardHeader>
                                <CardContent className="flex-grow space-y-6">
                                    <div className="text-center">
                                        <span className="text-5xl font-bold">{plan.price}</span>
                                        <span className="text-muted-foreground text-lg"> {plan.priceDetail}</span>
                                    </div>
                                    <ul className="space-y-4 text-base">
                                        {plan.features.map((feature, index) => (
                                            <li key={index} className="flex items-start gap-3">
                                                <CheckCircle className="h-6 w-6 text-green-500 mt-0.5 shrink-0" />
                                                <span>{feature}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </CardContent>
                                <CardFooter>
                                    <PaymentModal 
                                        planName={plan.name} 
                                        planPrice={plan.price} 
                                        planPriceAmount={plan.priceAmount} 
                                        userType={plan.userType}
                                        isPopular={plan.isPopular || false}
                                     />
                                </CardFooter>
                            </Card>
                         </div>
                    </CarouselItem>
                ))}
            </CarouselContent>
            <CarouselPrevious className="hidden md:flex"/>
            <CarouselNext className="hidden md:flex"/>
        </Carousel>
      </main>
    )
}


export default function SubscriptionsPage() {
  const { session } = useSession();

  if (!session.isMounted) {
    return (
        <div className="flex flex-col min-h-screen bg-transparent">
          <Header />
            <div className='flex-1 flex items-center justify-center'>
                <Loader2 className="h-8 w-8 animate-spin" />
            </div>
          <Footer />
        </div>
    );
  }

  const isAdmin = session.user?.role === 'admin';

  return (
    <div className="flex flex-col min-h-screen bg-transparent">
      <Header />
        {isAdmin ? <AdminPlanView /> : <CustomerPlanView />}
      <Footer />
    </div>
  );
}
