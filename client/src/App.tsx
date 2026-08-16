import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import ErrorBoundary from "./components/ErrorBoundary";
import DashboardLayout from "./components/DashboardLayout";
import { ThemeProvider } from "./contexts/ThemeContext";
import { Home, PortalRoute, SearchPage, CompliancePage, LearningPage } from "./pages/Portal";
import NotFound from "./pages/NotFound";
import { Route, Switch, Router as WouterRouter } from "wouter";
import { useHashLocation } from "wouter/use-hash-location";

function Router() {
  const isGitHubPages = import.meta.env.BASE_URL !== "/";
  const base = isGitHubPages ? "" : import.meta.env.BASE_URL.replace(/\/$/, "");
  return <WouterRouter base={base} hook={isGitHubPages ? useHashLocation : undefined}><DashboardLayout><Switch>
    <Route path="/" component={Home} />
    <Route path="/search" component={SearchPage} />
    <Route path="/learn/:id" component={LearningPage} />
    <Route path="/start-here" component={StartHere} />
    <Route path="/learning-path" component={LearningPath} />
    <Route path="/faq" component={FaqPage} />
    <Route path="/topics" component={PortalRoute} /><Route path="/tasks" component={PortalRoute} /><Route path="/workflows" component={PortalRoute} />
    <Route path="/sites" component={PortalRoute} /><Route path="/locations" component={PortalRoute} /><Route path="/parameters" component={PortalRoute} /><Route path="/roles" component={PortalRoute} /><Route path="/monitoring" component={PortalRoute} /><Route path="/compliance" component={CompliancePage} />
    <Route path="/documents" component={PortalRoute} /><Route path="/glossary" component={PortalRoute} /><Route path="/knowledge-gaps" component={PortalRoute} /><Route path="/conflicts" component={PortalRoute} />
    <Route path="/404" component={NotFound} /><Route component={NotFound} />
  </Switch></DashboardLayout></WouterRouter>;
}

function StartHere(){return <div className="max-w-4xl"><div className="mb-8"><p className="text-[11px] uppercase tracking-[0.22em] text-emerald-700">Orientasi untuk personel baru</p><h2 className="mt-3 text-4xl font-semibold tracking-tight text-slate-950">Belajar dengan urutan yang jelas.</h2><p className="mt-4 text-sm leading-7 text-slate-600">Mulailah di Beranda dengan memilih aspek Lingkungan yang ingin dipahami. Baca materi pengantar langsung di halaman aspek, lalu ikuti tugas dan alur kerja terkait. Pencarian dan panel bukti digunakan untuk memperdalam pemahaman—bukan sebagai pengganti materi.</p></div><div className="grid gap-4 md:grid-cols-3"><div className="rounded-2xl bg-[#12362b] p-5 text-white"><p className="text-xs uppercase tracking-wider text-lime-200">01</p><h3 className="mt-8 font-semibold">Pilih aspek</h3><p className="mt-2 text-sm leading-6 text-emerald-50/70">Buka Beranda dan pilih topik yang paling dekat dengan pekerjaan Anda.</p></div><div className="rounded-2xl border border-emerald-950/10 bg-white p-5"><p className="text-xs uppercase tracking-wider text-emerald-700">02</p><h3 className="mt-8 font-semibold">Baca materi</h3><p className="mt-2 text-sm leading-6 text-slate-600">Pahami ringkasan, konsep inti, tugas, dan alur kerja langsung di web.</p></div><div className="rounded-2xl border border-amber-200 bg-amber-50 p-5"><p className="text-xs uppercase tracking-wider text-amber-800">03</p><h3 className="mt-8 font-semibold text-amber-950">Periksa bukti</h3><p className="mt-2 text-sm leading-6 text-amber-900">Buka sumber dan kesenjangan jika Anda hendak menggunakan informasi secara operasional.</p></div></div><div className="mt-6"><a href="/" className="inline-flex items-center rounded-xl bg-[#12362b] px-4 py-2.5 text-sm font-semibold text-white hover:bg-emerald-900">Pilih aspek di Beranda →</a></div></div>}
function LearningPath(){return <div className="max-w-4xl"><p className="text-[11px] uppercase tracking-[0.22em] text-emerald-700">Jalur belajar</p><h2 className="mt-3 text-4xl font-semibold tracking-tight text-slate-950">Dari pemahaman ke pekerjaan.</h2><p className="mt-4 text-sm leading-7 text-slate-600">Gunakan urutan ini bila Anda belum tahu harus mulai dari mana. Setiap langkah mengarah kembali ke materi yang dapat dibaca langsung di dalam portal.</p><div className="mt-8 space-y-4">{[{title:"Pilih aspek Lingkungan",desc:"Mulai dari Beranda dan buka materi pengantar sesuai kebutuhan Anda."},{title:"Baca konsep dan konteks",desc:"Pahami tujuan, prasyarat, konsep inti, serta hal yang masih belum lengkap."},{title:"Telusuri tugas dan alur kerja",desc:"Buka pekerjaan terkait untuk melihat langkah dan hubungan operasional yang tersedia."},{title:"Periksa sumber dan status bukti",desc:"Gunakan panel sumber sebelum menjadikan informasi sebagai panduan operasional."},{title:"Gunakan alat pendukung",desc:"Manfaatkan Pencarian, Glosarium, dan panel sumber setelah konteks dasarnya dipahami."}].map((step,i)=><div key={step.title} className="flex gap-4 rounded-2xl border border-emerald-950/10 bg-white p-5"><div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-emerald-100 font-semibold text-emerald-800">{i+1}</div><div><h3 className="font-semibold text-slate-900">{step.title}</h3><p className="mt-1 text-sm leading-6 text-slate-600">{step.desc}</p></div></div>)}</div></div>}
function FaqPage(){return <div className="max-w-4xl"><p className="text-[11px] uppercase tracking-[0.22em] text-emerald-700">Pertanyaan yang sering diajukan</p><h2 className="mt-3 text-4xl font-semibold tracking-tight text-slate-950">Temukan pertanyaannya, lalu periksa sumbernya.</h2><div className="mt-8 space-y-3">{["Bagaimana menemukan sumber di balik sebuah tugas?","Apa arti BUKTI_SEBAGIAN?","Bagaimana konflik ditangani?","Di mana saya membaca materi aspek Lingkungan?","Apa yang terjadi ketika informasi tidak ditemukan?"].map((question)=><details key={question} className="group rounded-2xl border border-emerald-950/10 bg-white p-5"><summary className="cursor-pointer font-semibold text-slate-900">{question}</summary><p className="mt-3 text-sm leading-6 text-slate-600">Gunakan panel bukti dan lencana status pada catatan terkait. Pola jawaban ini menjelaskan perilaku navigasi portal; konsultasikan catatan sumber untuk panduan khusus perusahaan.</p></details>)}</div></div>}

export default function App() {
  return <ErrorBoundary><ThemeProvider defaultTheme="light"><TooltipProvider><Toaster /><Router /></TooltipProvider></ThemeProvider></ErrorBoundary>;
}
