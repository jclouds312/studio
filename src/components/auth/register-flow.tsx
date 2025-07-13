'use client';

import React, { useState, useRef, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Upload, ArrowRight, ArrowLeft, User, Mail, Key, Camera, Loader2, ShieldCheck, FileText } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { cn } from '@/lib/utils';
import Image from 'next/image';

function CameraIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M14.5 4h-5L7 7H4a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2h-3l-2.5-3z" />
      <circle cx="12" cy="13" r="3" />
    </svg>
  )
}

const steps = [
  { id: 1, title: 'Datos de la cuenta', icon: User },
  { id: 2, title: 'Verificación de Identidad', icon: ShieldCheck },
  { id: 3, title: 'Foto de Perfil (Selfie)', icon: Camera },
];

export function RegisterFlow() {
  const [currentStep, setCurrentStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();
  
  const [dniFront, setDniFront] = useState<File | null>(null);
  const [dniBack, setDniBack] = useState<File | null>(null);
  const [selfie, setSelfie] = useState<string | null>(null);

  const videoRef = useRef<HTMLVideoElement>(null);
  const [hasCameraPermission, setHasCameraPermission] = useState(false);
  const [isCameraOn, setIsCameraOn] = useState(false);

  const progress = (currentStep / steps.length) * 100;

  useEffect(() => {
    return () => {
      // Cleanup: stop camera stream when component unmounts
      if (videoRef.current && videoRef.current.srcObject) {
        (videoRef.current.srcObject as MediaStream).getTracks().forEach(track => track.stop());
      }
    };
  }, []);

  const handleNext = () => {
    setCurrentStep(prev => (prev < steps.length ? prev + 1 : prev));
  };

  const handleBack = () => {
    if(isCameraOn) {
      stopCamera();
    }
    setCurrentStep(prev => (prev > 1 ? prev - 1 : prev));
  };
  
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>, fileSetter: React.Dispatch<React.SetStateAction<File | null>>) => {
    if (e.target.files && e.target.files[0]) {
      fileSetter(e.target.files[0]);
    }
  };

  const startCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      setHasCameraPermission(true);
      setIsCameraOn(true);
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
      }
    } catch (error) {
      console.error('Error accessing camera:', error);
      setHasCameraPermission(false);
      setIsCameraOn(false);
      toast({
        variant: 'destructive',
        title: 'Cámara denegada',
        description: 'Por favor, habilita los permisos de la cámara en tu navegador.',
      });
    }
  };
  
  const stopCamera = () => {
     if (videoRef.current && videoRef.current.srcObject) {
        (videoRef.current.srcObject as MediaStream).getTracks().forEach(track => track.stop());
        videoRef.current.srcObject = null;
      }
      setIsCameraOn(false);
  }

  const takeSelfie = () => {
    if (videoRef.current) {
      const canvas = document.createElement('canvas');
      canvas.width = videoRef.current.videoWidth;
      canvas.height = videoRef.current.videoHeight;
      const context = canvas.getContext('2d');
      if (context) {
        context.drawImage(videoRef.current, 0, 0, canvas.width, canvas.height);
        const dataUrl = canvas.toDataURL('image/png');
        setSelfie(dataUrl);
        stopCamera();
      }
    }
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsSubmitting(true);
    toast({
      title: "Registrando cuenta...",
      description: "Por favor espera un momento.",
    });

    setTimeout(() => {
      setIsSubmitting(false);
      toast({
        title: "¡Registro exitoso!",
        description: "Tu cuenta ha sido creada. Ahora serás redirigido.",
      });
      // Here you would typically redirect the user
      // window.location.href = '/profile';
    }, 2000);
  };

  return (
    <Card className="w-full max-w-lg shadow-2xl">
      <CardHeader>
        <CardTitle className="text-2xl text-center">Crear una cuenta en LaburoYA</CardTitle>
        <CardDescription className="text-center">
            Paso {currentStep} de {steps.length}: {steps[currentStep - 1].title}
        </CardDescription>
        <Progress value={progress} className="w-full mt-2" />
      </CardHeader>
      <form onSubmit={handleSubmit}>
        <CardContent className="min-h-[350px]">
          {currentStep === 1 && (
            <div className="space-y-4 animate-in fade-in-0">
              <div className="space-y-1">
                <Label htmlFor="name">Nombre completo</Label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground h-5 w-5" />
                  <Input id="name" type="text" placeholder="Ej: Juan Pérez" required className="pl-10" />
                </div>
              </div>
              <div className="space-y-1">
                <Label htmlFor="email">Email</Label>
                 <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground h-5 w-5" />
                  <Input id="email" type="email" placeholder="tu@email.com" required className="pl-10"/>
                </div>
              </div>
              <div className="space-y-1">
                <Label htmlFor="password">Contraseña</Label>
                <div className="relative">
                  <Key className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground h-5 w-5" />
                  <Input id="password" type="password" required className="pl-10"/>
                </div>
              </div>
            </div>
          )}

          {currentStep === 2 && (
            <div className="space-y-6 animate-in fade-in-0">
              <Alert>
                <ShieldCheck className="h-4 w-4" />
                <AlertTitle>¿Por qué pedimos tu DNI?</AlertTitle>
                <AlertDescription>
                  Para garantizar la seguridad de la comunidad, verificamos la identidad de todos los usuarios. Tus datos están protegidos.
                </AlertDescription>
              </Alert>
              <div className="space-y-2">
                <Label htmlFor="dni-front">DNI (Frente)</Label>
                <Input id="dni-front" type="file" accept="image/*" onChange={(e) => handleFileChange(e, setDniFront)} className="file:text-primary file:font-medium" />
                {dniFront && <p className="text-xs text-green-600 flex items-center gap-1"><ShieldCheck className="h-3 w-3" /> {dniFront.name} cargado</p>}
              </div>
              <div className="space-y-2">
                <Label htmlFor="dni-back">DNI (Dorso)</Label>
                <Input id="dni-back" type="file" accept="image/*" onChange={(e) => handleFileChange(e, setDniBack)} className="file:text-primary file:font-medium"/>
                {dniBack && <p className="text-xs text-green-600 flex items-center gap-1"><ShieldCheck className="h-3 w-3" /> {dniBack.name} cargado</p>}
              </div>
            </div>
          )}
          
          {currentStep === 3 && (
            <div className="space-y-4 animate-in fade-in-0">
               <Alert>
                <Camera className="h-4 w-4" />
                <AlertTitle>Tómate una Selfie</AlertTitle>
                <AlertDescription>
                  Necesitamos una foto tuya en tiempo real para completar la verificación. Asegúrate de tener buena iluminación.
                </AlertDescription>
              </Alert>
              <div className="w-full aspect-video bg-secondary rounded-md flex items-center justify-center overflow-hidden">
                {selfie ? (
                    <Image src={selfie} alt="Selfie preview" width={320} height={240} className="object-cover h-full w-full" data-ai-hint="person selfie"/>
                ) : (
                  isCameraOn ? (
                    <video ref={videoRef} className="w-full h-full object-cover" autoPlay muted playsInline />
                  ) : (
                    <CameraIcon className="w-16 h-16 text-muted-foreground" />
                  )
                )}
              </div>
                {!hasCameraPermission && !isCameraOn && (
                     <Alert variant="destructive">
                        <AlertTitle>Se requiere acceso a la cámara</AlertTitle>
                        <AlertDescription>
                          Por favor, permite el acceso a la cámara para continuar.
                        </AlertDescription>
                    </Alert>
                )}
               <div className="flex gap-2">
                {!isCameraOn && !selfie ? (
                    <Button onClick={startCamera} type="button" className="w-full">
                        <Camera className="mr-2 h-4 w-4" />
                        Activar cámara
                    </Button>
                ) : null}
                
                {isCameraOn && !selfie ? (
                    <Button onClick={takeSelfie} type="button" className="w-full">
                        <Camera className="mr-2 h-4 w-4" />
                        Tomar foto
                    </Button>
                ) : null}

                {selfie && (
                     <Button onClick={() => { setSelfie(null); startCamera(); }} type="button" className="w-full" variant="outline">
                        Repetir foto
                    </Button>
                )}
               </div>
            </div>
          )}
        </CardContent>

        <CardFooter className="flex justify-between">
          {currentStep > 1 ? (
            <Button type="button" variant="outline" onClick={handleBack} disabled={isSubmitting}>
              <ArrowLeft className="mr-2 h-4 w-4" />
              Atrás
            </Button>
          ) : <div />}

          {currentStep < steps.length ? (
            <Button type="button" onClick={handleNext}>
              Siguiente
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          ) : (
            <Button type="submit" disabled={isSubmitting || !selfie || !dniFront || !dniBack}>
              {isSubmitting ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Finalizando...
                </>
              ) : (
                'Finalizar registro'
              )}
            </Button>
          )}
        </CardFooter>
      </form>
    </Card>
  );
}
