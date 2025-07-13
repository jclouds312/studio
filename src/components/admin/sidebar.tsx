
'use client';

import { Sidebar, SidebarContent, SidebarMenu, SidebarMenuItem, SidebarMenuButton } from "@/components/ui/sidebar";
import { Briefcase, Users, Building, LayoutGrid, Tag, CreditCard } from "lucide-react";

interface AdminSidebarProps {
    activeTab: string;
    setActiveTab: (tab: string) => void;
}

export function AdminSidebar({ activeTab, setActiveTab }: AdminSidebarProps) {
    const menuItems = [
        { id: 'overview', label: 'Resumen', icon: LayoutGrid },
        { id: 'jobs', label: 'Publicaciones', icon: Briefcase },
        { id: 'users', label: 'Usuarios', icon: Users },
        { id: 'companies', label: 'Empresas', icon: Building },
        { id: 'categories', label: 'Categorías', icon: Tag },
        { id: 'payments', label: 'Pagos', icon: CreditCard },
    ];

    return (
        <Sidebar>
            <SidebarContent>
                 <SidebarMenu>
                    {menuItems.map(item => (
                        <SidebarMenuItem key={item.id}>
                            <SidebarMenuButton
                                onClick={() => setActiveTab(item.id)}
                                isActive={activeTab === item.id}
                                tooltip={item.label}
                            >
                                <item.icon />
                                <span>{item.label}</span>
                            </SidebarMenuButton>
                        </SidebarMenuItem>
                    ))}
                 </SidebarMenu>
            </SidebarContent>
        </Sidebar>
    )
}
