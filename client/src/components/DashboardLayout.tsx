import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Sidebar, SidebarContent, SidebarFooter, SidebarHeader, SidebarInset, SidebarMenu, SidebarMenuButton, SidebarMenuItem, SidebarProvider, SidebarTrigger, useSidebar } from "@/components/ui/sidebar";
import { startLogin } from "@/const";
import { useAuth } from "@/_core/hooks/useAuth";
import { useIsMobile } from "@/hooks/useMobile";
import { BookOpen, Bot, ClipboardCheck, FileText, Flag, GitBranch, HelpCircle, Home, Layers3, ListChecks, MapPin, Menu, Search, ShieldCheck, Sparkles, Waypoints, X } from "lucide-react";
import { useLocation } from "wouter";
import { useEffect, useState } from "react";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";

export const menuItems = [
  { label: "Home", path: "/", icon: Home }, { label: "Start Here", path: "/start-here", icon: Sparkles }, { label: "Learning Path", path: "/learning-path", icon: BookOpen },
  { label: "Topics / Domains", path: "/topics", icon: Layers3 }, { label: "Tasks / How-To", path: "/tasks", icon: ListChecks }, { label: "Workflows", path: "/workflows", icon: GitBranch },
  { label: "I'm Taking Over", path: "/take-over", icon: ClipboardCheck }, { label: "Sites & Facilities", path: "/sites", icon: MapPin }, { label: "Monitoring", path: "/monitoring", icon: Waypoints },
  { label: "Compliance", path: "/compliance", icon: ShieldCheck }, { label: "Documents", path: "/documents", icon: FileText }, { label: "Glossary", path: "/glossary", icon: BookOpen },
  { label: "FAQ", path: "/faq", icon: HelpCircle }, { label: "Knowledge Gaps", path: "/knowledge-gaps", icon: Flag }, { label: "Conflicts / Verification", path: "/conflicts", icon: ShieldCheck },
  { label: "AI Assistant", path: "/ai", icon: Bot }, { label: "Search", path: "/search", icon: Search },
];

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const [location, setLocation] = useLocation();
  const { user, logout } = useAuth();
  const isMobile = useIsMobile();
  const active = menuItems.find(item => location === item.path) ?? menuItems[0];
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => setMobileOpen(false), [location]);

  return (
    <SidebarProvider>
      <div className="min-h-screen bg-[#f8faf7] w-full flex">
        <Sidebar collapsible="icon" className="border-r border-emerald-950/10 bg-[#12362b] text-white">
          <SidebarHeader className="h-20 px-3 border-b border-white/10">
            <div className="flex items-center gap-3 px-2 py-2">
              <div className="h-10 w-10 rounded-xl bg-[#d9f99d] text-[#12362b] flex items-center justify-center font-black text-lg">E</div>
              <div className="group-data-[collapsible=icon]:hidden min-w-0">
                <p className="font-semibold tracking-tight text-white truncate">Environment</p>
                <p className="text-[10px] uppercase tracking-[0.2em] text-emerald-200/70">Knowledge Base</p>
              </div>
            </div>
          </SidebarHeader>
          <SidebarContent className="px-2 py-3 overflow-y-auto">
            <SidebarMenu>
              {menuItems.map(item => {
                const Icon = item.icon;
                const isActive = location === item.path || (item.path !== "/" && location.startsWith(item.path));
                return <SidebarMenuItem key={item.path}><SidebarMenuButton isActive={isActive} tooltip={item.label} onClick={() => setLocation(item.path)} className="h-9 text-[12px] text-emerald-50/75 hover:bg-white/10 hover:text-white data-[active=true]:bg-[#d9f99d] data-[active=true]:text-[#12362b]"><Icon className="h-4 w-4 shrink-0" /><span>{item.label}</span></SidebarMenuButton></SidebarMenuItem>;
              })}
            </SidebarMenu>
          </SidebarContent>
          <SidebarFooter className="p-3 border-t border-white/10">
            {user ? <DropdownMenu><DropdownMenuTrigger asChild><button className="flex items-center gap-2 w-full text-left group-data-[collapsible=icon]:justify-center"><Avatar className="h-8 w-8 bg-emerald-100 text-emerald-950"><AvatarFallback>{user.name?.charAt(0).toUpperCase() ?? "U"}</AvatarFallback></Avatar><span className="text-xs text-emerald-50/80 truncate group-data-[collapsible=icon]:hidden">{user.name ?? user.email}</span></button></DropdownMenuTrigger><DropdownMenuContent align="start"><DropdownMenuItem onClick={logout}>Sign out</DropdownMenuItem></DropdownMenuContent></DropdownMenu> : <Button onClick={() => startLogin()} size="sm" className="bg-[#d9f99d] text-[#12362b] hover:bg-lime-200 group-data-[collapsible=icon]:px-2"><span className="group-data-[collapsible=icon]:hidden">Sign in</span><span className="hidden group-data-[collapsible=icon]:inline">↗</span></Button>}
          </SidebarFooter>
        </Sidebar>
        <SidebarInset className="min-w-0 bg-[#f8faf7]">
          <header className="sticky top-0 z-30 h-16 border-b border-emerald-950/10 bg-[#f8faf7]/95 backdrop-blur flex items-center justify-between px-4 md:px-8">
            <div className="flex items-center gap-3"><SidebarTrigger className="h-9 w-9" /><div><p className="text-[11px] uppercase tracking-[0.18em] text-emerald-700/70">Environment Knowledge & Handover</p><h1 className="text-sm font-semibold text-slate-900">{active.label}</h1></div></div>
            <div className="hidden md:flex items-center gap-2 text-xs text-slate-500"><span className="h-2 w-2 rounded-full bg-emerald-500" /> Source-grounded workspace</div>
          </header>
          <main className="p-4 md:p-8 max-w-[1600px] mx-auto w-full">{children}</main>
        </SidebarInset>
      </div>
    </SidebarProvider>
  );
}
