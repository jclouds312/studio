import { Header } from '@/components/layout/header';
import { UserProfile } from '@/components/profile/user-profile';

export default function ProfilePage() {
  return (
    <div className="flex flex-col min-h-screen bg-transparent">
      <Header />
      <main className="flex-1 container mx-auto py-12 px-4">
        <UserProfile />
      </main>
    </div>
  );
}
