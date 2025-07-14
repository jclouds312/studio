
'use client';

import { Header } from '@/components/layout/header';
import { Footer } from '@/components/layout/footer';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { RegisterForm } from '@/components/auth/register-form';

export default function RegisterPage() {

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-1 flex items-center justify-center container mx-auto py-12 px-4">
        <Card className="w-full max-w-lg shadow-xl">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl">Únete a LaburoYA</CardTitle>
            <CardDescription>
              Crea tu cuenta para empezar. Es rápido y fácil.
            </CardDescription>
          </CardHeader>
          <CardContent>
             <RegisterForm />
          </CardContent>
        </Card>
      </main>
      <Footer />
    </div>
  );
}
