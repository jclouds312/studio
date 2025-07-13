
'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Users, Briefcase, DollarSign, Star, Download, Sparkles, CreditCard, Loader2, Code, KeyRound, Separator } from "lucide-react";
import { Button } from "@/components/ui/button";
import { allJobs } from "@/components/job-listings";
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import React from "react";
import Image from "next/image";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { Bar, CartesianGrid, XAxis, BarChart as RechartsBarChart } from "recharts";
import packageJson from '@/../package.json';
import { useToast } from "@/components/ui/use-toast";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";


const chartData = [
  { month: "Enero", users: 186 },
  { month: "Febrero", users: 305 },
  { month: "Marzo", users: 237 },
  { month: "Abril", users: 273 },
  { month: "Mayo", users: 209 },
  { month: "Junio", users: 214 },
]

const chartConfig = {
  users: {
    label: "Usuarios",
    color: "hsl(var(--chart-1))",
  },
} satisfies import("@/components/ui/chart").ChartConfig


export function OverviewTab() {
  const { toast } = useToast();
  const [isPaying, setIsPaying] = React.useState(false);
  const [paymentSuccess, setPaymentSuccess] = React.useState(false);

  const handlePayment = async () => {
    setIsPaying(true);
    try {
      const response = await fetch('/api/mercadopago/create-preference', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title: 'Publicación Destacada',
          unit_price: 500,
        }),
      });

      if (!response.ok) throw new Error('Failed to create payment preference');
      
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

  const handleDownloadBackup = () => {
    const jsonString = `data:text/json;charset=utf-8,${encodeURIComponent(
      JSON.stringify(allJobs, null, 2)
    )}`;
    const link = document.createElement("a");
    link.href = jsonString;
    link.download = "jobs-backup.json";
    link.click();
  };
  
  const handleDownloadPackageJson = () => {
    const jsonString = `data:text/json;charset=utf-8,${encodeURIComponent(
      JSON.stringify(packageJson, null, 2)
    )}`;
    const link = document.createElement("a");
    link.href = jsonString;
    link.download = "package.json";
    link.click();
  };

  return (
    <div className="space-y-8">
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Usuarios Totales
            </CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">1,234</div>
            <p className="text-xs text-muted-foreground">
              +20.1% desde el mes pasado
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Publicaciones Activas
            </CardTitle>
            <Briefcase className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">573</div>
            <p className="text-xs text-muted-foreground">
              +180.1% desde el mes pasado
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Ingresos (Mes)</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">$45,231.89</div>
            <p className="text-xs text-muted-foreground">
              +19% desde el mes pasado
            </p>
          </CardContent>
        </Card>
        <Card>
           <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Copia de Seguridad</CardTitle>
            <Download className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
             <p className="text-xs text-muted-foreground mb-4">
              Descarga un backup JSON de las publicaciones.
            </p>
            <Button className="w-full" onClick={handleDownloadBackup}>
                Descargar Backup
            </Button>
          </CardContent>
        </Card>
         <Card>
           <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Código Fuente</CardTitle>
            <Code className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
             <p className="text-xs text-muted-foreground mb-4">
              Descarga el package.json para reinstalar dependencias.
            </p>
            <Button className="w-full" variant="outline" onClick={handleDownloadPackageJson}>
                Descargar package.json
            </Button>
          </CardContent>
        </Card>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-7 gap-8">
        <Card className="lg:col-span-4">
            <CardHeader>
                <CardTitle>Crecimiento de Usuarios</CardTitle>
                 <CardDescription>Nuevos usuarios registrados en los últimos 6 meses.</CardDescription>
            </CardHeader>
            <CardContent className="pl-2">
                <ChartContainer config={chartConfig} className="h-[300px] w-full">
                     <RechartsBarChart accessibilityLayer data={chartData}>
                        <CartesianGrid vertical={false} />
                        <XAxis
                        dataKey="month"
                        tickLine={false}
                        tickMargin={10}
                        axisLine={false}
                        tickFormatter={(value) => value.slice(0, 3)}
                        />
                        <ChartTooltip
                        cursor={false}
                        content={<ChartTooltipContent indicator="dot" />}
                        />
                        <Bar dataKey="users" fill="var(--color-users)" radius={4} />
                    </RechartsBarChart>
                </ChartContainer>
            </CardContent>
        </Card>
         <Card className="lg:col-span-3">
            <CardHeader>
                <CardTitle className="flex items-center gap-2">
                    <Image src="https://www.mercadopago.com.ar/static/logo-lila.svg" alt="Mercado Pago" width={28} height={28} data-ai-hint="company logo"/>
                    Conectar Mercado Pago
                </CardTitle>
                 <CardDescription>Conecta tu cuenta para recibir pagos por suscripciones y servicios.</CardDescription>
            </CardHeader>
            <CardContent className="flex flex-col gap-4">
                <div className="space-y-2">
                  <Label htmlFor="mp-token">Access Token</Label>
                  <div className="relative">
                    <KeyRound className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground"/>
                    <Input id="mp-token" type="password" placeholder="APP_USR-..." className="pl-10"/>
                  </div>
                </div>
                <Button>
                    <Star className="mr-2 h-4 w-4"/>
                    Guardar y Conectar
                </Button>
                 <Separator/>
                 <AlertDialog onOpenChange={() => { setIsPaying(false); setPaymentSuccess(false); }}>
                  <AlertDialogTrigger asChild>
                    <Button variant="outline">
                        <DollarSign className="mr-2 h-4 w-4"/>
                        Simular Pago de Cliente
                    </Button>
                  </AlertDialogTrigger>
                  <AlertDialogContent>
                    <AlertDialogHeader>
                       {paymentSuccess ? (
                          <div className="text-center py-4">
                            <Sparkles className="h-12 w-12 text-green-500 mx-auto mb-2"/>
                            <AlertDialogTitle>¡Pago exitoso!</AlertDialogTitle>
                            <AlertDialogDescription>La publicación de empleo ha sido destacada.</AlertDialogDescription>
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
                            <AlertDialogCancel>Cerrar</AlertDialogCancel>
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
            </CardContent>
        </Card>
      </div>
    </div>
  );
}
