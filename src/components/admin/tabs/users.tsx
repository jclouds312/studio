
'use client';

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { MoreHorizontal, PlusCircle } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import Image from "next/image";

const users = [
    {
        id: '1',
        name: 'Juan Pérez',
        email: 'juan.perez@example.com',
        avatar: 'https://placehold.co/40x40.png',
        role: 'user',
        status: 'Verificado',
        createdAt: '2023-10-27'
    },
    {
        id: '2',
        name: 'Ana García',
        email: 'ana.garcia@example.com',
        avatar: 'https://placehold.co/40x40.png',
        role: 'user',
        status: 'Pendiente',
        createdAt: '2023-10-26'
    },
    {
        id: '3',
        name: 'Johnatan Vallejo',
        email: 'john474nvallejo@gmail.com',
        avatar: 'https://placehold.co/40x40.png',
        role: 'admin',
        status: 'Verificado',
        createdAt: '2023-10-25'
    },
];


export function UsersTab() {

    return (
        <Card>
            <CardHeader className="flex flex-row items-center justify-between">
                <div>
                    <CardTitle>Usuarios</CardTitle>
                    <CardDescription>Gestiona todos los usuarios registrados en la plataforma.</CardDescription>
                </div>
                 <Button size="sm" className="gap-1">
                    <PlusCircle className="h-3.5 w-3.5" />
                    <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
                        Añadir Usuario
                    </span>
                </Button>
            </CardHeader>
            <CardContent>
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Usuario</TableHead>
                            <TableHead>Rol</TableHead>
                            <TableHead>Estado</TableHead>
                             <TableHead>Fecha de registro</TableHead>
                            <TableHead>
                                <span className="sr-only">Acciones</span>
                            </TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {users.map(user => (
                            <TableRow key={user.id}>
                                <TableCell className="font-medium">
                                    <div className="flex items-center gap-3">
                                        <Image src={user.avatar} alt={user.name} width={40} height={40} className="rounded-full" data-ai-hint="person user"/>
                                        <div className="grid gap-0.5">
                                            <span className="font-semibold">{user.name}</span>
                                            <span className="text-xs text-muted-foreground">{user.email}</span>
                                        </div>
                                    </div>
                                </TableCell>
                                <TableCell className="capitalize">{user.role}</TableCell>
                                <TableCell>
                                    <Badge variant={user.status === 'Verificado' ? 'default' : 'secondary'} className={user.status === 'Verificado' ? 'bg-green-500/80 text-white' : ''}>
                                        {user.status}
                                    </Badge>
                                </TableCell>
                                <TableCell>{user.createdAt}</TableCell>
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
                                        <DropdownMenuItem>Ver Perfil</DropdownMenuItem>
                                        <DropdownMenuItem>Editar</DropdownMenuItem>
                                        <DropdownMenuItem className="text-destructive">Suspender</DropdownMenuItem>
                                        </DropdownMenuContent>
                                    </DropdownMenu>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </CardContent>
        </Card>
    )
}
