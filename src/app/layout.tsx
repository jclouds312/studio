
'use client';

import type {Metadata} from 'next';
import './globals.css';
import { Toaster } from "@/components/ui/toaster"
import { cn } from '@/lib/utils';
import { UserProfileProvider } from '@/context/user-profile-context';

/*
export const metadata: Metadata = {
  title: 'LaburoYA',
  description: 'Encuentra tu próximo trabajo en Argentina.',
  manifest: '/manifest.json',
};
*/

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" className='dark'>
      <head>
        <title>LaburoYA</title>
        <meta name="description" content="Encuentra tu próximo trabajo en Argentina." />
        <meta name="manifest" content="/manifest.json" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;700&display=swap" rel="stylesheet" />
        <meta name="theme-color" content="#3B82F6" />
      </head>
      <body className={cn("font-body antialiased min-h-screen")}>
        <UserProfileProvider>
            {children}
            <Toaster />
        </UserProfileProvider>
      </body>
    </html>
  );
}
