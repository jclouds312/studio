

'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Users, Briefcase, DollarSign, Star, Download, Sparkles, CreditCard, Loader2, Code, KeyRound, FileText, FileSpreadsheet } from "lucide-react";
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
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import React from "react";
import Image from "next/image";
import { ChartContainer, ChartTooltip, ChartTooltipContent, ChartLegend, ChartLegendContent } from "@/components/ui/chart";
import { Bar, CartesianGrid, XAxis, BarChart as RechartsBarChart, YAxis, Tooltip as RechartsTooltip } from "recharts";
import { useToast } from "@/components/ui/use-toast";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import type { Transaction, PaymentMetrics } from '@/lib/types';
import Papa from 'papaparse';
import { saveAs } from 'file-saver';
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { cn } from "@/lib/utils";


// Datos simulados para el informe de pagos
const transactionsData: Transaction[] = [
    {
        id: 'txn_1',
        user: { name: 'Juan Pérez', email: 'juan.perez@example.com', avatar: 'https://placehold.co/40x40.png' },
        plan: 'Profesional',
        status: 'Pagado',
        amount: 2000,
        date: '2024-07-20',
    },
    {
        id: 'txn_2',
        user: { name: 'Tech Solutions Inc.', email: 'empresa.facebook@example.com', avatar: 'https://placehold.co/40x40.png' },
        plan: 'Empresa',
        status: 'Pagado',
        amount: 10000,
        date: '2024-07-19',
    },
    {
        id: 'txn_3',
        user: { name: 'Ana García', email: 'ana.garcia@example.com', avatar: 'https://placehold.co/40x40.png' },
        plan: 'Profesional',
        status: 'Pendiente',
        amount: 2000,
        date: '2024-07-18',
    },
];

const paymentMetrics: PaymentMetrics = {
    totalRevenue: 542300.50,
    monthlyRecurringRevenue: 45231.89,
    activeSubscriptions: 342,
    churnRate: 2.1,
    revenueByMonth: [
        { month: "Enero", revenue: 25000 },
        { month: "Febrero", revenue: 32000 },
        { month: "Marzo", revenue: 38000 },
        { month: "Abril", revenue: 41000 },
        { month: "Mayo", revenue: 48000 },
        { month: "Junio", revenue: 45231.89 },
    ],
    planDistribution: [
        { name: 'Básico', value: 150, fill: "hsl(var(--chart-1))" },
        { name: 'Profesional', value: 122, fill: "hsl(var(--chart-2))" },
        { name: 'Empresa', value: 70, fill: "hsl(var(--chart-3))" },
    ]
};


const totalUsersData = [
  { month: "Enero", users: 186 },
  { month: "Febrero", users: 305 },
  { month: "Marzo", users: 237 },
  { month: "Abril", users: 273 },
  { month: "Mayo", users: 209 },
  { month: "Junio", users: 214 },
];

const byRoleData = [
  { month: "Enero", trabajadores: 150, empresas: 36 },
  { month: "Febrero", trabajadores: 250, empresas: 55 },
  { month: "Marzo", trabajadores: 190, empresas: 47 },
  { month: "Abril", trabajadores: 220, empresas: 53 },
  { month: "Mayo", trabajadores: 160, empresas: 49 },
  { month: "Junio", trabajadores: 170, empresas: 44 },
];

const byPlanData = [
  { month: "Enero", basico: 100, profesional: 70, empresa: 16 },
  { month: "Febrero", basico: 180, profesional: 95, empresa: 30 },
  { month: "Marzo", basico: 140, profesional: 77, empresa: 20 },
  { month: "Abril", basico: 160, profesional: 83, empresa: 30 },
  { month: "Mayo", basico: 110, profesional: 79, empresa: 20 },
  { month: "Junio", basico: 120, profesional: 74, empresa: 20 },
]

const totalUsersChartConfig = {
  users: {
    label: "Usuarios",
    color: "hsl(var(--chart-1))",
  },
} satisfies import("@/components/ui/chart").ChartConfig;

const byRoleChartConfig = {
  trabajadores: { label: "Trabajadores", color: "hsl(var(--chart-1))" },
  empresas: { label: "Empresas", color: "hsl(var(--chart-2))" },
} satisfies import("@/components/ui/chart").ChartConfig;

const byPlanChartConfig = {
  basico: { label: "Básico", color: "hsl(var(--chart-1))" },
  profesional: { label: "Profesional", color: "hsl(var(--chart-2))" },
  empresa: { label: "Empresa", color: "hsl(var(--chart-3))" },
} satisfies import("@/components/ui/chart").ChartConfig;


interface OverviewTabProps {
  setActiveTab: (tab: string) => void;
}

export function OverviewTab({ setActiveTab }: OverviewTabProps) {
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

   const handleDownloadBackup = (format: 'json' | 'csv' | 'word') => {
    const backupData = allJobs.map(job => ({
      ID: job.id,
      Titulo: job.title,
      Empresa: job.company,
      Ubicacion: job.location,
      Tipo: job.type,
      Categoria: job.category,
      Destacado: job.isFeatured ? 'Sí' : 'No',
      WhatsApp: job.whatsapp || 'N/A',
      Descripcion: job.description,
    }));

    if (format === 'json') {
      const jsonString = JSON.stringify(allJobs, null, 2);
      const blob = new Blob([jsonString], {type: "application/json;charset=utf-8"});
      saveAs(blob, "backup-publicaciones.json");
    } else if (format === 'csv') {
      const csv = Papa.unparse(backupData);
      const blob = new Blob([csv], {type: "text/csv;charset=utf-8"});
      saveAs(blob, "backup-publicaciones.csv");
    } else if (format === 'word') {
      let htmlContent = `
        <html>
          <head><title>Backup de Publicaciones</title></head>
          <body>
            <h1>Backup de Publicaciones</h1>
            <table border="1" style="border-collapse: collapse; width: 100%;">
              <tr>
                ${Object.keys(backupData[0]).map(key => `<th>${key}</th>`).join('')}
              </tr>
              ${backupData.map(row => `
                <tr>
                  ${Object.values(row).map(val => `<td>${String(val).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;')}</td>`).join('')}
                </tr>
              `).join('')}
            </table>
          </body>
        </html>
      `;
      const blob = new Blob([htmlContent], {type: "application/msword;charset=utf-8"});
      saveAs(blob, "backup-publicaciones.doc");
    }
  };
  
  const handleDownloadReport = (format: 'json' | 'csv' | 'word') => {
    const reportData = {
        metrics: paymentMetrics,
        recentTransactions: transactionsData.map(t => ({
            ID: t.id,
            Usuario: t.user.name,
            Email: t.user.email,
            Plan: t.plan,
            Estado: t.status,
            Monto: t.amount,
            Fecha: t.date,
        })),
    };

    if (format === 'json') {
      const jsonString = JSON.stringify(reportData, null, 2);
      const blob = new Blob([jsonString], {type: "application/json;charset=utf-8"});
      saveAs(blob, "informe-pagos-suscripciones.json");
    } else if (format === 'csv') {
      const csv = Papa.unparse(reportData.recentTransactions);
      const blob = new Blob([csv], {type: "text/csv;charset=utf-8"});
      saveAs(blob, "informe-transacciones.csv");
    } else if (format === 'word') {
      let htmlContent = `
        <html>
          <head>
            <title>Informe de Pagos y Suscripciones</title>
            <style>
              body { font-family: Arial, sans-serif; }
              table { border-collapse: collapse; width: 100%; }
              th, td { border: 1px solid #dddddd; text-align: left; padding: 8px; }
              th { background-color: #f2f2f2; }
            </style>
          </head>
          <body>
            <h1>Informe de Pagos y Suscripciones</h1>
            <h2>Métricas Clave</h2>
            <ul>
              <li>Ingresos Totales: $${paymentMetrics.totalRevenue.toLocaleString('es-AR')}</li>
              <li>Ingresos Recurrentes Mensuales: $${paymentMetrics.monthlyRecurringRevenue.toLocaleString('es-AR')}</li>
              <li>Suscripciones Activas: ${paymentMetrics.activeSubscriptions}</li>
              <li>Tasa de Abandono: ${paymentMetrics.churnRate}%</li>
            </ul>
            <h2>Transacciones Recientes</h2>
            <table>
              <tr>
                <th>ID</th><th>Usuario</th><th>Email</th><th>Plan</th><th>Estado</th><th>Monto</th><th>Fecha</th>
              </tr>
              ${reportData.recentTransactions.map(t => `
                <tr>
                  <td>${t.ID}</td>
                  <td>${t.Usuario}</td>
                  <td>${t.Email}</td>
                  <td>${t.Plan}</td>
                  <td>${t.Estado}</td>
                  <td>$${t.Monto.toLocaleString('es-AR')}</td>
                  <td>${t.Fecha}</td>
                </tr>
              `).join('')}
            </table>
          </body>
        </html>
      `;
      const blob = new Blob([htmlContent], {type: "application/msword;charset=utf-8"});
      saveAs(blob, "informe-pagos.doc");
    }
  };


  return (
    <div className="space-y-8">
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5">
        <Card onClick={() => setActiveTab('users')} className="cursor-pointer hover:border-primary transition-colors">
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
        <Card onClick={() => setActiveTab('jobs')} className="cursor-pointer hover:border-primary transition-colors">
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
        <Card onClick={() => setActiveTab('payments')} className="cursor-pointer hover:border-primary transition-colors">
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
              Exporta las publicaciones de trabajo.
            </p>
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button className="w-full" variant="outline">
                        Exportar Backup
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                    <DropdownMenuItem onClick={() => handleDownloadBackup('csv')}>
                        <FileSpreadsheet className="mr-2 h-4 w-4" />
                        Excel (CSV)
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => handleDownloadBackup('word')}>
                        <FileText className="mr-2 h-4 w-4" />
                        Word (HTML)
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => handleDownloadBackup('json')}>
                         <Code className="mr-2 h-4 w-4" />
                        JSON
                    </DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>
          </CardContent>
        </Card>
         <Card>
           <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Descargar Informes</CardTitle>
            <Download className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
             <p className="text-xs text-muted-foreground mb-4">
              Exporta informes de pagos y suscripciones.
            </p>
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button className="w-full" variant="outline">
                        Exportar Informe
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                    <DropdownMenuItem onClick={() => handleDownloadReport('csv')}>
                        <FileSpreadsheet className="mr-2 h-4 w-4" />
                        Excel (CSV)
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => handleDownloadReport('word')}>
                        <FileText className="mr-2 h-4 w-4" />
                        Word (HTML)
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => handleDownloadReport('json')}>
                         <Code className="mr-2 h-4 w-4" />
                        JSON
                    </DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>
          </CardContent>
        </Card>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-7 gap-8">
        <Card className="lg:col-span-4">
           <Tabs defaultValue="total" className="flex flex-col h-full">
            <CardHeader className="flex flex-row items-center justify-between">
                <div>
                    <CardTitle>Crecimiento de Usuarios</CardTitle>
                    <CardDescription>Nuevos usuarios registrados en los últimos 6 meses.</CardDescription>
                </div>
                 <TabsList className="grid w-full grid-cols-3 max-w-[280px]">
                    <TabsTrigger value="total">Total</TabsTrigger>
                    <TabsTrigger value="role">Por Rol</TabsTrigger>
                    <TabsTrigger value="plan">Por Plan</TabsTrigger>
                </TabsList>
            </CardHeader>
            <CardContent className="pl-2 flex-grow">
                 <TabsContent value="total" className="h-[300px]">
                     <ChartContainer config={totalUsersChartConfig} className="w-full h-full">
                         <RechartsBarChart accessibilityLayer data={totalUsersData}>
                            <CartesianGrid vertical={false} />
                            <XAxis
                            dataKey="month"
                            tickLine={false}
                            tickMargin={10}
                            axisLine={false}
                            tickFormatter={(value) => value.slice(0, 3)}
                            />
                            <YAxis tickLine={false} axisLine={false} />
                            <ChartTooltip
                            cursor={false}
                            content={<ChartTooltipContent indicator="dot" />}
                            />
                            <Bar dataKey="users" fill="var(--color-users)" radius={4} />
                        </RechartsBarChart>
                    </ChartContainer>
                </TabsContent>
                 <TabsContent value="role" className="h-[300px]">
                     <ChartContainer config={byRoleChartConfig} className="w-full h-full">
                        <RechartsBarChart accessibilityLayer data={byRoleData} layout="vertical" stackOffset="expand">
                             <XAxis type="number" hide={true} />
                            <YAxis
                                dataKey="month"
                                type="category"
                                tickLine={false}
                                tickMargin={10}
                                axisLine={false}
                                tickFormatter={(value) => value.slice(0, 3)}
                            />
                             <ChartTooltip cursor={false} content={<ChartTooltipContent percent />} />
                            <ChartLegend content={<ChartLegendContent />} />
                             <Bar dataKey="trabajadores" stackId="a" fill="var(--color-trabajadores)" radius={[4, 0, 0, 4]} />
                            <Bar dataKey="empresas" stackId="a" fill="var(--color-empresas)" radius={[0, 4, 4, 0]} />
                        </RechartsBarChart>
                    </ChartContainer>
                </TabsContent>
                <TabsContent value="plan" className="h-[300px]">
                     <ChartContainer config={byPlanChartConfig} className="w-full h-full">
                        <RechartsBarChart accessibilityLayer data={byPlanData} stackOffset="expand" layout="vertical">
                           <XAxis type="number" hide={true} />
                           <YAxis
                                dataKey="month"
                                type="category"
                                tickLine={false}
                                tickMargin={10}
                                axisLine={false}
                                tickFormatter={(value) => value.slice(0, 3)}
                            />
                           <ChartTooltip cursor={false} content={<ChartTooltipContent percent />} />
                           <ChartLegend content={<ChartLegendContent />} />
                           <Bar dataKey="basico" stackId="a" fill="var(--color-basico)" radius={[4, 0, 0, 4]} />
                           <Bar dataKey="profesional" stackId="a" fill="var(--color-profesional)" />
                           <Bar dataKey="empresa" stackId="a" fill="var(--color-empresa)" radius={[0, 4, 4, 0]} />
                        </RechartsBarChart>
                    </ChartContainer>
                </TabsContent>
            </CardContent>
          </Tabs>
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
