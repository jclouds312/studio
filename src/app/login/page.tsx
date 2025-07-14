
'use client';

import { Header } from '@/components/layout/header';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import Link from 'next/link';
import { Footer } from '@/components/layout/footer';
import React from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useSession } from '@/hooks/use-session';

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

function FacebookIcon(props: React.SVGProps<SVGSVGElement>) {
    return (
        <svg {...props} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" width="48px" height="48px">
            <path fill="#039be5" d="M24 5A19 19 0 1 0 24 43A19 19 0 1 0 24 5Z" />
            <path fill="#fff" d="M26.572,29.036h4.917l0.772-4.995h-5.69v-2.73c0-2.075,0.678-3.915,2.619-3.915h3.119v-4.359c-0.548-0.074-1.707-0.236-3.897-0.236c-4.573,0-7.254,2.415-7.254,7.917v3.323h-4.701v4.995h4.701v13.729C22.089,42.905,23.032,43,24,43c0.875,0,1.729-0.08,2.572-0.194V29.036z" />
        </svg>
    )
}

function MicrosoftIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" width="48px" height="48px">
      <path fill="#f25022" d="M22,22H2V2h20V22z"/>
      <path fill="#7fba00" d="M46,22H26V2h20V22z"/>
      <path fill="#00a4ef" d="M22,46H2V26h20V46z"/>
      <path fill="#ffb900" d="M46,46H26V26h20V46z"/>
    </svg>
  );
}

export default function LoginPage() {
  const { login, loginWithSocial } = useSession();
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    login(email, password);
  }

  return (
    <div className="flex flex-col min-h-screen bg-transparent">
      <Header />
      <main className="flex-1 flex items-center justify-center container mx-auto py-12 px-4">
        <Card className="w-full max-w-md shadow-2xl">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl">Bienvenido a Conexión Laboral</CardTitle>
            <CardDescription>
              Inicia sesión para continuar
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <form className="space-y-4" onSubmit={handleFormSubmit}>
              <div className="space-y-1">
                <Label htmlFor="email">Email</Label>
                <Input id="email" type="email" placeholder="tu@email.com" required value={email} onChange={(e) => setEmail(e.target.value)} />
              </div>
              <div className="space-y-1">
                <Label htmlFor="password">Contraseña</Label>
                <Input id="password" type="password" placeholder="Tu contraseña" required value={password} onChange={(e) => setPassword(e.target.value)}/>
              </div>
              <Button type="submit" className="w-full">
                Iniciar Sesión
              </Button>
            </form>
             <div className="relative my-2">
              <div className="absolute inset-0 flex items-center">
                <Separator />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-card px-2 text-muted-foreground">
                  O
                </span>
              </div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                <Button variant="outline" className="w-full" size="lg" onClick={() => loginWithSocial('johnatanvallejomarulanda@gmail.com')}>
                  <GoogleIcon className="mr-2 h-5 w-5" />
                  Google
                </Button>
                 <Button variant="outline" className="w-full" size="lg" onClick={() => loginWithSocial('empresa.facebook@example.com')}>
                  <FacebookIcon className="mr-2 h-5 w-5" />
                  Facebook
                </Button>
                <Button variant="outline" className="w-full" size="lg" onClick={() => loginWithSocial('ana.garcia.outlook@example.com')}>
                  <MicrosoftIcon className="mr-2 h-5 w-5" />
                  Outlook
                </Button>
            </div>
            <p className="text-center text-sm text-muted-foreground">
              ¿No tienes una cuenta?{' '}
              <Link href="/register" className="underline hover:text-primary">
                Regístrate
              </Link>
            </p>
          </CardContent>
        </Card>
      </main>
      <Footer />
    </div>
  );
}
