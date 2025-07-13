
'use client';

import { Header } from '@/components/layout/header';
import { Footer } from '@/components/layout/footer';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { CheckCircle, Star, Briefcase, Zap, Edit, Trash2, PlusCircle, Building, Award, LucideIcon, icons } from 'lucide-react';
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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { allPlans } from '@/lib/data';
import type { SubscriptionPlan, PricingOption } from '@/lib/types';


function PaymentModal({ planName, pricingOption, isPopular }: { planName: string, pricingOption: PricingOption, isPopular: boolean }) {
    const [isPaying, setIsPaying] = React.useState(false);
    const [paymentSuccess, setPaymentSuccess] = React.useState(false);
    const { toast } = useToast();
  
    const handlePayment = async () => {
      if(pricingOption.priceAmount <= 0) {
        setPaymentSuccess(true);
        return;
      }

      setIsPaying(true);
      try {
        const response = await fetch('/api/mercadopago/create-preference', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                title: `Suscripción Plan ${planName} (${pricingOption.duration})`,
                unit_price: pricingOption.priceAmount,
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

    const totalAmount = pricingOption.priceAmount.toLocaleString('es-AR', { style: 'currency', currency: 'ARS' });
    const durationText = {
        monthly: 'por 1 mes',
        quarterly: 'por 3 meses',
        'semi-annually': 'por 6 meses'
    }[pricingOption.duration];

    return (
       <AlertDialog onOpenChange={() => { setIsPaying(false); setPaymentSuccess(false); }}>
        <AlertDialogTrigger asChild>
          <Button className="w-full" size="lg" variant={isPopular ? 'default' : 'outline'}>
            {pricingOption.priceAmount === 0 ? 'Comenzar Ahora' : 'Contratar Plan'}
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
                        Estás a punto de suscribirte al <strong>Plan {planName}</strong>.
                        Se realizará un pago único de <span className="font-bold text-foreground">{totalAmount}</span> {durationText}.
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
                      <Button onClick={handlePayment} disabled={pricingOption.priceAmount < 0}>
                        {isPaying ? (
                          <>
                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                            Procesando...
                          </>
                        ) : (
                          <>
                            <CreditCard className="mr-2 h-4 w-4" />
                             {pricingOption.priceAmount > 0 ? 'Pagar con Mercado Pago' : 'Confirmar'}
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
    const [plans, setPlans] = React.useState<SubscriptionPlan[]>(allPlans);

    const handleDelete = (planName: string) => {
        setPlans(plans.filter(p => p.name !== planName));
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
            {plans.map((plan) => {
                const Icon = icons[plan.iconName] as LucideIcon;
                return (
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
                                <Icon className="h-6 w-6 text-primary" />
                            </div>
                            <CardTitle className="text-2xl">{plan.name}</CardTitle>
                            <CardDescription>{plan.description}</CardDescription>
                        </CardHeader>
                        <CardContent className="flex-grow space-y-6">
                            <div className="text-center">
                                <span className="text-4xl font-bold">{plan.pricing[0].price}</span>
                                <span className="text-muted-foreground"> {plan.pricing[0].priceDetail}</span>
                            </div>
                            <ul className="space-y-3 text-sm">
                                {plan.pricing[0].features.map((feature, index) => (
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
                );
            })}
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
            className="w-full max-w-sm md:max-w-xl lg:max-w-4xl mx-auto"
            opts={{
                align: "start",
                loop: false,
            }}
        >
            <CarouselContent className="-ml-4">
                {visiblePlans.map((plan, index) => {
                    const Icon = icons[plan.iconName] as LucideIcon;
                    return (
                        <CarouselItem key={index} className="pl-4 md:basis-1/2">
                            <div className="p-1 h-full">
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
                                            <Icon className="h-8 w-8 text-primary" />
                                        </div>
                                        <CardTitle className="text-3xl">{plan.name}</CardTitle>
                                        <CardDescription className="text-base">{plan.description}</CardDescription>
                                    </CardHeader>

                                    <Tabs defaultValue={plan.pricing[0].duration} className="w-full flex-grow flex flex-col">
                                        <CardContent className="flex-grow space-y-6">
                                            {plan.pricing.length > 1 && (
                                                <TabsList className="grid w-full grid-cols-3">
                                                    <TabsTrigger value="monthly">Mensual</TabsTrigger>
                                                    <TabsTrigger value="quarterly">3 Meses</TabsTrigger>
                                                    <TabsTrigger value="semi-annually">6 Meses</TabsTrigger>
                                                </TabsList>
                                            )}

                                            {plan.pricing.map((option) => (
                                                <TabsContent key={option.duration} value={option.duration} className="m-0 flex-grow flex flex-col justify-between">
                                                    <div>
                                                        <div className="text-center relative">
                                                            {option.discount && (
                                                                <Badge variant="destructive" className="absolute -top-2 right-0 rotate-12">
                                                                    {option.discount}
                                                                </Badge>
                                                            )}
                                                            <span className="text-5xl font-bold">{option.price}</span>
                                                            <span className="text-muted-foreground text-lg"> {option.priceDetail}</span>
                                                        </div>
                                                        <ul className="space-y-4 text-base mt-6">
                                                            {option.features.map((feature, idx) => (
                                                                <li key={idx} className="flex items-start gap-3">
                                                                    {feature.toLowerCase().startsWith('todo lo del') ? 
                                                                        <Award className="h-6 w-6 text-amber-400 mt-0.5 shrink-0" /> :
                                                                        <CheckCircle className="h-6 w-6 text-green-500 mt-0.5 shrink-0" />
                                                                    }
                                                                    <span>{feature}</span>
                                                                </li>
                                                            ))}
                                                        </ul>
                                                    </div>
                                                    <div className="pt-6">
                                                        <PaymentModal 
                                                            planName={plan.name} 
                                                            pricingOption={option}
                                                            isPopular={plan.isPopular || false}
                                                        />
                                                    </div>
                                                </TabsContent>
                                            ))}
                                        </CardContent>
                                    </Tabs>
                                </Card>
                            </div>
                        </CarouselItem>
                    );
                })}
            </CarouselContent>
            <CarouselPrevious className="hidden lg:flex"/>
            <CarouselNext className="hidden lg:flex"/>
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
