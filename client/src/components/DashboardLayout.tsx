import { Sidebar, SidebarContent, SidebarFooter, SidebarHeader, SidebarInset, SidebarMenu, SidebarMenuButton, SidebarMenuItem, SidebarProvider, SidebarTrigger, useSidebar } from "@/components/ui/sidebar";
import { useIsMobile } from "@/hooks/useMobile";
import { BookOpen, FileText, Flag, GitBranch, HelpCircle, Home, Layers3, ListChecks, MapPin, Search, ShieldCheck, Sparkles, Waypoints } from "lucide-react";
import { useLocation } from "wouter";
import { useEffect, useState } from "react";

export const menuItems = [
  { label: "Beranda", path: "/", icon: Home }, { label: "Mulai di Sini", path: "/start-here", icon: Sparkles }, { label: "Jalur Belajar", path: "/learning-path", icon: BookOpen },
  { label: "Aspek Lingkungan", path: "/topics", icon: Layers3 }, { label: "Tugas / Panduan", path: "/tasks", icon: ListChecks }, { label: "Alur Kerja", path: "/workflows", icon: GitBranch },
  { label: "Lokasi & Fasilitas", path: "/sites", icon: MapPin }, { label: "Pemantauan", path: "/monitoring", icon: Waypoints },
  { label: "Kepatuhan", path: "/compliance", icon: ShieldCheck }, { label: "Dokumen", path: "/documents", icon: FileText }, { label: "Glosarium", path: "/glossary", icon: BookOpen },
  { label: "FAQ", path: "/faq", icon: HelpCircle }, { label: "Kesenjangan Pengetahuan", path: "/knowledge-gaps", icon: Flag }, { label: "Konflik / Verifikasi", path: "/conflicts", icon: ShieldCheck },
  { label: "Pencarian", path: "/search", icon: Search },
];

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const [location, setLocation] = useLocation();
  const isMobile = useIsMobile();
  const active = location.startsWith("/learn/") ? { label: "Materi aspek" } : (menuItems.find(item => location === item.path) ?? menuItems[0]);
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
                <p className="text-[10px] uppercase tracking-[0.2em] text-emerald-200/70">Basis Pengetahuan</p>
              </div>
            </div>
          </SidebarHeader>
          <SidebarContent className="px-2 py-3 overflow-y-auto">
            <p className="px-2 pb-2 text-[10px] font-semibold uppercase tracking-[0.18em] text-lime-200/80 group-data-[collapsible=icon]:hidden">Jalur belajar</p>
            <SidebarMenu>{menuItems.slice(0, 4).map(item => { const Icon = item.icon; const isActive = location === item.path || (item.path !== "/" && location.startsWith(item.path)); return <SidebarMenuItem key={item.path}><SidebarMenuButton isActive={isActive} tooltip={item.label} onClick={() => setLocation(item.path)} className="h-9 text-[12px] text-emerald-50/75 hover:bg-white/10 hover:text-white data-[active=true]:bg-[#d9f99d] data-[active=true]:text-[#12362b]"><Icon className="h-4 w-4 shrink-0" /><span>{item.label}</span></SidebarMenuButton></SidebarMenuItem>; })}</SidebarMenu>
            <p className="mt-5 px-2 pb-2 text-[10px] font-semibold uppercase tracking-[0.18em] text-emerald-200/60 group-data-[collapsible=icon]:hidden">Alat pendukung</p>
            <SidebarMenu>{menuItems.slice(4).map(item => { const Icon = item.icon; const isActive = location === item.path || (item.path !== "/" && location.startsWith(item.path)); return <SidebarMenuItem key={item.path}><SidebarMenuButton isActive={isActive} tooltip={item.label} onClick={() => setLocation(item.path)} className="h-9 text-[12px] text-emerald-50/75 hover:bg-white/10 hover:text-white data-[active=true]:bg-[#d9f99d] data-[active=true]:text-[#12362b]"><Icon className="h-4 w-4 shrink-0" /><span>{item.label}</span></SidebarMenuButton></SidebarMenuItem>; })}</SidebarMenu>
          </SidebarContent>
          <SidebarFooter className="border-t border-white/10 p-3"><p className="text-center text-[10px] uppercase tracking-[0.16em] text-emerald-200/70 group-data-[collapsible=icon]:hidden">Mode baca-saja</p><p className="hidden text-center text-sm text-lime-200 group-data-[collapsible=icon]:block" aria-label="Mode baca-saja">●</p></SidebarFooter>
        </Sidebar>
        <SidebarInset className="min-w-0 bg-[#f8faf7]">
          <header className="sticky top-0 z-30 h-16 border-b border-emerald-950/10 bg-[#f8faf7]/95 backdrop-blur flex items-center justify-between px-4 md:px-8">
            <div className="flex items-center gap-3"><SidebarTrigger aria-label="Buka atau tutup navigasi" title="Buka atau tutup navigasi" className="h-9 w-9" /><div><p className="text-[11px] uppercase tracking-[0.18em] text-emerald-700/70">Pengetahuan Lingkungan</p><h1 className="text-sm font-semibold text-slate-900">{active.label}</h1></div></div>
            <div className="hidden md:flex items-center gap-2 text-xs text-slate-500"><span className="h-2 w-2 rounded-full bg-emerald-500" /> Portal belajar berbasis sumber</div>
          </header>
          <main className="p-4 md:p-8 max-w-[1600px] mx-auto w-full">{children}</main>
        </SidebarInset>
      </div>
    </SidebarProvider>
  );
}
