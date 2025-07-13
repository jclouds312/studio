
'use client';

import React from 'react';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Upload, Edit, Loader2, User, Phone, FileText, Briefcase, Eye, Calendar, Bookmark, Shield, MapPin } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import { Separator } from '../ui/separator';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from '../ui/badge';

const user = {
    name: 'Johnatan Vallejo',
    email: 'john474nvallejo@gmail.com',
    role: 'admin' as const,
    avatarUrl: 'https://placehold.co/128x128.png',
    phone: '+54 9 11 1234-5678',
    location: 'Buenos Aires, CABA',
    applications: [
        { id: '1', title: 'Frontend Developer', company: 'Tech Solutions Inc.', status: 'En revisión' },
        { id: '2', title: 'Diseñador/a UX/UI', company: 'Creative Minds', status: 'Rechazado' },
        { id: '3', title: 'Pintor de Interiores', company: 'Servicios Varios', status: 'Contactado' },
    ],
    stats: {
        profileViews: 128,
        interviews: 3,
        savedJobs: 12,
    }
};

const roleDisplay: Record<typeof user.role, string> = {
    admin: 'Administrador',
};

function EditProfileTab() {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const fileInputRef = React.useRef<HTMLInputElement>(null);
  const [fileName, setFileName] = React.useState<string | null>(null);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsSubmitting(true);

    setTimeout(() => {
      setIsSubmitting(false);
      toast({
        title: "Perfil Actualizado",
        description: "Tus cambios se han guardado correctamente.",
      });
    }, 1500);
  };

   const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setFileName(file.name);
      toast({
        title: "Archivo Cargado",
        description: `Se ha cargado el archivo: ${file.name}`,
      });
    }
  };

  return (
      <Card>
        <CardHeader>
            <CardTitle>Información Personal</CardTitle>
            <CardDescription>Actualiza tus datos de contacto y sube tu CV.</CardDescription>
        </CardHeader>
        <CardContent>
            <form className="space-y-6" onSubmit={handleSubmit}>
                <div className="space-y-4">
                    <div>
                    <Label htmlFor="name">Nombre completo</Label>
                    <div className="relative">
                        <User className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground h-5 w-5" />
                        <Input id="name" type="text" className="pl-10" defaultValue={user.name} placeholder="Tu nombre completo"/>
                    </div>
                    </div>
                    
                    <div>
                    <Label htmlFor="phone">Número de WhatsApp</Label>
                    <div className="relative">
                        <Phone className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground h-5 w-5" />
                        <Input id="phone" type="tel" className="pl-10" defaultValue={user.phone} placeholder="+54 9 11 ...."/>
                    </div>
                    </div>

                    <div>
                    <Label htmlFor="location">Localidad</Label>
                    <div className="relative">
                        <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground h-5 w-5" />
                        <Input id="location" type="text" className="pl-10" defaultValue={user.location} placeholder="Ej: Buenos Aires, CABA"/>
                    </div>
                    </div>

                    <div>
                    <Label htmlFor="cv">Curriculum Vitae (PDF)</Label>
                    <div className="relative">
                        <Input
                            id="cv-upload"
                            type="file"
                            className="hidden"
                            ref={fileInputRef}
                            onChange={handleFileChange}
                            accept=".pdf"
                        />
                        <Button
                            type="button"
                            variant="outline"
                            className="w-full justify-start text-left font-normal"
                            onClick={() => fileInputRef.current?.click()}
                        >
                            <FileText className="mr-2 h-4 w-4" />
                            {fileName || 'Subir archivo PDF'}
                        </Button>
                    </div>
                    {fileName && (
                        <p className="text-xs text-muted-foreground mt-1">Archivo seleccionado: {fileName}</p>
                    )}
                    </div>
                </div>
                
                <Separator />

                <div className="flex justify-end pt-2">
                <Button type="submit" size="lg" disabled={isSubmitting}>
                    {isSubmitting ? (
                    <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Guardando...
                    </>
                    ) : (
                    <>
                        <Edit className="mr-2 h-4 w-4" />
                        Guardar Cambios
                    </>
                    )}
                </Button>
                </div>
            </form>
        </CardContent>
      </Card>
  )
}

function ApplicationsTab() {
    return (
        <Card>
            <CardHeader>
                <CardTitle>Mis Postulaciones</CardTitle>
                <CardDescription>Un historial de todas tus postulaciones.</CardDescription>
            </CardHeader>
            <CardContent>
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Puesto</TableHead>
                            <TableHead>Empresa</TableHead>
                            <TableHead>Estado</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {user.applications.map(app => (
                            <TableRow key={app.id}>
                                <TableCell className="font-medium">{app.title}</TableCell>
                                <TableCell>{app.company}</TableCell>
                                <TableCell>
                                    <Badge variant={app.status === 'Contactado' ? 'default' : (app.status === 'Rechazado' ? 'destructive' : 'secondary')}>
                                        {app.status}
                                    </Badge>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </CardContent>
        </Card>
    )
}

function StatsTab() {
    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Visualizaciones de Perfil</CardTitle>
                    <Eye className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                    <div className="text-2xl font-bold">{user.stats.profileViews}</div>
                    <p className="text-xs text-muted-foreground">En los últimos 30 días</p>
                </CardContent>
            </Card>
            <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Entrevistas Programadas</CardTitle>
                    <Calendar className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                    <div className="text-2xl font-bold">{user.stats.interviews}</div>
                    <p className="text-xs text-muted-foreground">Total de entrevistas</p>
                </CardContent>
            </Card>
             <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Ofertas Guardadas</CardTitle>
                    <Bookmark className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                    <div className="text-2xl font-bold">{user.stats.savedJobs}</div>
                    <p className="text-xs text-muted-foreground">Tus ofertas de interés</p>
                </CardContent>
            </Card>
        </div>
    )
}


export function UserProfile() {
  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div className="flex flex-col items-center text-center space-y-4">
        <div className="relative w-32 h-32">
            <Avatar className="w-32 h-32 border-4 border-primary shadow-lg">
                <AvatarImage src={user.avatarUrl} alt={user.name} data-ai-hint="person user"/>
                <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
            </Avatar>
            <Button size="icon" className="absolute bottom-1 right-1 rounded-full hover:scale-110 transition-transform" aria-label="Cambiar foto de perfil">
                <Upload className="w-4 h-4" />
            </Button>
        </div>
        <div>
            <h1 className="text-3xl font-bold">{user.name}</h1>
            <p className="text-muted-foreground">{user.email}</p>
            {user.role && (
                <Badge variant="secondary" className="mt-2 capitalize flex items-center gap-1.5">
                    <Shield className="h-3 w-3"/>
                    {roleDisplay[user.role] || user.role}
                </Badge>
            )}
        </div>
      </div>
      
      <Tabs defaultValue="edit-profile" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="edit-profile">
            <Edit className="mr-2 h-4 w-4" />
            Editar Perfil
          </TabsTrigger>
          <TabsTrigger value="applications">
            <Briefcase className="mr-2 h-4 w-4" />
            Mis Postulaciones
            </TabsTrigger>
          <TabsTrigger value="stats">
            <Eye className="mr-2 h-4 w-4" />
            Estadísticas
          </TabsTrigger>
        </TabsList>
        <TabsContent value="edit-profile" className="mt-6">
            <EditProfileTab />
        </TabsContent>
        <TabsContent value="applications" className="mt-6">
            <ApplicationsTab />
        </TabsContent>
        <TabsContent value="stats" className="mt-6">
            <StatsTab />
        </TabsContent>
      </Tabs>
    </div>
  );
}
