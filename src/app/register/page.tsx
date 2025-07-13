
'use client';

import { Header } from '@/components/layout/header';
import { Footer } from '@/components/layout/footer';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { RegisterForm } from '@/components/auth/register-form';

export default function RegisterPage() {

  return (
    <div className="flex flex-col min-h-screen bg-transparent">
      <Header />
      <main className="flex-1 flex items-center justify-center container mx-auto py-12 px-4">
        <Card className="w-full max-w-lg shadow-2xl">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl">Únete a Conexión Laboral</CardTitle>
            <CardDescription>
              Elige tu tipo de cuenta para empezar.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="worker" className="w-full">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="worker">Busco Trabajo</TabsTrigger>
                <TabsTrigger value="company">Quiero Contratar</TabsTrigger>
              </TabsList>
              <TabsContent value="worker">
                  <RegisterForm role="user" />
              </TabsContent>
              <TabsContent value="company">
                  <RegisterForm role="company" />
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </main>
      <Footer />
    </div>
  );
}
