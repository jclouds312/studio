import { Header } from '@/components/layout/header';
import { AdminDashboard } from '@/components/admin/dashboard';
import { SidebarProvider, SidebarInset } from '@/components/ui/sidebar';
import { AdminSidebar } from '@/components/admin/sidebar';

export default function AdminLayout() {
  return (
    <SidebarProvider>
        <div className="flex flex-col min-h-screen bg-background">
            <Header />
            <div className="flex flex-1">
                <AdminSidebar />
                <SidebarInset>
                    <main className="flex-1 container mx-auto py-8 px-4">
                        <AdminDashboard />
                    </main>
                </SidebarInset>
            </div>
        </div>
    </SidebarProvider>
  );
}
