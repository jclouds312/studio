
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
import { JobFormModal } from "../modals/job-form-modal";
import React from "react";
import type { Job } from "@prisma/client";
import { getAllJobs, createJob, deleteJob, updateJob } from '@/services/jobService';
import { useToast } from "@/components/ui/use-toast";

export function JobsTab() {
    const [jobs, setJobs] = React.useState<Job[]>([]);
    const [isModalOpen, setIsModalOpen] = React.useState(false);
    const [selectedJob, setSelectedJob] = React.useState<Job | null>(null);
    const { toast } = useToast();

    React.useEffect(() => {
        getAllJobs().then(setJobs);
    }, []);

    const handleOpenModal = (job: Job | null = null) => {
        setSelectedJob(job);
        setIsModalOpen(true);
    };

    const handleSave = async (jobData: Job) => {
        try {
            if (selectedJob && selectedJob.id) {
                // Edit
                const updated = await updateJob(selectedJob.id, jobData);
                if (updated) {
                    setJobs(jobs.map(j => j.id === updated.id ? updated : j));
                    toast({ title: "Publicación actualizada" });
                }
            } else {
                // Create
                const newJob = await createJob(jobData);
                setJobs([...jobs, newJob]);
                toast({ title: "Publicación creada" });
            }
        } catch (error) {
            toast({ title: "Error al guardar", variant: "destructive" });
        }
    };
    
    const handleDelete = async (jobId: string) => {
        const success = await deleteJob(jobId);
        if (success) {
            setJobs(jobs.filter(j => j.id !== jobId));
            toast({ title: 'Publicación Eliminada', description: 'La publicación ha sido eliminada correctamente.' });
        } else {
             toast({ title: 'Error al eliminar', variant: 'destructive' });
        }
    };

    return (
        <>
        <JobFormModal isOpen={isModalOpen} setIsOpen={setIsModalOpen} job={selectedJob} onSave={handleSave}/>
        <Card>
            <CardHeader className="flex flex-row items-center justify-between">
                <div>
                    <CardTitle>Publicaciones</CardTitle>
                    <CardDescription>Gestiona todas las publicaciones de trabajo en la plataforma.</CardDescription>
                </div>
                 <Button size="sm" className="gap-1" onClick={() => handleOpenModal()}>
                    <PlusCircle className="h-3.5 w-3.5" />
                    <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
                        Crear Publicación
                    </span>
                </Button>
            </CardHeader>
            <CardContent>
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Título</TableHead>
                            <TableHead>Empresa</TableHead>
                            <TableHead>Categoría</TableHead>
                            <TableHead>Tipo</TableHead>
                            <TableHead>Estado</TableHead>
                            <TableHead>
                                <span className="sr-only">Acciones</span>
                            </TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {jobs.map(job => (
                            <TableRow key={job.id}>
                                <TableCell className="font-medium">{job.title}</TableCell>
                                <TableCell>{job.company}</TableCell>
                                <TableCell className="capitalize">{job.category}</TableCell>
                                <TableCell>
                                    <Badge variant="outline">{job.type}</Badge>
                                </TableCell>
                                <TableCell>
                                    <Badge>Activo</Badge>
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
                                        <DropdownMenuItem onClick={() => handleOpenModal(job)}>Editar</DropdownMenuItem>
                                        <DropdownMenuItem>Desactivar</DropdownMenuItem>
                                        <DropdownMenuItem className="text-destructive" onClick={() => handleDelete(job.id)}>Eliminar</DropdownMenuItem>
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
