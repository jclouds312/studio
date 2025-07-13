
'use client';

import { Tabs, TabsContent } from "@/components/ui/tabs";
import { OverviewTab } from "./tabs/overview";
import { JobsTab } from "./tabs/jobs";
import { UsersTab } from "./tabs/users";
import { CompaniesTab } from "./tabs/companies";
import { CategoriesTab } from "./tabs/categories";
import { PaymentsTab } from "./tabs/payments";
import React from "react";

export function AdminDashboard({ activeTab }: { activeTab: string }) {

  return (
    <div className="space-y-8">
        <div className="flex items-center justify-between">
            <h1 className="text-3xl font-bold tracking-tight">Admin Dashboard</h1>
        </div>
      <Tabs value={activeTab} className="space-y-4">
        <TabsContent value="overview" className="space-y-4">
            <OverviewTab />
        </TabsContent>
         <TabsContent value="jobs" className="space-y-4">
            <JobsTab />
        </TabsContent>
         <TabsContent value="users" className="space-y-4">
            <UsersTab />
        </TabsContent>
        <TabsContent value="companies" className="space-y-4">
            <CompaniesTab />
        </TabsContent>
        <TabsContent value="categories" className="space-y-4">
            <CategoriesTab />
        </TabsContent>
         <TabsContent value="payments" className="space-y-4">
            <PaymentsTab />
        </TabsContent>
      </Tabs>
    </div>
  );
}
