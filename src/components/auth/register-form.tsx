
'use client';

import React from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { useSession } from '@/hooks/use-session';
import { RadioGroup, RadioGroupItem } from '../ui/radio-group';
import type { Role } from '@prisma/client';

function GoogleIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" width="48px" height="48px">
      <path fill="#FFC107" d="M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8c-6.627,0-12-5.373-12-12s5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C12.955,4,4,12.955,4,24s8.955,20,20,20s20-8.955,20-20C44,22.659,43.862,21.35,43.611,20.083z" />
      <path fill="#FF3D00" d="M6.306,14.691l6.571,4.819C14.655,15.108,18.961,12,24,12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C16.318,4,9.656,8.337,6.306,14.691z" />
      <path fill="#4CAF50" d="M24,44c5.166,0,9.86-1.977,13.409-5.192l-6.19-5.238C29.211,35.091,26.715,36,24,36c-5.222,0-9.655-3.357-11.297-7.951l-6.571,4.819C9.656,39.663,16.318,44,24,44z" />
      <path fill="#1976D2" d="M43.611,20.083H42V20H24v8h11.303c-0.792,2.447-2.275,4.485-4.174,5.967l6.19,5.238C42.012,35.533,44,30.022,44,24C44,22.659,43.862,21.35,43.611,20.083z" />
    </svg>
  );
}

function MercadoPagoIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" width="48px" height="48px">
        <path fill="#009ee3" d="M24,5C12.954,5,4,13.954,4,24s8.954,19,20,19s20-8.954,20-20S35.046,5,24,5z"/>
        <path fill="#fff" d="M24.7,33.5c-2.3,0-4.2-1.9-4.2-4.2s1.9-4.2,4.2-4.2c1,0,2,0.4,2.7,1.1l-2.1,1.9c-0.3-0.3-0.7-0.5-1.1-0.5 c-0.9,0-1.6,0.7-1.6,1.6s0.7,1.6,1.6,1.6c0.4,0,0.8-0.2,1.1-0.5l2.1,1.9C26.7,33.1,25.7,33.5,24.7,33.5z"/>
        <path fill="#fff" d="M32.2,27.1h-3.4v-6.8h3.4c1.1,0,2,0.9,2,2v2.8C34.2,26.2,33.3,27.1,32.2,27.1z M32.2,22.3h-1.4v2.8h1.4 c0,0,0,0,0,0c0.3,0,0.5-0.2,0.5-0.5v-1.8C32.8,22.5,32.5,22.3,32.2,22.3C32.2,22.3,32.2,22.3,32.2,22.3z"/>
        <path fill="#fff" d="M15.4,20.3h1.5v3.4l3-3.4h2.2l-3.3,3.3l3.4,4.2h-2.2l-2.4-3.2l-1.3,1.2v2H15.4V20.3z"/>
    </svg>
  )
}

export function RegisterForm() {
    const { register, loginWithGoogle, loginWithMercadoPago } = useSession();
    const [role, setRole] = React.useState<Role>('TRABAJADOR');

    const handleRegister = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        const name = formData.get('name') as string;
        const email = formData.get('email') as string;
        const password = formData.get('password') as string;
        
        register({ name, email, password, role });
    };

    const isWorker = role === 'TRABAJADOR';

    return (
        <div className="mt-2 space-y-4">
             <div className="grid grid-cols-2 gap-2">
                <Button variant="outline" className="w-full" size="lg" onClick={() => loginWithGoogle(role)}>
                  <GoogleIcon className="mr-2 h-5 w-5" />
                  Google
                </Button>
                 <Button variant="outline" className="w-full" size="lg" onClick={() => loginWithMercadoPago(role)}>
                  <MercadoPagoIcon className="mr-2 h-5 w-5" />
                  Mercado Pago
                </Button>
            </div>
            <div className="relative my-2">
              <div className="absolute inset-0 flex items-center">
                <Separator />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-card px-2 text-muted-foreground">
                  O regístrate con tu email
                </span>
              </div>
            </div>
            <form className="space-y-4" onSubmit={handleRegister}>
                 <div className="space-y-2">
                    <Label>¿Qué estás buscando?</Label>
                    <RadioGroup defaultValue="TRABAJADOR" onValueChange={(value) => setRole(value as Role)} className="grid grid-cols-2 gap-4">
                        <div>
                            <RadioGroupItem value="TRABAJADOR" id="r1" className="peer sr-only" />
                            <Label htmlFor="r1" className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary cursor-pointer">
                                Busco Trabajo
                            </Label>
                        </div>
                        <div>
                             <RadioGroupItem value="EMPRESA" id="r2" className="peer sr-only" />
                             <Label htmlFor="r2" className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary cursor-pointer">
                                Quiero Contratar
                            </Label>
                        </div>
                    </RadioGroup>
                </div>

                <div className="space-y-1">
                    <Label htmlFor="name">{isWorker ? 'Nombre completo' : 'Nombre de la empresa'}</Label>
                    <Input name="name" id="name" type="text" placeholder={isWorker ? 'Ej: Juan Pérez' : 'Ej: Tech Solutions Inc.'} required />
                </div>
                <div className="space-y-1">
                    <Label htmlFor="email">Email</Label>
                    <Input name="email" id="email" type="email" placeholder="tu@email.com" required />
                </div>
                <div className="space-y-1">
                    <Label htmlFor="password">Contraseña</Label>
                    <Input name="password" id="password" type="password" required />
                </div>
                <Button type="submit" className="w-full">
                    Crear Cuenta de {isWorker ? 'Trabajador' : 'Empresa'}
                </Button>
            </form>
        </div>
    );
}
