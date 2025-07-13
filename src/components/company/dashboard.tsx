
'use client';

import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { PlusCircle, Edit, Trash2, Eye, MessageSquare } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import Link from 'next/link';
import { useSession } from '@/hooks/use-session';
import { allJobs } from '../job-listings';
import { allUsers } from '@/lib/users';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import { Separator } from '../ui/separator';

const companyApplicants = allUsers.filter(u => ['juan.perez@example.com', 'ana.garcia@example.com'].includes(u.email));

export function CompanyDashboard() {
  const { session } = useSession();

  if (!session.isMounted) {
    return <div>Cargando...</div>;
  }
  
  if (!session.user) {
    return <div>Acceso denegado.</div>;
  }
  
  const companyJobs = allJobs.filter(job => job.company === session.user?.name);

  return (
    <div className="max-w-7xl mx-auto space-y-8">
      <div className="space-y-2">
        <h1 className="text-3xl font-bold">Panel de Empresa</h1>
        <p className="text-muted-foreground">Gestiona tus publicaciones y revisa los candidatos.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-8">
            <Card>
                <CardHeader className="flex flex-row items-center justify-between">
                    <div>
                        <CardTitle>Mis Publicaciones de Trabajo</CardTitle>
                        <CardDescription>Aquí puedes ver y gestionar todas tus ofertas de empleo.</CardDescription>
                    </div>
                    <Button size="sm" className="gap-1">
                        <PlusCircle className="h-4 w-4" />
                        <span>Nueva Publicación</span>
                    </Button>
                </CardHeader>
                <CardContent>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Título</TableHead>
                                <TableHead>Estado</TableHead>
                                <TableHead>Candidatos</TableHead>
                                <TableHead><span className="sr-only">Acciones</span></TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {companyJobs.map((job) => (
                                <TableRow key={job.id}>
                                    <TableCell className="font-medium">
                                        <Link href={`/jobs/${job.id}`} className="hover:underline">{job.title}</Link>
                                    </TableCell>
                                    <TableCell>
                                        <Badge>Activa</Badge>
                                    </TableCell>
                                    <TableCell>
                                        <Badge variant="secondary">3</Badge>
                                    </TableCell>
                                    <TableCell className="text-right">
                                        <div className="flex gap-2 justify-end">
                                            <Button variant="outline" size="icon">
                                                <Edit className="h-4 w-4" />
                                            </Button>
                                            <Button variant="destructive" size="icon">
                                                <Trash2 className="h-4 w-4" />
                                            </Button>
                                        </div>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </CardContent>
            </Card>

            <Card>
                <CardHeader>
                    <CardTitle>Plan de Suscripción</CardTitle>
                    <CardDescription>Revisa el estado de tu plan actual.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="flex justify-between items-center p-4 border rounded-lg bg-secondary/30">
                        <div>
                            <p className="text-lg font-semibold">Plan Empresa</p>
                            <p className="text-sm text-muted-foreground">Próxima renovación: 19 de Agosto, 2024</p>
                        </div>
                        <Badge variant="default" className="bg-green-500/80">Activo</Badge>
                    </div>
                     <p className="text-sm text-muted-foreground">
                        Tu plan te permite publicar hasta 10 ofertas, acceder a la base de datos de candidatos y obtener soporte dedicado.
                    </p>
                </CardContent>
                <CardFooter>
                     <Button variant="outline" asChild>
                        <Link href="/subscriptions">Administrar Suscripción</Link>
                    </Button>
                </CardFooter>
            </Card>
        </div>

        <div className="lg:col-span-1">
            <Card>
                <CardHeader>
                    <CardTitle>Candidatos Recientes</CardTitle>
                    <CardDescription>Últimos usuarios que aplicaron a tus ofertas.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                    {companyApplicants.map(applicant => (
                        <React.Fragment key={applicant.id}>
                            <div className="flex items-center gap-4">
                                <Avatar>
                                    <AvatarImage src={applicant.avatar} data-ai-hint="person user"/>
                                    <AvatarFallback>{applicant.name.charAt(0)}</AvatarFallback>
                                </Avatar>
                                <div className="flex-1">
                                    <p className="font-semibold">{applicant.name}</p>
                                    <p className="text-xs text-muted-foreground">Aplicó a: Frontend Developer</p>
                                </div>
                                <div className="flex gap-1">
                                    <Button variant="ghost" size="icon">
                                        <Eye className="h-4 w-4" />
                                    </Button>
                                     <Button variant="ghost" size="icon">
                                        <MessageSquare className="h-4 w-4" />
                                    </Button>
                                </div>
                            </div>
                            <Separator />
                        </React.Fragment>
                    ))}
                    <Button variant="secondary" className="w-full">Ver todos los candidatos</Button>
                </CardContent>
            </Card>
        </div>
      </div>
    </div>
  );
}
