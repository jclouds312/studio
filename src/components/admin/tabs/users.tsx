
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
import { UserFormModal } from "../modals/user-form-modal";
import type { User } from "@prisma/client";
import { getAllUsers, createUser, deleteUser, updateUser } from '@/services/userService';
import { useToast } from "@/components/ui/use-toast";
import Link from "next/link";

export function UsersTab() {
    const [users, setUsers] = React.useState<User[]>([]);
    const [isModalOpen, setIsModalOpen] = React.useState(false);
    const [selectedUser, setSelectedUser] = React.useState<User | null>(null);
    const { toast } = useToast();

    React.useEffect(() => {
        getAllUsers().then(setUsers);
    }, []);

    const handleOpenModal = (user: User | null = null) => {
        setSelectedUser(user);
        setIsModalOpen(true);
    };

    const handleSaveUser = async (userData: User) => {
        if (selectedUser) {
            const updated = await updateUser(selectedUser.id, userData);
            if (updated) {
                setUsers(users.map(u => u.id === updated.id ? updated : u));
            }
        } else {
            // @ts-ignore
            const newUser = await createUser(userData);
            setUsers([...users, newUser]);
        }
        setIsModalOpen(false);
    };
    
    const handleDeleteUser = async (userId: string) => {
        const success = await deleteUser(userId);
        if (success) {
            setUsers(users.filter(u => u.id !== userId));
            toast({ title: 'Usuario Eliminado', variant: 'destructive' });
        } else {
            toast({ title: 'Error al eliminar', variant: 'destructive' });
        }
    };


    return (
        <>
            <UserFormModal isOpen={isModalOpen} setIsOpen={setIsModalOpen} user={selectedUser} onSave={handleSaveUser}/>
            <Card>
                <CardHeader className="flex flex-row items-center justify-between">
                    <div>
                        <CardTitle>Usuarios</CardTitle>
                        <CardDescription>Gestiona todos los usuarios registrados en la plataforma.</CardDescription>
                    </div>
                    <div className="flex gap-2">
                        <Button size="sm" className="gap-1" asChild>
                             <Link href="/admin/register">
                                <PlusCircle className="h-3.5 w-3.5" />
                                <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
                                    Añadir Admin
                                </span>
                             </Link>
                        </Button>
                        <Button size="sm" className="gap-1" onClick={() => handleOpenModal()}>
                            <PlusCircle className="h-3.5 w-3.5" />
                            <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
                                Añadir Usuario
                            </span>
                        </Button>
                    </div>
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
                                            <Image src={user.avatar!} alt={user.name} width={40} height={40} className="rounded-full object-cover" data-ai-hint="person user"/>
                                            <div className="grid gap-0.5">
                                                <span className="font-semibold">{user.name}</span>
                                                <span className="text-xs text-muted-foreground">{user.email}</span>
                                            </div>
                                        </div>
                                    </TableCell>
                                    <TableCell className="capitalize">{user.role}</TableCell>
                                    <TableCell>
                                        <Badge variant={user.status === 'VERIFICADO' ? 'default' : 'secondary'} className={user.status === 'VERIFICADO' ? 'bg-green-500/80 text-white' : ''}>
                                            {user.status || 'Pendiente'}
                                        </Badge>
                                    </TableCell>
                                    <TableCell>{new Date(user.createdAt).toLocaleDateString()}</TableCell>
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
                                            <DropdownMenuItem onClick={() => handleOpenModal(user)}>Editar</DropdownMenuItem>
                                            <DropdownMenuItem className="text-destructive" onClick={() => handleDeleteUser(user.id)}>Suspender</DropdownMenuItem>
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
