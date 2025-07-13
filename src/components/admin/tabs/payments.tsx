
'use client';

import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import type { Transaction, PaymentMetrics } from '@/lib/types';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuLabel, DropdownMenuItem } from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';
import { MoreHorizontal, DollarSign, Users, CreditCard, TrendingDown } from 'lucide-react';
import { Area, AreaChart, CartesianGrid, XAxis, Pie, PieChart, Tooltip as RechartsTooltip, ResponsiveContainer } from "recharts"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";

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
    {
        id: 'txn_4',
        user: { name: 'Creative Minds', email: 'creative@minds.com', avatar: 'https://placehold.co/40x40.png' },
        plan: 'Empresa',
        status: 'Fallido',
        amount: 10000,
        date: '2024-07-17',
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

const revenueChartConfig = {
    revenue: {
        label: "Ingresos",
        color: "hsl(var(--chart-1))",
    },
};

const planChartConfig = {
  plans: {
    label: "Planes",
  },
  Básico: {
    label: "Básico",
    color: "hsl(var(--chart-1))",
  },
  Profesional: {
    label: "Profesional",
    color: "hsl(var(--chart-2))",
  },
  Empresa: {
    label: "Empresa",
    color: "hsl(var(--chart-3))",
  },
} satisfies import("@/components/ui/chart").ChartConfig


export function PaymentsTab() {
  return (
    <div className="space-y-8">
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Ingresos Totales</CardTitle>
                    <DollarSign className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                    <div className="text-2xl font-bold">${paymentMetrics.totalRevenue.toLocaleString('es-AR')}</div>
                    <p className="text-xs text-muted-foreground">Historial completo de la plataforma</p>
                </CardContent>
            </Card>
            <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Suscripciones Activas</CardTitle>
                    <Users className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                    <div className="text-2xl font-bold">+{paymentMetrics.activeSubscriptions}</div>
                    <p className="text-xs text-muted-foreground">+12.2% desde el mes pasado</p>
                </CardContent>
            </Card>
            <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Ingresos (Mes)</CardTitle>
                    <CreditCard className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                    <div className="text-2xl font-bold">${paymentMetrics.monthlyRecurringRevenue.toLocaleString('es-AR')}</div>
                     <p className="text-xs text-muted-foreground">+19% desde el mes pasado</p>
                </CardContent>
            </Card>
             <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Tasa de Abandono</CardTitle>
                    <TrendingDown className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                    <div className="text-2xl font-bold">{paymentMetrics.churnRate}%</div>
                     <p className="text-xs text-muted-foreground">-0.5% desde el mes pasado</p>
                </CardContent>
            </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-7 gap-8">
            <Card className="lg:col-span-4">
                <CardHeader>
                    <CardTitle>Visión General de Ingresos</CardTitle>
                    <CardDescription>Evolución de los ingresos en los últimos 6 meses.</CardDescription>
                </CardHeader>
                <CardContent className="pl-2">
                     <ChartContainer config={revenueChartConfig} className="h-[300px] w-full">
                        <AreaChart
                            accessibilityLayer
                            data={paymentMetrics.revenueByMonth}
                            margin={{ left: 12, right: 12, top: 12 }}
                        >
                            <CartesianGrid vertical={false} />
                            <XAxis
                                dataKey="month"
                                tickLine={false}
                                axisLine={false}
                                tickMargin={8}
                                tickFormatter={(value) => value.slice(0, 3)}
                            />
                            <ChartTooltip
                                cursor={false}
                                content={<ChartTooltipContent indicator="dot" />}
                            />
                            <Area
                                dataKey="revenue"
                                type="natural"
                                fill="var(--color-revenue)"
                                fillOpacity={0.4}
                                stroke="var(--color-revenue)"
                            />
                        </AreaChart>
                    </ChartContainer>
                </CardContent>
            </Card>
            <Card className="lg:col-span-3">
                <CardHeader>
                    <CardTitle>Distribución de Planes</CardTitle>
                    <CardDescription>Distribución de suscripciones activas.</CardDescription>
                </CardHeader>
                 <CardContent className="flex justify-center items-center pb-0">
                     <ChartContainer config={planChartConfig} className="h-[260px] w-full">
                         <PieChart>
                            <ChartTooltip content={<ChartTooltipContent nameKey="value" hideLabel />} />
                            <Pie
                                data={paymentMetrics.planDistribution}
                                dataKey="value"
                                nameKey="name"
                                innerRadius={60}
                                strokeWidth={5}
                            />
                         </PieChart>
                     </ChartContainer>
                </CardContent>
            </Card>
        </div>

        <Card>
            <CardHeader>
                <CardTitle>Transacciones Recientes</CardTitle>
                <CardDescription>Revisa las últimas transacciones de suscripciones de la plataforma.</CardDescription>
            </CardHeader>
            <CardContent>
                <Table>
                <TableHeader>
                    <TableRow>
                    <TableHead>Usuario / Empresa</TableHead>
                    <TableHead>Plan</TableHead>
                    <TableHead>Estado</TableHead>
                    <TableHead>Monto</TableHead>
                    <TableHead>Fecha</TableHead>
                    <TableHead><span className="sr-only">Acciones</span></TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {transactionsData.map((txn) => (
                    <TableRow key={txn.id}>
                        <TableCell>
                        <div className="flex items-center gap-3">
                            <Avatar className="h-9 w-9">
                            <AvatarImage src={txn.user.avatar} alt={txn.user.name} data-ai-hint="person user"/>
                            <AvatarFallback>{txn.user.name.charAt(0)}</AvatarFallback>
                            </Avatar>
                            <div className="grid gap-0.5">
                            <span className="font-medium">{txn.user.name}</span>
                            <span className="text-xs text-muted-foreground">{txn.user.email}</span>
                            </div>
                        </div>
                        </TableCell>
                        <TableCell>
                        <Badge variant="outline">{txn.plan}</Badge>
                        </TableCell>
                        <TableCell>
                        <Badge
                            variant={
                            txn.status === 'Pagado' ? 'default' :
                            txn.status === 'Pendiente' ? 'secondary' : 'destructive'
                            }
                            className={cn(
                            txn.status === 'Pagado' && 'bg-green-500/80',
                            txn.status === 'Pendiente' && 'bg-yellow-500/80',
                            txn.status === 'Fallido' && 'bg-red-500/80',
                            'text-white'
                            )}
                        >
                            {txn.status}
                        </Badge>
                        </TableCell>
                        <TableCell>${txn.amount.toLocaleString('es-AR')}</TableCell>
                        <TableCell>{new Date(txn.date).toLocaleDateString('es-AR')}</TableCell>
                        <TableCell>
                            <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                <Button
                                    aria-haspopup="true"
                                    size="icon"
                                    variant="ghost"
                                >
                                    <MoreHorizontal className="h-4 w-4" />
                                    <span className="sr-only">Toggle menu</span>
                                </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent align="end">
                                <DropdownMenuLabel>Acciones</DropdownMenuLabel>
                                <DropdownMenuItem>Ver Detalles</DropdownMenuItem>
                                <DropdownMenuItem>Reembolsar</DropdownMenuItem>
                                </DropdownMenuContent>
                            </DropdownMenu>
                        </TableCell>
                    </TableRow>
                    ))}
                </TableBody>
                </Table>
            </CardContent>
        </Card>
    </div>
  );
}
