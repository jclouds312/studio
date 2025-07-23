
import { CompanyDashboard } from '@/components/company/dashboard';

export default function CompanyDashboardPage() {
  return (
    <div className="flex flex-col min-h-screen bg-transparent">
      <main className="flex-1 container mx-auto py-12 px-4">
        <CompanyDashboard />
      </main>
    </div>
  );
}
