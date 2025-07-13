
'use client';

import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import type { Transaction } from '@/lib/types';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuLabel, DropdownMenuItem } from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';
import { MoreHorizontal } from 'lucide-react';

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

export function PaymentsTab() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Transacciones y Pagos</CardTitle>
        <CardDescription>Revisa todas las transacciones de suscripciones de la plataforma.</CardDescription>
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
  );
}
