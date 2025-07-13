import { Header } from '@/components/layout/header';
import { AiJobMatcher } from '@/components/ai-job-matcher';
import { JobListings } from '@/components/job-listings';

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen bg-background">
      <Header />
      <main className="flex-1 container mx-auto py-8 px-4">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
          <div className="lg:col-span-1">
            <AiJobMatcher />
          </div>
          <div className="lg:col-span-2">
            <JobListings />
          </div>
        </div>
      </main>
    </div>
  );
}
