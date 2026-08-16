import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import ErrorBoundary from "./components/ErrorBoundary";
import DashboardLayout from "./components/DashboardLayout";
import { ThemeProvider } from "./contexts/ThemeContext";
import { Home, PortalRoute, SearchPage, AIPage, HandoverPage, CompliancePage } from "./pages/Portal";
import NotFound from "./pages/NotFound";
import { Route, Switch, Router as WouterRouter } from "wouter";
import { useHashLocation } from "wouter/use-hash-location";

function Router() {
  const isGitHubPages = import.meta.env.BASE_URL !== "/";
  const base = isGitHubPages ? "" : import.meta.env.BASE_URL.replace(/\/$/, "");
  return <WouterRouter base={base} hook={isGitHubPages ? useHashLocation : undefined}><DashboardLayout><Switch>
    <Route path="/" component={Home} />
    <Route path="/search" component={SearchPage} />
    <Route path="/ai" component={AIPage} />
    <Route path="/take-over" component={HandoverPage} />
    <Route path="/start-here" component={StartHere} />
    <Route path="/learning-path" component={LearningPath} />
    <Route path="/faq" component={FaqPage} />
    <Route path="/topics" component={PortalRoute} /><Route path="/tasks" component={PortalRoute} /><Route path="/workflows" component={PortalRoute} />
    <Route path="/sites" component={PortalRoute} /><Route path="/monitoring" component={PortalRoute} /><Route path="/compliance" component={CompliancePage} />
    <Route path="/documents" component={PortalRoute} /><Route path="/glossary" component={PortalRoute} /><Route path="/knowledge-gaps" component={PortalRoute} /><Route path="/conflicts" component={PortalRoute} />
    <Route path="/404" component={NotFound} /><Route component={NotFound} />
  </Switch></DashboardLayout></WouterRouter>;
}

function StartHere(){return <div className="max-w-4xl"><div className="mb-8"><p className="text-[11px] uppercase tracking-[0.22em] text-emerald-700">Orientasi</p><h2 className="mt-3 text-4xl font-semibold tracking-tight text-slate-950">Mulai dari lapisan bukti.</h2><p className="mt-4 text-sm leading-7 text-slate-600">Portal ini disusun berdasarkan bahan sumber Lingkungan yang diaudit. Pelajari kosakata status terlebih dahulu, lalu gunakan Tugas, Lokasi, Kepatuhan, dan Dokumen untuk membangun konteks. Jika bukti tidak lengkap, portal menampilkan BUKTI_SEBAGIAN alih-alih mengisi kekosongan dengan tebakan.</p></div><div className="grid gap-4 md:grid-cols-3"><div className="rounded-2xl bg-[#12362b] p-5 text-white"><p className="text-xs uppercase tracking-wider text-lime-200">01</p><h3 className="mt-8 font-semibold">Pahami</h3><p className="mt-2 text-sm leading-6 text-emerald-50/70">Pahami domain, alur kerja, dan label status.</p></div><div className="rounded-2xl border border-emerald-950/10 bg-white p-5"><p className="text-xs uppercase tracking-wider text-emerald-700">02</p><h3 className="mt-8 font-semibold">Telusuri</h3><p className="mt-2 text-sm leading-6 text-slate-600">Buka panel bukti pada setiap kartu pengetahuan.</p></div><div className="rounded-2xl border border-amber-200 bg-amber-50 p-5"><p className="text-xs uppercase tracking-wider text-amber-800">03</p><h3 className="mt-8 font-semibold text-amber-950">Verifikasi</h3><p className="mt-2 text-sm leading-6 text-amber-900">Tinjau kesenjangan dan konflik sebelum bertindak.</p></div></div></div>}
function LearningPath(){return <div className="max-w-4xl"><p className="text-[11px] uppercase tracking-[0.22em] text-emerald-700">Jalur belajar</p><h2 className="mt-3 text-4xl font-semibold tracking-tight text-slate-950">Urutan praktis untuk personel baru.</h2><div className="mt-8 space-y-4">{["Orientasi dan dasar-dasar Lingkungan","Tugas operasional dan alur kerja","Konteks lokasi, fasilitas, dan pemantauan","Lapisan kepatuhan dan keterlacakan dokumen","Serah terima, kesenjangan, dan verifikasi"].map((step,i)=><div key={step} className="flex gap-4 rounded-2xl border border-emerald-950/10 bg-white p-5"><div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-emerald-100 font-semibold text-emerald-800">{i+1}</div><div><h3 className="font-semibold text-slate-900">{step}</h3><p className="mt-1 text-sm leading-6 text-slate-600">Telusuri basis pengetahuan teraudit sambil menjaga status bukti dan referensi sumber tetap terlihat.</p></div></div>)}</div></div>}
function FaqPage(){return <div className="max-w-4xl"><p className="text-[11px] uppercase tracking-[0.22em] text-emerald-700">Pertanyaan yang sering diajukan</p><h2 className="mt-3 text-4xl font-semibold tracking-tight text-slate-950">Temukan pertanyaannya, lalu periksa sumbernya.</h2><div className="mt-8 space-y-3">{["Bagaimana menemukan sumber di balik sebuah tugas?","Apa arti BUKTI_SEBAGIAN?","Bagaimana konflik ditangani?","Bisakah AI menyelesaikan konflik?","Apa yang terjadi ketika informasi tidak ditemukan?"].map((question)=><details key={question} className="group rounded-2xl border border-emerald-950/10 bg-white p-5"><summary className="cursor-pointer font-semibold text-slate-900">{question}</summary><p className="mt-3 text-sm leading-6 text-slate-600">Gunakan panel bukti dan lencana status pada catatan terkait. Pola jawaban ini menjelaskan perilaku navigasi portal; konsultasikan catatan sumber untuk panduan khusus perusahaan.</p></details>)}</div></div>}

export default function App() {
  return <ErrorBoundary><ThemeProvider defaultTheme="light"><TooltipProvider><Toaster /><Router /></TooltipProvider></ThemeProvider></ErrorBoundary>;
}
