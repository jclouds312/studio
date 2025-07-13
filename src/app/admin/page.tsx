import { Header } from '@/components/layout/header';
import { AdminDashboard } from '@/components/admin/dashboard';

export default function AdminPage() {
  return (
    <div className="flex flex-col min-h-screen bg-background">
      <Header />
      <main className="flex-1 container mx-auto py-8 px-4">
        <AdminDashboard />
      </main>
    </div>
  );
}
