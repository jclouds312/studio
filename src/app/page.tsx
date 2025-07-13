import { Header } from '@/components/layout/header';
import { JobListings } from '@/components/job-listings';
import { Footer } from '@/components/layout/footer';

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen bg-transparent">
      <Header />
      <main className="flex-1 container mx-auto py-8 px-4">
         <JobListings />
      </main>
      <Footer />
    </div>
  );
}
