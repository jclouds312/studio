
import { Header } from '@/components/layout/header';
import { Footer } from '@/components/layout/footer';
import { AdminRegisterForm } from '@/components/admin/register-form';

export default function AdminRegisterPage() {
  return (
    <div className="flex flex-col min-h-screen bg-transparent">
      <Header />
      <main className="flex-1 container mx-auto">
        <AdminRegisterForm />
      </main>
      <Footer />
    </div>
  );
}
