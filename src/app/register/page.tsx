import { RegisterFlow } from '@/components/auth/register-flow';
import { Header } from '@/components/layout/header';

export default function RegisterPage() {
  return (
    <div className="flex flex-col min-h-screen bg-transparent">
      <Header />
      <main className="flex-1 flex items-center justify-center container mx-auto py-12 px-4">
        <RegisterFlow />
      </main>
    </div>
  );
}
