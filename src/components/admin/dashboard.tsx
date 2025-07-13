
'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Users, Briefcase, DollarSign, Star, Download } from "lucide-react";
import { Button } from "@/components/ui/button";
import { allJobs } from "@/components/job-listings";

export function AdminDashboard() {

  const handleDownloadBackup = () => {
    const jsonString = `data:text/json;charset=utf-8,${encodeURIComponent(
      JSON.stringify(allJobs, null, 2)
    )}`;
    const link = document.createElement("a");
    link.href = jsonString;
    link.download = "jobs-backup.json";
    link.click();
  };

  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-bold">Admin Dashboard</h1>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Total Users
            </CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">1,234</div>
            <p className="text-xs text-muted-foreground">
              +20.1% from last month
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Active Job Listings
            </CardTitle>
            <Briefcase className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">573</div>
            <p className="text-xs text-muted-foreground">
              +180.1% from last month
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Revenue</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">$45,231.89</div>
            <p className="text-xs text-muted-foreground">
              +19% from last month
            </p>
          </CardContent>
        </Card>
        <Card>
           <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Database Backup</CardTitle>
            <Download className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
             <p className="text-xs text-muted-foreground mb-4">
              Download a JSON backup of the job listings.
            </p>
            <Button className="w-full" onClick={handleDownloadBackup}>
                Download Backup
            </Button>
          </CardContent>
        </Card>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <Card>
            <CardHeader>
                <CardTitle>Recent Activity</CardTitle>
                 <CardDescription>Activity feed will be shown here...</CardDescription>
            </CardHeader>
            <CardContent>
                <p>...</p>
            </CardContent>
        </Card>
         <Card>
            <CardHeader>
                <CardTitle className="flex items-center gap-2">
                    <Star className="text-primary"/>
                    Premium Services
                </CardTitle>
                 <CardDescription>Boost your job listings and find talent faster.</CardDescription>
            </CardHeader>
            <CardContent className="flex flex-col gap-4">
                <div className="p-4 border rounded-lg bg-secondary/30">
                    <h4 className="font-semibold">Highlight your Job Post</h4>
                    <p className="text-sm text-muted-foreground">Make your job listing stand out from the rest to attract more candidates.</p>
                </div>
                <Button>
                    <DollarSign className="mr-2 h-4 w-4"/>
                    Upgrade with Mercado Pago
                </Button>
            </CardContent>
        </Card>
      </div>
    </div>
  );
}
