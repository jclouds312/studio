
'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Users, Briefcase, DollarSign, Star, Download, Sparkles, CreditCard, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { allJobs } from "@/components/job-listings";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import React from "react";
import Image from "next/image";

export function AdminDashboard() {

  const [isPaying, setIsPaying] = React.useState(false);
  const [paymentSuccess, setPaymentSuccess] = React.useState(false);

  const handlePayment = () => {
    setIsPaying(true);
    setTimeout(() => {
      setIsPaying(false);
      setPaymentSuccess(true);
    }, 2000);
  };

  const handleDownloadBackup = () => {
    const jsonString = `data:text/json;charset=utf-8,${encodeURIComponent(
      JSON.stringify(allJobs, null, 2)
    )}`;
    const link = document.createElement("a");
    link.href = jsonString;
    link.download = "jobs-backup.json";
    link.click();
  };

  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-bold">Admin Dashboard</h1>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Total Users
            </CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">1,234</div>
            <p className="text-xs text-muted-foreground">
              +20.1% from last month
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Active Job Listings
            </CardTitle>
            <Briefcase className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">573</div>
            <p className="text-xs text-muted-foreground">
              +180.1% from last month
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Revenue</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">$45,231.89</div>
            <p className="text-xs text-muted-foreground">
              +19% from last month
            </p>
          </CardContent>
        </Card>
        <Card>
           <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Database Backup</CardTitle>
            <Download className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
             <p className="text-xs text-muted-foreground mb-4">
              Download a JSON backup of the job listings.
            </p>
            <Button className="w-full" onClick={handleDownloadBackup}>
                Download Backup
            </Button>
          </CardContent>
        </Card>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <Card>
            <CardHeader>
                <CardTitle>Recent Activity</CardTitle>
                 <CardDescription>Activity feed will be shown here...</CardDescription>
            </CardHeader>
            <CardContent>
                <p>...</p>
            </CardContent>
        </Card>
         <Card>
            <CardHeader>
                <CardTitle className="flex items-center gap-2">
                    <Star className="text-primary"/>
                    Premium Services
                </CardTitle>
                 <CardDescription>Boost your job listings and find talent faster.</CardDescription>
            </CardHeader>
            <CardContent className="flex flex-col gap-4">
                <div className="p-4 border rounded-lg bg-secondary/30">
                    <h4 className="font-semibold">Highlight your Job Post</h4>
                    <p className="text-sm text-muted-foreground">Make your job listing stand out from the rest to attract more candidates.</p>
                </div>
                 <AlertDialog onOpenChange={() => { setIsPaying(false); setPaymentSuccess(false); }}>
                  <AlertDialogTrigger asChild>
                    <Button>
                        <DollarSign className="mr-2 h-4 w-4"/>
                        Upgrade with Mercado Pago
                    </Button>
                  </AlertDialogTrigger>
                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <AlertDialogTitle className="flex items-center gap-2">
                        <Image src="https://www.mercadopago.com/v2/images/navigation-logo-small-with-text.png" alt="Mercado Pago" width={120} height={28} data-ai-hint="company logo"/>
                        Confirmar Pago
                        </AlertDialogTitle>
                      <AlertDialogDescription>
                        {paymentSuccess ? (
                          <div className="text-center py-4">
                            <Sparkles className="h-12 w-12 text-green-500 mx-auto mb-2"/>
                            <h3 className="text-lg font-bold text-foreground">¡Pago exitoso!</h3>
                            <p className="text-muted-foreground">Tu publicación de empleo ha sido destacada.</p>
                          </div>
                        ) : (
                          <>
                           Estás a punto de pagar <span className="font-bold text-foreground">ARS $500.00</span> para destacar tu publicación de empleo por 30 días.
                          </>
                        )}
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        {paymentSuccess ? (
                            <AlertDialogCancel>Cerrar</AlertDialogCancel>
                        ) : (
                            <>
                                <AlertDialogCancel disabled={isPaying}>Cancelar</AlertDialogCancel>
                                <Button onClick={handlePayment} disabled={isPaying}>
                                  {isPaying ? (
                                    <>
                                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                      Procesando...
                                    </>
                                  ) : (
                                    <>
                                      <CreditCard className="mr-2 h-4 w-4" />
                                      Pagar ahora
                                    </>
                                  )}
                                </Button>
                            </>
                        )}
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
            </CardContent>
        </Card>
      </div>
    </div>
  );
}
