
import { AdminRegisterForm } from '@/components/admin/register-form';

export default function AdminRegisterPage() {
  return (
    <div className="flex flex-col min-h-screen bg-transparent">
      <main className="flex-1 container mx-auto">
        <AdminRegisterForm />
      </main>
    </div>
  );
}
