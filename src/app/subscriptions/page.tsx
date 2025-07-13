
'use client';

import { Header } from '@/components/layout/header';
import { Footer } from '@/components/layout/footer';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { CheckCircle, Star, Briefcase, Zap } from 'lucide-react';
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
import { useToast } from '@/components/ui/use-toast';


const plans = [
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
        description: 'Para empezar a buscar',
        priceAmount: 0,
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
        description: 'Para profesionales serios',
        priceAmount: 2000,
    },
    {
        name: 'Empresa',
        price: '$10.000',
        priceDetail: 'por mes',
        features: [
            'Publica hasta 10 ofertas de trabajo',
            'Acceso a base de datos de candidatos',
            'Dashboard de seguimiento de postulantes',
            'Soporte dedicado 24/7',
        ],
        isPopular: false,
        userType: 'company',
        description: 'Para empresas que contratan',
        priceAmount: 10000,
    },
]

function PaymentModal({ planName, planPrice, planPriceAmount, userType }: { planName: string, planPrice: string, planPriceAmount: number, userType: string }) {
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
        // 1. Llamar a la API de backend para crear la preferencia de pago
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

        // 2. Aquí es donde se redirigiría al checkout de Mercado Pago
        // En un escenario real, usarías el SDK de Frontend de Mercado Pago con el preference.id
        // Ejemplo:
        // const mp = new MercadoPago(process.env.NEXT_PUBLIC_MERCADOPAGO_PUBLIC_KEY);
        // mp.checkout({ preference: { id: preference.id }, render: { container: '.checkout-container' } });
        // O simplemente redirigir: window.location.href = preference.init_point;
        
        console.log('Preferencia de pago creada:', preference.id);
        toast({
          title: "Redirigiendo a Mercado Pago...",
          description: `ID de Preferencia: ${preference.id}. En una app real, serías redirigido.`,
        });

        // Simulación de éxito para el prototipo
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
          <Button className="w-full">
            <Zap className="mr-2 h-4 w-4" />
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
                      <Button onClick={handlePayment} disabled={isPaying || planPriceAmount <= 0}>
                        {isPaying ? (
                          <>
                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                            Procesando...
                          </>
                        ) : (
                          <>
                            <CreditCard className="mr-2 h-4 w-4" />
                             Pagar {planPriceAmount > 0 ? 'con Mercado Pago' : 'Confirmar'}
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

export default function SubscriptionsPage() {
  return (
    <div className="flex flex-col min-h-screen bg-transparent">
      <Header />
      <main className="flex-1 container mx-auto py-12 px-4">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold tracking-tight">Planes y Precios</h1>
          <p className="text-lg text-muted-foreground mt-2">
            Elige el plan que mejor se adapte a tus necesidades para encontrar trabajo o talento.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
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
                    <CardHeader className="text-center pt-8">
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
                                <li key={index} className="flex items-center gap-2">
                                    <CheckCircle className="h-5 w-5 text-green-500" />
                                    <span>{feature}</span>
                                </li>
                            ))}
                        </ul>
                    </CardContent>
                    <CardFooter>
                        <PaymentModal planName={plan.name} planPrice={plan.price} planPriceAmount={plan.priceAmount} userType={plan.userType} />
                    </CardFooter>
                </Card>
            ))}
        </div>
      </main>
      <Footer />
    </div>
  );
}
