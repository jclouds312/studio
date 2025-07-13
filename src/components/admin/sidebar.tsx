
'use client';

import { Sidebar, SidebarContent, SidebarHeader, SidebarMenu, SidebarMenuItem, SidebarMenuButton, SidebarTrigger } from "@/components/ui/sidebar";
import { Home, Briefcase, Users, Building, Settings, LayoutGrid } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";


export function AdminSidebar() {
    const pathname = usePathname();

    const isActive = (path: string) => pathname === path;

    return (
        <Sidebar>
            <SidebarContent>
                 <SidebarMenu>
                    <SidebarMenuItem>
                        <SidebarMenuButton href="/admin" isActive={isActive('/admin')} tooltip="Dashboard">
                             <LayoutGrid />
                             <span>Dashboard</span>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                    <SidebarMenuItem>
                        <SidebarMenuButton href="/admin/jobs" isActive={isActive('/admin/jobs')} tooltip="Jobs">
                             <Briefcase />
                             <span>Publicaciones</span>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                    <SidebarMenuItem>
                        <SidebarMenuButton href="/admin/users" isActive={isActive('/admin/users')} tooltip="Users">
                             <Users />
                             <span>Usuarios</span>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                    <SidebarMenuItem>
                        <SidebarMenuButton href="/admin/companies" isActive={isActive('/admin/companies')} tooltip="Companies">
                             <Building />
                             <span>Empresas</span>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                     <SidebarMenuItem>
                        <SidebarMenuButton href="/admin/settings" isActive={isActive('/admin/settings')} tooltip="Settings">
                             <Settings />
                             <span>Ajustes</span>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                 </SidebarMenu>
            </SidebarContent>
        </Sidebar>
    )
}
