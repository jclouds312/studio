
'use client';

import React from 'react';
import { Header } from '@/components/layout/header';
import { AdminDashboard } from '@/components/admin/dashboard';
import { SidebarProvider, SidebarInset } from '@/components/ui/sidebar';
import { AdminSidebar } from '@/components/admin/sidebar';
import { Footer } from '@/components/layout/footer';
import { Tabs, TabsContent } from '@/components/ui/tabs';
import { OverviewTab } from '@/components/admin/tabs/overview';
import { JobsTab } from '@/components/admin/tabs/jobs';
import { UsersTab } from '@/components/admin/tabs/users';
import { CompaniesTab } from '@/components/admin/tabs/companies';
import { CategoriesTab } from '@/components/admin/tabs/categories';
import { PaymentsTab } from '@/components/admin/tabs/payments';
import { MarketingTab } from '@/components/admin/tabs/marketing';

export default function AdminPage() {
  const [activeTab, setActiveTab] = React.useState('overview');

  return (
    <SidebarProvider>
        <div className="flex flex-col min-h-screen bg-background">
            <Header />
            <div className="flex flex-1">
                <AdminSidebar activeTab={activeTab} setActiveTab={setActiveTab} />
                <SidebarInset>
                    <main className="flex-1 container mx-auto py-8 px-4">
                        <AdminDashboard />
                         <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4 mt-8">
                            <TabsContent value="overview">
                                <OverviewTab setActiveTab={setActiveTab} />
                            </TabsContent>
                            <TabsContent value="jobs">
                                <JobsTab />
                            </TabsContent>
                            <TabsContent value="users">
                                <UsersTab />
                            </TabsContent>
                            <TabsContent value="companies">
                                <CompaniesTab />
                            </TabsContent>
                            <TabsContent value="categories">
                                <CategoriesTab />
                            </TabsContent>
                            <TabsContent value="payments">
                                <PaymentsTab />
                            </TabsContent>
                            <TabsContent value="marketing">
                                <MarketingTab />
                            </TabsContent>
                        </Tabs>
                    </main>
                </SidebarInset>
            </div>
            <Footer />
        </div>
    </SidebarProvider>
  );
}
