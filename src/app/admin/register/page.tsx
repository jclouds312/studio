
import { Header } from '@/components/layout/header';
import { Footer } from '@/components/layout/footer';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { AdminRegisterForm } from '@/components/admin/register-form';

export default function AdminRegisterPage() {
  return (
    <div className="flex flex-col min-h-screen bg-transparent">
      <Header />
      <main className="flex-1 container mx-auto">
        <div className="flex items-center justify-center py-12 px-4">
          <Card className="w-full max-w-md shadow-2xl">
            <CardHeader className="text-center">
              <CardTitle className="text-2xl font-bold">
                Crear cuenta para <span className="text-amber-400">LaburoYA</span>
              </CardTitle>
              <CardDescription>
                Ingresa los datos para registrar un nuevo Administrador.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <AdminRegisterForm />
            </CardContent>
          </Card>
        </div>
      </main>
      <Footer />
    </div>
  );
}
