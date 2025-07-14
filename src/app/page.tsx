import { Header } from '@/components/layout/header';
import { JobListings } from '@/components/job-listings';
import { Footer } from '@/components/layout/footer';
import { cn } from '@/lib/utils';

export default function Home() {
  return (
    <div className={cn("flex flex-col min-h-screen bg-transparent", "dark")}>
      <Header />
      <main className="flex-1 container mx-auto py-8 px-4">
         <JobListings />
      </main>
      <Footer />
    </div>
  );
}
