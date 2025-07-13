
'use client';

import React from 'react';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Upload, Edit, Loader2, User, Phone, FileText } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { Separator } from '../ui/separator';

export function UserProfile() {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const fileInputRef = React.useRef<HTMLInputElement>(null);
  const [fileName, setFileName] = React.useState<string | null>(null);

  const user = {
    name: 'Johnatan Vallejo',
    email: 'john474nvallejo@gmail.com',
    avatarUrl: 'https://placehold.co/128x128.png',
    phone: '+54 9 11 1234-5678',
  };

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
    }
  };

  return (
    <div className="max-w-2xl mx-auto">
      <Card className="shadow-2xl">
        <CardHeader className="text-center">
            <div className="relative w-32 h-32 mx-auto">
                <Avatar className="w-32 h-32 border-4 border-primary shadow-lg">
                    <AvatarImage src={user.avatarUrl} alt={user.name} data-ai-hint="person user"/>
                    <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
                </Avatar>
                 <Button size="icon" className="absolute bottom-1 right-1 rounded-full hover:scale-110 transition-transform" aria-label="Cambiar foto de perfil">
                    <Upload className="w-4 h-4" />
                </Button>
            </div>
            <CardTitle className="text-3xl mt-4">{user.name}</CardTitle>
            <CardDescription>{user.email}</CardDescription>
        </CardHeader>
        <CardContent className="p-6 sm:p-8">
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
    </div>
  );
}
