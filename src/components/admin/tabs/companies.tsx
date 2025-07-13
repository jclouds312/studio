
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

const companies = [
    {
        id: '1',
        name: 'Tech Solutions Inc.',
        cuit: '30-12345678-9',
        city: 'Buenos Aires',
        logo: 'https://placehold.co/40x40.png',
        status: 'Activa',
    },
    {
        id: '2',
        name: 'Creative Minds',
        cuit: '30-98765432-1',
        city: 'Córdoba',
        logo: 'https://placehold.co/40x40.png',
        status: 'Activa',
    },
     {
        id: '3',
        name: 'Server Systems',
        cuit: '30-55555555-5',
        city: 'Remoto',
        logo: 'https://placehold.co/40x40.png',
        status: 'Inactiva',
    },
];


export function CompaniesTab() {

    return (
        <Card>
            <CardHeader className="flex flex-row items-center justify-between">
                <div>
                    <CardTitle>Empresas</CardTitle>
                    <CardDescription>Gestiona todas las empresas registradas.</CardDescription>
                </div>
                 <Button size="sm" className="gap-1">
                    <PlusCircle className="h-3.5 w-3.5" />
                    <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
                        Añadir Empresa
                    </span>
                </Button>
            </CardHeader>
            <CardContent>
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Empresa</TableHead>
                            <TableHead>CUIT</TableHead>
                            <TableHead>Ciudad</TableHead>
                            <TableHead>Estado</TableHead>
                            <TableHead>
                                <span className="sr-only">Acciones</span>
                            </TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {companies.map(company => (
                            <TableRow key={company.id}>
                                <TableCell className="font-medium">
                                    <div className="flex items-center gap-3">
                                        <Image src={company.logo} alt={company.name} width={40} height={40} className="rounded-md border p-1" data-ai-hint="company logo"/>
                                        <span className="font-semibold">{company.name}</span>
                                    </div>
                                </TableCell>
                                <TableCell>{company.cuit}</TableCell>
                                <TableCell>{company.city}</TableCell>
                                <TableCell>
                                    <Badge variant={company.status === 'Activa' ? 'default' : 'secondary'} className={company.status === 'Activa' ? 'bg-green-500/80 text-white' : ''}>
                                        {company.status}
                                    </Badge>
                                </TableCell>
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
