
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
                        <SidebarMenuButton href="#" asChild tooltip="Publicaciones">
                             <Link href="#">
                                <Briefcase />
                                <span>Publicaciones</span>
                             </Link>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                    <SidebarMenuItem>
                        <SidebarMenuButton href="#" asChild tooltip="Usuarios">
                             <Link href="#">
                                <Users />
                                <span>Usuarios</span>
                             </Link>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                    <SidebarMenuItem>
                        <SidebarMenuButton href="#" asChild tooltip="Empresas">
                            <Link href="#">
                             <Building />
                             <span>Empresas</span>
                            </Link>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                     <SidebarMenuItem>
                        <SidebarMenuButton href="#" asChild tooltip="Ajustes">
                             <Link href="#">
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
