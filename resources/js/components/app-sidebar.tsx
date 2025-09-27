import { NavFooter } from '@/components/nav-footer';
import { NavMain } from '@/components/nav-main';
import { NavUser } from '@/components/nav-user';
import { Sidebar, SidebarContent, SidebarFooter, SidebarHeader, SidebarMenu, SidebarMenuButton, SidebarMenuItem } from '@/components/ui/sidebar';
import { usePage } from '@inertiajs/react';
import { LayoutDashboard } from 'lucide-react';
import AppLogo from './app-logo';

export function AppSidebar() {
    const { url } = usePage();

    // Show dashboard link if we're on a video content page
    const showDashboardLink = url.startsWith('/courses/') && url.includes('/content');

    const navItems = showDashboardLink 
        ? [
            {
                title: "Dashboard",
                href: "/dashboard",
                icon: LayoutDashboard,
            }
        ]
        : [];

    return (
        <Sidebar collapsible="icon" variant="inset">
            <SidebarHeader>
                <SidebarMenu>
                    <SidebarMenuItem>
                        <SidebarMenuButton size="lg" asChild>
                            <AppLogo />
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarHeader>

            <SidebarContent>
                {navItems.length > 0 && <NavMain items={navItems} />}
            </SidebarContent>

            <SidebarFooter>
                <NavFooter items={[]} className="mt-auto" />
                <NavUser />
            </SidebarFooter>
        </Sidebar>
    );
}
