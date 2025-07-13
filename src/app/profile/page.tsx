import { Header } from '@/components/layout/header';
import { UserProfile } from '@/components/profile/user-profile';
import { Footer } from '@/components/layout/footer';

export default function ProfilePage() {
  return (
    <div className="flex flex-col min-h-screen bg-transparent">
      <Header />
      <main className="flex-1 container mx-auto py-12 px-4">
        <UserProfile />
      </main>
      <Footer />
    </div>
  );
}
