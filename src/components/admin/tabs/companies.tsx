
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
import React from "react";
import { CompanyFormModal } from "../modals/company-form-modal";
import type { CompanyProfile } from "@/lib/types";
import { getAllCompanies, createCompany, deleteCompany, updateCompany } from '@/services/companyService';
import { useToast } from "@/components/ui/use-toast";

export function CompaniesTab() {
    const [companies, setCompanies] = React.useState<CompanyProfile[]>([]);
    const [isModalOpen, setIsModalOpen] = React.useState(false);
    const [selectedCompany, setSelectedCompany] = React.useState<CompanyProfile | null>(null);
    const { toast } = useToast();

    React.useEffect(() => {
        getAllCompanies().then(setCompanies);
    }, []);

    const handleOpenModal = (company: CompanyProfile | null = null) => {
        setSelectedCompany(company);
        setIsModalOpen(true);
    };

    const handleSave = async (companyData: CompanyProfile) => {
        if (selectedCompany) {
            const updated = await updateCompany(selectedCompany.id, companyData);
            if (updated) {
                setCompanies(companies.map(c => c.id === updated.id ? updated : c));
            }
        } else {
            const newCompany = await createCompany(companyData);
            setCompanies([...companies, newCompany]);
        }
        setIsModalOpen(false);
    };
    
    const handleDelete = async (companyId: string) => {
        const success = await deleteCompany(companyId);
        if (success) {
            setCompanies(companies.filter(c => c.id !== companyId));
            toast({ title: 'Empresa Eliminada', variant: 'destructive' });
        } else {
            toast({ title: 'Error al eliminar', variant: 'destructive' });
        }
    };

    return (
        <>
            <CompanyFormModal isOpen={isModalOpen} setIsOpen={setIsModalOpen} company={selectedCompany} onSave={handleSave} />
            <Card>
                <CardHeader className="flex flex-row items-center justify-between">
                    <div>
                        <CardTitle>Empresas</CardTitle>
                        <CardDescription>Gestiona todas las empresas registradas.</CardDescription>
                    </div>
                    <Button size="sm" className="gap-1" onClick={() => handleOpenModal()}>
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
                                <TableHead>Ubicación</TableHead>
                                <TableHead>CUIT</TableHead>
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
                                            <Image src={company.logoUrl!} alt={company.name} width={40} height={40} className="rounded-md border p-1" data-ai-hint="company logo"/>
                                            <span className="font-semibold">{company.name}</span>
                                        </div>
                                    </TableCell>
                                    <TableCell>{company.city}, {company.province}</TableCell>
                                    <TableCell>{company.cuit}</TableCell>
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
                                            <DropdownMenuItem onClick={() => handleOpenModal(company)}>Editar</DropdownMenuItem>
                                            <DropdownMenuItem className="text-destructive" onClick={() => handleDelete(company.id)}>Eliminar</DropdownMenuItem>
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
