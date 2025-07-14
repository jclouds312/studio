
'use client';

import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { MoreHorizontal, PlusCircle, Edit, Trash2 } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Input } from "@/components/ui/input";
import { useToast } from '@/components/ui/use-toast';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";

type Category = {
    id: string;
    name: string;
    description: string;
};

const initialCategories: Category[] = [
    { id: 'tech', name: 'Tecnología', description: 'Desarrollo de software, IT, etc.'},
    { id: 'design', name: 'Diseño', description: 'Diseño gráfico, UX/UI, etc.'},
    { id: 'marketing', name: 'Marketing', description: 'Marketing digital, SEO, etc.'},
    { id: 'sales', name: 'Ventas', description: 'Ejecutivos de venta, etc.'},
    { id: 'domestic', name: 'Doméstico', description: 'Limpieza, cuidado de niños, etc.'},
    { id: 'construction', name: 'Construcción', description: 'Albañilería, plomería, etc.'},
    { id: 'admin', name: 'Administración', description: 'Contabilidad, secretariado, etc.' },
    { id: 'gastronomy', name: 'Gastronomía', description: 'Chefs, mozos, baristas, etc.' },
    { id: 'health', name: 'Salud', description: 'Enfermería, cuidado de ancianos, etc.' },
    { id: 'education', name: 'Educación', description: 'Docentes, tutores, etc.' },
    { id: 'hr', name: 'Recursos Humanos', description: 'Reclutamiento, gestión de personal, etc.' },
    { id: 'finance', name: 'Finanzas', description: 'Contabilidad, banca, inversiones, etc.' },
    { id: 'legal', name: 'Legal', description: 'Abogacía, asesoría jurídica, etc.' },
    { id: 'logistics', name: 'Logística', description: 'Transporte, depósito, supply chain, etc.' },
    { id: 'other', name: 'Otro', description: 'Otras categorías no especificadas.' },
];

function CategoryFormModal({ isOpen, setIsOpen, category, onSave }: { isOpen: boolean; setIsOpen: (open: boolean) => void; category: Category | null; onSave: (category: Category) => void; }) {
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');

    React.useEffect(() => {
        if (category) {
            setName(category.name);
            setDescription(category.description);
        } else {
            setName('');
            setDescription('');
        }
    }, [category, isOpen]);

    const handleSubmit = () => {
        const id = category ? category.id : name.toLowerCase().replace(/\s+/g, '-');
        onSave({ id, name, description });
        setIsOpen(false);
    };

    return (
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>{category ? 'Editar Categoría' : 'Añadir Nueva Categoría'}</DialogTitle>
                    <DialogDescription>
                        {category ? 'Modifica los detalles de la categoría.' : 'Crea una nueva categoría para las ofertas.'}
                    </DialogDescription>
                </DialogHeader>
                <div className="space-y-4 py-4">
                    <div className="space-y-2">
                        <Label htmlFor="cat-name">Nombre</Label>
                        <Input id="cat-name" placeholder="Ej: Gastronomía" value={name} onChange={(e) => setName(e.target.value)} />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="cat-desc">Descripción</Label>
                        <Input id="cat-desc" placeholder="Breve descripción" value={description} onChange={(e) => setDescription(e.target.value)} />
                    </div>
                </div>
                <DialogFooter>
                    <Button variant="outline" onClick={() => setIsOpen(false)}>Cancelar</Button>
                    <Button onClick={handleSubmit}>{category ? 'Guardar Cambios' : 'Añadir Categoría'}</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}

export function CategoriesTab() {
    const { toast } = useToast();
    const [categories, setCategories] = useState(initialCategories);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedCategory, setSelectedCategory] = useState<Category | null>(null);

    const handleSave = (categoryData: Category) => {
        if (selectedCategory) {
            setCategories(categories.map(c => c.id === categoryData.id ? categoryData : c));
            toast({ title: 'Categoría Actualizada', description: `La categoría "${categoryData.name}" ha sido guardada.` });
        } else {
            setCategories([...categories, categoryData]);
            toast({ title: 'Categoría Añadida', description: `La categoría "${categoryData.name}" ha sido creada.` });
        }
    };

    const handleDelete = (categoryId: string) => {
        const categoryName = categories.find(c => c.id === categoryId)?.name;
        setCategories(categories.filter(c => c.id !== categoryId));
        toast({ title: 'Categoría Eliminada', description: `La categoría "${categoryName}" ha sido eliminada.`, variant: 'destructive' });
    };
    
    const openModal = (category: Category | null = null) => {
        setSelectedCategory(category);
        setIsModalOpen(true);
    };

    return (
        <>
        <CategoryFormModal isOpen={isModalOpen} setIsOpen={setIsModalOpen} category={selectedCategory} onSave={handleSave} />
        <Card>
            <CardHeader className="flex flex-row items-center justify-between">
                <div>
                    <CardTitle>Categorías de Trabajo</CardTitle>
                    <CardDescription>Gestiona las categorías disponibles para las publicaciones.</CardDescription>
                </div>
                 <Button size="sm" className="gap-1" onClick={() => openModal()}>
                    <PlusCircle className="h-3.5 w-3.5" />
                    <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
                        Añadir Categoría
                    </span>
                </Button>
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
                                        <DropdownMenuItem onClick={() => openModal(category)}>
                                            <Edit className="mr-2 h-4 w-4"/>
                                            Editar
                                        </DropdownMenuItem>
                                        <DropdownMenuItem className="text-destructive" onClick={() => handleDelete(category.id)}>
                                            <Trash2 className="mr-2 h-4 w-4"/>
                                            Eliminar
                                        </DropdownMenuItem>
                                        </DropdownMenuContent>
                                    </DropdownMenu>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </CardContent>
        </Card>
        </>
    )
}
