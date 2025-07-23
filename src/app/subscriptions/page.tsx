
'use client';

import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { CheckCircle, Star, Briefcase, Zap, Edit, Trash2, PlusCircle, Building, Award, LucideIcon, icons, Gem, ArrowLeft } from 'lucide-react';
import React, { useContext } from 'react';
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
import type { SubscriptionPlan, PricingOption } from '@/lib/types';
import { getAllPlans } from '@/services/planService';
import { UserProfileContext } from '@/context/user-profile-context';
import { updateUser } from '@/services/userService';
import { useRouter } from 'next/navigation';


function PaymentModal({ plan, pricingOption }: { plan: SubscriptionPlan, pricingOption: PricingOption }) {
    const { session } = useSession();
    const { setProfileData } = useContext(UserProfileContext);
    const [isPaying, setIsPaying] = React.useState(false);
    const [paymentSuccess, setPaymentSuccess] = React.useState(false);
    const { toast } = useToast();
    const router = useRouter();
  
    const activateSubscription = async () => {
        if (!session.user || plan.planType === 'one-time') return;
        
        const durationMap = {
            monthly: 1,
            quarterly: 3,
            'semi-annually': 6
        };
        const expiryDate = new Date();
        expiryDate.setMonth(expiryDate.getMonth() + durationMap[pricingOption.duration]);

        const updatedUser = await updateUser(session.user.id, {
            subscriptionPlan: plan.name,
            subscriptionUntil: expiryDate.toISOString(),
        });

        if (updatedUser) {
            setProfileData(updatedUser);
        }
    };

    const handlePayment = async () => {
      if(pricingOption.priceAmount <= 0) {
        await activateSubscription();
        setPaymentSuccess(true);
        return;
      }
      
      const companyToken = localStorage.getItem('company_mp_access_token');
      if (!companyToken) {
          toast({
              title: "Error de Configuración",
              description: "La empresa no ha configurado una cuenta de Mercado Pago para recibir pagos.",
              variant: "destructive"
          });
          return;
      }

      setIsPaying(true);
      try {
        const response = await fetch('/api/mercadopago/create-preference', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                title: `Suscripción Plan ${plan.name} (${pricingOption.duration})`,
                unit_price: pricingOption.priceAmount,
                accessToken: companyToken,
            }),
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.error || 'No se pudo crear la preferencia de pago.');
        }

        const preference = await response.json();
        
        // En una app real, rediriges al usuario.
        // window.location.href = preference.init_point;
        
        console.log('Preferencia de pago creada:', preference.id);
        toast({
          title: "Redirigiendo a Mercado Pago...",
          description: `ID de Preferencia: ${preference.id}. En una app real, serías redirigido.`,
        });

        // Simulación del proceso de pago exitoso
        setTimeout(async () => {
          if (plan.planType !== 'one-time') {
            await activateSubscription();
          }
          setIsPaying(false);
          setPaymentSuccess(true);
           if (plan.planType === 'one-time' && plan.userType === 'company') {
              setTimeout(() => router.push('/company/dashboard'), 2000);
           }
        }, 2000);

      } catch (error) {
        console.error(error);
        const errorMessage = error instanceof Error ? error.message : "Error desconocido";
        toast({
          title: "Error al procesar el pago",
          description: errorMessage,
          variant: "destructive"
        })
        setIsPaying(false);
      }
    };

    const totalAmount = pricingOption.priceAmount.toLocaleString('es-AR', { style: 'currency', currency: 'ARS' });

    let successTitle = '¡Suscripción Activada!';
    let successDescription = `Tu plan ${plan.name} ha sido activado.`;

    if (plan.planType === 'one-time') {
      successTitle = '¡Pago Exitoso!';
      if (plan.userType === 'company') {
        successDescription = 'Serás redirigido para crear tu vacante destacada.';
      } else {
        successDescription = 'Tu beneficio ha sido activado.';
      }
    }


    return (
       <AlertDialog onOpenChange={() => { setIsPaying(false); setPaymentSuccess(false); }}>
        <AlertDialogTrigger asChild>
          <Button className="w-full" size="lg" variant={plan.isPopular ? 'default' : 'outline'}>
            {pricingOption.priceAmount === 0 ? 'Comenzar Ahora' : 'Contratar Plan'}
          </Button>
        </AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
              {paymentSuccess ? (
                <div className="text-center py-4">
                  <Sparkles className="h-12 w-12 text-green-500 mx-auto mb-2"/>
                  <AlertDialogTitle>{successTitle}</AlertDialogTitle>
                  <AlertDialogDescription>{successDescription}</AlertDialogDescription>
                </div>
              ) : (
                <>
                    <AlertDialogTitle className="flex items-center gap-2">
                        <Image src="https://www.mercadopago.com.ar/static/logo-lila.svg" alt="Mercado Pago" width={120} height={28} data-ai-hint="company logo"/>
                        Confirmar Pago
                    </AlertDialogTitle>
                    <AlertDialogDescription>
                        Estás a punto de adquirir el <strong>Plan {plan.name}</strong>.
                        {pricingOption.priceAmount > 0 ? (
                            <> Se realizará un pago único de <span className="font-bold text-foreground">{totalAmount}</span>.</>
                        ) : (
                            <> Activarás el plan gratuito.</>
                        )}
                    </AlertDialogDescription>
                </>
              )}
          </AlertDialogHeader>
          <AlertDialogFooter>
              {paymentSuccess ? (
                  <AlertDialogCancel onClick={() => {if(plan.planType === 'one-time' && plan.userType === 'company') router.push('/company/dashboard')}}>Cerrar</AlertDialogCancel>
              ) : (
                  <>
                      <AlertDialogCancel disabled={isPaying}>Cancelar</AlertDialogCancel>
                      <Button onClick={handlePayment} disabled={isPaying}>
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
    const router = useRouter();
    const [plans, setPlans] = React.useState<SubscriptionPlan[]>([]);
    
    React.useEffect(() => {
        getAllPlans().then(setPlans);
    }, []);

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
        <div className="flex items-start justify-between mb-12 gap-4">
            <div>
                 <Button variant="outline" onClick={() => router.back()} className="flex items-center gap-2 mb-4">
                    <ArrowLeft className="h-4 w-4" />
                    Volver al Panel
                </Button>
                <h1 className="text-4xl font-bold tracking-tight">Administrar Planes</h1>
                <p className="text-lg text-muted-foreground mt-2">
                Crea, edita o elimina los planes de suscripción de la plataforma.
                </p>
            </div>
            <Button size="lg" className='mt-10'>
                <PlusCircle className="mr-2 h-5 w-5"/>
                Crear Nuevo Plan
            </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {plans.length === 0 ? (
                <div className="col-span-full flex justify-center items-center h-64">
                    <Loader2 className="h-8 w-8 animate-spin" />
                </div>
             ) : plans.map((plan) => {
                const Icon = icons[plan.iconName] as LucideIcon;
                return (
                    <div key={plan.name} className="h-full">
                        <Card className={cn(
                            "flex flex-col h-full",
                            plan.isPopular && "relative border shadow-[0_0_15px_hsl(var(--primary)/0.6)] border-primary/50",
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
                            <CardFooter className='flex gap-2 mt-auto'>
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
                    </div>
                );
            })}
        </div>
      </main>
    )
}

function CustomerPlanView() {
    const { session } = useSession();
    const router = useRouter();
    const userRole = session.user?.role === 'EMPRESA' ? 'company' : 'worker';
    const [allPlans, setAllPlans] = React.useState<SubscriptionPlan[]>([]);
    
    React.useEffect(() => {
        getAllPlans().then(setAllPlans);
    }, []);
    
    const visiblePlans = React.useMemo(() => {
        return allPlans.filter(plan => plan.userType === userRole);
    }, [allPlans, userRole]);

    const title = userRole === 'company' ? 'Planes para Empresas' : 'Planes para Candidatos';
    const description = userRole === 'company' 
        ? 'Elige el plan ideal para encontrar el mejor talento para tu equipo.'
        : 'Elige el plan que mejor se adapte a tus necesidades para encontrar trabajo.';

    return (
      <main className="flex-1 container mx-auto py-12 px-4">
         <div className="mb-6">
            <Button variant="outline" onClick={() => router.back()} className="flex items-center gap-2">
                <ArrowLeft className="h-4 w-4" />
                Volver
            </Button>
        </div>
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold tracking-tight md:text-5xl">{title}</h1>
          <p className="text-lg text-muted-foreground mt-4 max-w-2xl mx-auto">
            {description}
          </p>
        </div>

         {allPlans.length === 0 ? (
            <div className="col-span-full flex justify-center items-center h-64">
                <Loader2 className="h-8 w-8 animate-spin" />
            </div>
         ) : (
            <Carousel 
                className="w-full max-w-sm md:max-w-4xl lg:max-w-6xl mx-auto"
                opts={{
                    align: "start",
                    loop: false,
                }}
            >
                <CarouselContent className="-ml-4">
                    {visiblePlans.map((plan, index) => {
                        const Icon = icons[plan.iconName] as LucideIcon;
                        const isOneTimePurchase = plan.planType === 'one-time';
                        const cardBorderClass = isOneTimePurchase ? 'card-marble-border' : 'card-neon-border';
                        
                        return (
                            <CarouselItem key={index} className="pl-4 md:basis-1/2 lg:basis-1/3">
                                <div className={cn("p-1 h-full rounded-lg", cardBorderClass)}>
                                    <Card className={cn(
                                        "flex flex-col h-full transition-all duration-300 dark bg-transparent border-0",
                                        plan.isPopular && "relative",
                                        isOneTimePurchase && 'border-2 border-sky-400/50'
                                    )}>
                                        {plan.isPopular && (
                                            <div className="w-full flex justify-center">
                                                <Badge className="bg-primary text-primary-foreground text-sm py-1 px-4 font-bold -mt-4 flex items-center gap-1 z-10">
                                                    <Star className="h-4 w-4"/>
                                                    MÁS POPULAR
                                                </Badge>
                                            </div>
                                        )}
                                        {isOneTimePurchase && (
                                            <div className="w-full flex justify-center">
                                                 <Badge className="bg-sky-400 text-sky-950 text-sm py-1 px-4 font-bold -mt-4 flex items-center gap-1 z-10">
                                                    <Sparkles className="h-4 w-4"/>
                                                    PAGO ÚNICO
                                                </Badge>
                                            </div>
                                        )}
                                        <CardHeader className="text-center pt-8">
                                            <div className={cn("mx-auto bg-secondary p-4 rounded-full w-fit mb-4", isOneTimePurchase && "bg-sky-400/10")}>
                                                <Icon className={cn("h-8 w-8 text-primary", isOneTimePurchase && "text-sky-400")} />
                                            </div>
                                            <CardTitle className="text-3xl">{plan.name}</CardTitle>
                                            <CardDescription className="text-base h-10">{plan.description}</CardDescription>
                                        </CardHeader>

                                        <Tabs defaultValue={plan.pricing[0].duration} className="w-full flex-grow flex flex-col">
                                            <CardContent className="flex-grow flex flex-col space-y-6">
                                                {plan.pricing.length > 1 && (
                                                    <TabsList className="grid w-full grid-cols-3 mx-auto max-w-[90%]">
                                                        <TabsTrigger value="monthly">Mensual</TabsTrigger>
                                                        <TabsTrigger value="quarterly">3 Meses</TabsTrigger>
                                                        <TabsTrigger value="semi-annually">6 Meses</TabsTrigger>
                                                    </TabsList>
                                                )}

                                                {plan.pricing.map((option) => (
                                                    <TabsContent key={option.duration} value={option.duration} className="m-0 flex-grow flex flex-col justify-between">
                                                        <div>
                                                            <div className="text-center relative my-4">
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
                                                        <div className="pt-6 mt-auto">
                                                            <PaymentModal 
                                                                plan={plan}
                                                                pricingOption={option}
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
        )}
      </main>
    )
}


export default function SubscriptionsPage() {
  const { session } = useSession();

  if (!session.isMounted) {
    return (
        <div className="flex flex-col min-h-screen bg-transparent">
            <div className='flex-1 flex items-center justify-center'>
                <Loader2 className="h-8 w-8 animate-spin" />
            </div>
        </div>
    );
  }

  const isAdmin = session.user?.role === 'ADMIN';

  return (
    <div className="flex flex-col min-h-screen bg-transparent">
        {isAdmin ? <AdminPlanView /> : <CustomerPlanView />}
    </div>
  );
}
