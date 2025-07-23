
'use client';

import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft, FileText, Globe } from "lucide-react";
import { useRouter } from "next/navigation";

const convenios = [
  { value: "comercio", name: "Comercio (CCT 130/75)", description: "Regula las relaciones laborales para empleados de comercio en toda Argentina. Incluye categorías, escalas salariales y condiciones de trabajo." },
  { value: "construccion", name: "Construcción (UOCRA - CCT 76/75)", description: "Aplica a los trabajadores de la industria de la construcción. Establece condiciones de seguridad, categorías y salarios específicos del sector." },
  { value: "gastronomicos", name: "Gastronómicos (UTHGRA - CCT 389/04)", description: "Cubre a los trabajadores de hoteles, restaurantes, bares y otros establecimientos gastronómicos, definiendo jornadas y remuneraciones." },
  { value: "sanidad", name: "Sanidad (FATSA - CCT 122/75)", description: "Rige para el personal de hospitales, clínicas, sanatorios y laboratorios privados. Incluye adicionales por tareas específicas y condiciones de insalubridad." },
  { value: "metalurgicos", name: "Metalúrgicos (UOM)", description: "Comprende a los obreros y empleados de la industria metalúrgica, con diversas ramas y especialidades." },
  { value: "bancarios", name: "Bancarios (La Bancaria - CCT 18/75)", description: "Regula la actividad de los empleados de bancos y entidades financieras, con un enfoque en la jornada laboral y compensaciones." },
  { value: "camioneros", name: "Camioneros (CCT 40/89)", description: "Aplica a los conductores de camiones y personal de logística y transporte de cargas." }
];

export default function AgreementsGuidePage() {
  const router = useRouter();

  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex-1 container mx-auto py-12 px-4">
        <div className="mb-6">
          <Button variant="outline" onClick={() => router.back()} className="flex items-center gap-2">
            <ArrowLeft className="h-4 w-4" />
            Volver
          </Button>
        </div>
        <div className="max-w-3xl mx-auto">
          <Card>
            <CardHeader className="text-center">
              <FileText className="mx-auto h-12 w-12 text-primary mb-2" />
              <CardTitle className="text-3xl">Guía de Convenios Colectivos de Trabajo</CardTitle>
              <CardDescription className="text-lg">
                Entiende qué son y cuáles son los convenios más comunes en Argentina.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <h2 className="text-xl font-semibold mb-2">¿Qué es un Convenio Colectivo de Trabajo (CCT)?</h2>
                <p className="text-muted-foreground">
                  Un Convenio Colectivo de Trabajo es un acuerdo entre los sindicatos que representan a los trabajadores (por ejemplo, UOCRA para la construcción) y las cámaras que representan a las empresas de un sector.
                  Este acuerdo establece las condiciones de trabajo y salarios para todos los empleados de esa actividad, mejorando y adaptando lo que dice la Ley de Contrato de Trabajo general. Define categorías, sueldos básicos, adicionales, jornada laboral, vacaciones y más.
                </p>
              </div>

              <div>
                <h2 className="text-xl font-semibold mb-2">Principales Convenios en Argentina</h2>
                <Accordion type="single" collapsible className="w-full">
                  {convenios.map((convenio) => (
                    <AccordionItem value={convenio.value} key={convenio.value}>
                      <AccordionTrigger className="text-lg">{convenio.name}</AccordionTrigger>
                      <AccordionContent className="space-y-3">
                        <p className="text-muted-foreground">{convenio.description}</p>
                        <Button variant="link" asChild className="p-0 h-auto">
                          <a href={`https://www.google.com/search?q=escala+salarial+${convenio.name}`} target="_blank" rel="noopener noreferrer">
                            <Globe className="mr-2 h-4 w-4" />
                            Buscar escala salarial actualizada
                          </a>
                        </Button>
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
}
