
'use client';

import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { MoreHorizontal, PlusCircle, Trash, Edit, Bell, Calendar } from "lucide-react";
import { Badge } from '@/components/ui/badge';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import Image from 'next/image';

const adsData = [
    { id: 'ad_1', name: 'Banner Superior (Home)', type: 'Imagen', status: 'Activo', clicks: 1250, impressions: 85000, imageUrl: 'https://images.unsplash.com/photo-1557804506-669a67965ba0?w=728&h=90&fit=crop' },
    { id: 'ad_2', name: 'Anuncio Lateral (Listado)', type: 'Imagen', status: 'Activo', clicks: 830, impressions: 62000, imageUrl: 'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?w=300&h=250&fit=crop' },
    { id: 'ad_3', name: 'Pop-up Suscripción', type: 'Modal', status: 'Inactivo', clicks: 2100, impressions: 40000, imageUrl: 'https://images.unsplash.com/photo-1556740758-90de374c12ad?w=400&h=300&fit=crop' },
];

const upcomingPayments = [
    { id: 'pay_1', userName: 'Tech Solutions Inc.', plan: 'Empresa', amount: '$10.000', dueDate: '2024-08-19' },
    { id: 'pay_2', userName: 'Juan Pérez', plan: 'Profesional', amount: '$2.000', dueDate: '2024-08-20' },
];

export function MarketingTab() {
  return (
    <div className="grid gap-8">
        <div className="grid lg:grid-cols-3 gap-8">
            <Card className="lg:col-span-2">
                <CardHeader>
                    <CardTitle>Configuración de Google AdSense</CardTitle>
                    <CardDescription>Conecta tu cuenta de Google AdSense para monetizar el tráfico del sitio.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="flex items-center space-x-4 rounded-md border p-4">
                        <div className="flex-1 space-y-1">
                            <p className="text-sm font-medium leading-none">Activar Anuncios de AdSense</p>
                            <p className="text-sm text-muted-foreground">
                                Muestra anuncios de la red de Google en tu sitio.
                            </p>
                        </div>
                        <Switch id="adsense-active" />
                    </div>
                     <div className="space-y-2">
                        <Label htmlFor="adsense-code">Tu código de publicador de AdSense</Label>
                        <Textarea id="adsense-code" placeholder="Pega aquí tu script de AdSense (ej: <script async src=...></script>)" rows={4}/>
                     </div>
                </CardContent>
                <CardFooter>
                    <Button>Guardar Configuración</Button>
                </CardFooter>
            </Card>

            <Card>
                <CardHeader>
                    <CardTitle className="flex items-center gap-2"><Bell className="h-5 w-5"/> Pagos Próximos</CardTitle>
                    <CardDescription>Próximas renovaciones de suscripciones.</CardDescription>
                </CardHeader>
                <CardContent>
                    <ul className="space-y-4">
                        {upcomingPayments.map(payment => (
                             <li key={payment.id} className="flex items-center">
                                <div className="flex-1">
                                    <p className="font-medium">{payment.userName} <Badge variant="outline" className="ml-2">{payment.plan}</Badge></p>
                                    <p className="text-sm text-muted-foreground flex items-center gap-1.5 mt-1">
                                        <Calendar className="h-4 w-4" />
                                        Vence el {new Date(payment.dueDate).toLocaleDateString('es-AR')} - {payment.amount}
                                    </p>
                                </div>
                                <Button variant="ghost" size="sm">Recordar</Button>
                            </li>
                        ))}
                    </ul>
                </CardContent>
            </Card>
        </div>


      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
            <div>
                <CardTitle>Gestión de Publicidad</CardTitle>
                <CardDescription>Administra los banners y anuncios personalizados en la plataforma.</CardDescription>
            </div>
            <Button size="sm" className="gap-1">
                <PlusCircle className="h-3.5 w-3.5" />
                <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
                    Crear Anuncio
                </span>
            </Button>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Previsualización</TableHead>
                <TableHead>Nombre / Ubicación</TableHead>
                <TableHead>Tipo</TableHead>
                <TableHead>Estado</TableHead>
                <TableHead>Estadísticas</TableHead>
                <TableHead><span className="sr-only">Acciones</span></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {adsData.map((ad) => (
                <TableRow key={ad.id}>
                  <TableCell>
                      <Image src={ad.imageUrl} alt={ad.name} width={120} height={50} className="rounded-md border p-1 object-contain" data-ai-hint="advertisement banner"/>
                  </TableCell>
                  <TableCell className="font-medium">{ad.name}</TableCell>
                  <TableCell>
                    <Badge variant="secondary">{ad.type}</Badge>
                  </TableCell>
                  <TableCell>
                     <Badge variant={ad.status === 'Activo' ? 'default' : 'destructive'} className={ad.status === 'Activo' ? 'bg-green-500/80' : ''}>{ad.status}</Badge>
                  </TableCell>
                  <TableCell>
                      <div className="text-xs">
                          <p><strong>{ad.impressions.toLocaleString()}</strong> impresiones</p>
                          <p><strong>{ad.clicks.toLocaleString()}</strong> clicks</p>
                      </div>
                  </TableCell>
                  <TableCell>
                      <div className="flex gap-2">
                         <Button variant="outline" size="icon">
                             <Edit className="h-4 w-4"/>
                         </Button>
                         <Button variant="destructive" size="icon">
                             <Trash className="h-4 w-4"/>
                         </Button>
                      </div>
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
