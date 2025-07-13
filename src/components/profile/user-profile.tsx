'use client';

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Upload, Edit, FileText, Phone } from "lucide-react";

export function UserProfile() {
  // Mock data for user profile
  const user = {
    name: 'Juan Pérez',
    email: 'juan.perez@example.com',
    avatarUrl: 'https://placehold.co/128x128.png',
    bio: 'Desarrollador Full Stack con 5 años de experiencia en tecnologías JavaScript. Apasionado por crear productos intuitivos y escalables. Buscando nuevos desafíos en el sector tecnológico.',
    phone: '+54 9 11 1234-5678',
    cvFileName: 'CV_Juan_Perez.pdf',
  };

  return (
    <div className="max-w-4xl mx-auto">
      <Card className="shadow-2xl">
        <CardHeader className="text-center">
            <div className="relative w-32 h-32 mx-auto">
                <Avatar className="w-32 h-32 border-4 border-primary shadow-lg">
                    <AvatarImage src={user.avatarUrl} alt={user.name} data-ai-hint="person user"/>
                    <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
                </Avatar>
                <Button size="icon" className="absolute bottom-1 right-1 rounded-full" aria-label="Cambiar foto de perfil">
                    <Upload className="w-4 h-4" />
                </Button>
            </div>
            <CardTitle className="text-3xl mt-4">{user.name}</CardTitle>
            <CardDescription>{user.email}</CardDescription>
        </CardHeader>
        <CardContent className="p-6 sm:p-8">
          <form className="space-y-6">
            <div>
              <Label htmlFor="bio">Sobre mí</Label>
              <Textarea id="bio" rows={5} defaultValue={user.bio} placeholder="Cuéntanos un poco sobre ti..." />
            </div>
            
            <div>
              <Label htmlFor="phone">Número de teléfono</Label>
              <div className="relative">
                <Phone className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground h-5 w-5" />
                <Input id="phone" type="tel" className="pl-10" defaultValue={user.phone} placeholder="+54 9 11 ...."/>
              </div>
            </div>

            <div>
              <Label htmlFor="cv">Currículum Vitae (CV)</Label>
              <div className="flex items-center gap-4">
                <div className="flex-grow flex items-center gap-2 p-2 border rounded-md bg-secondary/30">
                  <FileText className="h-5 w-5 text-primary"/>
                  <span className="text-sm font-medium text-foreground truncate">{user.cvFileName}</span>
                </div>
                <Button variant="outline">
                  <Upload className="mr-2 h-4 w-4"/>
                  Subir nuevo
                </Button>
              </div>
              <p className="text-xs text-muted-foreground mt-1">Sube tu CV en formato PDF (máx. 5MB).</p>
            </div>
            
            <div className="flex justify-end pt-4">
              <Button type="submit" size="lg">
                <Edit className="mr-2 h-4 w-4" />
                Guardar Cambios
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
