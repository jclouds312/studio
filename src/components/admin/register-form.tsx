'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";

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
    <svg {...props} xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="48" height="48" viewBox="0 0 48 48">
      <path fill="#3F51B5" d="M42,37c0,2.762-2.238,5-5,5H11c-2.761,0-5-2.238-5-5V11c0-2.762,2.239-5,5-5h26c2.762,0,5,2.238,5,5V37z"></path>
      <path fill="#FFF" d="M34.368,25H31v13h-5V25h-3v-4h3v-2.41c0-3.408,1.778-5.02,4.522-5.02c1.078,0,2.278,0.106,2.457,0.133v4.257h-2.184c-1.302,0-1.488,0.704-1.488,1.524V21h4.22l-0.56,4H34.368z"></path>
    </svg>
  );
}

function OutlookIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="48" height="48" viewBox="0 0 48 48">
      <path fill="#0072c6" d="M24,6C14.059,6,6,14.059,6,24s8.059,18,18,18s18-8.059,18-18S33.941,6,24,6z M30.685,32.128	c-0.672,0.597-1.587,0.872-2.58,0.872c-1.04,0-1.955-0.275-2.627-0.872c-0.672-0.597-1.022-1.469-1.022-2.616V18.67h13.25v11.021	C39.705,32.339,34.423,34.809,30.685,32.128z M21.33,18.67v10.375c0,1.146-0.349,2.02-1.022,2.616s-1.587,0.872-2.627,0.872	c-0.993,0-1.908-0.275-2.58-0.872C14.423,31.066,9,28.932,9,22.25V18.67H21.33z M38.832,16.67H9.168	c-0.463,0-0.849-0.334-0.911-0.783c-0.062-0.449,0.22-0.88,0.669-1.012l14.162-4.165c0.186-0.055,0.38-0.055,0.566,0l14.162,4.165	c0.449,0.132,0.731,0.563,0.669,1.012C39.681,16.336,39.295,16.67,38.832,16.67z"></path>
    </svg>
  );
}

export function AdminRegisterForm() {
  return (
    <div className="flex items-center justify-center py-12 px-4">
      <div className="w-full max-w-md">
        <Card className="shadow-2xl">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl">Crear cuenta de Administrador</CardTitle>
            <CardDescription>
              Ingresa tus datos para registrar una nueva cuenta.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form className="space-y-4">
              <div className="space-y-1">
                <Label htmlFor="name">Nombre completo</Label>
                <Input id="name" type="text" placeholder="John Doe" required />
              </div>
              <div className="space-y-1">
                <Label htmlFor="email">Email</Label>
                <Input id="email" type="email" placeholder="admin@example.com" required />
              </div>
              <div className="space-y-1">
                <Label htmlFor="password">Contraseña</Label>
                <Input id="password" type="password" required />
              </div>
              <Button type="submit" className="w-full">
                Crear Cuenta
              </Button>
            </form>
            <div className="relative my-6">
              <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t" />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-background px-2 text-muted-foreground">
                  O continuar con
                </span>
              </div>
            </div>
            <div className="grid grid-cols-1 gap-2 sm:grid-cols-3 sm:gap-4">
                <Button variant="outline">
                    <GoogleIcon className="mr-2 h-4 w-4" />
                    Google
                </Button>
                <Button variant="outline">
                    <FacebookIcon className="mr-2 h-4 w-4" />
                    Facebook
                </Button>
                <Button variant="outline">
                   <OutlookIcon className="mr-2 h-4 w-4" />
                    Outlook
                </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
