
'use client';

import { Sidebar, SidebarContent, SidebarMenu, SidebarMenuItem, SidebarMenuButton } from "@/components/ui/sidebar";
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
                        <SidebarMenuButton href="/admin" asChild isActive={isActive('/admin')} tooltip="Dashboard">
                             <Link href="/admin">
                                <LayoutGrid />
                                <span>Dashboard</span>
                             </Link>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                    <SidebarMenuItem>
                        <SidebarMenuButton href="/admin" asChild tooltip="Publicaciones">
                             <Link href="/admin">
                                <Briefcase />
                                <span>Publicaciones</span>
                             </Link>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                    <SidebarMenuItem>
                        <SidebarMenuButton href="/admin" asChild tooltip="Usuarios">
                             <Link href="/admin">
                                <Users />
                                <span>Usuarios</span>
                             </Link>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                    <SidebarMenuItem>
                        <SidebarMenuButton href="/admin" asChild tooltip="Empresas">
                            <Link href="/admin">
                             <Building />
                             <span>Empresas</span>
                            </Link>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                     <SidebarMenuItem>
                        <SidebarMenuButton href="/admin" asChild tooltip="Ajustes">
                             <Link href="/admin">
                                <Settings />
                                <span>Ajustes</span>
                             </Link>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                 </SidebarMenu>
            </SidebarContent>
        </Sidebar>
    )
}
