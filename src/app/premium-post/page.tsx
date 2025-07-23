
'use client';

import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowLeft, CheckCircle, Sparkles, Loader2, CreditCard } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useToast } from '@/components/ui/use-toast';
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import Image from "next/image";

function PremiumPostPaymentModal() {
    const { toast } = useToast();
    const router = useRouter();
    const [isPaying, setIsPaying] = React.useState(false);
    const [paymentSuccess, setPaymentSuccess] = React.useState(false);

    const handlePayment = async () => {
        setIsPaying(true);
        try {
            const adminToken = localStorage.getItem('mp_access_token');
            if (!adminToken) {
                throw new Error('El Access Token de Mercado Pago no está configurado por el administrador.');
            }
            
            const response = await fetch('/api/mercadopago/create-preference', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    title: `Publicación de Vacante Premium`,
                    unit_price: 500,
                    accessToken: adminToken,
                }),
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.error || 'No se pudo crear la preferencia de pago.');
            }
            
            const preference = await response.json();
            
            // En una app real, aquí es donde redirigirías al usuario a la URL de pago.
            // window.location.href = preference.init_point;

            console.log('Preferencia de pago creada:', preference.id);
            toast({
                title: "Redirigiendo a Mercado Pago...",
                description: `ID de Preferencia: ${preference.id}. En una app real, serías redirigido.`,
            });
            
            // Simulación del proceso de pago exitoso para el prototipo
            setTimeout(() => {
                setIsPaying(false);
                setPaymentSuccess(true);
                toast({
                    title: "¡Pago Exitoso!",
                    description: "Serás redirigido al panel para crear tu vacante destacada.",
                    duration: 3000,
                });
                setTimeout(() => router.push('/company/dashboard'), 2000);
            }, 2000);

        } catch (error) {
            console.error(error);
            const errorMessage = error instanceof Error ? error.message : "Error desconocido";
            toast({
                title: "Error al procesar el pago",
                description: errorMessage,
                variant: "destructive"
            });
            setIsPaying(false);
        }
    };
    
    return (
        <AlertDialog onOpenChange={(open) => !open && setPaymentSuccess(false)}>
            <AlertDialogTrigger asChild>
                <Button size="lg" className="w-full mt-4">
                    <Sparkles className="mr-2 h-5 w-5" />
                    Destacar mi Vacante por ARS $500
                </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
                <AlertDialogHeader>
                    {paymentSuccess ? (
                        <div className="text-center py-4">
                            <Sparkles className="h-12 w-12 text-green-500 mx-auto mb-2"/>
                            <AlertDialogTitle>¡Pago exitoso!</AlertDialogTitle>
                            <AlertDialogDescription>Serás redirigido para crear tu vacante destacada.</AlertDialogDescription>
                        </div>
                    ) : (
                        <>
                            <AlertDialogTitle className="flex items-center gap-2">
                                <Image src="https://www.mercadopago.com.ar/static/logo-lila.svg" alt="Mercado Pago" width={120} height={28} data-ai-hint="company logo"/>
                                Confirmar Pago
                            </AlertDialogTitle>
                            <AlertDialogDescription>
                                Estás a punto de pagar <span className="font-bold text-foreground">ARS $500.00</span> para destacar una publicación por 30 días.
                            </AlertDialogDescription>
                        </>
                    )}
                </AlertDialogHeader>
                <AlertDialogFooter>
                    {paymentSuccess ? (
                        <AlertDialogCancel onClick={() => router.push('/company/dashboard')}>Cerrar</AlertDialogCancel>
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
                                    Pagar ahora
                                </>
                                )}
                            </Button>
                        </>
                    )}
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    );
}


export default function PremiumPostPage() {
    const router = useRouter();
    const features = [
        "Tu anuncio en la página principal.",
        "Posicionamiento superior en búsquedas.",
        "Insignia 'Destacado' para máxima atracción.",
        "Mayor visibilidad durante 30 días."
    ];

    return (
    <div className="flex flex-col min-h-screen bg-transparent">
        <main className="flex-1 container mx-auto py-12 px-4">
            <div className="mb-6">
                <Button variant="outline" onClick={() => router.back()} className="flex items-center gap-2">
                    <ArrowLeft className="h-4 w-4" />
                    Volver
                </Button>
            </div>
            <div className="flex items-center justify-center">
                 <div className="w-full max-w-2xl card-neon-border rounded-lg">
                    <Card className="bg-transparent border-0">
                        <CardHeader className="text-center">
                            <Sparkles className="mx-auto h-12 w-12 text-amber-400 mb-2" />
                            <CardTitle className="text-3xl">Publica una Vacante Destacada</CardTitle>
                            <CardDescription className="text-lg">
                                Atrae al mejor talento dándole a tu oferta la visibilidad que merece.
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-6">
                             <div className="text-center">
                                <span className="text-5xl font-bold text-primary">ARS $500</span>
                                <p className="text-muted-foreground">Pago único por 30 días</p>
                            </div>
                            <ul className="space-y-3 text-lg">
                                {features.map((feature, index) => (
                                    <li key={index} className="flex items-center gap-3">
                                        <CheckCircle className="h-6 w-6 text-green-500 shrink-0" />
                                        <span>{feature}</span>
                                    </li>
                                ))}
                            </ul>
                        </CardContent>
                        <CardFooter>
                           <PremiumPostPaymentModal />
                        </CardFooter>
                    </Card>
                </div>
            </div>
        </main>
    </div>
  );
}
