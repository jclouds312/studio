
'use client';

import React from 'react';
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
import { Input } from "@/components/ui/input";
import { useToast } from '@/components/ui/use-toast';

const initialCategories = [
    { id: 'tech', name: 'Tecnología', description: 'Desarrollo de software, IT, etc.'},
    { id: 'design', name: 'Diseño', description: 'Diseño gráfico, UX/UI, etc.'},
    { id: 'marketing', name: 'Marketing', description: 'Marketing digital, SEO, etc.'},
    { id: 'sales', name: 'Ventas', description: 'Ejecutivos de venta, etc.'},
    { id: 'domestic', name: 'Doméstico', description: 'Limpieza, cuidado de niños, etc.'},
    { id: 'construction', name: 'Construcción', description: 'Albañilería, plomería, etc.'},
];

export function CategoriesTab() {
    const { toast } = useToast();
    const [categories, setCategories] = React.useState(initialCategories);
    const [newName, setNewName] = React.useState('');
    const [newDesc, setNewDesc] = React.useState('');

    const handleAddCategory = () => {
        if (!newName || !newDesc) {
            toast({
                title: 'Error',
                description: 'Por favor, completa ambos campos.',
                variant: 'destructive'
            });
            return;
        }

        const newCategory = {
            id: newName.toLowerCase().replace(/\s+/g, '-'),
            name: newName,
            description: newDesc,
        };

        setCategories([...categories, newCategory]);
        setNewName('');
        setNewDesc('');
        toast({
            title: 'Categoría Añadida',
            description: `La categoría "${newName}" ha sido creada.`,
        });
    };

    return (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="md:col-span-2">
                 <Card>
                    <CardHeader>
                        <CardTitle>Categorías de Trabajo</CardTitle>
                        <CardDescription>Gestiona las categorías disponibles para las publicaciones.</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>Nombre</TableHead>
                                    <TableHead>Descripción</TableHead>
                                    <TableHead>
                                        <span className="sr-only">Acciones</span>
                                    </TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {categories.map(category => (
                                    <TableRow key={category.id}>
                                        <TableCell className="font-medium">{category.name}</TableCell>
                                        <TableCell>{category.description}</TableCell>
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
                                                <DropdownMenuItem>Editar</DropdownMenuItem>
                                                <DropdownMenuItem className="text-destructive">Eliminar</DropdownMenuItem>
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
            <div>
                 <Card>
                    <CardHeader>
                        <CardTitle>Añadir Nueva Categoría</CardTitle>
                        <CardDescription>Crea una nueva categoría para las ofertas.</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="space-y-2">
                             <Label htmlFor="cat-name">Nombre</Label>
                             <Input id="cat-name" placeholder="Ej: Gastronomía" value={newName} onChange={(e) => setNewName(e.target.value)}/>
                        </div>
                        <div className="space-y-2">
                             <Label htmlFor="cat-desc">Descripción</Label>
                             <Input id="cat-desc" placeholder="Breve descripción" value={newDesc} onChange={(e) => setNewDesc(e.target.value)} />
                        </div>
                        <Button className="w-full" onClick={handleAddCategory}>
                            <PlusCircle className="h-4 w-4 mr-2"/>
                            Añadir Categoría
                        </Button>
                    </CardContent>
                 </Card>
            </div>
        </div>

    )
}
