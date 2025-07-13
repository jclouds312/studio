
'use client';

import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { useSession } from '@/hooks/use-session';

export function AdminRegisterForm() {
    const { register } = useSession();

    const handleRegister = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        const name = formData.get('name') as string;
        const email = formData.get('email') as string;
        const password = formData.get('password') as string;
        
        register({ name, email, password, role: 'admin' });
    };

  return (
    <div className="flex items-center justify-center py-12 px-4">
      <div className="w-full max-w-md">
        <Card className="shadow-2xl">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl">Crear cuenta de Administrador</CardTitle>
            <CardDescription>
              Ingresa los datos para registrar una nueva cuenta.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form className="space-y-4" onSubmit={handleRegister}>
              <div className="space-y-1">
                <Label htmlFor="name">Nombre completo</Label>
                <Input name="name" id="name" type="text" placeholder="John Doe" required />
              </div>
              <div className="space-y-1">
                <Label htmlFor="email">Email</Label>
                <Input name="email" id="email" type="email" placeholder="admin@example.com" required />
              </div>
              <div className="space-y-1">
                <Label htmlFor="password">Contraseña</Label>
                <Input name="password" id="password" type="password" required defaultValue="julio2025" />
              </div>
              <Button type="submit" className="w-full">
                Crear Cuenta
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
