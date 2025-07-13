import { Header } from '@/components/layout/header';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import Link from 'next/link';

export default function LoginPage() {
  return (
    <div className="flex flex-col min-h-screen bg-transparent">
      <Header />
      <main className="flex-1 flex items-center justify-center container mx-auto py-12 px-4">
        <Card className="w-full max-w-md shadow-2xl">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl">Iniciar Sesión</CardTitle>
            <CardDescription>
              Ingresa a tu cuenta para ver y crear publicaciones.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form className="space-y-4">
              <div className="space-y-1">
                <Label htmlFor="email">Email</Label>
                <Input id="email" type="email" placeholder="tu@email.com" required />
              </div>
              <div className="space-y-1">
                <Label htmlFor="password">Contraseña</Label>
                <Input id="password" type="password" required />
              </div>
              <Button type="submit" className="w-full">
                Ingresar
              </Button>
            </form>
            <div className="mt-4 text-center text-sm">
              ¿No tenés cuenta?{' '}
              <Link href="/register" className="underline hover:text-primary">
                Registrate acá
              </Link>
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  );
}
