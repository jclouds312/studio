
'use client';

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { OverviewTab } from "./tabs/overview";
import { JobsTab } from "./tabs/jobs";
import { UsersTab } from "./tabs/users";
import { CompaniesTab } from "./tabs/companies";
import { CategoriesTab } from "./tabs/categories";

export function AdminDashboard() {

  return (
    <div className="space-y-8">
        <div className="flex items-center justify-between">
            <h1 className="text-3xl font-bold tracking-tight">Admin Dashboard</h1>
        </div>
      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList>
          <TabsTrigger value="overview">Resumen</TabsTrigger>
          <TabsTrigger value="jobs">Publicaciones</TabsTrigger>
          <TabsTrigger value="users">Usuarios</TabsTrigger>
          <TabsTrigger value="companies">Empresas</TabsTrigger>
          <TabsTrigger value="categories">Categorías</TabsTrigger>
        </TabsList>
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
      </Tabs>
    </div>
  );
}
