
'use client';

import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ArrowLeft, Calculator, Percent } from "lucide-react";
import { useRouter } from "next/navigation";
import { Separator } from '@/components/ui/separator';

export default function SalaryCalculatorPage() {
  const router = useRouter();
  const [salarioBruto, setSalarioBruto] = useState<string>('');
  const [salarioNeto, setSalarioNeto] = useState<number | null>(null);
  const [descuentos, setDescuentos] = useState({
    jubilacion: 0,
    ley19032: 0,
    obraSocial: 0,
    sindicato: 0,
    total: 0,
  });

  const calcularSueldo = () => {
    const bruto = parseFloat(salarioBruto);
    if (isNaN(bruto) || bruto <= 0) {
      setSalarioNeto(null);
      return;
    }

    const jubilacion = bruto * 0.11;
    const ley19032 = bruto * 0.03;
    const obraSocial = bruto * 0.03;
    const sindicato = bruto * 0.02; // Promedio, puede variar.
    const totalDescuentos = jubilacion + ley19032 + obraSocial + sindicato;
    const neto = bruto - totalDescuentos;

    setDescuentos({ jubilacion, ley19032, obraSocial, sindicato, total: totalDescuentos });
    setSalarioNeto(neto);
  };

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('es-AR', { style: 'currency', currency: 'ARS' }).format(value);
  }

  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex-1 container mx-auto py-12 px-4">
        <div className="mb-6">
          <Button variant="outline" onClick={() => router.back()} className="flex items-center gap-2">
            <ArrowLeft className="h-4 w-4" />
            Volver
          </Button>
        </div>
        <div className="max-w-2xl mx-auto">
          <Card>
            <CardHeader className="text-center">
              <Calculator className="mx-auto h-12 w-12 text-primary mb-2" />
              <CardTitle className="text-3xl">Calculadora de Sueldo Neto</CardTitle>
              <CardDescription className="text-lg">
                Estima cuánto recibirás "en mano" a partir de tu sueldo bruto en Argentina.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="salarioBruto" className="text-lg">Ingresa tu sueldo bruto mensual</Label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">$</span>
                  <Input 
                    id="salarioBruto" 
                    type="number" 
                    placeholder="Ej: 500000" 
                    className="pl-7 text-lg h-12"
                    value={salarioBruto}
                    onChange={(e) => setSalarioBruto(e.target.value)}
                  />
                </div>
              </div>
              <Button size="lg" className="w-full" onClick={calcularSueldo}>
                Calcular Sueldo Neto
              </Button>
            </CardContent>

            {salarioNeto !== null && (
              <>
                <Separator className="my-6" />
                <CardFooter className="flex flex-col gap-4 items-start p-6">
                  <div className="text-center w-full">
                    <p className="text-muted-foreground">Tu sueldo neto aproximado es:</p>
                    <p className="text-4xl font-bold text-primary">{formatCurrency(salarioNeto)}</p>
                  </div>
                  <div className="w-full space-y-3">
                    <h3 className="font-semibold text-lg text-center">Detalle de descuentos (aprox. 19%):</h3>
                    <div className="grid grid-cols-2 gap-x-4 gap-y-2 text-muted-foreground">
                      <span>Jubilación (11%)</span>
                      <span className="text-right font-mono">{formatCurrency(descuentos.jubilacion)}</span>
                      <span>Ley 19.032 - PAMI (3%)</span>
                      <span className="text-right font-mono">{formatCurrency(descuentos.ley19032)}</span>
                      <span>Obra Social (3%)</span>
                      <span className="text-right font-mono">{formatCurrency(descuentos.obraSocial)}</span>
                      <span>Aporte Sindical (2%)</span>
                      <span className="text-right font-mono">{formatCurrency(descuentos.sindicato)}</span>
                    </div>
                    <Separator/>
                     <div className="grid grid-cols-2 gap-x-4 gap-y-2 font-semibold">
                        <span>Total de Descuentos</span>
                        <span className="text-right font-mono">{formatCurrency(descuentos.total)}</span>
                     </div>
                  </div>
                   <p className="text-xs text-muted-foreground pt-4 text-center w-full">
                    * Este es un cálculo aproximado basado en los descuentos de ley estándar. No incluye impuesto a las ganancias, horas extras, ni otros adicionales o deducciones específicas de tu convenio o situación particular.
                  </p>
                </CardFooter>
              </>
            )}
          </Card>
        </div>
      </main>
    </div>
  );
}
